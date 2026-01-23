// tests/api/foods.test.ts
// Food Search API endpoint tests - simplified for direct API testing

import { describe, it, expect, beforeAll } from 'vitest'

beforeAll(async () => {
  // Import database utility for setup
  await import('../../server/utils/database')
})

describe('Food Search API - Data Layer Tests', () => {
  it('should have transformFood function', async () => {
    const { transformFood } = await import('../../server/utils/transform')
    expect(typeof transformFood).toBe('function')
  })

  it('should have successResponse function', async () => {
    const { successResponse } = await import('../../server/utils/response')
    expect(typeof successResponse).toBe('function')
  })

  it('should return valid success response structure', async () => {
    const { successResponse } = await import('../../server/utils/response')
    const response = successResponse([{ id: 1, name: 'Test' }], { total: 1, limit: 10 })

    expect(response).toHaveProperty('success', true)
    expect(response).toHaveProperty('data')
    expect(response).toHaveProperty('meta')
    expect(response.meta).toHaveProperty('total', 1)
    expect(response.meta).toHaveProperty('limit', 10)
  })
})

describe('Food Search API - Integration Tests', () => {
  it('should return all foods when no query', async () => {
    const response = await fetch('http://localhost:3000/api/foods')
    const data = await response.json()

    expect(data).toHaveProperty('success', true)
    expect(data).toHaveProperty('data')
    expect(data).toHaveProperty('meta')
    expect(Array.isArray(data.data)).toBe(true)
    expect(data.meta.limit).toBe(20)
  })

  it('should return foods matching search query', async () => {
    const response = await fetch('http://localhost:3000/api/foods?q=chicken')
    const data = await response.json()

    expect(data).toHaveProperty('success', true)
    expect(data).toHaveProperty('data')
    expect(Array.isArray(data.data)).toBe(true)
    expect(data.data.length).toBeGreaterThan(0)

    // All returned foods should contain 'chicken' in name
    data.data.forEach((food: any) => {
      expect(food.name.toLowerCase()).toContain('chicken')
    })
  })

  it('should return empty array for no matching results', async () => {
    const response = await fetch('http://localhost:3000/api/foods?q=xyznonexistent')
    const data = await response.json()

    expect(data).toHaveProperty('success', true)
    expect(data).toHaveProperty('data', [])
    expect(data).toHaveProperty('meta')
    expect(data.meta.total).toBe(0)
  })

  it('should use default limit of 20', async () => {
    const response = await fetch('http://localhost:3000/api/foods')
    const data = await response.json()

    expect(data.meta.limit).toBe(20)
  })

  it('should respect custom limit parameter', async () => {
    const response = await fetch('http://localhost:3000/api/foods?limit=5')
    const data = await response.json()

    expect(data.meta.limit).toBe(5)
    expect(data.data.length).toBeLessThanOrEqual(5)
  })

  it('should return camelCase field names', async () => {
    const response = await fetch('http://localhost:3000/api/foods?q=chicken&limit=1')
    const data = await response.json()

    expect(data.data.length).toBeGreaterThan(0)
    const food = data.data[0]

    // Check camelCase fields exist
    expect(food).toHaveProperty('servingSizeG')
    expect(food).toHaveProperty('proteinG')
    expect(food).toHaveProperty('carbohydratesTotalG')
    expect(food).toHaveProperty('fatTotalG')
    expect(food).toHaveProperty('fatSaturatedG')
    expect(food).toHaveProperty('fiberG')
    expect(food).toHaveProperty('sugarG')
    expect(food).toHaveProperty('sodiumMg')
    expect(food).toHaveProperty('potassiumMg')
    expect(food).toHaveProperty('cholesterolMg')
    expect(food).toHaveProperty('dataSource')
    expect(food).toHaveProperty('createdAt')
    expect(food).toHaveProperty('updatedAt')

    // Check no snake_case fields
    expect(food).not.toHaveProperty('serving_size_g')
    expect(food).not.toHaveProperty('protein_g')
    expect(food).not.toHaveProperty('carbohydrates_total_g')
  })

  it('should return ISO 8601 timestamps', async () => {
    const response = await fetch('http://localhost:3000/api/foods?q=chicken&limit=1')
    const data = await response.json()

    const food = data.data[0]
    expect(food.createdAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)
    expect(food.updatedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/)
  })

  it('should prioritize exact match in results', async () => {
    const response = await fetch('http://localhost:3000/api/foods?q=egg&limit=10')
    const data = await response.json()

    // First result should be exact match if exists
    if (data.data.some((f: any) => f.name.toLowerCase() === 'egg large')) {
      expect(data.data[0].name.toLowerCase()).toBe('egg large')
    }
  })

  it('should return chicken foods for chicken query', async () => {
    const response = await fetch('http://localhost:3000/api/foods?q=chicken')
    const data = await response.json()

    const chickenFoods = data.data.filter((f: any) =>
      f.name.toLowerCase().includes('chicken')
    )
    expect(chickenFoods.length).toBeGreaterThanOrEqual(2)
  })

  it('should return egg foods for egg query', async () => {
    const response = await fetch('http://localhost:3000/api/foods?q=egg')
    const data = await response.json()

    const eggFoods = data.data.filter((f: any) =>
      f.name.toLowerCase().includes('egg')
    )
    expect(eggFoods.length).toBeGreaterThanOrEqual(2)
  })
})

