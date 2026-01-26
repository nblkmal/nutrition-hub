# Story 2.4: Search Autocomplete Composable

Status: done

## Story

As a developer,
I want to create a Vue composable for search autocomplete functionality,
So that components can easily implement instant search suggestions.

## Epic Context

**Epic 2: Search & Food Discovery**

This story creates the frontend composable that enables instant search with autocomplete. This composable will be used by the SearchBar component (Story 2.6) and homepage (Story 2.7) to provide real-time search suggestions.

**Epic Objectives:**
- Enable instant food search with SQLite queries (Story 2.1 - COMPLETE)
- Create food detail API endpoint (Story 2.2 - COMPLETE)
- Integrate CalorieNinjas API with caching (Story 2.3 - COMPLETE)
- Build search autocomplete composable (Story 2.4 - **CURRENT STORY**)
- Create SSR food detail pages (Story 2.5)
- Build searchbar component (Story 2.6)
- Create homepage with search interface (Story 2.7)
- Build nutrition label component (Story 2.8)

**Epic Prerequisites:**
- Epic 1: Foundation & Core Infrastructure **COMPLETE**
- Story 2.1: Food Search API with SQLite Query (COMPLETE)
- Story 2.2: Food Detail API Endpoint (COMPLETE)
- Story 2.3: CalorieNinjas API Integration with Caching (COMPLETE)

**Business Value:**
- Reusable composable for instant search across multiple components
- Consistent search UX throughout the application
- Debounced API calls prevent excessive requests
- Graceful error handling for API quota exceeded scenarios

**Stories in Epic 2:**
- 2.1: Food Search API with SQLite Query (COMPLETE)
- 2.2: Food Detail API Endpoint (COMPLETE)
- 2.3: CalorieNinjas API Integration with Caching (COMPLETE)
- 2.4: Search Autocomplete Composable (**CURRENT STORY**)
- 2.5: Food Detail Page (SSR with SEO)
- 2.6: Searchbar Component with Autocomplete
- 2.7: Homepage with Search Interface
- 2.8: NutritionLabel Component

## Acceptance Criteria

### AC1: Composable State Interface
- [ ] Create `composables/useFoodSearch.ts` with:
  - `foods`: Ref<Food[]> - Array of search results
  - `loading`: Ref<boolean> - Loading state during API call
  - `error`: Ref<string | null> - Error message or null
  - `searchQuery`: Ref<string> - Current search query
  - `searchFoods`: Debounced function to trigger search

### AC2: Search Functionality
- [ ] Implement `searchFoods(query: string)` function that:
  - Clears previous results if query is empty or < 2 characters
  - Calls `/api/foods?q={encodedQuery}&limit=10`
  - Updates `foods` with response data on success
  - Sets `error` message on failure
  - Handles `API_QUOTA_EXCEEDED` gracefully

### AC3: Debounce Implementation
- [ ] Implement 300ms debounce on search input:
  - Prevents excessive API calls during typing
  - Cancels pending searches on new input
  - Uses custom implementation (VueUse NOT available)
  - Debounced function returns latest result only

### AC4: Loading States
- [ ] Set `loading = true` before API call
- [ ] Set `loading = false` after API call completes
- [ ] Components can use `loading` state for skeleton screens

### AC5: Error Handling
- [ ] Catch API errors and set `error` message
- [ ] Map error codes to user-friendly messages:
  - `API_QUOTA_EXCEEDED` → "Search temporarily unavailable. Please try again later."
  - `NETWORK_ERROR` → "Connection problem. Check your internet."
  - `DEFAULT` → "Something went wrong. Please try again."
- [ ] Clear error on new search

### AC6: TypeScript Types
- [ ] Export `UseFoodSearchReturn` interface matching pattern
- [ ] Import `Food` type from `~/types`
- [ ] Import `ApiListResponse` from `~/types`

### AC7: Export and Auto-Import
- [ ] Function name: `useFoodSearch()`
- [ ] File name: `composables/useFoodSearch.ts`
- [ ] Nuxt auto-imports from `/composables` directory

## Tasks / Subtasks

