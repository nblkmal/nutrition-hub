// server/api/foods/[foodId].ts
// GET/PUT/DELETE /api/foods/:foodId - Single food operations

import { getDb } from '../../utils/database'
import { transformFood } from '../../utils/transform'
import { logApiCall, logError } from '../../utils/logger'
import { createNotFoundError, createApiError, ErrorCode } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  const startTime = Date.now()

  try {
    const db = getDb()
    const foodId = getRouterParam(event, 'foodId')

    if (!foodId) {
      throw createApiError('foodId parameter is required', ErrorCode.INTERNAL_ERROR, 400)
    }

    // Query by ID or slug (parameterized to prevent SQL injection)
    const food = db.prepare(`
      SELECT * FROM foods WHERE id = ? OR slug = ?
    `).get(foodId, foodId) as Record<string, unknown> | undefined

    if (!food) {
      // Return 404 with proper error format using createNotFoundError utility
      return createNotFoundError('Food', foodId, { returnResponse: true, event })
    }

    // Transform snake_case to camelCase
    const transformedFood = transformFood(food)

    const duration = Date.now() - startTime
    logApiCall('/api/foods/:foodId', duration)

    return {
      data: transformedFood,
      success: true
    }
  } catch (error) {
    logError(error instanceof Error ? error : new Error(String(error)), {
      route: '/api/foods/:foodId'
    })

    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    throw createApiError('Internal server error', ErrorCode.INTERNAL_ERROR, 500)
  }
})
