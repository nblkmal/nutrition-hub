// server/utils/validation.test.ts
// Tests for validation utility

import { describe, it, expect } from 'vitest'
import { validateSearchQuery } from './validation'

describe('validateSearchQuery', () => {
  it('should return valid for a normal query', () => {
    const result = validateSearchQuery('chicken breast')
    expect(result.isValid).toBe(true)
    expect(result.errors).toHaveLength(0)
    expect(result.normalizedQuery).toBe('chicken breast')
  })

  it('should return invalid for empty query', () => {
    const result = validateSearchQuery('')
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Search query is required')
  })

  it('should return invalid for whitespace-only query', () => {
    const result = validateSearchQuery('   ')
    expect(result.isValid).toBe(false)
    // Empty string after trim returns "Search query is required"
    expect(result.errors.length).toBeGreaterThan(0)
  })

  it('should return invalid for query too short', () => {
    const result = validateSearchQuery('a')
    expect(result.isValid).toBe(false)
    expect(result.errors.some(e => e.includes('at least 2 characters'))).toBe(true)
  })

  it('should return invalid for query too long', () => {
    const longQuery = 'a'.repeat(201)
    const result = validateSearchQuery(longQuery)
    expect(result.isValid).toBe(false)
    expect(result.errors.some(e => e.includes('less than 200 characters'))).toBe(true)
  })

  it('should trim whitespace from valid query', () => {
    const result = validateSearchQuery('  avocado  ')
    expect(result.isValid).toBe(true)
    expect(result.normalizedQuery).toBe('avocado')
  })

  it('should handle null/undefined gracefully', () => {
    const result = validateSearchQuery(null as any)
    expect(result.isValid).toBe(false)
    expect(result.errors).toContain('Search query is required')
  })
})
