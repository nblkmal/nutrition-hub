// server/utils/transform.ts
// Transform database rows (snake_case) to API responses (camelCase)

import type { FoodDbRow, CategoryDbRow } from '~/types/database'

export function transformFood(row: FoodDbRow) {
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

export function transformCategory(row: CategoryDbRow) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    icon: row.icon,
    rulesJson: row.rules_json,
    displayOrder: row.display_order,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
  }
}
