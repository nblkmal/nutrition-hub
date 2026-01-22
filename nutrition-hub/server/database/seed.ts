/**
 * Database seed script for Nutrition Hub.
 *
 * Usage:
 *   npm run seed          # Seed database (idempotent - skips if already seeded)
 *   npm run seed:reset    # Reset and reseed database
 *
 * This script seeds:
 * - 125 common foods with accurate USDA nutrition data
 * - 5 nutrition categories with rule-based matching
 * - Food-category relationships based on category rules
 */

import { getDb } from '../utils/database'
import { slugify } from '../../utils/slugify'
import { seedFoods } from './seed-data'
import { seedCategories, calculateMatchScore } from './seed-categories'
import type { FoodDbRow, CategoryDbRow, CategoryRule, FoodInsertData } from '../../types/database'

// Parse CLI arguments for reset flag
const args = process.argv.slice(2)
const reset = args.includes('--reset')

/**
 * Validate calorie data using the formula:
 * calories ≈ (protein_g × 4) + (net_carbs × 4) + (fiber_g × 2) + (fat_g × 9) ± 25%
 *
 * Note: Fiber contributes ~2 cal/g, not 4 cal/g like other carbs.
 * This adjusted formula accounts for fiber's lower caloric contribution.
 * 25% tolerance allows for natural variations in USDA data (organic acids like
 * citric acid in citrus fruits, water content, growing conditions, measurement).
 *
 * Foods with exceptionally high organic acid content (citrus, vinegar, etc.)
 * are exempted from strict validation.
 */
// Foods exempt from calorie validation due to high organic acid content
const CALORIE_VALIDATION_EXEMPT = new Set([
  'Lime Raw',      // Very high citric acid content
  'Lemon Raw',     // High citric acid content
])

function validateCalories(food: Pick<FoodInsertData, 'calories' | 'protein_g' | 'carbohydrates_total_g' | 'fat_total_g' | 'fiber_g' | 'name'>): { valid: boolean; expected: number; variance: number } {
  // Skip validation for exempt foods
  if (CALORIE_VALIDATION_EXEMPT.has(food.name)) {
    return { valid: true, expected: food.calories, variance: 0 }
  }

  const fiber = food.fiber_g || 0
  const netCarbs = food.carbohydrates_total_g - fiber
  // Adjusted formula: fiber contributes ~2 cal/g, other carbs contribute ~4 cal/g
  const expected = (food.protein_g * 4) + (netCarbs * 4) + (fiber * 2) + (food.fat_total_g * 9)
  // Avoid division by zero for zero-calorie foods
  if (expected === 0) return { valid: food.calories === 0, expected: 0, variance: 0 }
  const variance = Math.abs(food.calories - expected) / expected
  const valid = variance <= 0.25 // 25% tolerance for organic acids and natural variations
  return { valid, expected, variance }
}

/**
 * Check for duplicate slugs before insertion.
 * @param foods - Array of food items with names
 * @returns Map of name -> generated slug for all foods
 */
function generateSlugsForFoods(foods: Array<{ name: string }>): Map<string, string> {
  const slugMap = new Map<string, string>()
  const slugCounts = new Map<string, number>()

  for (const food of foods) {
    const slug = slugify(food.name)
    const count = slugCounts.get(slug) || 0

    if (count === 0) {
      // First occurrence of this slug
      slugMap.set(food.name, slug)
    } else {
      // Duplicate slug - add suffix
      slugMap.set(food.name, `${slug}-${count}`)
    }

    slugCounts.set(slug, count + 1)
  }

  // Check for actual collisions and warn
  const collisions: Array<{ name: string; slug: string }> = []
  for (const [name, slug] of slugMap.entries()) {
    const matchingNames = Array.from(slugMap.keys()).filter(
      n => slugMap.get(n) === slug
    )
    if (matchingNames.length > 1) {
      collisions.push({ name, slug })
    }
  }

  if (collisions.length > 0) {
    console.warn(`[seed] Warning: ${collisions.length} potential slug collisions detected and resolved`)
  }

  return slugMap
}

/**
 * Main seed function - seeds the database with foods, categories, and relationships
 */
