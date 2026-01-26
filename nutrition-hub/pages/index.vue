<script setup lang="ts">
useHead({
  title: 'Nutrition Hub - Instant Food Nutrition Search',
  meta: [
    {
      name: 'description',
      content: 'Search any food and get instant nutrition facts. High protein, low carb, healthy fats - discover what foods work for your goals.'
    },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    // Open Graph
    { property: 'og:title', content: 'Nutrition Hub - Instant Food Nutrition Search' },
    { property: 'og:description', content: 'Search any food and get instant nutrition facts. High protein, low carb, healthy fats - discover what foods work for your goals.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: 'https://nutrition-hub.example.com' },
    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Nutrition Hub - Instant Food Nutrition Search' },
    { name: 'twitter:description', content: 'Search any food and get instant nutrition facts. High protein, low carb, healthy fats - discover what foods work for your goals.' }
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'Nutrition Hub',
        url: 'https://nutrition-hub.example.com'
      })
    },
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Nutrition Hub',
        url: 'https://nutrition-hub.example.com',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://nutrition-hub.example.com/foods/{search_term_string}'
          },
          'query-input': 'required name=search_term_string'
        }
      })
    }
  ]
})
</script>

<template>
  <div class="homepage-container">
    <section class="hero-section" aria-label="Hero">
      <h1 class="hero-title">
        Know Your Food.
        <span class="highlight">Instantly.</span>
      </h1>

      <p class="hero-subtitle">
        Search thousands of foods and get comprehensive nutrition information in milliseconds.
      </p>

      <div class="search-container">
        <SearchBar />
      </div>

      <div class="example-searches">
        <span class="try-label">Try:</span>
        <NuxtLink to="/foods/chicken-breast" class="example-link">Chicken Breast</NuxtLink>
        <NuxtLink to="/foods/avocado" class="example-link">Avocado</NuxtLink>
        <NuxtLink to="/foods/salmon" class="example-link">Salmon</NuxtLink>
      </div>
    </section>

    <section class="features-section" aria-label="Features">
      <div class="feature-card">
        <UIcon name="i-heroicons-bolt" class="feature-icon" aria-hidden="true" />
        <h3>Instant Results</h3>
        <p>Search thousands of foods in under 200ms</p>
      </div>

      <div class="feature-card">
        <UIcon name="i-heroicons-chart-bar" class="feature-icon" aria-hidden="true" />
        <h3>Visual Nutrition</h3>
        <p>See macros at a glance with progress indicators</p>
      </div>

      <div class="feature-card">
        <UIcon name="i-heroicons-tag" class="feature-icon" aria-hidden="true" />
        <h3>Smart Categories</h3>
        <p>Discover foods by nutrition goals (high protein, low carb)</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.homepage-container {
  min-height: 100vh;
}

.hero-section {
  text-align: center;
  padding: 4rem 1rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.highlight {
  color: #059669;
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

.search-container {
  max-width: 600px;
  margin: 0 auto 2rem;
}

.example-searches {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  font-size: 0.875rem;
  color: #6b7280;
}

.try-label {
  padding: 0.5rem;
}

.example-link {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
  min-height: 44px;
  min-width: 44px;
  text-decoration: none;
  color: #059669;
  font-weight: 500;
}

.example-link:hover {
  background-color: #f3f4f6;
}

.example-link:focus {
  outline: 2px solid #059669;
  outline-offset: 2px;
}

.features-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  text-align: center;
  padding: 2rem;
}

.feature-icon {
  font-size: 3rem;
  color: #059669;
  margin-bottom: 1rem;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

p {
  color: #6b7280;
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 2rem;
  }

  .hero-subtitle {
    font-size: 1rem;
  }

  .features-section {
    padding: 2rem 1rem;
  }
}
</style>
