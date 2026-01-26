// tests/pages/index.test.ts
// Homepage tests - Story 2.7
// Tests for homepage structure, SEO metadata, search integration, and accessibility

import { describe, it, expect, beforeEach } from 'vitest'
import * as fs from 'fs'
import * as path from 'path'

describe('Homepage - File Structure', () => {
  const pagePath = path.resolve(__dirname, '../../pages/index.vue')
  let pageContent: string

  beforeEach(() => {
    pageContent = fs.readFileSync(pagePath, 'utf-8')
  })

  it('should have homepage file', () => {
    expect(fs.existsSync(pagePath)).toBe(true)
  })

  it('should use script setup with TypeScript', () => {
    expect(pageContent).toContain('<script setup lang="ts">')
  })

  it('should have homepage container div', () => {
    expect(pageContent).toContain('class="homepage-container"')
  })
})

describe('Homepage - Hero Section', () => {
  const pagePath = path.resolve(__dirname, '../../pages/index.vue')
  let pageContent: string

  beforeEach(() => {
    pageContent = fs.readFileSync(pagePath, 'utf-8')
  })

  it('should have hero section with semantic section element', () => {
    expect(pageContent).toContain('<section class="hero-section"')
    expect(pageContent).toContain('aria-label="Hero"')
  })

  it('should have h1 with main headline', () => {
    expect(pageContent).toContain('<h1 class="hero-title">')
    expect(pageContent).toContain('Know Your Food.')
  })

  it('should have "Instantly" highlighted in green', () => {
    expect(pageContent).toContain('<span class="highlight">Instantly.</span>')
  })

  it('should have hero subtitle', () => {
    expect(pageContent).toContain('class="hero-subtitle"')
    expect(pageContent).toContain('Search thousands of foods')
  })
})

describe('Homepage - Search Integration', () => {
  const pagePath = path.resolve(__dirname, '../../pages/index.vue')
  let pageContent: string

  beforeEach(() => {
    pageContent = fs.readFileSync(pagePath, 'utf-8')
  })

  it('should have search container with max-width', () => {
    expect(pageContent).toContain('class="search-container"')
    expect(pageContent).toContain('max-width: 600px')
  })

  it('should include SearchBar component', () => {
    expect(pageContent).toContain('<SearchBar />')
  })
})

describe('Homepage - Example Search Links', () => {
  const pagePath = path.resolve(__dirname, '../../pages/index.vue')
  let pageContent: string

  beforeEach(() => {
    pageContent = fs.readFileSync(pagePath, 'utf-8')
  })

  it('should have example searches section', () => {
    expect(pageContent).toContain('class="example-searches"')
  })

  it('should have "Try:" label', () => {
    expect(pageContent).toContain('<span class="try-label">Try:</span>')
  })

  it('should have NuxtLink to chicken-breast', () => {
    expect(pageContent).toContain('to="/foods/chicken-breast"')
    expect(pageContent).toContain('>Chicken Breast<')
  })

  it('should have NuxtLink to avocado', () => {
    expect(pageContent).toContain('to="/foods/avocado"')
    expect(pageContent).toContain('>Avocado<')
  })

  it('should have NuxtLink to salmon', () => {
    expect(pageContent).toContain('to="/foods/salmon"')
    expect(pageContent).toContain('>Salmon<')
  })

  it('should use NuxtLink for client-side navigation', () => {
    expect(pageContent).toContain('<NuxtLink')
  })
})

