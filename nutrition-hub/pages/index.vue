<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
    <div class="max-w-2xl w-full px-4 py-8">
      <h1 class="text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Welcome to Nutrition Hub
      </h1>

      <p class="text-center text-gray-600 dark:text-gray-400 mb-8">
        A modern nutrition tracking application built with Nuxt 4
      </p>

      <div class="flex justify-center gap-4 mb-8">
        <UButton color="primary" size="lg">
          Get Started
        </UButton>
        <UButton color="gray" size="lg" variant="outline">
          Learn More
        </UButton>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
          Features
        </h2>
        <ul class="space-y-2 text-gray-700 dark:text-gray-300">
          <li>✓ Nuxt 4 with TypeScript</li>
          <li>✓ Nuxt UI Components</li>
          <li>✓ SQLite Database</li>
          <li>✓ Server-Side Rendering</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Nuxt UI components are auto-imported
// UButton is available without explicit import
</script>
