// server/utils/errors.ts
// Error code constants and helper functions for consistent error handling

/**
 * Standard error codes used across the application
 * These codes are used for client-side error handling and debugging
 */
export enum ErrorCode {
  FOOD_NOT_FOUND = 'FOOD_NOT_FOUND',
  CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND',
  API_QUOTA_EXCEEDED = 'API_QUOTA_EXCEEDED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

/**
 * Creates a standardized 404 error for resource not found scenarios
 * @param resource - Resource type name (e.g., 'Food', 'Category')
 * @param id - Resource ID that was not found
 * @throws Always throws a NuxtError with statusCode 404
 */
export function createNotFoundError(resource: string, id: string | number) {
  return createError({
    statusCode: 404,
    message: `${resource} not found`,
    statusMessage: `${resource.toUpperCase()}_NOT_FOUND`,
  })
}

/**
 * Creates a standardized API error with custom code and status
 * @param message - Human-readable error message
 * @param code - ErrorCode enum value for client-side handling
 * @param statusCode - HTTP status code
 * @throws Always throws a NuxtError with specified statusCode
 */
export function createApiError(message: string, code: ErrorCode, statusCode: number) {
  return createError({
    statusCode,
    message,
    statusMessage: code,
  })
}
