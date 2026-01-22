// Database row types (snake_case - matches SQLite schema exactly)
export interface FoodDbRow {
  id: number
  name: string
  slug: string
  serving_size_g: number
  calories: number
  protein_g: number
  carbohydrates_total_g: number
  fat_total_g: number
  fat_saturated_g: number  // Database has DEFAULT 0, so always present after query
  fiber_g: number
  sugar_g: number
  sodium_mg: number
  potassium_mg: number
  cholesterol_mg: number
  data_source: string
  created_at: string
  updated_at: string
}

// Type for food data insertion (allows optional values that have DB defaults)
export interface FoodInsertData {
  name: string
  serving_size_g: number
  calories: number
  protein_g: number
  carbohydrates_total_g: number
  fat_total_g: number
  fat_saturated_g?: number | null  // Optional for insertion - has DEFAULT 0
  fiber_g?: number | null
  sugar_g?: number | null
  sodium_mg?: number | null
  potassium_mg?: number | null
  cholesterol_mg?: number | null
  data_source: string
}

export interface CategoryDbRow {
  id: number
  slug: string
  name: string
  description: string | null
  icon: string | null
  rules_json: string
  display_order: number
  is_active: number
  created_at: string
}

export interface FoodCategoryDbRow {
  food_id: number
  category_id: number
  match_score: number
  assigned_at: string
}