describe('Homepage - Features Section', () => {
  const pagePath = path.resolve(__dirname, '../../pages/index.vue')
  let pageContent: string

  beforeEach(() => {
    pageContent = fs.readFileSync(pagePath, 'utf-8')
  })

  it('should have features section with semantic section element', () => {
    expect(pageContent).toContain('<section class="features-section"')
    expect(pageContent).toContain('aria-label="Features"')
  })

  it('should have three feature cards', () => {
    expect(pageContent).toContain('class="feature-card"')
    const featureCount = (pageContent.match(/class="feature-card"/g) || []).length
    expect(featureCount).toBe(3)
  })

  it('should have Instant Results feature with bolt icon', () => {
    expect(pageContent).toContain('i-heroicons-bolt')
    expect(pageContent).toContain('>Instant Results<')
    expect(pageContent).toContain('Search thousands of foods in under 200ms')
  })

  it('should have Visual Nutrition feature with chart-bar icon', () => {
    expect(pageContent).toContain('i-heroicons-chart-bar')
    expect(pageContent).toContain('>Visual Nutrition<')
    expect(pageContent).toContain('See macros at a glance')
  })

  it('should have Smart Categories feature with tag icon', () => {
    expect(pageContent).toContain('i-heroicons-tag')
    expect(pageContent).toContain('>Smart Categories<')
    expect(pageContent).toContain('Discover foods by nutrition goals')
  })

  it('should use UIcon component for icons', () => {
    expect(pageContent).toContain('<UIcon')
  })

  it('should have aria-hidden on icons for accessibility', () => {
    expect(pageContent).toContain('aria-hidden="true"')
  })
})

describe('Homepage - SEO Metadata', () => {
  const pagePath = path.resolve(__dirname, '../../pages/index.vue')
  let pageContent: string

  beforeEach(() => {
    pageContent = fs.readFileSync(pagePath, 'utf-8')
  })

  it('should use useHead for SEO metadata', () => {
    expect(pageContent).toContain('useHead({')
  })

  it('should have page title', () => {
    expect(pageContent).toContain("title: 'Nutrition Hub - Instant Food Nutrition Search'")
  })

  it('should have meta description', () => {
    expect(pageContent).toContain("name: 'description'")
    expect(pageContent).toContain('Search any food and get instant nutrition facts')
  })

  it('should have viewport meta tag', () => {
    expect(pageContent).toContain("name: 'viewport'")
    expect(pageContent).toContain('width=device-width, initial-scale=1')
  })

  it('should have Open Graph title', () => {
    expect(pageContent).toContain("property: 'og:title'")
    expect(pageContent).toContain('Nutrition Hub - Instant Food Nutrition Search')
  })

  it('should have Open Graph description', () => {
    expect(pageContent).toContain("property: 'og:description'")
    expect(pageContent).toContain('Search any food and get instant nutrition facts')
  })

  it('should have Open Graph type', () => {
    expect(pageContent).toContain("property: 'og:type'")
    expect(pageContent).toContain('website')
  })

  it('should have Open Graph url', () => {
    expect(pageContent).toContain("property: 'og:url'")
    expect(pageContent).toContain('nutrition-hub.example.com')
  })

  it('should have Twitter Card', () => {
    expect(pageContent).toContain("name: 'twitter:card'")
    expect(pageContent).toContain('summary_large_image')
  })

  it('should have Twitter Card title', () => {
    expect(pageContent).toContain("name: 'twitter:title'")
  })

  it('should have Twitter Card description', () => {
    expect(pageContent).toContain("name: 'twitter:description'")
  })
})

describe('Homepage - JSON-LD Schema', () => {
  const pagePath = path.resolve(__dirname, '../../pages/index.vue')
  let pageContent: string

  beforeEach(() => {
    pageContent = fs.readFileSync(pagePath, 'utf-8')
  })

  it('should have JSON-LD script tag for Organization schema', () => {
    expect(pageContent).toContain("type: 'application/ld+json'")
    expect(pageContent).toContain('@context')
    expect(pageContent).toContain('@type')
    expect(pageContent).toContain('Organization')
    expect(pageContent).toContain('Nutrition Hub')
  })

  it('should have WebSite schema with searchAction for rich search results', () => {
    expect(pageContent).toContain("type: 'application/ld+json'")
    expect(pageContent).toContain("'@type': 'WebSite'")
    expect(pageContent).toContain('WebSite')
    expect(pageContent).toContain('SearchAction')
    expect(pageContent).toContain('search_term_string')
    expect(pageContent).toContain('potentialAction')
  })
})

