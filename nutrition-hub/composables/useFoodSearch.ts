// composables/useFoodSearch.ts
// Search autocomplete composable for instant food search suggestions

import { ref } from 'vue'
import type { Food, ApiListResponse } from '~/types'
import type { UseFoodSearchReturn } from '~/types/composables'
import { debounce } from '../utils/debounce'

/**
 * Error code to user-friendly message mapping for search errors
 */
const errorMessages: Record<string, string> = {
  'API_QUOTA_EXCEEDED': 'Search temporarily unavailable. Please try again later.',
  'NETWORK_ERROR': 'Connection problem. Check your internet.',
  'DEFAULT': 'Something went wrong. Please try again.',
}

/**
 * Maximum query length to prevent DoS attacks
 */
const MAX_QUERY_LENGTH = 200

/**
 * Search autocomplete composable for instant food search suggestions
 *
 * Provides debounced search functionality with loading states and error handling
 * for the food search API endpoint.
 *
 * @example
 * ```typescript
 * const { foods, loading, error, searchFoods } = useFoodSearch()
 *
 * // In input handler
 * searchFoods('chicken')
 * ```
 */
export function useFoodSearch(): UseFoodSearchReturn {
  // State
  const foods = ref<Food[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const searchQuery = ref<string>('')

  // Abort controller for cancelling in-flight requests
  let abortController: AbortController | null = null

  /**
   * Search for foods by query
   * @param query - Search query string
   */
  async function searchFoods(query: string): Promise<void> {
    // Clear error on new search
    error.value = null

    // Clear results if query is empty, too short, or too long
    if (!query || query.length < 2) {
      foods.value = []
      searchQuery.value = ''
      cancelPendingRequest()
      return
    }

    // Prevent excessively long queries (DoS protection)
    if (query.length > MAX_QUERY_LENGTH) {
      error.value = `Search query too long. Maximum ${MAX_QUERY_LENGTH} characters allowed.`
      return
    }

    searchQuery.value = query
    loading.value = true

    // Cancel any pending request before starting new one
    cancelPendingRequest()
    abortController = new AbortController()

    try {
      const encodedQuery = encodeURIComponent(query)
      const response = await $fetch<ApiListResponse<Food>>(
        `/api/foods?q=${encodedQuery}&limit=10`,
        { signal: abortController.signal }
      )

      if (response.success) {
        foods.value = response.data
      } else {
        error.value = errorMessages.DEFAULT
      }
    } catch (e) {
      // Handle API errors with user-friendly messages
      // Ignore AbortError - it means request was cancelled intentionally
      if (e instanceof Error && e.name === 'AbortError') {
        return
      }

      const errorObj = e as { code?: string }
      error.value = errorMessages[errorObj?.code || ''] || errorMessages.DEFAULT
      foods.value = []
    } finally {
      loading.value = false
      abortController = null
    }
  }

  /**
   * Cancel any pending search request
   */
  function cancelPendingRequest(): void {
    if (abortController) {
      abortController.abort()
      abortController = null
    }
  }

  // Create debounced version of search function (300ms delay)
  const debouncedSearch = debounce(searchFoods, 300)

  return {
    foods,
    loading,
    error,
    searchQuery,
    searchFoods: debouncedSearch,
  }
}
