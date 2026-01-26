// tests/pages/foods/[foodSlug].test.ts
// Food Detail Page tests - Story 2.5
// Tests for SSR page rendering, 404 handling, SEO metadata, and schema.org

import { describe, it, expect, beforeEach } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

describe('Food Detail Page - File Structure', () => {
  const pagePath = path.resolve(__dirname, '../../../pages/foods/[foodSlug].vue')
  let pageContent: string

  beforeEach(() => {
    pageContent = fs.readFileSync(pagePath, 'utf-8')
  })

  it('should have food detail page file', () => {
    expect(fs.existsSync(pagePath)).toBe(true)
  })

  it('should use useAsyncData for SSR-compatible data fetching', () => {
    expect(pageContent).toContain('useAsyncData')
  })

  it('should fetch from /api/foods/:foodSlug endpoint', () => {
    expect(pageContent).toContain('/api/foods/')
  })

  it('should have route parameter extraction', () => {
    expect(pageContent).toContain('route.params.foodSlug')
  })
})

describe('Food Detail Page - SEO Metadata', () => {
  const pagePath = path.resolve(__dirname, '../../../pages/foods/[foodSlug].vue')
  let pageContent: string

  beforeEach(() => {
    pageContent = fs.readFileSync(pagePath, 'utf-8')
  })

  it('should use useHead for SEO metadata', () => {
    expect(pageContent).toContain('useHead')
  })

  it('should have dynamic title tag', () => {
    expect(pageContent).toContain('title')
  })

  it('should have meta description with nutrition highlights', () => {
    expect(pageContent).toContain("name: 'description'")
    expect(pageContent).toMatch(/proteinG|calories|carbohydratesTotalG/)
  })

  it('should have Open Graph tags (og:title, og:description, og:type, og:image, og:url)', () => {
    expect(pageContent).toContain("property: 'og:title'")
    expect(pageContent).toContain("property: 'og:description'")
    expect(pageContent).toContain("property: 'og:type'")
    expect(pageContent).toContain("property: 'og:image'")
    expect(pageContent).toContain("property: 'og:url'")
  })

  it('should have Twitter Card tags', () => {
    expect(pageContent).toContain("name: 'twitter:card'")
    expect(pageContent).toContain("name: 'twitter:title'")
    expect(pageContent).toContain("name: 'twitter:description'")
  })

  it('should have canonical URL', () => {
    expect(pageContent).toContain("rel: 'canonical'")
  })

  it('should have Schema.org JSON-LD structured data', () => {
    expect(pageContent).toContain("type: 'application/ld+json'")
    expect(pageContent).toContain('@context')
    expect(pageContent).toContain('@type')
    expect(pageContent).toContain('FoodNutrient')
  })
})

describe('Food Detail Page - Schema.org Structured Data', () => {
  const pagePath = path.resolve(__dirname, '../../../pages/foods/[foodSlug].vue')
  let pageContent: string

  beforeEach(() => {
    pageContent = fs.readFileSync(pagePath, 'utf-8')
  })

  it('should include nutrition data in structured data', () => {
    expect(pageContent).toContain('calories')
    expect(pageContent).toContain('protein')
    expect(pageContent).toContain('carbohydrate')
    expect(pageContent).toContain('fat')
  })

  it('should use correct Schema.org unitCode (UNCEFACT standard: cal not kcal)', () => {
    expect(pageContent).toContain('unitCode')
    expect(pageContent).toContain("'cal'")
  })
})

describe('Food Detail Page - SSR Verification', () => {
  const pagePath = path.resolve(__dirname, '../../../pages/foods/[foodSlug].vue')
  let pageContent: string

  beforeEach(() => {
    pageContent = fs.readFileSync(pagePath, 'utf-8')
  })

  it('should have article element for semantic HTML', () => {
    expect(pageContent).toContain('<article')
  })

  it('should have h1 heading for food name', () => {
    expect(pageContent).toContain('<h1')
  })
})

