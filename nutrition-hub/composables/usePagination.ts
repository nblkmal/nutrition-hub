// composables/usePagination.ts
// Pagination state and actions for food search results

import { ref, computed } from 'vue'

export interface PaginationMeta {
  total: number
  limit: number
  page: number
  pageSize: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  success: boolean
  meta: PaginationMeta
}

/**
 * Pagination composable for handling paginated API responses
 * @param initialPageSize - Default page size (default: 20)
 */
export function usePagination(initialPageSize = 20) {
  // State
  const currentPage = ref(1)
  const pageSize = ref(initialPageSize)
  const totalRecords = ref(0)
  const totalPages = ref(0)
  const isLoading = ref(false)

  // Computed
  const hasNextPage = computed(() => currentPage.value < totalPages.value)
  const hasPrevPage = computed(() => currentPage.value > 1)
  const startRecord = computed(() => (currentPage.value - 1) * pageSize.value + 1)
  const endRecord = computed(() => Math.min(currentPage.value * pageSize.value, totalRecords.value))
  const isFirstPage = computed(() => currentPage.value === 1)
  const isLastPage = computed(() => currentPage.value === totalPages.value)

  // Actions
  function setPage(page: number) {
    if (page >= 1 && page <= totalPages.value) {
      currentPage.value = page
    }
  }

  function nextPage() {
    if (hasNextPage.value) {
      currentPage.value++
    }
  }

  function prevPage() {
    if (hasPrevPage.value) {
      currentPage.value--
    }
  }

  function goToFirstPage() {
    currentPage.value = 1
  }

  function goToLastPage() {
    currentPage.value = totalPages.value
  }

  function setPageSize(size: number) {
    const validSize = Math.max(1, Math.min(100, size))
    pageSize.value = validSize
    // Reset to first page when page size changes
    currentPage.value = 1
  }

  function updateFromMeta(meta: PaginationMeta) {
    totalRecords.value = meta.total
    totalPages.value = meta.totalPages
    // Ensure current page is valid
    if (currentPage.value > meta.totalPages && meta.totalPages > 0) {
      currentPage.value = meta.totalPages
    }
  }

  function reset() {
    currentPage.value = 1
    totalRecords.value = 0
    totalPages.value = 0
  }

  /**
   * Generate pagination query params for API calls
   */
  function getQueryParams(additionalParams?: Record<string, string>) {
    return {
      ...additionalParams,
      page: currentPage.value.toString(),
      pageSize: pageSize.value.toString()
    }
  }

  /**
   * Get page numbers for display (with ellipsis for large page counts)
   * @param maxVisible - Maximum number of page buttons to show (default: 5)
   */
  function getVisiblePages(maxVisible = 5): (number | 'ellipsis')[] {
    if (totalPages.value <= maxVisible) {
      return Array.from({ length: totalPages.value }, (_, i) => i + 1)
    }

    const halfVisible = Math.floor(maxVisible / 2)
    let start = Math.max(1, currentPage.value - halfVisible)
    const end = Math.min(totalPages.value, start + maxVisible - 1)

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1)
    }

    const pages: (number | 'ellipsis')[] = []

    // Always show first page
    pages.push(1)

    if (start > 2) {
      pages.push('ellipsis')
    }

    // Show pages from start to end
    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages.value) {
        pages.push(i)
      }
    }

    if (end < totalPages.value - 1) {
      pages.push('ellipsis')
    }

    // Always show last page
    if (totalPages.value > 1) {
      pages.push(totalPages.value)
    }

    return pages
  }

  return {
    // State
    currentPage,
    pageSize,
    totalRecords,
    totalPages,
    isLoading,
    // Computed
    hasNextPage,
    hasPrevPage,
    startRecord,
    endRecord,
    isFirstPage,
    isLastPage,
    // Actions
    setPage,
    nextPage,
    prevPage,
    goToFirstPage,
    goToLastPage,
    setPageSize,
    updateFromMeta,
    reset,
    getQueryParams,
    getVisiblePages
  }
}

/**
 * Composable for fetching paginated food data
 * @param fetchFn - Async function that fetches paginated data
 */
export function usePaginatedFetch<T>(
  fetchFn: (params: Record<string, string>) => Promise<PaginatedResponse<T>>
) {
  const pagination = usePagination()
  const error = ref<Error | null>(null)
  const data = ref<T[]>([])

  async function fetchPage() {
    pagination.isLoading = true
    error.value = null

    try {
      const params = pagination.getQueryParams()
      const response = await fetchFn(params)

      if (response.success) {
        data.value = response.data
        pagination.updateFromMeta(response.meta)
      } else {
        throw new Error('Failed to fetch data')
      }
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
      data.value = []
    } finally {
      pagination.isLoading = false
    }
  }

  async function fetchWithQuery(query: string) {
    pagination.currentPage = 1 // Reset to first page on new search
    const params = pagination.getQueryParams({ q: query })
    return fetchFn(params)
  }

  return {
    ...pagination,
    data,
    error,
    fetchPage,
    fetchWithQuery
  }
}