describe('Food Search API - Pagination Tests', () => {
  it('should include totalRecords in meta', async () => {
    const response = await fetch('http://localhost:3000/api/foods')
    const data = await response.json()

    expect(data.meta).toHaveProperty('total')
    expect(data.meta.total).toBeGreaterThan(0)
  })

  it('should include page and pageSize in meta', async () => {
    const response = await fetch('http://localhost:3000/api/foods?page=1&pageSize=10')
    const data = await response.json()

    expect(data.meta).toHaveProperty('page', 1)
    expect(data.meta).toHaveProperty('pageSize', 10)
  })

  it('should include totalPages in meta', async () => {
    const response = await fetch('http://localhost:3000/api/foods?pageSize=10')
    const data = await response.json()

    expect(data.meta).toHaveProperty('totalPages')
    expect(data.meta.totalPages).toBeGreaterThan(0)
  })

  it('should include hasNextPage in meta', async () => {
    const response = await fetch('http://localhost:3000/api/foods?page=1&pageSize=10')
    const data = await response.json()

    expect(data.meta).toHaveProperty('hasNextPage')
    expect(typeof data.meta.hasNextPage).toBe('boolean')
  })

  it('should include hasPrevPage in meta', async () => {
    const response1 = await fetch('http://localhost:3000/api/foods?page=1&pageSize=10')
    const data1 = await response1.json()
    expect(data1.meta.hasPrevPage).toBe(false)

    const response2 = await fetch('http://localhost:3000/api/foods?page=2&pageSize=10')
    const data2 = await response2.json()
    expect(data2.meta.hasPrevPage).toBe(true)
  })

  it('should paginate correctly with page parameter', async () => {
    const response1 = await fetch('http://localhost:3000/api/foods?page=1&pageSize=5')
    const data1 = await response1.json()

    const response2 = await fetch('http://localhost:3000/api/foods?page=2&pageSize=5')
    const data2 = await response2.json()

    // Different data on different pages
    expect(data1.data.length).toBe(5)
    expect(data2.data.length).toBe(5)
    expect(data1.data[0].id).not.toBe(data2.data[0].id)
  })

  it('should return hasNextPage=false on last page', async () => {
    // Get last page by requesting beyond available pages
    const response = await fetch('http://localhost:3000/api/foods?page=100&pageSize=10')
    const data = await response.json()

    // With 125 records and 10 per page, page 100 should cap to last valid page
    expect(data.meta.hasNextPage).toBe(false)
  })

  it('should calculate totalPages correctly', async () => {
    const response = await fetch('http://localhost:3000/api/foods')
    const data = await response.json()

    const expectedTotalPages = Math.ceil(data.meta.total / data.meta.pageSize)
    expect(data.meta.totalPages).toBe(expectedTotalPages)
  })

  it('should work with legacy limit parameter as pageSize', async () => {
    const response = await fetch('http://localhost:3000/api/foods?limit=10')
    const data = await response.json()

    expect(data.meta.pageSize).toBe(10)
    expect(data.data.length).toBeLessThanOrEqual(10)
  })

  it('should handle invalid page gracefully', async () => {
    const response = await fetch('http://localhost:3000/api/foods?page=-1')
    const data = await response.json()

    expect(data.meta.page).toBe(1) // Should default to 1
  })

  it('should bound pageSize between 1 and 100', async () => {
    const response1 = await fetch('http://localhost:3000/api/foods?pageSize=500')
    const data1 = await response1.json()
    expect(data1.meta.pageSize).toBe(100)

    // Negative values default to 20 (not 1) - this is the configured default
    const response2 = await fetch('http://localhost:3000/api/foods?pageSize=-5')
    const data2 = await response2.json()
    expect(data2.meta.pageSize).toBe(20)
  })
})