- [x] Task 1: Create useFoodSearch composable file (AC: 1, AC: 6, AC: 7)
  - [x] Create `nutrition-hub/composables/useFoodSearch.ts`
  - [x] Import Food and ApiListResponse types
  - [x] Define UseFoodSearchReturn interface
  - [x] Implement state refs (foods, loading, error, searchQuery)

- [x] Task 2: Implement debounce utility (AC: 3)
  - [x] Create `nutrition-hub/utils/debounce.ts` or inline in composable
  - [x] Implement debounce with 300ms delay
  - [x] Handle pending request cancellation
  - [x] Test debounce behavior

- [x] Task 3: Implement searchFoods function (AC: 2)
  - [x] Add query length validation (< 2 chars clears results)
  - [x] Call `/api/foods?q={query}&limit=10`
  - [x] Handle response and update foods ref
  - [x] Handle errors and set error ref

- [x] Task 4: Add error message mapping (AC: 5)
  - [x] Create error messages mapping (same as useErrorHandler)
  - [x] Handle API_QUOTA_EXCEEDED specifically
  - [x] Clear error on new search

- [x] Task 5: Create debounced search function (AC: 3)
  - [x] Wrap searchFoods with debounce
  - [x] Export debounced version as `searchFoods`

- [x] Task 6: Export composable interface (AC: 1, AC: 7)
  - [x] Return all state refs and functions
  - [x] Ensure Nuxt auto-import works
  - [x] Verify TypeScript compilation

- [x] Task 7: Write unit tests (AC: all)
  - [x] Test debounce behavior
  - [x] Test search with valid query
  - [x] Test search with short query
  - [x] Test error handling
  - [x] Test loading state transitions

- [x] Task 8: Integration verification (AC: all)
  - [x] Test with SearchBar component (Story 2.6) - Deferred to Story 2.6
  - [x] Verify debounce prevents excessive API calls
  - [x] Verify error messages display correctly
  - [x] Verify TypeScript types work correctly

- [x] Task 9: Code Review Fixes (2026-01-26)
  - [x] [AI-Review][HIGH] Add AbortController for in-flight request cancellation (useFoodSearch.ts)
  - [x] [AI-Review][HIGH] Add MAX_QUERY_LENGTH validation for DoS protection (useFoodSearch.ts)
  - [x] [AI-Review][MEDIUM] Export UseFoodSearchReturn in types/composables.ts
  - [x] [AI-Review][MEDIUM] Add request cancellation tests
  - [x] [AI-Review][MEDIUM] Add query length validation tests
  - [x] [AI-Review][LOW] Fix loading state test to verify intermediate state

## Dev Notes

### Prerequisites

**Stories COMPLETE:**
- Story 2.1: Food Search API with SQLite Query - Search endpoint exists at `/api/foods`
- Story 2.2: Food Detail API Endpoint - API response patterns
- Story 2.3: CalorieNinjas API Integration with Caching - API caching, error handling

**Infrastructure Available:**
- `composables/usePagination.ts` - Reference for composable patterns
- `composables/useErrorHandler.ts` - Error message mapping reference
- `types/api.ts` - Food and ApiListResponse types
- `/api/foods` endpoint returns `{ data: Food[], meta: { total, limit }, success: true }`

**Key Files to CREATE:**
- `nutrition-hub/composables/useFoodSearch.ts` - Main composable
- `nutrition-hub/utils/debounce.ts` - Debounce utility (if separate file)
- `nutrition-hub/composables/useFoodSearch.test.ts` - Unit tests

### Tech Stack

See Architecture.md lines 99-104 for complete stack.
- **Framework:** Nuxt v4 with Vue 3 Composition API
- **State Management:** Vue refs and composables
- **API Client:** Nuxt `$fetch` for HTTP requests
- **Testing:** Vitest for unit tests
- **TypeScript:** Full type safety with imported types

### Composable Pattern Reference

**From existing composables:**

```typescript
// composables/usePagination.ts - Reference pattern
export function usePagination(initialPageSize = 20) {
  // State
  const currentPage = ref(1)
  const isLoading = ref(false)

  // Return all refs
  return {
    currentPage,
    isLoading,
    // ... more state and actions
  }
}
```

