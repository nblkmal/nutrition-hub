# Story 1.1: Project Initialization with Nuxt v4

Status: ready-for-dev

## Story

As a **developer**,
I want to **initialize a new Nuxt v4 project with TypeScript and required dependencies**,
so that **I have a modern, type-safe foundation for building the application**.

## Acceptance Criteria

**Given** I have Node.js 18+ installed
**When** I run the initialization commands
**Then** a new Nuxt 4 project is created with the following specifications:

### 1. Project Setup
- [ ] Project name: `nutrition-hub`
- [ ] Nuxt v4 with TypeScript enabled
- [ ] Package manager: npm (or yarn/pnpm based on developer preference)
- [ ] Initial project structure follows Nuxt conventions:
  ```
  nutrition-hub/
  ├── pages/
  ├── components/
  ├── composables/
  ├── server/
  ├── types/
  ├── utils/
  ├── nuxt.config.ts
  ├── package.json
  └── tsconfig.json
  ```

### 2. Dependency Installation
- [ ] Nuxt UI v4 module added: `npx nuxi@latest module add @nuxt/ui`
- [ ] @nuxt/icon module added: `npx nuxi@latest module add @nuxt/icon`
- [ ] better-sqlite3 installed: `npm install better-sqlite3`
- [ ] html2canvas and types installed: `npm install html2canvas @types/html2canvas`
- [ ] All dependencies install without errors
- [ ] `npm run dev` starts development server successfully on http://localhost:3000

### 3. Configuration
- [ ] `nuxt.config.ts` includes:
  ```typescript
  export default defineNuxtConfig({
    modules: ['@nuxt/ui', '@nuxt/icon'],
    devtools: { enabled: true },
    ssr: true,
  })
  ```
- [ ] TypeScript configuration includes strict mode
- [ ] `.gitignore` excludes `node_modules/`, `.nuxt/`, `.env.local`

### 4. Verification
- [ ] Welcome page displays at http://localhost:3000
- [ ] Nuxt UI components are auto-imported (test with `<UButton>`)
- [ ] No console errors on initial load
- [ ] Hot Module Replacement (HMR) works for file changes

## Tasks / Subtasks

- [ ] **Initialize Nuxt v4 Project** (AC: 1)
  - [ ] Run `npx nuxi@latest init nutrition-hub`
  - [ ] Verify TypeScript is enabled by default
  - [ ] Verify project structure matches Nuxt conventions
  - [ ] Navigate to project directory

- [ ] **Install Nuxt Modules** (AC: 2)
  - [ ] Run `npx nuxi@latest module add @nuxt/ui`
  - [ ] Run `npx nuxi@latest module add @nuxt/icon`
  - [ ] Verify modules appear in `nuxt.config.ts`

- [ ] **Install Additional Dependencies** (AC: 2)
  - [ ] Run `npm install better-sqlite3`
  - [ ] Run `npm install html2canvas @types/html2canvas`
  - [ ] Verify all packages in `package.json`

- [ ] **Configure Nuxt** (AC: 3)
  - [ ] Update `nuxt.config.ts` with modules configuration
  - [ ] Enable SSR in configuration
  - [ ] Enable devtools
  - [ ] Verify TypeScript strict mode in `tsconfig.json`

- [ ] **Setup Git Configuration** (AC: 3)
  - [ ] Update `.gitignore` with standard Nuxt exclusions
  - [ ] Add `node_modules/`, `.nuxt/`, `.env.local`
  - [ ] Add `data/*.db` for SQLite database files

- [ ] **Verify Development Server** (AC: 4)
  - [ ] Run `npm run dev`
  - [ ] Navigate to http://localhost:3000
  - [ ] Verify welcome page displays correctly
  - [ ] Test Nuxt UI component: Add `<UButton>` to default page
  - [ ] Verify HMR works: Make a change and see instant update
  - [ ] Check console for errors

## Dev Notes

### Critical Architecture Patterns