describe('Homepage - Accessibility', () => {
  const pagePath = path.resolve(__dirname, '../../pages/index.vue')
  let pageContent: string

  beforeEach(() => {
    pageContent = fs.readFileSync(pagePath, 'utf-8')
  })

  it('should have proper heading hierarchy (h1 -> h3)', () => {
    expect(pageContent).toContain('<h1')
    expect(pageContent).toContain('<h3')
    expect(pageContent).toMatch(/<h1[^>]*>[\s\S]*?<\/h1>[\s\S]*?<h3/)
  })

  it('should have semantic section elements', () => {
    expect(pageContent).toContain('<section')
    expect(pageContent).toContain('aria-label')
  })

  it('should have proper color for highlighted text (#059669 for WCAG AA)', () => {
    expect(pageContent).toContain('color: #059669')
  })

  it('should have focus indicators on example links', () => {
    expect(pageContent).toContain('.example-link:focus')
    expect(pageContent).toContain('outline')
  })

  it('should have minimum 44px touch targets on example links', () => {
    expect(pageContent).toContain('min-height: 44px')
    expect(pageContent).toContain('min-width: 44px')
  })
})

describe('Homepage - Responsive Design', () => {
  const pagePath = path.resolve(__dirname, '../../pages/index.vue')
  let pageContent: string

  beforeEach(() => {
    pageContent = fs.readFileSync(pagePath, 'utf-8')
  })

  it('should have responsive grid for features section', () => {
    expect(pageContent).toContain('grid-template-columns: repeat(auto-fit, minmax(250px, 1fr))')
  })

  it('should have media query for mobile responsiveness', () => {
    expect(pageContent).toContain('@media (max-width: 640px)')
  })

  it('should have smaller title on mobile', () => {
    expect(pageContent).toMatch(/\.hero-title\s*\{[\s\S]*?font-size:\s*2rem/)
  })

  it('should adjust padding on mobile', () => {
    expect(pageContent).toMatch(/\.features-section[\s\S]*?padding:\s*2rem\s*1rem/)
  })
})

describe('Homepage - CSS Styling', () => {
  const pagePath = path.resolve(__dirname, '../../pages/index.vue')
  let pageContent: string

  beforeEach(() => {
    pageContent = fs.readFileSync(pagePath, 'utf-8')
  })

  it('should have scoped styles', () => {
    expect(pageContent).toContain('<style scoped>')
  })

  it('should have hero section styling', () => {
    expect(pageContent).toContain('.hero-section {')
    expect(pageContent).toContain('text-align: center')
    expect(pageContent).toContain('padding: 4rem 1rem')
  })

  it('should have hero title styling', () => {
    expect(pageContent).toContain('.hero-title {')
    expect(pageContent).toContain('font-size: 3rem')
    expect(pageContent).toContain('font-weight: 700')
    expect(pageContent).toContain('line-height: 1.2')
  })

  it('should have search container styling', () => {
    expect(pageContent).toContain('.search-container {')
    expect(pageContent).toContain('max-width: 600px')
    expect(pageContent).toContain('margin: 0 auto 2rem')
  })

  it('should have example searches styling with flexbox', () => {
    expect(pageContent).toContain('.example-searches {')
    expect(pageContent).toContain('display: flex')
    expect(pageContent).toContain('justify-content: center')
    expect(pageContent).toContain('flex-wrap: wrap')
  })

  it('should have feature section styling', () => {
    expect(pageContent).toContain('.features-section {')
    expect(pageContent).toContain('display: grid')
    expect(pageContent).toContain('gap: 2rem')
    expect(pageContent).toContain('max-width: 1200px')
  })

  it('should have feature icon styling', () => {
    expect(pageContent).toContain('.feature-icon {')
    expect(pageContent).toContain('font-size: 3rem')
    expect(pageContent).toContain('color: #059669')
  })
})
