// server/utils/errors.ts
// Error code constants and helper functions

export const ErrorCodes = {
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  FOOD_NOT_FOUND: 'FOOD_NOT_FOUND',
  CATEGORY_NOT_FOUND: 'CATEGORY_NOT_FOUND',
} as const

export function createNotFoundError(message = 'Resource not found') {
  return {
    message,
    code: ErrorCodes.NOT_FOUND,
    statusCode: 404,
  }
}

export function createFoodNotFoundError() {
  return {
    message: 'Food not found',
    code: ErrorCodes.FOOD_NOT_FOUND,
    statusCode: 404,
  }
}

export function createCategoryNotFoundError() {
  return {
    message: 'Category not found',
    code: ErrorCodes.CATEGORY_NOT_FOUND,
    statusCode: 404,
  }
}