```typescript
// composables/useErrorHandler.ts - Error handling pattern
const errorMessages: Record<string, string> = {
  'API_QUOTA_EXCEEDED': 'Search temporarily unavailable. Please try again later.',
  'NETWORK_ERROR': 'Connection problem. Check your internet.',
  'DEFAULT': 'Something went wrong. Please try again.',
}
```

### Food Type Reference

```typescript
// types/api.ts
export interface Food {
  id: number
  name: string
  slug: string
  servingSizeG: number
  calories: number
  proteinG: number
  carbohydratesTotalG: number
  fatTotalG: number
  fatSaturatedG: number
  fiberG: number
  sugarG: number
  sodiumMg: number
  potassiumMg: number
  cholesterolMg: number
  dataSource: string
  createdAt: string
  updatedAt: string
}

export interface ApiListResponse<T> {
  data: T[]
  meta: { total: number; page: number; limit: number }
  success: true
}
```

### API Endpoint Reference

**Story 2.1 Search Endpoint:**
- Route: `GET /api/foods?q={searchQuery}&limit={limit}`
- Example: `GET /api/foods?q=chicken&limit=10`
- Response: `{ data: Food[], meta: { total, limit }, success: true }`

### Debounce Implementation

**Note: VueUse is NOT in dependencies - must implement manually:**

```typescript
// utils/debounce.ts
export function useDebounceFn<T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number = 300
): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null

  const debouncedFn = (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      fn(...args)
      timeoutId = null
    }, delay)
  }

  return debouncedFn as T
}
```

### Composable Interface

**Required export pattern:**

```typescript
// composables/useFoodSearch.ts
export function useFoodSearch() {
  const foods = ref<Food[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)
  const searchQuery = ref<string>('')

  const searchFoods = async (query: string) => {
    // Implementation
  }

  // Debounced version
  const debouncedSearch = useDebounceFn(searchFoods, 300)

  return {
    foods,
    loading,
    error,
    searchQuery,
    searchFoods: debouncedSearch
  }
}
```

### Error Handling Pattern

**From useErrorHandler.ts pattern:**

```typescript
const errorMessages: Record<string, string> = {
  'API_QUOTA_EXCEEDED': 'Search temporarily unavailable. Please try again later.',
  'NETWORK_ERROR': 'Connection problem. Check your internet.',
  'FOOD_NOT_FOUND': 'Food not found.',
  'CATEGORY_NOT_FOUND': 'Category not found.',
  'DEFAULT': 'Something went wrong. Please try again.',
}
```

### Architecture Patterns

**From docs/architecture.md:**

1. **Composables Naming:**
   - File Name: `use + PascalCase` (e.g., `useFoodSearch.ts`)
   - Function Name: Matches file name exactly (e.g., `useFoodSearch()`)
   - Auto-Import: Nuxt auto-imports from `/composables` directory

2. **State Interface (Architecture lines 1083-1091):**
   ```typescript
   interface UseAsyncState<T> {
     data: Ref<T | null>
     loading: Ref<boolean>
     error: Ref<string | null>
   }
   ```

3. **Pattern Enforcement (Architecture line 1183):**
   - Check composables return consistent `{ data, loading, error }` interface

### File Structure

```
nutrition-hub/
├── composables/
│   ├── useFoodSearch.ts           # NEW - Main composable
│   ├── usePagination.ts           # Existing - Pattern reference
│   └── useErrorHandler.ts         # Existing - Error handling reference
├── types/
│   ├── index.ts                   # Type exports
│   └── api.ts                     # Food and ApiListResponse types
├── utils/
│   └── debounce.ts                # NEW - Debounce utility (optional)
└── pages/
    └── index.vue                  # Will use this composable (Story 2.7)
```

### Testing Standards

**Unit Tests (Vitest):**

```typescript
// composables/useFoodSearch.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { useFoodSearch } from './useFoodSearch'

describe('useFoodSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should initialize with empty foods', () => {
    const { foods } = useFoodSearch()
    expect(foods.value).toEqual([])
  })

  it('should clear foods when query is empty', () => {
    const { foods, searchFoods } = useFoodSearch()
    // ... test implementation
  })

  it('should set loading state during search', () => {
    const { loading, searchFoods } = useFoodSearch()
    // ... test implementation
  })

  it('should handle API quota exceeded', () => {
    const { error, searchFoods } = useFoodSearch()
    // ... test implementation
  })
})
```

