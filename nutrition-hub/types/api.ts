// API types (camelCase - matches API responses)

/**
 * External API contract - CalorieNinjas API response format
 * @see https://api.calorieninjas.com/doc
 * NOTE: This is external API format, not internal API response type
 */
export interface CalorieNinjasResponse {
  sugar_g: number
  fiber_g: number
  serving_size_g: number
  sodium_mg: number
  name: string
  potassium_mg: number
  fat_saturated_g: number
  fat_total_g: number
  calories: number
  cholesterol_mg: number
  protein_g: number
  carbohydrates_total_g: number
}

/**
 * Food interface (camelCase version of FoodDbRow)
 * Transformed from database row for API responses
 */
export interface Food {
  id: number
  name: string
  slug: string
  servingSizeG: number
  calories: number
  proteinG: number
  carbohydratesTotalG: number
  fatTotalG: number
  fatSaturatedG: number
  fiberG: number
  sugarG: number
  sodiumMg: number
  potassiumMg: number
  cholesterolMg: number
  dataSource: string
  createdAt: string
  updatedAt: string
}

/**
 * Category rule conditions for matching foods to categories
 */
export interface CategoryRule {
  name: string
  description: string
  weight: number  // 1-10, influences match score
  conditions: {
    // Protein conditions
    minProteinG?: number
    maxProteinG?: number
    minProteinPerCalorie?: number  // protein/calories * 100
    // Carb conditions
    maxCarbsG?: number
    minCarbsG?: number
    // Fat conditions
    maxFatG?: number
    maxSaturatedFatG?: number
    // Fiber conditions
    minFiberG?: number
    // Sugar conditions
    maxSugarG?: number
    // Calorie conditions
    maxCalories?: number
    minCalories?: number
  }
}

/**
 * Category interface (camelCase version of CategoryDbRow)
 * Key differences from CategoryDbRow:
 * - rules_json: string → rulesJson: CategoryRule (parsed)
 * - is_active: number → isActive: boolean (converted)
 *
 * Note: Categories table does not have updated_at column (only created_at)
 */
export interface Category {
  id: number
  slug: string
  name: string
  description: string | null
  icon: string | null
  rulesJson: CategoryRule  // Parsed JSON object (not string like DB)
  displayOrder: number
  isActive: boolean  // Converted from number (0/1)
  createdAt: string
}

/**
 * Standard API response wrapper for single item responses
 */
export interface ApiResponse<T> {
  data: T
  success: true
}

/**
 * Standard API response wrapper for paginated list responses
 */
export interface ApiListResponse<T> {
  data: T[]
  meta: { total: number; page: number; limit: number }
  success: true
}

/**
 * Standard API error response type
 */
export interface ApiError {
  error: { message: string; code: string; statusCode: number }
  success: false
}
