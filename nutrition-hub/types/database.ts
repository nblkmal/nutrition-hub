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
  fat_saturated_g: number
  fiber_g: number
  sugar_g: number
  sodium_mg: number
  potassium_mg: number
  cholesterol_mg: number
  data_source: string
  created_at: string
  updated_at: string
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