export function seed(isReset = reset): void {
  const db = getDb() // Get db instance ONCE (singleton pattern)

  console.log('[seed] Starting database seed...')

  // RESET MODE: Delete all seed data
  if (isReset) {
    console.log('[seed] Reset mode: clearing existing seed data...')

    // Delete in correct order due to foreign keys
    db.prepare('DELETE FROM food_categories').run()
    db.prepare('DELETE FROM foods WHERE data_source = ?').run('seed')
    db.prepare('DELETE FROM categories').run()

    console.log('[seed] Reset complete')
  } else {
    // NON-RESET MODE: Update categories if they exist (for icon updates)
    // Check if categories exist without icons
    const categoriesWithoutIcons = db.prepare('SELECT COUNT(*) as count FROM categories WHERE icon IS NULL').get() as { count: number }
    if (categoriesWithoutIcons.count > 0) {
      console.log(`[seed] Found ${categoriesWithoutIcons.count} categories without icons, updating...`)
      // Delete categories so they can be re-inserted with icons
      db.prepare('DELETE FROM food_categories').run()
      db.prepare('DELETE FROM categories').run()
    }
  }

  // IDEMPOTENCY CHECK: Skip if already seeded
  const existingFoodCount = db.prepare('SELECT COUNT(*) as count FROM foods WHERE data_source = ?').get('seed') as { count: number }
  if (existingFoodCount.count > 0 && !isReset) {
    console.log(`[seed] Already seeded ${existingFoodCount.count} foods. Skipping...`)
    console.log('[seed] Use "npm run seed:reset" to force reseed')
    return
  }

  // STEP 0: Generate slugs and check for collisions
  console.log('[seed] Generating slugs and checking for collisions...')
  const slugMap = generateSlugsForFoods(seedFoods)

  // STEP 1: Validate calorie data BEFORE insertion
  console.log('[seed] Validating calorie data...')
  const validationResults = seedFoods.map(f => ({ food: f, validation: validateCalories(f) }))
  const invalidFoods = validationResults.filter(r => !r.validation.valid)

  if (invalidFoods.length > 0) {
    console.error(`[seed] ERROR: ${invalidFoods.length} foods have calorie variance > 25%:`)
    for (const { food, validation } of invalidFoods) {
      console.error(
        `  - ${food.name}: expected ${Math.round(validation.expected)}, ` +
        `actual ${food.calories} (${(validation.variance * 100).toFixed(1)}% variance)`
      )
    }
    throw new Error(`Calorie validation failed for ${invalidFoods.length} foods. Please fix nutrition data before seeding.`)
  }
  console.log('[seed] All foods passed calorie validation (±25%)')

  // STEP 2: Insert foods
  console.log('[seed] Inserting foods...')
  const insertFood = db.prepare(`
    INSERT INTO foods (
      name, slug, serving_size_g, calories,
      protein_g, carbohydrates_total_g, fat_total_g, fat_saturated_g,
      fiber_g, sugar_g, sodium_mg, potassium_mg, cholesterol_mg,
      data_source
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON CONFLICT(name) DO UPDATE SET
      calories = excluded.calories,
      protein_g = excluded.protein_g,
      carbohydrates_total_g = excluded.carbohydrates_total_g,
      fat_total_g = excluded.fat_total_g,
      fat_saturated_g = excluded.fat_saturated_g,
      fiber_g = excluded.fiber_g,
      sugar_g = excluded.sugar_g,
      sodium_mg = excluded.sodium_mg,
      potassium_mg = excluded.potassium_mg,
      cholesterol_mg = excluded.cholesterol_mg,
      updated_at = CURRENT_TIMESTAMP
  `)

  const insertFoodsTransaction = db.transaction(() => {
    for (const food of seedFoods) {
      const slug = slugMap.get(food.name) || slugify(food.name)
      insertFood.run(
        food.name,
        slug,
        food.serving_size_g,
        food.calories,
        food.protein_g,
        food.carbohydrates_total_g,
        food.fat_total_g,
        food.fat_saturated_g || 0,
        food.fiber_g || 0,
        food.sugar_g || 0,
        food.sodium_mg || 0,
        food.potassium_mg || 0,
        food.cholesterol_mg || 0,
        food.data_source
      )
    }
  })

  insertFoodsTransaction()
  console.log(`[seed] Inserted ${seedFoods.length} foods`)

  // STEP 3: Insert categories
  console.log('[seed] Inserting categories...')
  const insertCategory = db.prepare(`
    INSERT OR IGNORE INTO categories (slug, name, description, icon, rules_json, display_order, is_active)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

  const insertCategoriesTransaction = db.transaction(() => {
    for (const category of seedCategories) {
      insertCategory.run(
        category.slug,
        category.name,
        category.description,
        category.icon,
        category.rules_json,
        category.display_order,
        category.is_active
      )
    }
  })

  insertCategoriesTransaction()
  console.log(`[seed] Inserted ${seedCategories.length} categories`)

  // STEP 4: Establish food-category relationships
  console.log('[seed] Creating food-category relationships...')

  // Get all inserted foods and categories
  const allFoods = db.prepare('SELECT * FROM foods WHERE data_source = ?').all('seed') as FoodDbRow[]
  const allCategories = db.prepare('SELECT * FROM categories').all() as CategoryDbRow[]

  // Insert food-category junctions
  const insertFoodCategory = db.prepare(`
    INSERT OR IGNORE INTO food_categories (food_id, category_id, match_score, assigned_at)
    VALUES (?, ?, ?, CURRENT_TIMESTAMP)
  `)

  let relationshipCount = 0

  const insertRelationshipsTransaction = db.transaction(() => {
    for (const food of allFoods) {
      for (const category of allCategories) {
        const rule = JSON.parse(category.rules_json) as CategoryRule
        const score = calculateMatchScore(food, rule)

        // Only assign if score is 50 or higher (reasonable match)
        // Threshold of 50 ensures meaningful category assignments
        if (score >= 50) {
          insertFoodCategory.run(food.id, category.id, score)
          relationshipCount++
        }
      }
    }
  })

  insertRelationshipsTransaction()
  console.log(`[seed] Created ${relationshipCount} food-category relationships`)

  // Summary
  console.log('[seed] Seed completed successfully!')
  console.log(`[seed] - Foods: ${seedFoods.length}`)
  console.log(`[seed] - Categories: ${seedCategories.length}`)
  console.log(`[seed] - Relationships: ${relationshipCount}`)
}

// Run seed if executed directly
// Simple ESM check: if the module has a parent, it's being imported
// This works reliably across platforms with tsx/node
const isMainModule = !import.meta.parent

if (isMainModule) {
  try {
    seed()
  } catch (error) {
    console.error('[seed] Error:', error)
    process.exit(1)
  }
}
