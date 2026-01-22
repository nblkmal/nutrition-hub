// server/api/categories/[categoryId].ts
// GET/PUT/DELETE /api/categories/:categoryId - Single category operations

import { getDb } from '../../utils/database'

export default defineEventHandler(async (event) => {
  try {
    const db = getDb()
    const categoryId = getRouterParam(event, 'categoryId')

    if (!categoryId) {
      throw createError({
        statusCode: 400,
        message: 'categoryId parameter is required',
        statusMessage: 'VALIDATION_ERROR',
      })
    }

    // TODO: Implement route logic in Epic 3 (Story 3.3)
    // - Check if categoryId is numeric (ID lookup) or string (slug lookup)
    // - For GET: Fetch category by ID or slug, return 404 if not found
    // - For PUT: Update category (admin only)
    // - For DELETE: Delete category (admin only)

    throw createError({
      statusCode: 404,
      message: 'Category not found',
      statusMessage: 'CATEGORY_NOT_FOUND',
    })
  } catch (error) {
    console.error('Error in /api/categories/:categoryId:', error)

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
