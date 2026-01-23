// server/utils/food-cache.ts
// Food caching strategy with CalorieNinjas API fallback

import { getDb } from './database'
import { slugify } from './slugify'
import { fetchFromCalorieNinjas, type CalorieNinjasItem } from './calorieninjas'
import { logApiCall, logSearchMetric, shouldAllowApiCall } from './quota'
import { transformFood, type FoodDbRow } from './transform'
import { log, logError } from './logger'
import { createApiError, ErrorCode } from './errors'
import type { Food } from '~/types/api'

/**
 * Fetch food with three-phase caching strategy:
 * Phase 1: Check SQLite cache (slug lookup)
 * Phase 2: Fetch from CalorieNinjas API if not cached
 * Phase 3: Cache API result in SQLite
 *
 * @param query - Food name to search for
 * @returns Food object or null if quota exceeded
 * @throws ErrorCode.EXTERNAL_API_ERROR on 5xx errors (after retries)
 * @throws ErrorCode.API_REQUEST_FAILED on other API errors
 */
export async function getFoodWithCache(query: string): Promise<Food | null> {
  const db = getDb()
  const slug = slugify(query)

  // Phase 1: Check SQLite cache first
  const startTime = Date.now()
  const cachedFood = db.get<FoodDbRow>(
    'SELECT * FROM foods WHERE slug = ?',
    [slug]
  )

  if (cachedFood) {
    const responseTime = Date.now() - startTime
    logSearchMetric(query, slug, true, responseTime)
    return transformFood(cachedFood)
  }

  // Phase 2: Check if API calls are allowed (quota check)
  if (!shouldAllowApiCall()) {
    logError(new Error('API quota exceeded, cache miss not served'), {
      operation: 'getFoodWithCache',
      query,
      slug,
    })
    return null
  }

  // Phase 2: Fetch from CalorieNinjas API with retry
  try {
    const apiResponse = await fetchFromCalorieNinjasWithRetry(query)

    if (!apiResponse.items || apiResponse.items.length === 0) {
      // No food found from API
      return null
    }

    const item = apiResponse.items[0]

    // Phase 3: Cache immediately in SQLite
    const foodData = insertFoodFromApi(item, slug)

    const responseTime = Date.now() - startTime
    logApiCall()
    logSearchMetric(query, slug, false, responseTime)

    return foodData
  } catch (error) {
    // Handle quota exceeded gracefully
    if (error && typeof error === 'object' && 'statusCode' in error) {
      const statusCode = (error as any).statusCode
      if (statusCode === 429) {
        const responseTime = Date.now() - startTime
        logSearchMetric(query, slug, false, responseTime)
        return null // Graceful degradation
      }
    }

    // Log and re-throw other errors
    logError(error instanceof Error ? error : new Error(String(error)), {
      operation: 'getFoodWithCache',
      query,
      slug,
    })
    throw error
  }
}

/**
 * Fetch from CalorieNinjas with retry logic
 * 3 retries with exponential backoff: 1s, 2s, 4s delays
 * Only retries on 5xx server errors
 *
 * @param query - Food name to search for
 * @returns CalorieNinjasResponse
 * @throws ErrorCode.EXTERNAL_API_ERROR if all retries fail
 * @throws ErrorCode.API_REQUEST_FAILED on non-retryable errors
 */
export async function fetchFromCalorieNinjasWithRetry(
  query: string,
  maxRetries = 3
): Promise<{ items: CalorieNinjasItem[] }> {
  const delays = [1000, 2000, 4000] // 1s, 2s, 4s

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fetchFromCalorieNinjas(query)
    } catch (error) {
      // Check if it's a 5xx error (retryable)
      const statusCode = (error as any).statusCode
      const isRetryable = statusCode >= 500

      if (isRetryable && attempt < maxRetries - 1) {
        log('info', 'RETRY_ATTEMPT', {
          attempt: attempt + 1,
          maxRetries,
          query,
          delayMs: delays[attempt],
        })
        await delay(delays[attempt])
        continue
      }

      // Either not retryable or max retries exceeded
      if (isRetryable) {
        logError(new Error(`CalorieNinjas API failed after ${maxRetries} attempts`), {
          operation: 'fetchFromCalorieNinjasWithRetry',
          query,
          attempts: maxRetries,
          lastStatusCode: statusCode,
        })
        throw createApiError('External API server error', ErrorCode.EXTERNAL_API_ERROR, statusCode)
      }

      // Non-retryable error (4xx, quota exceeded, etc.)
      throw error
    }
  }

  // Should never reach here
  throw createApiError('API request failed', ErrorCode.API_REQUEST_FAILED, 500)
}

/**
 * Insert food from CalorieNinjas API response into database
 * Uses INSERT OR IGNORE to handle race conditions
 *
 * @param item - CalorieNinjas API response item
 * @param slug - Pre-computed slug for the food
 * @returns Transformed Food object
 */
function insertFoodFromApi(item: CalorieNinjasItem, slug: string): Food {
  const db = getDb()

  db.run(
    `INSERT OR IGNORE INTO foods (
      name, slug, serving_size_g, calories, protein_g,
      carbohydrates_total_g, fat_total_g, fat_saturated_g,
      fiber_g, sugar_g, sodium_mg, potassium_mg, cholesterol_mg,
      data_source, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'calorieninjas',
      CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
    [
      item.name,
      slug,
      item.serving_size_g,
      item.calories,
      item.protein_g,
      item.carbohydrates_total_g,
      item.fat_total_g,
      item.fat_saturated_g || 0,
      item.fiber_g || 0,
      item.sugar_g || 0,
      item.sodium_mg || 0,
      item.potassium_mg || 0,
      item.cholesterol_mg || 0,
    ]
  )

  // Fetch the cached entry (may have been inserted by another request)
  const cachedFood = db.get<FoodDbRow>(
    'SELECT * FROM foods WHERE slug = ?',
    [slug]
  )

  if (!cachedFood) {
    throw new Error('Failed to insert food into database')
  }

  return transformFood(cachedFood)
}

/**
 * Simple delay helper for retry logic
 */
function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
