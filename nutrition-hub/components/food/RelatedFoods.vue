// components/food/RelatedFoods.vue
// Placeholder component for Story 2.8 - shows related/similar foods
// This component will be fully implemented in Story 2.8

interface RelatedFoodsProps {
  currentFoodSlug: string
}

defineProps<RelatedFoodsProps>()
</script>

<template>
  <div class="related-foods p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
    <h2 class="text-xl font-semibold mb-4">Related Foods</h2>
    <p class="text-gray-500 dark:text-gray-400">
      RelatedFoods component placeholder - will be implemented in Story 2.8
    </p>
    <!-- Full implementation in Story 2.8 will display:
    - Similar foods based on category
    - Foods with similar nutritional profiles
    - Navigation to related food detail pages
    -->
  </div>
</template>
