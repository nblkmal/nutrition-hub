// server/utils/errors.ts
// Error code constants and helper functions for consistent error handling

import { logError } from './logger'

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
 * @param options - Optional configuration
 * @param options.returnResponse - If true, returns error response object instead of throwing
 * @param options.event - Nuxt event context (required if returnResponse is true)
 * @throws Always throws a NuxtError with statusCode 404 (if returnResponse is false)
 */
export function createNotFoundError(
  resource: string,
  id: string | number,
  options?: { returnResponse?: boolean; event?: any }
) {
  const errorResponse = {
    error: {
      message: `${resource} not found`,
      code: `${resource.toUpperCase()}_NOT_FOUND`,
      statusCode: 404
    },
    success: false
  }

  if (options?.returnResponse && options.event) {
    setResponseStatus(options.event, 404)
    logError(new Error(`${resource} not found`), { route: '/api/foods/:foodId', [resource.toLowerCase()]: id })
    return errorResponse
  }

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
