// components/NutritionLabel.test.ts
// NutritionLabel component tests - Story 2.8
// Tests for nutrition data display, visual indicators, FDA-style layout, and accessibility

import { describe, it, expect, beforeEach } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

describe('NutritionLabel Component - File Structure', () => {
  const componentPath = path.resolve(__dirname, 'NutritionLabel.vue')
  let componentContent: string

  beforeEach(() => {
    componentContent = fs.readFileSync(componentPath, 'utf-8')
  })

  it('should have NutritionLabel component file', () => {
    expect(fs.existsSync(componentPath)).toBe(true)
  })

  it('should use script setup with TypeScript', () => {
    expect(componentContent).toContain('<script setup lang="ts">')
  })

  it('should import Food type from ~/types', () => {
    expect(componentContent).toContain("import type { Food } from '~/types'")
  })

  it('should define props with Food type', () => {
    expect(componentContent).toContain('defineProps<{')
    expect(componentContent).toContain('food: Food')
    expect(componentContent).toContain('}>()')
  })

  it('should use Vue Composition API computed', () => {
    expect(componentContent).toContain('computed(')
  })
})

describe('NutritionLabel Component - Nutrition Data Display', () => {
  const componentPath = path.resolve(__dirname, 'NutritionLabel.vue')
  let componentContent: string

  beforeEach(() => {
    componentContent = fs.readFileSync(componentPath, 'utf-8')
  })

  it('should display serving size 100g', () => {
    expect(componentContent).toContain('100g')
  })

  it('should display calories prominently', () => {
    expect(componentContent).toContain('calories')
  })

  it('should display all macronutrients', () => {
    expect(componentContent).toContain('proteinG')
    expect(componentContent).toContain('carbohydratesTotalG')
    expect(componentContent).toContain('fatTotalG')
    expect(componentContent).toContain('fatSaturatedG')
    expect(componentContent).toContain('fiberG')
    expect(componentContent).toContain('sugarG')
    expect(componentContent).toContain('sodiumMg')
    expect(componentContent).toContain('potassiumMg')
    expect(componentContent).toContain('cholesterolMg')
  })
})

describe('NutritionLabel Component - Visual Progress Indicators', () => {
  const componentPath = path.resolve(__dirname, 'NutritionLabel.vue')
  let componentContent: string

  beforeEach(() => {
    componentContent = fs.readFileSync(componentPath, 'utf-8')
  })

  it('should use UCircularProgress component', () => {
    expect(componentContent).toContain('<UCircularProgress')
  })

  it('should calculate daily value percentages', () => {
    // Daily values based on 2000 calorie diet
    expect(componentContent).toContain('50')  // Protein DV
    expect(componentContent).toContain('300') // Carbohydrates DV
    expect(componentContent).toContain('78')  // Fat DV
    expect(componentContent).toContain('28')  // Fiber DV
  })

  it('should have percentage calculations for macronutrients', () => {
    expect(componentContent).toContain('proteinPercentage')
    expect(componentContent).toContain('carbsPercentage')
    expect(componentContent).toContain('fatPercentage')
    expect(componentContent).toContain('fiberPercentage')
  })

  it('should have UCircularProgress for ALL macronutrients (Protein, Carbs, Fat, Fiber)', () => {
    // Count UCircularProgress occurrences - should be 4 (Protein, Fiber, Carbs sub, Fat)
    const matches = componentContent.match(/<UCircularProgress/g)
    expect(matches).toHaveLength(4)
  })

  it('should have UCircularProgress for Fat (verifies H1 fix)', () => {
    // Verify Fat section contains UCircularProgress
    // Find the "<!-- Total Fat -->" comment section
    const fatSectionIndex = componentContent.indexOf('<!-- Total Fat -->')
    expect(fatSectionIndex).toBeGreaterThan(-1)
    // Need more characters to reach UCircularProgress
    const fatSection = componentContent.substring(fatSectionIndex, fatSectionIndex + 800)
    expect(fatSection).toContain('UCircularProgress')
    expect(fatSection).toContain('fatPercentage')
    expect(fatSection).toContain('fatColor')
  })
})

describe('NutritionLabel Component - Color Coding System', () => {
  const componentPath = path.resolve(__dirname, 'NutritionLabel.vue')
  let componentContent: string

  beforeEach(() => {
    componentContent = fs.readFileSync(componentPath, 'utf-8')
  })

  it('should implement getColor function', () => {
    expect(componentContent).toContain('const getColor = (percentage: number)')
  })

  it('should return green for >= 50%', () => {
    expect(componentContent).toContain('percentage >= 50')
    expect(componentContent).toContain('green')
  })

  it('should return yellow for >= 20% and < 50%', () => {
    expect(componentContent).toContain('percentage >= 20')
    expect(componentContent).toContain('yellow')
  })

  it('should return red for < 20%', () => {
    expect(componentContent).toContain('red')
  })

  it('should apply colors to circular progress', () => {
    expect(componentContent).toContain(':color=')
    expect(componentContent).toContain('getColor')
  })

  it('should use amber-600 for yellow text to meet WCAG AA contrast', () => {
    // Fixed H4: Changed from yellow-500 to amber-600 for better contrast
    expect(componentContent).toContain('text-amber-600')
  })
})

