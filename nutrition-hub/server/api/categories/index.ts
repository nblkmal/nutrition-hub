// server/api/categories/index.ts
// GET /api/categories - List all categories

import { getDb } from '../../utils/database'
import { successResponse } from '../../utils/response'

export default defineEventHandler(async (event) => {
  try {
    const db = getDb()

    // TODO: Implement route logic in Epic 3
    // - Fetch all active categories from database
    // - Order by display_order
    // - Transform and return results

    return successResponse([])
  } catch (error) {
    console.error('Error in /api/categories:', error)
    throw createError({
      statusCode: 500,
      message: 'Internal server error',
      statusMessage: 'INTERNAL_ERROR',
    })
  }
})
