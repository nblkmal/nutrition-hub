// components/food/NutritionLabel.vue
// Placeholder component for Story 2.8 - displays nutrition information
// This component will be fully implemented in Story 2.8

import type { Food } from '~/types'

interface NutritionLabelProps {
  food: Food
}

defineProps<NutritionLabelProps>()


<template>
  <div class="nutrition-label p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
    <p class="text-gray-500 dark:text-gray-400">
      NutritionLabel component placeholder - will be implemented in Story 2.8
    </p>
    <!-- Full implementation in Story 2.8 will display:
    - Calories
    - Protein, Carbs, Fat (total + saturated)
    - Fiber, Sugar, Sodium, Potassium, Cholesterol
    - Serving size
    -->
  </div>
</template>