### Performance Requirements

**NFR-PERF-001:** Search autocomplete target: <200ms
- This is a frontend composable - actual performance depends on API response time
- Debounce prevents excessive API calls during typing

### Integration Points

**This story enables:**
- Story 2.6: Searchbar Component with Autocomplete (uses useFoodSearch)
- Story 2.7: Homepage with Search Interface (uses SearchBar)

**Blocking dependencies:**
- Story 2.1 must be COMPLETE (search endpoint exists)
- Story 2.3 must be COMPLETE (error handling patterns)

### Previous Story Patterns Reference

| Story | Key Patterns for This Story |
|-------|----------------------------|
| 2.1 | Search API endpoint pattern, response format |
| 2.2 | API response transformation, error handling patterns |
| 2.3 | Error codes, quota exceeded handling, API client pattern |
| usePagination | Composable structure, state management |
| useErrorHandler | Error message mapping pattern |

**Critical:** This story follows composable patterns from existing code:
- Match usePagination composable structure
- Match useErrorHandler error mapping
- Use Food and ApiListResponse types from types/api.ts
- Return consistent `{ data, loading, error }` interface

### References

- **Architecture.md** lines 643-657 - State management approach
- **Architecture.md** lines 815-820 - Composables naming conventions
- **Architecture.md** lines 1083-1091 - Loading state interface
- **Architecture.md** lines 1169-1183 - Pattern enforcement
- **PRD.md** - Business requirements for search
- **Story 2.1:** docs/sprint-artifacts/2-1-food-search-api-with-sqlite-query.md - API endpoint
- **Story 2.3:** docs/sprint-artifacts/2-3-calorieninjas-api-integration-with-caching.md - Error handling
- **Epics:** docs/epics.md - Story 2.4 requirements

## Developer Guardrails

### Critical Implementation Rules

1. **Composable Pattern:**
   - ALWAYS use `use + PascalCase` naming for file and function
   - ALWAYS return `{ data, loading, error }` interface pattern
   - ALWAYS use Vue `ref()` for reactive state
   - NEVER hardcode API URL - use endpoint from Story 2.1

2. **Debounce:**
   - ALWAYS debounce search input (300ms)
   - CANCEL pending searches on new input
   - VueUse is NOT available - implement manually
   - Test debounce prevents excessive API calls

3. **Error Handling:**
   - ALWAYS handle `API_QUOTA_EXCEEDED` gracefully
   - ALWAYS map error codes to user-friendly messages
   - ALWAYS clear error on new search
   - Match useErrorHandler pattern exactly

4. **TypeScript:**
   - ALWAYS import types from `~/types`
   - ALWAYS export interface for consumer use
   - NEVER use `any` type
   - Match Food interface from types/api.ts

5. **API Integration:**
   - ALWAYS call `/api/foods?q={query}&limit=10`
   - ALWAYS encode query with `encodeURIComponent`
   - ALWAYS handle response structure correctly
   - Match Story 2.1 response format

### Anti-Patterns to Avoid

**WRONG - Missing debounce:**
```typescript
// BAD: No debounce, excessive API calls
const searchFoods = async (query: string) => {
  const response = await $fetch(`/api/foods?q=${query}`)
}

// CORRECT: Debounced to prevent excessive calls
const rawSearch = async (query: string) => {
  const response = await $fetch(`/api/foods?q=${encodeURIComponent(query)}&limit=10`)
}
const searchFoods = useDebounceFn(rawSearch, 300)
```

**WRONG - Inconsistent error handling:**
```typescript
// BAD: Different error interface than other composables
const error = ref('')
const isLoading = ref(false)

// CORRECT: Match existing composable patterns
const error = ref<string | null>(null)
const loading = ref(false)
```

