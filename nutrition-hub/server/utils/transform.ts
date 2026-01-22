// server/utils/transform.ts
// Transform database rows (snake_case) to API responses (camelCase)

import type { FoodDbRow, CategoryDbRow } from '~/types/database'
import type { Food, Category, CategoryRule } from '~/types/api'

/**
 * Transform a database food row (snake_case) to API response format (camelCase)
 * @param row - Database row with snake_case field names
 * @returns Food object with camelCase field names for API responses
 */
export function transformFood(row: FoodDbRow): Food {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    servingSizeG: row.serving_size_g,
    calories: row.calories,
    proteinG: row.protein_g,
    carbohydratesTotalG: row.carbohydrates_total_g,
    fatTotalG: row.fat_total_g,
    fatSaturatedG: row.fat_saturated_g,
    fiberG: row.fiber_g,
    sugarG: row.sugar_g,
    sodiumMg: row.sodium_mg,
    potassiumMg: row.potassium_mg,
    cholesterolMg: row.cholesterol_mg,
    dataSource: row.data_source,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

/**
 * Transform a database category row (snake_case) to API response format (camelCase)
 * @param row - Database row with snake_case field names
 * @returns Category object with camelCase field names for API responses
 * @throws {Error} If rules_json contains malformed JSON
 */
export function transformCategory(row: CategoryDbRow): Category {
  let rulesJson: CategoryRule
  try {
    rulesJson = JSON.parse(row.rules_json) as CategoryRule
  } catch (error) {
    console.error(`Failed to parse rules_json for category ${row.id}:`, error)
    throw new Error(`Invalid category rule format for category ${row.id}: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    icon: row.icon,
    rulesJson, // Parsed JSON object (not string like DB)
    displayOrder: row.display_order,
    isActive: Boolean(row.is_active), // Convert number (0/1) to boolean
    createdAt: row.created_at,
  }
}
