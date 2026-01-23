// server/api/categories/index.ts
// GET /api/categories - List all categories

import { getDb } from '../../utils/database'
import { successResponse } from '../../utils/response'
import { logError } from '../../utils/logger'
import { createApiError, ErrorCode } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const db = getDb()

    // TODO: Implement route logic in Epic 3
    // - Fetch all active categories from database
    // - Order by display_order
    // - Transform and return results

    return successResponse([])
  } catch (error) {
    logError(error instanceof Error ? error : new Error(String(error)), { route: '/api/categories' })
    throw createApiError('Internal server error', ErrorCode.INTERNAL_ERROR, 500)
  }
})
