// server/api/foods/[foodId].ts
// GET/PUT/DELETE /api/foods/:foodId - Single food operations

import { getDb } from '../../utils/database'

export default defineEventHandler(async (event) => {
  try {
    const db = getDb()
    const foodId = getRouterParam(event, 'foodId')

    if (!foodId) {
      throw createError({
        statusCode: 400,
        message: 'foodId parameter is required',
        statusMessage: 'VALIDATION_ERROR',
      })
    }

    // TODO: Implement route logic in Epic 2
    // - Check if foodId is numeric (ID lookup) or string (slug lookup)
    // - For GET: Fetch food by ID or slug, return 404 if not found
    // - For PUT: Update food (admin only)
    // - For DELETE: Delete food (admin only)

    throw createError({
      statusCode: 404,
      message: 'Food not found',
      statusMessage: 'FOOD_NOT_FOUND',
    })
  } catch (error) {
    console.error('Error in /api/foods/:foodId:', error)

    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    throw createError({
      statusCode: 500,
      message: 'Internal server error',
      statusMessage: 'INTERNAL_ERROR',
    })
  }
})
