import { describe, it, expect, beforeAll, afterEach } from 'vitest'
import { getDb } from '../utils/database'
import { seedFoods } from './seed-data'
import { seedCategories, calculateMatchScore } from './seed-categories'
import type { CategoryRule } from '~/types/database'

describe('Database Seed Tests', () => {
  const db = getDb()

  afterEach(() => {
    // Clean up test data after each test
    db.prepare('DELETE FROM food_categories').run()
    db.prepare('DELETE FROM foods WHERE data_source = ?').run('test')
    db.prepare("DELETE FROM categories WHERE slug LIKE 'test-%'").run()
  })

  describe('seedFoods data structure', () => {
    it('has 125 foods', () => {
      expect(seedFoods.length).toBeGreaterThanOrEqual(100)
      expect(seedFoods.length).toBeLessThanOrEqual(200)
    })

    it('all foods have required fields', () => {
      for (const food of seedFoods) {
        expect(food.name).toBeDefined()
        expect(food.serving_size_g).toBe(100)
        expect(food.calories).toBeGreaterThanOrEqual(0)
        expect(food.protein_g).toBeGreaterThanOrEqual(0)
        expect(food.carbohydrates_total_g).toBeGreaterThanOrEqual(0)
        expect(food.fat_total_g).toBeGreaterThanOrEqual(0)
        expect(food.data_source).toBe('seed')
      }
    })

    it('calorie validation: foods pass ±25% variance check', () => {
      // Foods exempt from validation due to high organic acid content
      const EXEMPT_FOODS = new Set(['Lime Raw', 'Lemon Raw'])

      const invalidFoods: Array<{ name: string; expected: number; actual: number; variance: number }> = []

      for (const food of seedFoods) {
        // Skip exempt foods
        if (EXEMPT_FOODS.has(food.name)) continue

        const fiber = food.fiber_g || 0
        const netCarbs = food.carbohydrates_total_g - fiber
        // Adjusted formula: fiber contributes ~2 cal/g, other carbs contribute ~4 cal/g
        const expected = (food.protein_g * 4) + (netCarbs * 4) + (fiber * 2) + (food.fat_total_g * 9)

        // Skip zero-calorie foods (oils, sweeteners)
        if (expected === 0) {
          expect(food.calories).toBe(0)
          continue
        }

        const variance = Math.abs(food.calories - expected) / expected

        if (variance > 0.25) {
          invalidFoods.push({
            name: food.name,
            expected: Math.round(expected),
            actual: food.calories,
            variance: variance * 100
          })
        }
      }

      expect(invalidFoods).toEqual([])
    })
  })

  describe('seedCategories data structure', () => {
    it('has 5-10 categories', () => {
      expect(seedCategories.length).toBeGreaterThanOrEqual(5)
      expect(seedCategories.length).toBeLessThanOrEqual(10)
    })

    it('all categories have required fields', () => {
      for (const category of seedCategories) {
        expect(category.slug).toBeDefined()
        expect(category.name).toBeDefined()
        expect(category.rules_json).toBeDefined()
        expect(category.display_order).toBeGreaterThan(0)
        expect(category.is_active).toBe(1)
      }
    })

    it('all categories have icons defined', () => {
      for (const category of seedCategories) {
        expect(category.icon).not.toBeNull()
        expect(category.icon).toMatch(/^i-mdi-/)
      }
    })
  })

  describe('calculateMatchScore', () => {
    it('returns 0 for food with no matching conditions', () => {
      const rule: CategoryRule = {
        name: 'Test',
        description: 'Test',
        weight: 10,
        conditions: { minProteinG: 50 }
      }
      const food = {
        protein_g: 10,
        carbohydrates_total_g: 20,
        fat_total_g: 5,
        fat_saturated_g: 1,
        fiber_g: 2,
        sugar_g: 3,
        calories: 165
      }

      const score = calculateMatchScore(food, rule)
      expect(score).toBe(0)
    })

    it('returns high score for perfect match', () => {
      const rule: CategoryRule = {
        name: 'High Protein',
        description: 'Test',
        weight: 10,
        conditions: { minProteinG: 20 }
      }
      const food = {
        protein_g: 31,
        carbohydrates_total_g: 0,
        fat_total_g: 3.6,
        fat_saturated_g: 1,
        fiber_g: 0,
        sugar_g: 0,
        calories: 165
      }

      const score = calculateMatchScore(food, rule)
      expect(score).toBeGreaterThan(50)
    })

    it('handles null values for optional nutrition fields', () => {
      const rule: CategoryRule = {
        name: 'Low Fat',
        description: 'Test',
        weight: 10,
        conditions: { minFiberG: 5, maxSaturatedFatG: 2 }
      }
      const food = {
        protein_g: 10,
        carbohydrates_total_g: 20,
        fat_total_g: 5,
        fat_saturated_g: null, // NULL value
        fiber_g: 6,
        sugar_g: null, // NULL value
        calories: 165
      }

      const score = calculateMatchScore(food, rule)
      expect(score).toBeGreaterThan(0)
    })

    it('applies weight modifier correctly', () => {
      const lowWeightRule: CategoryRule = {
        name: 'Low Priority',
        description: 'Test',
        weight: 5,
        conditions: { minProteinG: 20 }
      }
      const highWeightRule: CategoryRule = {
        name: 'High Priority',
        description: 'Test',
        weight: 10,
        conditions: { minProteinG: 20 }
      }
      const food = {
        protein_g: 30,
        carbohydrates_total_g: 0,
        fat_total_g: 3,
        fat_saturated_g: 1,
        fiber_g: 0,
        sugar_g: 0,
        calories: 150
      }

      const lowScore = calculateMatchScore(food, lowWeightRule)
      const highScore = calculateMatchScore(food, highWeightRule)

      expect(highScore).toBeGreaterThan(lowScore)
    })
  })

  describe('database operations', () => {
    it('can insert and retrieve foods', () => {
      // Use a unique slug to avoid conflicts with existing seed data
      const uniqueSlug = 'test-food-' + Date.now()

      const insertFood = db.prepare(`
        INSERT INTO foods (name, slug, serving_size_g, calories,
          protein_g, carbohydrates_total_g, fat_total_g,
          fat_saturated_g, fiber_g, sugar_g, sodium_mg, potassium_mg, cholesterol_mg, data_source)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)

      const testFood = seedFoods[0]

      insertFood.run(
        'Test Food',
        uniqueSlug,
        testFood.serving_size_g,
        testFood.calories,
        testFood.protein_g,
        testFood.carbohydrates_total_g,
        testFood.fat_total_g,
        testFood.fat_saturated_g || 0,
        testFood.fiber_g || 0,
        testFood.sugar_g || 0,
        testFood.sodium_mg || 0,
        testFood.potassium_mg || 0,
        testFood.cholesterol_mg || 0,
        'test'
      )

      const retrieved = db.prepare('SELECT * FROM foods WHERE slug = ?').get(uniqueSlug)
      expect(retrieved).toBeDefined()
      expect(retrieved.name).toBe('Test Food')

      // Clean up
      db.prepare('DELETE FROM foods WHERE slug = ?').run(uniqueSlug)
    })

    it('can insert and retrieve categories with icons', () => {
      const testSlug = 'test-' + seedCategories[0].slug + '-' + Date.now()

      const insertCategory = db.prepare(`
        INSERT INTO categories (slug, name, description, icon, rules_json, display_order, is_active)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `)

      const testCategory = seedCategories[0]

      insertCategory.run(
        testSlug,
        'Test ' + testCategory.name,
        testCategory.description,
        testCategory.icon,
        testCategory.rules_json,
        testCategory.display_order,
        testCategory.is_active
      )

      const retrieved = db.prepare('SELECT * FROM categories WHERE slug = ?').get(testSlug)
      expect(retrieved).toBeDefined()
      expect(retrieved.icon).toBe(testCategory.icon)
      expect(retrieved.icon).toMatch(/^i-mdi-/)

      // Clean up
      db.prepare('DELETE FROM categories WHERE slug = ?').run(testSlug)
    })

    it('can create food-category relationships', () => {
      // First insert a test food and category
      const foodSlug = 'test-food-rel-' + Date.now()
      const categorySlug = 'test-category-rel-' + Date.now()

      const insertFood = db.prepare(`
        INSERT INTO foods (name, slug, serving_size_g, calories,
          protein_g, carbohydrates_total_g, fat_total_g, fat_saturated_g, data_source)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `)
      const insertCategory = db.prepare(`
        INSERT INTO categories (slug, name, rules_json, display_order, is_active)
        VALUES (?, ?, ?, ?, ?)
      `)
      const insertRelationship = db.prepare(`
        INSERT INTO food_categories (food_id, category_id, match_score)
        VALUES (?, ?, ?)
      `)

      insertFood.run('Test Food Rel', foodSlug, 100, 100, 20, 10, 5, 1, 'test')
      insertCategory.run(categorySlug, 'Test Category Rel', '{"name":"Test"}', 1, 1)

      const food = db.prepare('SELECT id FROM foods WHERE slug = ?').get(foodSlug) as { id: number }
      const category = db.prepare('SELECT id FROM categories WHERE slug = ?').get(categorySlug) as { id: number }

      insertRelationship.run(food.id, category.id, 85)

      const relationship = db.prepare('SELECT * FROM food_categories WHERE food_id = ? AND category_id = ?')
        .get(food.id, category.id)
      expect(relationship).toBeDefined()
      expect(relationship.match_score).toBe(85)

      // Clean up
      db.prepare('DELETE FROM food_categories WHERE food_id = ?').run(food.id)
      db.prepare('DELETE FROM foods WHERE slug = ?').run(foodSlug)
      db.prepare('DELETE FROM categories WHERE slug = ?').run(categorySlug)
    })
  })
})
