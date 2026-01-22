/**
 * Seed data for nutrition categories.
 * Categories have rules_json that define matching criteria.
 *
 * The rules_json structure:
 * - name: Category display name
 * - description: Human-readable description
 * - weight: 1-10, influences match score priority
 * - conditions: Nutrition thresholds for category membership
 */

export interface CategoryRule {
  name: string
  description: string
  weight: number
  conditions: {
    minProteinG?: number
    maxProteinG?: number
    minProteinPerCalorie?: number
    maxCarbsG?: number
    minCarbsG?: number
    maxFatG?: number
    minFatG?: number
    maxSaturatedFatG?: number
    minFiberG?: number
    maxSugarG?: number
    maxCalories?: number
    minCalories?: number
  }
}

export const seedCategories: Array<{
  slug: string
  name: string
  description: string
  icon: string | null
  rules_json: string
  display_order: number
  is_active: number
}> = [
  {
    slug: 'high-protein',
    name: 'High Protein',
    description: 'At least 20g protein per 100g serving',
    icon: 'i-mdi-dumbbell',
    rules_json: JSON.stringify({
      name: 'High Protein',
      description: 'At least 20g protein per 100g',
      weight: 10,
      conditions: { minProteinG: 20 }
    } as CategoryRule),
    display_order: 1,
    is_active: 1
  },
  {
    slug: 'low-carb',
    name: 'Low Carb',
    description: '10g or fewer carbohydrates per 100g serving',
    icon: 'i-mdi-carrot',
    rules_json: JSON.stringify({
      name: 'Low Carb',
      description: '10g or fewer carbs per 100g',
      weight: 8,
      conditions: { maxCarbsG: 10 }
    } as CategoryRule),
    display_order: 2,
    is_active: 1
  },
  {
    slug: 'healthy-fats',
    name: 'Healthy Fats',
    description: 'High fat content from quality sources like nuts, avocado, and fatty fish',
    icon: 'i-mdi-avocado',
    rules_json: JSON.stringify({
      name: 'Healthy Fats',
      description: 'High fat from quality sources (nuts, avocado, salmon)',
      weight: 7,
      conditions: { minFatG: 15, maxSaturatedFatG: 5 }
    } as CategoryRule),
    display_order: 3,
    is_active: 1
  },
  {
    slug: 'high-fiber',
    name: 'High Fiber',
    description: 'At least 5g of dietary fiber per 100g serving',
    icon: 'i-mdi-grain',
    rules_json: JSON.stringify({
      name: 'High Fiber',
      description: 'At least 5g fiber per 100g',
      weight: 6,
      conditions: { minFiberG: 5 }
    } as CategoryRule),
    display_order: 4,
    is_active: 1
  },
  {
    slug: 'low-calorie',
    name: 'Low Calorie',
    description: '100 calories or fewer per 100g serving',
    icon: 'i-mdi-leaf',
    rules_json: JSON.stringify({
      name: 'Low Calorie',
      description: '100 calories or fewer per 100g',
      weight: 5,
      conditions: { maxCalories: 100 }
    } as CategoryRule),
    display_order: 5,
    is_active: 1
  }
]

/**
 * Calculate match score for a food against a category rule.
 * Returns a score from 0-100, where higher is better match.
 *
 * The score is calculated based on how well the food's nutrition
 * values align with the category's conditions.
 */
export function calculateMatchScore(
  food: { protein_g: number; carbohydrates_total_g: number; fat_total_g: number; fat_saturated_g: number | null; fiber_g: number | null; sugar_g: number | null; calories: number },
  rule: CategoryRule
): number {
  const { conditions } = rule
  let matches = 0
  let totalConditions = 0

  // Helper to check optional numeric values
  const checkCondition = (conditionValue: number | undefined, foodValue: number | null, compare: (a: number, b: number) => boolean): boolean => {
    if (conditionValue === undefined) return false
    if (foodValue === null || foodValue === undefined) return false
    return compare(foodValue, conditionValue)
  }

  // Check each condition
  if (conditions.minProteinG !== undefined) {
    totalConditions++
    if (food.protein_g >= conditions.minProteinG) matches++
  }
  if (conditions.maxProteinG !== undefined) {
    totalConditions++
    if (food.protein_g <= conditions.maxProteinG) matches++
  }
  if (conditions.minProteinPerCalorie !== undefined) {
    totalConditions++
    const proteinPerCalorie = food.protein_g / food.calories
    if (proteinPerCalorie >= conditions.minProteinPerCalorie) matches++
  }
  if (conditions.maxCarbsG !== undefined) {
    totalConditions++
    if (food.carbohydrates_total_g <= conditions.maxCarbsG) matches++
  }
  if (conditions.minCarbsG !== undefined) {
    totalConditions++
    if (food.carbohydrates_total_g >= conditions.minCarbsG) matches++
  }
  if (conditions.minFatG !== undefined) {
    totalConditions++
    if (food.fat_total_g >= conditions.minFatG) matches++
  }
  if (conditions.maxFatG !== undefined) {
    totalConditions++
    if (food.fat_total_g <= conditions.maxFatG) matches++
  }
  if (checkCondition(conditions.maxSaturatedFatG, food.fat_saturated_g, (a, b) => a <= b)) {
    totalConditions++
    matches++
  }
  if (checkCondition(conditions.minFiberG, food.fiber_g, (a, b) => a >= b)) {
    totalConditions++
    matches++
  }
  if (checkCondition(conditions.maxSugarG, food.sugar_g, (a, b) => a <= b)) {
    totalConditions++
    matches++
  }
  if (conditions.maxCalories !== undefined) {
    totalConditions++
    if (food.calories <= conditions.maxCalories) matches++
  }
  if (conditions.minCalories !== undefined) {
    totalConditions++
    if (food.calories >= conditions.minCalories) matches++
  }

  if (totalConditions === 0) return 0

  // Base score: percentage of conditions met
  const baseScore = (matches / totalConditions) * 100

  // Apply weight modifier (categories with higher weight get higher scores)
  return Math.round(baseScore * (rule.weight / 10))
}
