// pages/foods/[foodSlug].vue
// SSR Food Detail Page with SEO optimization
// Story 2.5: Food Detail Page (SSR with SEO)

import type { Food, ApiResponse } from '~/types'

const route = useRoute()
const foodSlug = route.params.foodSlug as string

// SSR-compatible data fetching with useAsyncData
// NOTE: useAsyncData returns { data, pending, error, refresh, status } - use pending.value for loading
const { data, pending, error, refresh } = await useAsyncData(
  `food-${foodSlug}`,
  async () => {
    try {
      const response = await $fetch<ApiResponse<Food>>(`/api/foods/${foodSlug}`)
      return response.data
    } catch (err: any) {
      // API throws error with statusCode for 404 (see server/api/foods/[foodId].ts)
      if (err.statusCode === 404) {
        throw createError({ statusCode: 404, message: 'Food not found' })
      }
      throw err
    }
  }
)

// SEO metadata with useHead - optimized with computed values to reduce verbosity
const metaTitle = computed(() => data.value ? `${data.value.name} Nutrition Facts - Nutrition Hub` : 'Food Not Found')
const metaDesc = computed(() => data.value
  ? `${data.value.name}: ${data.value.proteinG}g protein, ${data.value.calories} calories, ${data.value.carbohydratesTotalG}g carbs per 100g`
  : 'Food not found')
const ogTitle = computed(() => data.value ? `${data.value.name}: ${data.value.proteinG}g Protein per 100g` : 'Food Not Found')
const ogDesc = computed(() => data.value
  ? `${data.value.calories} calories, ${data.value.carbohydratesTotalG}g carbs, ${data.value.fatTotalG}g fat`
  : 'Food not found')
const canonicalUrl = computed(() => {
  const url = useRequestURL()
  return `${url.origin}/foods/${foodSlug}`
})

// Schema.org structured data for rich search results
const schemaOrgData = computed(() => data.value ? {
  '@context': 'https://schema.org',
  '@type': 'FoodNutrient',
  name: data.value.name,
  description: `${data.value.calories} calories, ${data.value.proteinG}g protein, ${data.value.carbohydratesTotalG}g carbs, ${data.value.fatTotalG}g fat per 100g serving`,
  calories: {
    '@type': 'Energy',
    value: data.value.calories,
    unitCode: 'cal'
  },
  proteinContent: `${data.value.proteinG}g`,
  carbohydrateContent: `${data.value.carbohydratesTotalG}g`,
  fatContent: `${data.value.fatTotalG}g`
} : null)

useHead({
  title: metaTitle,
  meta: [
    { name: 'description', content: metaDesc },
    { property: 'og:title', content: ogTitle },
    { property: 'og:description', content: ogDesc },
    { property: 'og:type', content: 'website' },
    { property: 'og:image', content: '/images/nutrition-label-default.png' },
    { property: 'og:url', content: canonicalUrl },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: ogTitle },
    { name: 'twitter:description', content: ogDesc }
  ],
  link: [{ rel: 'canonical', href: canonicalUrl }],
  script: computed(() => schemaOrgData.value ? [{
    type: 'application/ld+json',
    children: JSON.stringify(schemaOrgData.value)
  }] : [])
})
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Loading State - use pending.value from useAsyncData -->
    <div v-if="pending" class="space-y-4">
      <USkeleton class="h-8 w-3/4" />
      <USkeleton class="h-64 w-full" />
      <USkeleton class="h-4 w-full" />
      <USkeleton class="h-4 w-2/3" />
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <UAlert icon="i-heroicons-exclamation-triangle" color="red" title="Food not found" />
      <UButton to="/" icon="i-heroicons-arrow-left" label="Back to Search" variant="ghost" aria-label="Back to search page" class="mt-4" />
    </div>

    <!-- Success State -->
    <article v-else-if="data" class="food-detail-page">
      <header class="mb-8">
        <UButton to="/" icon="i-heroicons-arrow-left" label="Back to Search" variant="ghost" aria-label="Back to search page" />
        <h1 class="text-4xl font-bold mt-4">{{ data.name }}</h1>
      </header>

      <LazyNutritionLabel :food="data" />

      <section class="mt-8">
        <LazyRelatedFoods :currentFoodSlug="data.slug" />
      </section>
    </article>
  </div>
</template>
