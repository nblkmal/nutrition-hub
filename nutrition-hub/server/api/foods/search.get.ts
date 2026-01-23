// server/api/foods/search.get.ts
// GET /api/foods/search - Search for foods with CalorieNinjas API caching

import { getFoodWithCache } from '../../utils/food-cache'
import { validateSearchQuery } from '../../utils/validation'
import { logApiCall, logError } from '../../utils/logger'
import { createApiError, ErrorCode } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  const startTime = Date.now()

  try {
    const query = getQuery(event)
    const searchQuery = query.q as string | undefined

    // Validate search query
    const validation = validateSearchQuery(searchQuery || '')

    if (!validation.isValid) {
      return {
        data: null,
        success: false,
        error: {
          message: validation.errors.join('; '),
          code: 'VALIDATION_ERROR',
          statusCode: 400,
        },
      }
    }

    // Get food with caching (Phase 1: SQLite, Phase 2: API, Phase 3: Cache)
    const food = await getFoodWithCache(validation.normalizedQuery)

    const duration = Date.now() - startTime
    logApiCall('/api/foods/search', duration)

    // Handle quota exceeded - return null with user-friendly message
    if (food === null) {
      return {
        data: null,
        success: false,
        error: {
          message: 'Search temporarily unavailable. Please try again later.',
          code: 'API_QUOTA_EXCEEDED',
          statusCode: 503,
        },
      }
    }

    return {
      data: food,
      success: true,
    }
  } catch (error) {
    const duration = Date.now() - startTime
    logApiCall('/api/foods/search', duration)

    // Re-throw if already a Nuxt error
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    logError(error instanceof Error ? error : new Error(String(error)), {
      route: '/api/foods/search',
      query: searchQuery,
    })

    throw createApiError('Internal server error', ErrorCode.INTERNAL_ERROR, 500)
  }
})
