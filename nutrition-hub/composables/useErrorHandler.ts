// composables/useErrorHandler.ts
// Client-side error handler for consistent error message mapping

import { ref } from 'vue'

/**
 * Error code to user-friendly message mapping
 */
const errorMessages: Record<string, string> = {
  'API_QUOTA_EXCEEDED': 'Search temporarily unavailable. Please try again later.',
  'NETWORK_ERROR': 'Connection problem. Check your internet.',
  'FOOD_NOT_FOUND': 'Food not found.',
  'CATEGORY_NOT_FOUND': 'Category not found.',
  'DEFAULT': 'Something went wrong. Please try again.',
}

/**
 * Client-side error handler composable
 * Provides consistent error message mapping for user-friendly error display
 */
export function useErrorHandler() {
  const errorMessage = ref<string | null>(null)

  /**
   * Handle an error from API response or other sources
   * Maps error codes to user-friendly messages
   * @param error - Error object with optional code property
   */
  const handleError = (error: { code?: string; message?: string } | null | undefined) => {
    console.error('Error:', error)

    if (!error) {
      errorMessage.value = errorMessages.DEFAULT
      return
    }

    // Map error code to user-friendly message
    errorMessage.value = errorMessages[error.code || ''] || errorMessages.DEFAULT
  }

  /**
   * Clear the current error message
   */
  const clearError = () => {
    errorMessage.value = null
  }

  return {
    errorMessage,
    handleError,
    clearError,
  }
}
