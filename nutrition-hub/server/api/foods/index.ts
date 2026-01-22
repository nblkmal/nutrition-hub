// server/api/foods/index.ts
// GET /api/foods - List foods with optional search/filter

import { getDb } from '../../utils/database'
import { successResponse } from '../../utils/response'

export default defineEventHandler(async (event) => {
  try {
    const db = getDb()

    // TODO: Implement route logic in Epic 2
    // - Parse query params (search, category, limit, offset)
    // - Build dynamic SQL query
    // - Execute query and transform results

    return successResponse([], { total: 0, page: 1, limit: 20 })
  } catch (error) {
    console.error('Error in /api/foods:', error)
    throw createError({
      statusCode: 500,
      message: 'Internal server error',
      statusMessage: 'INTERNAL_ERROR',
    })
  }
})
