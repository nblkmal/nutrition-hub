// composables/useFoodSearch.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { ref } from 'vue'

// Mock $fetch globally
const mockFetch = vi.fn()
vi.stubGlobal('$fetch', mockFetch)

describe('useFoodSearch', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('initial state', () => {
    it('should initialize with empty foods', async () => {
      // Import after mocking
      const { useFoodSearch } = await import('./useFoodSearch')
      const { foods } = useFoodSearch()
      expect(foods.value).toEqual([])
    })

    it('should initialize with loading false', async () => {
      const { useFoodSearch } = await import('./useFoodSearch')
      const { loading } = useFoodSearch()
      expect(loading.value).toBe(false)
    })

    it('should initialize with error null', async () => {
      const { useFoodSearch } = await import('./useFoodSearch')
      const { error } = useFoodSearch()
      expect(error.value).toBeNull()
    })

    it('should initialize with empty searchQuery', async () => {
      const { useFoodSearch } = await import('./useFoodSearch')
      const { searchQuery } = useFoodSearch()
      expect(searchQuery.value).toBe('')
    })
  })

  describe('search with short query', () => {
    it('should clear foods when query is empty', async () => {
      const { useFoodSearch } = await import('./useFoodSearch')
      const { foods, searchFoods } = useFoodSearch()

      // First search with a valid query
      mockFetch.mockResolvedValue({
        data: [{ id: 1, name: 'Chicken Breast', slug: 'chicken-breast', servingSizeG: 100, calories: 165, proteinG: 31, carbohydratesTotalG: 0, fatTotalG: 3.6, fatSaturatedG: 1, fiberG: 0, sugarG: 0, sodiumMg: 74, potassiumMg: 256, cholesterolMg: 85, dataSource: 'usda', createdAt: '2024-01-01', updatedAt: '2024-01-01' }],
        meta: { total: 1, page: 1, limit: 10 },
        success: true,
      })

      // Advance timers to execute the debounced search
      searchFoods('chicken')
      vi.advanceTimersByTime(300)
      await Promise.resolve()

      expect(foods.value.length).toBe(1)

      // Now search with empty query
      searchFoods('')
      vi.advanceTimersByTime(300)
      await Promise.resolve()

      expect(foods.value).toEqual([])
      expect(foods.value.length).toBe(0)
    })

    it('should clear foods when query is less than 2 characters', async () => {
      const { useFoodSearch } = await import('./useFoodSearch')
      const { foods, searchFoods } = useFoodSearch()

      // Search with single character
      searchFoods('c')
      vi.advanceTimersByTime(300)
      await Promise.resolve()

      expect(foods.value).toEqual([])
    })
  })

  describe('search with valid query', () => {
    it('should update foods with search results', async () => {
      const { useFoodSearch } = await import('./useFoodSearch')
      const { foods, searchFoods } = useFoodSearch()

      const mockFoods = [
        { id: 1, name: 'Chicken Breast', slug: 'chicken-breast', servingSizeG: 100, calories: 165, proteinG: 31, carbohydratesTotalG: 0, fatTotalG: 3.6, fatSaturatedG: 1, fiberG: 0, sugarG: 0, sodiumMg: 74, potassiumMg: 256, cholesterolMg: 85, dataSource: 'usda', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
        { id: 2, name: 'Chicken Thigh', slug: 'chicken-thigh', servingSizeG: 100, calories: 209, proteinG: 26, carbohydratesTotalG: 0, fatTotalG: 10.9, fatSaturatedG: 3, fiberG: 0, sugarG: 0, sodiumMg: 87, potassiumMg: 223, cholesterolMg: 93, dataSource: 'usda', createdAt: '2024-01-01', updatedAt: '2024-01-01' },
      ]

      mockFetch.mockResolvedValue({
        data: mockFoods,
        meta: { total: 2, page: 1, limit: 10 },
        success: true,
      })

      searchFoods('chicken')
      vi.advanceTimersByTime(300)
      await Promise.resolve()

      expect(foods.value).toEqual(mockFoods)
      expect(foods.value.length).toBe(2)
    })

    it('should encode special characters in query', async () => {
      const { useFoodSearch } = await import('./useFoodSearch')
      const { searchFoods } = useFoodSearch()

      mockFetch.mockResolvedValue({
        data: [],
        meta: { total: 0, page: 1, limit: 10 },
        success: true,
      })

      searchFoods('test & query')
      vi.advanceTimersByTime(300)
      await Promise.resolve()

      expect(mockFetch).toHaveBeenCalled()
      const [url] = mockFetch.mock.calls[0]
      expect(url).toContain('test%20%26%20query')
      expect(url).toContain('limit=10')
    })

    it('should call API with correct limit', async () => {
      const { useFoodSearch } = await import('./useFoodSearch')
      const { searchFoods } = useFoodSearch()

      mockFetch.mockResolvedValue({
        data: [],
        meta: { total: 0, page: 1, limit: 10 },
        success: true,
      })

      searchFoods('apple')
      vi.advanceTimersByTime(300)
      await Promise.resolve()

      expect(mockFetch).toHaveBeenCalled()
      const [url] = mockFetch.mock.calls[0]
      expect(url).toContain('q=apple')
      expect(url).toContain('limit=10')
    })
  })

  describe('loading state', () => {
    it('should toggle loading during search lifecycle', async () => {
      const { useFoodSearch } = await import('./useFoodSearch')
      const { loading, searchFoods } = useFoodSearch()

      let resolvePromise: (value: unknown) => void
      mockFetch.mockImplementation(() => new Promise(resolve => {
        resolvePromise = resolve
      }))

      // Initial state should be false
      expect(loading.value).toBe(false)

      // Trigger search
      searchFoods('chicken')
      vi.advanceTimersByTime(300) // Advance past debounce
      await Promise.resolve()

      // After debounce, loading should be true during API call
      expect(loading.value).toBe(true)

      // Then resolve the promise
      resolvePromise!({ data: [], meta: { total: 0, page: 1, limit: 10 }, success: true })
      await Promise.resolve()

      // After completion, loading should be false
      expect(loading.value).toBe(false)
    })
  })

  describe('error handling', () => {
    it('should handle API quota exceeded', async () => {
      const { useFoodSearch } = await import('./useFoodSearch')
      const { error, searchFoods } = useFoodSearch()

      mockFetch.mockRejectedValue({
        code: 'API_QUOTA_EXCEEDED',
        message: 'Quota exceeded',
      })

      searchFoods('chicken')
      vi.advanceTimersByTime(300)
      await Promise.resolve()

      expect(error.value).toBe('Search temporarily unavailable. Please try again later.')
    })

    it('should handle network error', async () => {
      const { useFoodSearch } = await import('./useFoodSearch')
      const { error, searchFoods } = useFoodSearch()

      mockFetch.mockRejectedValue(new Error('Network error'))

      searchFoods('chicken')
      vi.advanceTimersByTime(300)
      await Promise.resolve()

      expect(error.value).toBe('Something went wrong. Please try again.')
    })

    it('should clear error on new search', async () => {
      const { useFoodSearch } = await import('./useFoodSearch')
      const { error, searchFoods } = useFoodSearch()

      // First search with error
      mockFetch.mockRejectedValueOnce(new Error('Network error'))

      searchFoods('chicken1')
      vi.advanceTimersByTime(300)
      await Promise.resolve()

      expect(error.value).toBe('Something went wrong. Please try again.')

      // Second search with success
      mockFetch.mockResolvedValueOnce({
        data: [],
        meta: { total: 0, page: 1, limit: 10 },
        success: true,
      })

      searchFoods('chicken2')
      vi.advanceTimersByTime(300)
      await Promise.resolve()

      expect(error.value).toBeNull()
    })
  })

  describe('debounce behavior', () => {
    it('should debounce search and only execute last call', async () => {
      const { useFoodSearch } = await import('./useFoodSearch')
      const { searchFoods } = useFoodSearch()

      mockFetch.mockResolvedValue({
        data: [],
        meta: { total: 0, page: 1, limit: 10 },
        success: true,
      })

      // Rapid calls
      searchFoods('c')
      searchFoods('ch')
      searchFoods('chi')
      searchFoods('chic')
      searchFoods('chick')
      searchFoods('chicken')

      // Only one API call should be made
      expect(mockFetch).toHaveBeenCalledTimes(0)

      // After debounce delay
      vi.advanceTimersByTime(300)
      await Promise.resolve()

      // Only the last call should have been made
      expect(mockFetch).toHaveBeenCalledTimes(1)
      const [url] = mockFetch.mock.calls[0]
      expect(url).toContain('q=chicken')
      expect(url).toContain('limit=10')
    })

    it('should update searchQuery with last query', async () => {
      const { useFoodSearch } = await import('./useFoodSearch')
      const { searchQuery, searchFoods } = useFoodSearch()

      mockFetch.mockResolvedValue({
        data: [],
        meta: { total: 0, page: 1, limit: 10 },
        success: true,
      })

      searchFoods('chicken')
      vi.advanceTimersByTime(300)
      await Promise.resolve()

      expect(searchQuery.value).toBe('chicken')
    })
  })

  describe('request cancellation', () => {
    it('should cancel pending request on new search', async () => {
      const { useFoodSearch } = await import('./useFoodSearch')
      const { searchFoods } = useFoodSearch()

      let rejectPromise: (reason?: Error) => void
      const pendingPromise = new Promise((_, reject) => {
        rejectPromise = reject
      })
      mockFetch.mockReturnValue(pendingPromise)

      // Start first search
      searchFoods('chicken')
      vi.advanceTimersByTime(300)
      await Promise.resolve()

      // Verify request was initiated
      expect(mockFetch).toHaveBeenCalledTimes(1)

      // Start second search (should cancel first)
      searchFoods('beef')
      vi.advanceTimersByTime(300)
      await Promise.resolve()

      // Reject the pending promise (simulating abort)
      rejectPromise(new Error('AbortError'))

      // Should have called API twice (second call with beef)
      expect(mockFetch).toHaveBeenCalledTimes(2)
      const [url] = mockFetch.mock.calls[1]
      expect(url).toContain('q=beef')
      expect(url).toContain('limit=10')
    })
  })

  describe('query length validation', () => {
    it('should reject query exceeding maximum length', async () => {
      const { useFoodSearch } = await import('./useFoodSearch')
      const { error, searchFoods } = useFoodSearch()

      // Create a query longer than MAX_QUERY_LENGTH (200)
      const longQuery = 'a'.repeat(201)

      searchFoods(longQuery)
      vi.advanceTimersByTime(300)
      await Promise.resolve()

      expect(error.value).toContain('Search query too long')
      expect(mockFetch).not.toHaveBeenCalled()
    })

    it('should accept query at maximum length', async () => {
      const { useFoodSearch } = await import('./useFoodSearch')
      const { error, searchFoods } = useFoodSearch()

      mockFetch.mockResolvedValue({
        data: [],
        meta: { total: 0, page: 1, limit: 10 },
        success: true,
      })

      // Create a query at exactly MAX_QUERY_LENGTH (200)
      const maxLengthQuery = 'a'.repeat(200)

      searchFoods(maxLengthQuery)
      vi.advanceTimersByTime(300)
      await Promise.resolve()

      expect(error.value).toBeNull()
      expect(mockFetch).toHaveBeenCalled()
    })
  })
})