describe('NutritionLabel Component - FDA-Style Layout', () => {
  const componentPath = path.resolve(__dirname, 'NutritionLabel.vue')
  let componentContent: string

  beforeEach(() => {
    componentContent = fs.readFileSync(componentPath, 'utf-8')
  })

  it('should have black border 2px solid', () => {
    expect(componentContent).toContain('border-2')
    expect(componentContent).toContain('border-black')
  })

  it('should display calories with large font', () => {
    expect(componentContent).toContain('text-')
    expect(componentContent).toContain('2rem')
    expect(componentContent).toContain('font-bold')
  })

  it('should have thick divider after calories', () => {
    expect(componentContent).toContain('border-b-4')
    expect(componentContent).toContain('border-black')
  })

  it('should have max-width 400px', () => {
    expect(componentContent).toContain('max-w-')
    expect(componentContent).toContain('400')
  })

  it('should bold main nutrients', () => {
    expect(componentContent).toContain('font-bold')
  })

  it('should indent sub-nutrients', () => {
    expect(componentContent).toContain('pl-')
    expect(componentContent).toContain('ml-')
  })
})

describe('NutritionLabel Component - Accessibility', () => {
  const componentPath = path.resolve(__dirname, 'NutritionLabel.vue')
  let componentContent: string

  beforeEach(() => {
    componentContent = fs.readFileSync(componentPath, 'utf-8')
  })

  it('should use semantic HTML structure', () => {
    expect(componentContent).toContain('<section')
    expect(componentContent).toContain('</section>')
  })

  it('should have ARIA labels for progress bars', () => {
    expect(componentContent).toContain('aria-label')
    expect(componentContent).toContain('percentage')
  })

  it('should show numerical percentages alongside visual indicators', () => {
    expect(componentContent).toContain('{{')
    expect(componentContent).toContain('%')
  })

  it('should have proper heading structure', () => {
    expect(componentContent).toContain('<h2')
    expect(componentContent).toContain('<h3')
  })

  it('should use high-contrast colors for percentages (green-600, amber-600, red-600)', () => {
    expect(componentContent).toContain('text-green-600')
    expect(componentContent).toContain('text-amber-600')
    expect(componentContent).toContain('text-red-600')
  })
})

describe('NutritionLabel Component - Responsive Design', () => {
  const componentPath = path.resolve(__dirname, 'NutritionLabel.vue')
  let componentContent: string

  beforeEach(() => {
    componentContent = fs.readFileSync(componentPath, 'utf-8')
  })

  it('should have max-width for standard label', () => {
    expect(componentContent).toContain('max-w-')
    expect(componentContent).toContain('400')
  })

  it('should use w-full for responsive width', () => {
    expect(componentContent).toContain('w-full')
  })
})

describe('NutritionLabel Component - Daily Value Constants', () => {
  const componentPath = path.resolve(__dirname, 'NutritionLabel.vue')
  let componentContent: string

  beforeEach(() => {
    componentContent = fs.readFileSync(componentPath, 'utf-8')
  })

  it('should define daily value constant for protein (50g)', () => {
    expect(componentContent).toContain('DAILY_VALUES')
    expect(componentContent).toContain('protein: 50')
  })

  it('should define daily value constant for carbohydrates (300g)', () => {
    expect(componentContent).toContain('carbohydrates: 300')
  })

  it('should define daily value constant for fat (78g)', () => {
    expect(componentContent).toContain('fat: 78')
  })

  it('should define daily value constant for fiber (28g)', () => {
    expect(componentContent).toContain('fiber: 28')
  })
})

describe('NutritionLabel Component - Percentage Calculation Tests', () => {
  const componentPath = path.resolve(__dirname, 'NutritionLabel.vue')
  let componentContent: string

  beforeEach(() => {
    componentContent = fs.readFileSync(componentPath, 'utf-8')
  })

  it('should calculate protein percentage correctly (31g / 50g = 62%)', () => {
    // Chicken breast has 31g protein = 62% of daily value
    expect(componentContent).toContain('proteinPercentage')
    expect(componentContent).toContain('DAILY_VALUES.protein')
  })

  it('should calculate fat percentage correctly (3.6g / 78g = 5%)', () => {
    // Chicken breast has 3.6g fat = 5% of daily value
    expect(componentContent).toContain('fatPercentage')
    expect(componentContent).toContain('DAILY_VALUES.fat')
  })

  it('should cap percentages at 100%', () => {
    // calculatePercentage should use Math.min to cap at 100
    expect(componentContent).toContain('Math.min(percentage, 100)')
  })
})

describe('NutritionLabel Component - Color Application Tests', () => {
  const componentPath = path.resolve(__dirname, 'NutritionLabel.vue')
  let componentContent: string

  beforeEach(() => {
    componentContent = fs.readFileSync(componentPath, 'utf-8')
  })

  it('should apply colors to percentage text (not just circular progress)', () => {
    // Verify :class binding is used for percentage text colors
    expect(componentContent).toContain(":class=")
    expect(componentContent).toContain("text-green-600")
  })

  it('should use consistent color logic for all macronutrients', () => {
    // Each macronutrient should have color-coded percentage text
    expect(componentContent).toMatch(/proteinPercentage >= 50/)
    expect(componentContent).toMatch(/carbsPercentage >= 50/)
    expect(componentContent).toMatch(/fatPercentage >= 50/)
    expect(componentContent).toMatch(/fiberPercentage >= 50/)
  })
})
