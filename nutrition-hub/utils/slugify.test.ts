import { describe, it, expect } from 'vitest'
import { slugify } from './slugify'

describe('slugify', () => {
  it('converts to lowercase', () => {
    expect(slugify('CHICKEN BREAST')).toBe('chicken-breast')
  })

  it('replaces spaces with hyphens', () => {
    expect(slugify('Brown Rice')).toBe('brown-rice')
  })

  it('removes apostrophes', () => {
    expect(slugify("Trader Joe's")).toBe('trader-joes')
  })

  it('removes special characters', () => {
    expect(slugify('Oatmeal!@#')).toBe('oatmeal')
  })

  it('removes duplicate hyphens', () => {
    expect(slugify('Chicken  --  Breast')).toBe('chicken-breast')
  })

  it('trims leading and trailing hyphens', () => {
    expect(slugify('--Oatmeal--')).toBe('oatmeal')
  })

  it('handles empty strings', () => {
    expect(slugify('')).toBe('')
  })

  it('preserves hyphens in original text', () => {
    expect(slugify('gluten-free-bread')).toBe('gluten-free-bread')
  })

  it('handles complex food names', () => {
    expect(slugify("Extra Virgin Olive Oil")).toBe('extra-virgin-olive-oil')
    expect(slugify('Greek Yogurt (Non-Fat)')).toBe('greek-yogurt-non-fat')
    expect(slugify("Grandma's Molasses")).toBe('grandmas-molasses')
  })

  it('handles unicode characters gracefully', () => {
    expect(slugify('Soy Sauce (低钠)')).toBe('soy-sauce')
  })
})