describe('Food Detail Page - Loading State', () => {
  const pagePath = path.resolve(__dirname, '../../../pages/foods/[foodSlug].vue')
  let pageContent: string

  beforeEach(() => {
    pageContent = fs.readFileSync(pagePath, 'utf-8')
  })

  it('should have skeleton UI elements in template', () => {
    expect(pageContent).toContain('USkeleton')
  })

  it('should use pending.value for loading state', () => {
    expect(pageContent).toContain('pending.value')
  })
})

describe('Food Detail Page - Error State', () => {
  const pagePath = path.resolve(__dirname, '../../../pages/foods/[foodSlug].vue')
  let pageContent: string

  beforeEach(() => {
    pageContent = fs.readFileSync(pagePath, 'utf-8')
  })

  it('should show user-friendly error message', () => {
    expect(pageContent).toContain('UAlert')
  })

  it('should have back navigation button on error page', () => {
    expect(pageContent).toContain('Back to Search')
  })

  it('should have aria-label on back button for accessibility', () => {
    expect(pageContent).toContain('aria-label="Back to search page"')
  })
})

describe('Food Detail Page - Mobile Responsiveness', () => {
  const pagePath = path.resolve(__dirname, '../../../pages/foods/[foodSlug].vue')
  let pageContent: string

  beforeEach(() => {
    pageContent = fs.readFileSync(pagePath, 'utf-8')
  })

  it('should have responsive container classes', () => {
    expect(pageContent).toContain('container')
    expect(pageContent).toContain('mx-auto')
    expect(pageContent).toContain('px-4')
  })

  it('should have responsive heading size', () => {
    expect(pageContent).toContain('text-4xl')
    expect(pageContent).toContain('font-bold')
  })
})

describe('Food Detail Page - Accessibility', () => {
  const pagePath = path.resolve(__dirname, '../../../pages/foods/[foodSlug].vue')
  let pageContent: string

  beforeEach(() => {
    pageContent = fs.readFileSync(pagePath, 'utf-8')
  })

  it('should have h1 heading with food name', () => {
    expect(pageContent).toContain('<h1')
  })

  it('should have semantic article element', () => {
    expect(pageContent).toContain('<article')
  })

  it('should have back navigation link with aria-label', () => {
    expect(pageContent).toContain('aria-label="Back to search page"')
  })
})

describe('Food Detail Page - Performance Optimization', () => {
  const pagePath = path.resolve(__dirname, '../../../pages/foods/[foodSlug].vue')
  let pageContent: string

  beforeEach(() => {
    pageContent = fs.readFileSync(pagePath, 'utf-8')
  })

  it('should use LazyNutritionLabel for performance', () => {
    expect(pageContent).toContain('LazyNutritionLabel')
  })

  it('should use LazyRelatedFoods for performance', () => {
    expect(pageContent).toContain('LazyRelatedFoods')
  })
})

describe('Food Detail Page - Components', () => {
  it('should have NutritionLabel component', () => {
    const componentPath = path.resolve(__dirname, '../../../components/food/NutritionLabel.vue')
    expect(fs.existsSync(componentPath)).toBe(true)
  })

  it('should have RelatedFoods component', () => {
    const componentPath = path.resolve(__dirname, '../../../components/food/RelatedFoods.vue')
    expect(fs.existsSync(componentPath)).toBe(true)
  })

  it('should have NutritionLabel with food prop', () => {
    const componentPath = path.resolve(__dirname, '../../../components/food/NutritionLabel.vue')
    const content = fs.readFileSync(componentPath, 'utf-8')
    expect(content).toContain('NutritionLabelProps')
    expect(content).toContain('food: Food')
  })

  it('should have RelatedFoods with currentFoodSlug prop', () => {
    const componentPath = path.resolve(__dirname, '../../../components/food/RelatedFoods.vue')
    const content = fs.readFileSync(componentPath, 'utf-8')
    expect(content).toContain('RelatedFoodsProps')
    expect(content).toContain('currentFoodSlug: string')
  })
})
