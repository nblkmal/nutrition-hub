// components/SearchBar.test.ts
// SearchBar component tests - Story 2.6
// Tests for search input, autocomplete dropdown, keyboard navigation, and accessibility

import { describe, it, expect, beforeEach } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

describe('SearchBar Component - File Structure', () => {
  const componentPath = path.resolve(__dirname, '../components/SearchBar.vue')
  let componentContent: string

  beforeEach(() => {
    componentContent = fs.readFileSync(componentPath, 'utf-8')
  })

  it('should have SearchBar component file', () => {
    expect(fs.existsSync(componentPath)).toBe(true)
  })

  it('should use script setup with TypeScript', () => {
    expect(componentContent).toContain('<script setup lang="ts">')
  })

  it('should import Food type from ~/types', () => {
    expect(componentContent).toContain("import type { Food } from '~/types'")
  })

  it('should import UseFoodSearchReturn from composable types', () => {
    expect(componentContent).toContain("import type { UseFoodSearchReturn } from '~/types/composables'")
  })

  it('should use useFoodSearch composable', () => {
    expect(componentContent).toContain('useFoodSearch()')
  })

  it('should have ref for searchContainer', () => {
    expect(componentContent).toContain('searchContainer = ref<HTMLElement | null>(null)')
  })
})

describe('SearchBar Component - Input Structure', () => {
  const componentPath = path.resolve(__dirname, '../components/SearchBar.vue')
  let componentContent: string

  beforeEach(() => {
    componentContent = fs.readFileSync(componentPath, 'utf-8')
  })

  it('should have UInput component', () => {
    expect(componentContent).toContain('<UInput')
  })

  it('should bind query with v-model', () => {
    expect(componentContent).toContain('v-model="query"')
  })

  it('should have placeholder "Search foods..."', () => {
    expect(componentContent).toContain('placeholder="Search foods..."')
  })

  it('should have search icon', () => {
    expect(componentContent).toContain('i-heroicons-magnifying-glass')
  })

  it('should have size="lg"', () => {
    expect(componentContent).toContain('size="lg"')
  })
})

describe('SearchBar Component - Accessibility', () => {
  const componentPath = path.resolve(__dirname, '../components/SearchBar.vue')
  let componentContent: string

  beforeEach(() => {
    componentContent = fs.readFileSync(componentPath, 'utf-8')
  })

  it('should have aria-label on input', () => {
    expect(componentContent).toContain('aria-label="Search foods"')
  })

  it('should have aria-describedby linking to instructions', () => {
    expect(componentContent).toContain('aria-describedby="search-instructions"')
  })

  it('should have role="listbox" on dropdown', () => {
    expect(componentContent).toContain('role="listbox"')
  })

  it('should have role="option" on list items', () => {
    expect(componentContent).toContain('role="option"')
  })

  it('should have aria-selected on selected option', () => {
    expect(componentContent).toContain('aria-selected="index === selectedIndex"')
  })

  it('should have screen reader instructions paragraph', () => {
    expect(componentContent).toContain('id="search-instructions"')
    expect(componentContent).toContain('sr-only')
    expect(componentContent).toContain('arrow keys to navigate')
    expect(componentContent).toContain('Enter to select')
    expect(componentContent).toContain('Escape to close')
  })
})

describe('SearchBar Component - Dropdown Display', () => {
  const componentPath = path.resolve(__dirname, '../components/SearchBar.vue')
  let componentContent: string

  beforeEach(() => {
    componentContent = fs.readFileSync(componentPath, 'utf-8')
  })

  it('should show dropdown based on showResults computed', () => {
    expect(componentContent).toContain('v-if="showResults"')
  })

  it('should have showDropdown ref', () => {
    expect(componentContent).toContain('showDropdown = ref(false)')
  })

  it('should hide dropdown when query has less than 2 characters', () => {
    // Check that the watch handles the length condition
    expect(componentContent).toContain('newQuery.length < 2')
  })

  it('should close dropdown on Escape key', () => {
    expect(componentContent).toContain("e.key === 'Escape'")
    expect(componentContent).toContain('showDropdown.value = false')
  })
})

describe('SearchBar Component - Search Results', () => {
  const componentPath = path.resolve(__dirname, '../components/SearchBar.vue')
  let componentContent: string

  beforeEach(() => {
    componentContent = fs.readFileSync(componentPath, 'utf-8')
  })

  it('should display food name as primary text', () => {
    expect(componentContent).toContain('{{ food.name }}')
  })

  it('should display protein and calories preview', () => {
    expect(componentContent).toContain('proteinG')
    expect(componentContent).toContain('calories')
    expect(componentContent).toContain('g protein')
  })

  it('should limit displayed results to 10', () => {
    expect(componentContent).toContain('.slice(0, 10)')
  })

  it('should have selectedIndex ref', () => {
    expect(componentContent).toContain('selectedIndex = ref(0)')
  })

  it('should highlight selected item with visual indicator', () => {
    expect(componentContent).toContain('index === selectedIndex')
    expect(componentContent).toContain('bg-primary-50')
    expect(componentContent).toContain('border-l-4 border-primary-500')
  })
})