**Nuxt v4 Conventions:**
- File-based routing in `/pages` directory [Source: architecture.md#L270]
- Auto-imports for components, composables, utilities [Source: architecture.md#L271]
- Server routes in `/server/api` for API endpoints [Source: architecture.md#L272]
- TypeScript strict mode required for type safety [Source: architecture.md#L249]

**Nuxt UI Integration:**
- 125+ accessible components with WCAG compliance [Source: architecture.md#L188]
- Built-in dark mode support via @nuxt/color-mode [Source: architecture.md#L256]
- Tailwind CSS configured automatically [Source: architecture.md#L254]

### Exact Commands to Execute

```bash
# Step 1: Create Nuxt 4 project
npx nuxi@latest init nutrition-hub

# Step 2: Navigate to project
cd nutrition-hub

# Step 3: Install dependencies
npm install

# Step 4: Add Nuxt UI module
npx nuxi@latest module add @nuxt/ui

# Step 5: Add @nuxt/icon module
npx nuxi@latest module add @nuxt/icon

# Step 6: Install additional dependencies
npm install better-sqlite3 html2canvas @types/html2canvas

# Step 7: Start development server
npm run dev
```

[Source: architecture.md#L225-L240]

### Project Structure Notes

**Alignment with Nuxt v4 Architecture:**
- `/pages` - File-based routing for pages like `/`, `/foods/[slug]`
- `/components` - Vue components (auto-imported)
- `/composables` - Vue composables for shared logic (auto-imported)
- `/server` - Nitro server routes and middleware
- `/types` - TypeScript type definitions
- `/utils` - Utility functions

**Expected File Locations:**
- Configuration: `nuxt.config.ts`, `tsconfig.json`
- Git: `.gitignore`, `.git/` (initialized by `nuxi init`)
- Entry point: `app.vue` or `pages/index.vue` (Nuxt convention)

**No Conflicts Detected** - This story establishes the foundation that all other stories build upon.

### Testing Standards

**Verification Requirements:**
- Development server starts without errors
- Welcome page loads at http://localhost:3000
- Nuxt UI components render correctly (test with `<UButton>`)
- Hot Module Replacement (HMR) works for instant updates
- TypeScript compilation succeeds with strict mode
- No console errors or warnings

**Manual Testing Steps:**
1. Start dev server: `npm run dev`
2. Open browser to http://localhost:3000
3. Verify welcome page displays
4. Modify `app.vue` or `pages/index.vue`
5. Verify HMR updates page instantly
6. Add `<UButton>Test</UButton>` to test Nuxt UI
7. Check browser console for errors

### Prerequisites

**None** - This is the first story in the implementation phase.

**Dependencies:**
- Node.js 18+ must be installed
- Git should be installed (for version control)
- npm, yarn, or pnpm package manager

### Next Stories

This story enables:
- **Story 1.2** - SQLite Database Schema Implementation (needs project structure)
- **Story 1.4** - Server Routes Infrastructure Setup (needs Nuxt project)

## References

**Architecture Document:**
- [Source: docs/architecture.md#L225-L240] - Initialization commands
- [Source: docs/architecture.md#L248-L281] - Architectural decisions from Nuxt starter
- [Source: docs/architecture.md#L99-L100] - Technology stack (Nuxt v4 + Nuxt UI)
- [Source: docs/architecture.md#L270-L274] - Code organization patterns

**PRD References:**
- Project is a portfolio showcase demonstrating modern full-stack engineering
- Zero-cost infrastructure requirement for sustainability

**Epic Context:**
- Epic 1 establishes the complete technical foundation
- All 44 stories depend on successful completion of this initialization
- This story must be completed before any other implementation story

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

claude-sonnet-4-20250514

### Debug Log References

### Completion Notes List

### File List

- `nutrition-hub/nuxt.config.ts` - Nuxt configuration file
- `nutrition-hub/tsconfig.json` - TypeScript configuration
- `nutrition-hub/package.json` - Dependencies and scripts
- `nutrition-hub/.gitignore` - Git exclusions
- `nutrition-hub/app.vue` or `nutrition-hub/pages/index.vue` - Entry point