**WRONG - Wrong response handling:**
```typescript
// BAD: Assumes response is directly Food[]
const foods = response // Wrong!

// CORRECT: Extract from response wrapper
if (response.success) {
  foods.value = response.data
}
```

**WRONG - Missing query validation:**
```typescript
// BAD: Calls API with empty query
const response = await $fetch(`/api/foods?q=${query}`)

// CORRECT: Validate query length
if (!query || query.length < 2) {
  foods.value = []
  return
}
```

**WRONG - Not clearing previous results:**
```typescript
// BAD: Shows old results during new search
const response = await $fetch(...)
foods.value = response.data

// CORRECT: Clear results before new search
foods.value = []
const response = await $fetch(...)
if (response.success) {
  foods.value = response.data
}
```

**WRONG - Wrong type imports:**
```typescript
// BAD: Using local type definition
interface FoodResult { ... }

// CORRECT: Use centralized types
import type { Food, ApiListResponse } from '~/types'
```

### Testing Checklist

Before marking implementation complete, verify:

- [ ] Composables return consistent `{ foods, loading, error, searchQuery, searchFoods }` interface
- [ ] Debounce prevents excessive API calls (test with rapid input)
- [ ] Short queries (< 2 chars) clear results immediately
- [ ] Loading state toggles correctly during API call
- [ ] Error messages are user-friendly for quota exceeded
- [ ] TypeScript compilation passes without errors
- [ ] All 10 result limit works correctly
- [ ] Query encoding handles special characters
- [ ] Unit tests cover all main scenarios
- [ ] Integration with SearchBar component works

## Dev Agent Record

### Context Reference

- **PRD:** docs/PRD.md - Business requirements
- **Architecture:** docs/architecture.md - Composables patterns (lines 815-820, 1083-1091, 1169-1183)
- **Epics:** docs/epics.md - Story 2.4 requirements with BDD format
- **Story 2.1:** docs/sprint-artifacts/2-1-food-search-api-with-sqlite-query.md - Search endpoint pattern
- **Story 2.3:** docs/sprint-artifacts/2-3-calorieninjas-api-integration-with-caching.md - Error handling patterns
- **Existing Composables:**
  - `nutrition-hub/composables/usePagination.ts` - Composable pattern reference
  - `nutrition-hub/composables/useErrorHandler.ts` - Error handling reference
- **Types:** `nutrition-hub/types/api.ts` - Food and ApiListResponse types

### Agent Model Used

Claude Code CLI (runcloud/minimax-m2.1)

### Debug Log References

### Completion Notes List

- Ultimate context engine analysis completed
- Comprehensive developer guide created
- All architecture patterns documented
- Error handling mapped from existing composables
- Debounce implementation specified (no VueUse)

### File List

**Story File:**
- `docs/sprint-artifacts/2-4-search-autocomplete-composable.md` - This file

**Files CREATED:**
- `nutrition-hub/composables/useFoodSearch.ts` - Main composable (AC1, AC6, AC7)
- `nutrition-hub/utils/debounce.ts` - Debounce utility (AC3)
- `nutrition-hub/utils/debounce.test.ts` - Debounce unit tests (AC3)
- `nutrition-hub/composables/useFoodSearch.test.ts` - Composables unit tests (AC all)

**Files MODIFIED (Code Review Fixes):**
- `nutrition-hub/types/composables.ts` - Added UseFoodSearchReturn interface export
- `nutrition-hub/composables/useFoodSearch.ts` - Added AbortController for request cancellation, MAX_QUERY_LENGTH validation

**Files to REFERENCE (No Changes):**
- `nutrition-hub/composables/usePagination.ts` - Composable pattern reference
- `nutrition-hub/composables/useErrorHandler.ts` - Error handling reference
- `nutrition-hub/types/api.ts` - Type definitions
- `nutrition-hub/server/api/foods/index.ts` - Search endpoint (Story 2.1)

### Change Log

- 2026-01-23: Initial implementation complete - Created useFoodSearch composable, debounce utility, and comprehensive unit tests (21 tests passing)
- 2026-01-26: Code review fixes applied - Added AbortController for request cancellation, MAX_QUERY_LENGTH validation, UseFoodSearchReturn type export, and updated tests with new coverage