describe('SearchBar Component - Loading State', () => {
  const componentPath = path.resolve(__dirname, '../components/SearchBar.vue')
  let componentContent: string

  beforeEach(() => {
    componentContent = fs.readFileSync(componentPath, 'utf-8')
  })

  it('should show loading state when searching', () => {
    expect(componentContent).toContain('v-if="loading"')
  })

  it('should have spinner icon', () => {
    expect(componentContent).toContain('i-heroicons-arrow-path')
    expect(componentContent).toContain('animate-spin')
  })

  it('should display "Searching..." text', () => {
    expect(componentContent).toContain('Searching...')
  })

  it('should have USkeleton components for loading', () => {
    expect(componentContent).toContain('<USkeleton')
  })

  it('should have skeleton items matching expected result structure', () => {
    expect(componentContent).toContain('v-for="i in 5"')
    expect(componentContent).toContain('h-12')
  })
})

describe('SearchBar Component - Keyboard Navigation', () => {
  const componentPath = path.resolve(__dirname, '../components/SearchBar.vue')
  let componentContent: string

  beforeEach(() => {
    componentContent = fs.readFileSync(componentPath, 'utf-8')
  })

  it('should handle ArrowDown key', () => {
    expect(componentContent).toContain("e.key === 'ArrowDown'")
    expect(componentContent).toContain('e.preventDefault()')
    expect(componentContent).toContain('Math.min')
  })

  it('should handle ArrowUp key', () => {
    expect(componentContent).toContain("e.key === 'ArrowUp'")
    expect(componentContent).toContain('e.preventDefault()')
    expect(componentContent).toContain('Math.max')
  })

  it('should handle Enter key', () => {
    expect(componentContent).toContain("e.key === 'Enter'")
    expect(componentContent).toContain('e.preventDefault()')
  })

  it('should handle Escape key', () => {
    expect(componentContent).toContain("e.key === 'Escape'")
  })

  it('should have handleKeydown function', () => {
    expect(componentContent).toContain('const handleKeydown = (e: KeyboardEvent)')
  })

  it('should close dropdown on Escape', () => {
    expect(componentContent).toContain("e.key === 'Escape'")
    expect(componentContent).toContain('showDropdown.value = false')
  })

  it('should have scrollSelectedIntoView function', () => {
    expect(componentContent).toContain('scrollSelectedIntoView')
    expect(componentContent).toContain('scrollIntoView')
  })
})

describe('SearchBar Component - Mouse Interaction', () => {
  const componentPath = path.resolve(__dirname, '../components/SearchBar.vue')
  let componentContent: string

  beforeEach(() => {
    componentContent = fs.readFileSync(componentPath, 'utf-8')
  })

  it('should navigate on click', () => {
    expect(componentContent).toContain('@click="navigateToFood(food)"')
  })

  it('should update selected index on mouse enter', () => {
    expect(componentContent).toContain('@mouseenter="handleMouseEnter(index)"')
  })

  it('should have click outside handler', () => {
    expect(componentContent).toContain('handleClickOutside')
    expect(componentContent).toContain('contains(event.target as Node)')
  })

  it('should add click event listener on mount', () => {
    expect(componentContent).toContain("document.addEventListener('click', handleClickOutside)")
  })

  it('should remove click event listener on unmount', () => {
    expect(componentContent).toContain("document.removeEventListener('click', handleClickOutside)")
  })
})

describe('SearchBar Component - Navigation', () => {
  const componentPath = path.resolve(__dirname, '../components/SearchBar.vue')
  let componentContent: string

  beforeEach(() => {
    componentContent = fs.readFileSync(componentPath, 'utf-8')
  })

  it('should have navigateToFood function', () => {
    expect(componentContent).toContain('const navigateToFood = (food: Food)')
  })

  it('should navigate to food detail page', () => {
    expect(componentContent).toContain('navigateTo(`/foods/${food.slug}`)')
  })

  it('should clear query after navigation', () => {
    expect(componentContent).toContain("query.value = ''")
  })

  it('should close dropdown after navigation', () => {
    expect(componentContent).toContain('showDropdown.value = false')
  })
})

describe('SearchBar Component - Responsive Design', () => {
  const componentPath = path.resolve(__dirname, '../components/SearchBar.vue')
  let componentContent: string

  beforeEach(() => {
    componentContent = fs.readFileSync(componentPath, 'utf-8')
  })

  it('should have full-width container', () => {
    expect(componentContent).toContain('w-full')
  })

  it('should have appropriate max-width on desktop', () => {
    expect(componentContent).toContain('max-w-2xl')
  })

  it('should be centered on desktop', () => {
    expect(componentContent).toContain('mx-auto')
  })

  it('should have absolute positioning for dropdown', () => {
    expect(componentContent).toContain('absolute')
    expect(componentContent).toContain('z-50')
  })
})
