// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: true,
  modules: ['@nuxt/ui', '@nuxt/icon'],

  // Vercel deployment configuration using Nitro native preset
  nitro: {
    preset: 'vercel',
  },

  // Runtime configuration for environment variables
  runtimeConfig: {
    // Public (exposed to client)
    public: {
      apiBase: process.env.API_BASE || '/api',
    },
    // Private (server-only)
    calorieNinjasApiKey: process.env.CALORIENINJAS_API_KEY,
    vercelBlobUrl: process.env.VERCEL_BLOB_URL,
  },
})
