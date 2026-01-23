// server/utils/calorieninjas.ts
// CalorieNinjas API client for nutrition data fetching

import { logError } from './logger'
import { createApiError, ErrorCode } from './errors'

/**
 * Response structure from CalorieNinjas Nutrition Analysis API
 * API Endpoint: https://api.calorieninjas.com/v1/nutrition?query={food_name}
 */
export interface CalorieNinjasItem {
  name: string
  calories: number
  serving_size_g: number
  fat_total_g: number
  fat_saturated_g: number
  protein_g: number
  sodium_mg: number
  potassium_mg: number
  carbohydrates_total_g: number
  fiber_g: number
  sugar_g: number
  cholesterol_mg?: number
}

export interface CalorieNinjasResponse {
  items: CalorieNinjasItem[]
}

/**
 * Fetch nutrition data from CalorieNinjas API
 * @param query - Food name to search for
 * @returns CalorieNinjasResponse with nutrition data
 * @throws ErrorCode.API_QUOTA_EXCEEDED on 429 status
 * @throws ErrorCode.EXTERNAL_API_ERROR on 5xx errors
 * @throws ErrorCode.API_REQUEST_FAILED on other errors
 */
export async function fetchFromCalorieNinjas(query: string): Promise<CalorieNinjasResponse> {
  const config = useRuntimeConfig()
  const apiKey = config.calorieNinjasApiKey

  if (!apiKey) {
    logError(new Error('CalorieNinjas API key not configured'), {
      operation: 'fetchFromCalorieNinjas',
      query,
    })
    throw createApiError('API configuration error', ErrorCode.INTERNAL_ERROR, 500)
  }

  const url = `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
        'Content-Type': 'application/json',
      },
    })

    // Handle quota exceeded (429)
    if (response.status === 429) {
      throw createApiError('API quota exceeded', ErrorCode.API_QUOTA_EXCEEDED, 429)
    }

    // Handle 5xx server errors
    if (response.status >= 500) {
      logError(new Error(`CalorieNinjas API server error: ${response.status}`), {
        operation: 'fetchFromCalorieNinjas',
        query,
        statusCode: response.status,
      })
      throw createApiError('External API server error', ErrorCode.EXTERNAL_API_ERROR, response.status)
    }

    // Handle 4xx client errors (except 429 which is handled above)
    if (response.status >= 400 && response.status !== 429) {
      logError(new Error(`CalorieNinjas API client error: ${response.status}`), {
        operation: 'fetchFromCalorieNinjas',
        query,
        statusCode: response.status,
      })
      throw createApiError('API request failed', ErrorCode.API_REQUEST_FAILED, response.status)
    }

    // Parse successful response
    const data: CalorieNinjasResponse = await response.json()

    // Validate response structure
    if (!data.items || !Array.isArray(data.items)) {
      logError(new Error('Invalid CalorieNinjas API response structure'), {
        operation: 'fetchFromCalorieNinjas',
        query,
        response: data,
      })
      throw createApiError('Invalid API response', ErrorCode.API_REQUEST_FAILED, 500)
    }

    return data
  } catch (error) {
    // Re-throw if already a Nuxt error
    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    // Handle network errors and other exceptions
    logError(error instanceof Error ? error : new Error(String(error)), {
      operation: 'fetchFromCalorieNinjas',
      query,
    })

    throw createApiError('API request failed', ErrorCode.API_REQUEST_FAILED, 500)
  }
}
