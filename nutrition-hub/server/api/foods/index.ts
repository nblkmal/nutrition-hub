// server/api/foods/index.ts
// GET /api/foods - List foods with optional search/filter and pagination

import { getDb } from '../../utils/database'
import { successResponse } from '../../utils/response'
import { transformFood } from '../../utils/transform'
import { logApiCall, logError } from '../../utils/logger'
import { createApiError, ErrorCode } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  const startTime = Date.now()

  try {
    const db = getDb()
    const query = getQuery(event)

    // Parse and validate pagination parameters
    const searchQuery = query.q as string | undefined
    const rawPage = query.page as string | undefined
    const rawPageSize = query.pageSize || query.limit as string | undefined

    const parsedPage = parseInt(rawPage || '')
    const page = isNaN(parsedPage) || parsedPage < 1 ? 1 : Math.max(1, parsedPage)

    const parsedPageSize = parseInt(rawPageSize || '')
    const pageSize = isNaN(parsedPageSize) || parsedPageSize < 1 ? 20 : Math.min(Math.max(1, parsedPageSize), 100)
    const offset = (page - 1) * pageSize

    // Get total count of matching records
    let totalRecords: number
    if (searchQuery) {
      const searchPattern = (searchQuery + '%').toLowerCase()
      const countResult = db.prepare(`
        SELECT COUNT(*) as count FROM foods
        WHERE LOWER(name) LIKE ?
      `).get(searchPattern) as { count: number }
      totalRecords = countResult.count
    } else {
      const countResult = db.prepare('SELECT COUNT(*) as count FROM foods').get() as { count: number }
      totalRecords = countResult.count
    }

    // Calculate pagination metadata
    const totalPages = Math.ceil(totalRecords / pageSize)
    const hasNextPage = page < totalPages
    const hasPrevPage = page > 1

    // Fetch paginated results
    let foods
    if (searchQuery) {
      const searchPattern = (searchQuery + '%').toLowerCase()
      foods = db.prepare(`
        SELECT * FROM foods
        WHERE LOWER(name) LIKE ?
        ORDER BY
          CASE WHEN LOWER(name) = LOWER(?) THEN 0 ELSE 1 END,
          name ASC
        LIMIT ? OFFSET ?
      `).all(searchPattern, searchQuery, pageSize, offset)
    } else {
      foods = db.prepare('SELECT * FROM foods LIMIT ? OFFSET ?').all(pageSize, offset)
    }

    // Transform snake_case to camelCase
    const transformedFoods = foods.map(transformFood)

    const duration = Date.now() - startTime
    logApiCall('/api/foods', duration)

    return successResponse(transformedFoods, {
      total: totalRecords,
      limit: pageSize,
      page,
      pageSize,
      totalPages,
      hasNextPage,
      hasPrevPage
    })
  } catch (error) {
    logError(error instanceof Error ? error : new Error(String(error)), { route: '/api/foods' })
    throw createApiError('Internal server error', ErrorCode.INTERNAL_ERROR, 500)
  }
})
