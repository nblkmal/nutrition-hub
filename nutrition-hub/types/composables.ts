// Composables types
import type { Ref } from 'vue'
import type { Food } from './api'

// Note: Nuxt auto-imports ref, computed from Vue
// BUT Ref type requires explicit import above
export interface UseAsyncState<T> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<string | null>
}

/**
 * Return interface for useFoodSearch composable
 */
export interface UseFoodSearchReturn {
  /** Array of food search results */
  foods: Ref<Food[]>
  /** Loading state during API call */
  loading: Ref<boolean>
  /** Error message or null */
  error: Ref<string | null>
  /** Current search query */
  searchQuery: Ref<string>
  /** Debounced function to trigger search */
  searchFoods: (query: string) => void
}
