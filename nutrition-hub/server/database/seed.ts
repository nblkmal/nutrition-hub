/**
 * Database seed script for Nutrition Hub.
 *
 * Usage:
 *   npm run seed          # Seed database (idempotent - skips if already seeded)
 *   npm run seed:reset    # Reset and reseed database
 *
 * This script seeds:
 * - 120+ common foods with accurate USDA nutrition data
 * - 5 nutrition categories with rule-based matching
 * - Food-category relationships based on category rules
 */

import { getDb } from '../utils/database'
import { slugify } from '../../utils/slugify'
import { seedFoods } from './seed-data'
import { seedCategories, calculateMatchScore } from './seed-categories'
import type { FoodDbRow, CategoryDbRow, CategoryRule } from '../../types/database'

// Parse CLI arguments for reset flag
const args = process.argv.slice(2)
const reset = args.includes('--reset')

/**
 * Validate calorie data using the formula:
 * calories ≈ (protein_g × 4) + (carbs_g × 4) + (fat_g × 9) ± 10%
 *
 * @param food - Food item to validate
 * @returns Object with validation result and details
 */
function validateCalories(food: {
  calories: number
  protein_g: number
  carbohydrates_total_g: number
  fat_total_g: number
  name: string
}): { valid: boolean; expected: number; variance: number } {
  const expected = (food.protein_g * 4) + (food.carbohydrates_total_g * 4) + (food.fat_total_g * 9)
  const variance = Math.abs(food.calories - expected) / expected
  const valid = variance <= 0.10
  return { valid, expected, variance }
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
  }

  // IDEMPOTENCY CHECK: Skip if already seeded
  const existingFoodCount = db.prepare('SELECT COUNT(*) as count FROM foods WHERE data_source = ?').get('seed') as { count: number }
  if (existingFoodCount.count > 0 && !isReset) {
    console.log(`[seed] Already seeded ${existingFoodCount.count} foods. Skipping...`)
    console.log('[seed] Use "npm run seed:reset" to force reseed')
    return
  }

  // STEP 1: Insert foods
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
      insertFood.run(
        food.name,
        slugify(food.name),
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

  // Calorie validation check
  console.log('[seed] Validating calorie data...')
  const validationResults = seedFoods.map(f => ({ food: f, validation: validateCalories(f) }))
  const invalidFoods = validationResults.filter(r => !r.validation.valid)
  if (invalidFoods.length > 0) {
    console.warn(`[seed] Warning: ${invalidFoods.length} foods have calorie variance > 10%:`)
    for (const { food, validation } of invalidFoods) {
      console.warn(
        `  - ${food.name}: expected ${Math.round(validation.expected)}, ` +
        `actual ${food.calories} (${(validation.variance * 100).toFixed(1)}% variance)`
      )
    }
  } else {
    console.log('[seed] All foods passed calorie validation (±10%)')
  }

  // STEP 2: Insert categories
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

  // STEP 3: Establish food-category relationships
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

// Run seed if executed directly (ESM detection)
const isMainModule = process.argv[1] && process.argv[1].endsWith('/seed.ts')
if (isMainModule) {
  try {
    seed()
  } catch (error) {
    console.error('[seed] Error:', error)
    process.exit(1)
  }
}
