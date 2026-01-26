/// <reference types="vitest" />
import { describe, it, expect } from 'vitest'

describe('Nuxt 4 Project Initialization', () => {
  describe('Acceptance Criteria 1: Project Setup', () => {
    it('should have nutrition-hub as project name', () => {
      const pkg = require('../package.json')
      expect(pkg.name).toBe('nutrition-hub')
    })

    it('should have Nuxt v4 dependency', () => {
      const pkg = require('../package.json')
      expect(pkg.dependencies.nuxt).toBeDefined()
      expect(pkg.dependencies.nuxt).toMatch('^4.')
    })

    it('should have TypeScript enabled', () => {
      const fs = require('fs')
      expect(fs.existsSync('tsconfig.json')).toBe(true)
      const nuxtTsconfig = require('../.nuxt/tsconfig.json')
      expect(nuxtTsconfig.compilerOptions.strict).toBe(true)
    })

    it('should have required directories', () => {
      const fs = require('fs')
      const dirs = ['pages', 'components', 'composables', 'server', 'types', 'utils', 'app']
      dirs.forEach(dir => {
        expect(fs.existsSync(dir)).toBe(true)
      })
    })
  })

  describe('Acceptance Criteria 2: Dependency Installation', () => {
    it('should have @nuxt/ui module', () => {
      const pkg = require('../package.json')
      expect(pkg.dependencies['@nuxt/ui']).toBeDefined()
    })

    it('should have @nuxt/icon module', () => {
      const pkg = require('../package.json')
      expect(pkg.dependencies['@nuxt/icon']).toBeDefined()
    })

    it('should have better-sqlite3', () => {
      const pkg = require('../package.json')
      expect(pkg.dependencies['better-sqlite3']).toBeDefined()
    })

    it('should have html2canvas and types', () => {
      const pkg = require('../package.json')
      expect(pkg.dependencies['html2canvas']).toBeDefined()
      expect(pkg.dependencies['@types/html2canvas']).toBeDefined()
    })
  })

  describe('Acceptance Criteria 3: Configuration', () => {
    it('should configure nuxt.config.ts with required modules', () => {
      const fs = require('fs')
      const config = fs.readFileSync('nuxt.config.ts', 'utf-8')
      expect(config).toContain("'@nuxt/ui'")
      expect(config).toContain("'@nuxt/icon'")
    })

    it('should have SSR enabled', () => {
      const fs = require('fs')
      const config = fs.readFileSync('nuxt.config.ts', 'utf-8')
      expect(config).toContain('ssr: true')
    })

    it('should have devtools enabled', () => {
      const fs = require('fs')
      const config = fs.readFileSync('nuxt.config.ts', 'utf-8')
      expect(config).toContain('devtools')
      expect(config).toContain('enabled: true')
    })

    it('should have proper .gitignore entries', () => {
      const fs = require('fs')
      const gitignore = fs.readFileSync('.gitignore', 'utf-8')
      expect(gitignore).toContain('node_modules')
      expect(gitignore).toContain('.nuxt')
      expect(gitignore).toContain('.env.local')
      expect(gitignore).toContain('data/*.db')
    })
  })

  describe('Acceptance Criteria 4: TypeScript Configuration', () => {
    it('should have strict mode enabled', () => {
      const nuxtTsconfig = require('../.nuxt/tsconfig.json')
      expect(nuxtTsconfig.compilerOptions.strict).toBe(true)
    })
  })

  describe('Project Structure Verification', () => {
    it('should have pages/index.vue with SearchBar and SEO', () => {
      const fs = require('fs')
      const indexVue = fs.readFileSync('pages/index.vue', 'utf-8')
      // Story 2.7: Homepage with Search Interface
      expect(indexVue).toContain('SearchBar')
      expect(indexVue).toContain('useHead')
      expect(indexVue).toContain('Know Your Food')
      expect(indexVue).toContain('hero-section')
    })

    it('should have app/app.vue entry point', () => {
      const fs = require('fs')
      expect(fs.existsSync('app/app.vue')).toBe(true)
    })
  })
})
