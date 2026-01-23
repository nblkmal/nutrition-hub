// server/utils/slugify.test.ts
// Tests for slugify utility

import { describe, it, expect } from 'vitest'
import { slugify } from './slugify'

describe('slugify', () => {
  it('should convert to lowercase', () => {
    expect(slugify('Avocado')).toBe('avocado')
    expect(slugify('CHICKEN BREAST')).toBe('chicken-breast')
  })

  it('should replace spaces with hyphens', () => {
    expect(slugify('Sweet Potato')).toBe('sweet-potato')
    expect(slugify('Chicken Breast')).toBe('chicken-breast')
  })

  it('should remove special characters', () => {
    expect(slugify("Trader Joe's")).toBe('trader-joes')
    expect(slugify('Jalapeño')).toBe('jalapeo')
  })

  it('should trim leading and trailing whitespace', () => {
    expect(slugify('  Greek Yogurt  ')).toBe('greek-yogurt')
  })

  it('should handle multiple consecutive spaces', () => {
    expect(slugify('oatmeal   with   sugar')).toBe('oatmeal-with-sugar')
  })

  it('should remove apostrophes', () => {
    expect(slugify("It's")).toBe('its')
    expect(slugify("won't")).toBe('wont')
  })

  it('should handle empty string', () => {
    expect(slugify('')).toBe('')
  })

  it('should handle only whitespace', () => {
    expect(slugify('   ')).toBe('')
  })

  it('should replace underscores with hyphens', () => {
    expect(slugify('eggplant_parmigiana')).toBe('eggplant-parmigiana')
  })
})
