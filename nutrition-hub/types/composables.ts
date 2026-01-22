// Composables types
import type { Ref } from 'vue'

// Note: Nuxt auto-imports ref, computed from Vue
// BUT Ref type requires explicit import above
export interface UseAsyncState<T> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<string | null>
}
