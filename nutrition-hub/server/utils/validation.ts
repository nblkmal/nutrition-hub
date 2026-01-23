// server/utils/validation.ts
// Input validation utilities for search queries

export interface ValidationResult {
  isValid: boolean
  errors: string[]
  normalizedQuery: string
}

const MIN_QUERY_LENGTH = 2
const MAX_QUERY_LENGTH = 200

/**
 * Validate a search query
 * @param query - The raw search query
 * @returns ValidationResult with validation status, errors, and normalized query
 */
export function validateSearchQuery(query: string): ValidationResult {
  const errors: string[] = []
  const trimmed = query?.trim() || ''

  if (!trimmed) {
    errors.push('Search query is required')
    return { isValid: false, errors, normalizedQuery: '' }
  }

  if (trimmed.length < MIN_QUERY_LENGTH) {
    errors.push(`Search query must be at least ${MIN_QUERY_LENGTH} characters`)
  }

  if (trimmed.length > MAX_QUERY_LENGTH) {
    errors.push(`Search query must be less than ${MAX_QUERY_LENGTH} characters`)
  }

  if (/^\s+$/.test(trimmed)) {
    errors.push('Search query cannot be only whitespace')
  }

  return {
    isValid: errors.length === 0,
    errors,
    normalizedQuery: trimmed,
  }
}
