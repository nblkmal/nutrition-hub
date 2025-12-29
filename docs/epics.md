# nutrition-hub - Epic Breakdown

**Author:** Nabilakmal
**Date:** 2025-12-24
**Project Level:** Portfolio Showcase
**Target Scale:** Solo Developer, Full-Stack MVP

---

## Overview

This document provides the complete epic and story breakdown for nutrition-hub, decomposing the requirements from the [PRD](./prd.md) into implementable stories.

**Living Document Notice:** This is the initial version incorporating all PRD requirements and Architecture decisions. Stories include complete technical implementation guidance.

**Epic Summary:** 8 Epics with 44 Stories covering all 50 Functional Requirements

| Epic | Stories | FR Coverage | Primary Focus |
|------|---------|-------------|---------------|
| 1. Foundation | 7 | Enables all | Technical platform setup |
| 2. Search & Discovery | 8 | FR1-FR13 | User-facing search experience |
| 3. Autocategorization | 6 | FR14-FR23 | Smart category engine |
| 4. Advanced Analytics | 4 | FR18-FR20 | Data science features |
| 5. Social Sharing | 4 | FR24-FR28 | Viral growth loop |
| 6. Admin Dashboard | 3 | FR29-FR35 | System monitoring |
| 7. Content Management | 4 | FR45-FR50 | SEO and CRUD |
| 8. Polish & Accessibility | 7 | FR36-FR44 | Professional quality |
| **TOTAL** | **44** | **50/50 (100%)** | **Complete MVP** |

---

## Context Validation

**✅ Prerequisites Verified:**

| Document | Status | Content Loaded |
|----------|--------|----------------|
| **PRD.md** | ✅ Complete | 50 Functional Requirements across 7 capability areas (Food Discovery, Nutrition Display, Categorization, Social Sharing, System Administration, UX/Accessibility, Content Management) |
| **Architecture.md** | ✅ Complete | Technical stack (Nuxt v4 + Nuxt UI + SQLite + Vercel), database schema, API caching strategy, autocategorization algorithm, implementation patterns |
| **UX Design.md** | ⚠️ Not Available | Stories will reference standard UX patterns from Nuxt UI components |

**Technical Context Available:**

- **Database:** SQLite with `foods`, `categories`, `food_categories` tables, better-sqlite3 package
- **API Integration:** CalorieNinjas with SQLite-first caching strategy (95%+ target hit rate)
- **Autocategorization:** JSON rule engine with match scoring (0-100), Jaccard similarity for analytics
- **Frontend:** Nuxt v4, Nuxt UI, @nuxt/icon, Vue 3 Composition API, dark mode built-in
- **Infrastructure:** Vercel deployment, Vercel Blob storage, serverless architecture
- **Implementation Patterns:** Naming conventions, API response formats, error handling, loading states

---

## Functional Requirements Inventory

**Total Requirements:** 50 Functional Requirements organized into 7 capability areas

### 1. Food Discovery & Search (7 FRs)
- **FR1:** Users can search for foods by name and receive instant autocomplete suggestions
- **FR2:** Users can submit search queries and receive relevant food results ranked by match relevance
- **FR3:** The system can query local SQLite database for foods and return results
- **FR4:** The system can fetch nutrition data from external API (CalorieNinjas) when food is not in local database
- **FR5:** The system can cache externally fetched nutrition data in local database for future queries
- **FR6:** Users can view search results on mobile, tablet, and desktop devices
- **FR7:** Users can navigate to food detail pages from search results

### 2. Nutrition Information Display (6 FRs)
- **FR8:** Users can view comprehensive nutrition information for individual foods including calories, protein, carbohydrates, fat, fiber, and sugar
- **FR9:** Users can view nutrition data displayed visually with progress indicators for key macronutrients
- **FR10:** Users can view serving size information standardized to 100g portions
- **FR11:** Users can view related foods that belong to the same nutrition category as the current food
- **FR12:** The system can serve food detail pages that are discoverable by search engines (SEO-optimized)
- **FR13:** The system can provide unique URLs for each food that support deep-linking from shared content

### 3. Categorization & Analytics (10 FRs)
- **FR14:** The system can automatically assign foods to nutrition categories based on JSON-defined rules
- **FR15:** The system can evaluate foods against category criteria and assign match scores (0-100)
- **FR16:** Users can view all nutrition categories that a specific food belongs to
- **FR17:** Users can browse foods by nutrition category
- **FR18:** Users can view a leaderboard of foods ranked by versatility across multiple categories
- **FR19:** Users can view category overlap analysis showing relationships between nutrition categories
- **FR20:** Users can discover "bridge foods" that connect disparate nutrition categories
- **FR21:** Administrators can define and modify category rules using JSON configuration
- **FR22:** Administrators can manually override automatic categorization for specific foods
- **FR23:** The system can batch categorize multiple foods in a single operation

### 4. Social Sharing & Virality (5 FRs)
- **FR24:** Users can share food nutrition information to social media platforms (Twitter/X, LinkedIn)
- **FR25:** Users can copy shareable links to food nutrition information
- **FR26:** The system can generate visual nutrition cards for sharing on social media
- **FR27:** The system can provide rich link previews when content is shared on social media platforms (Open Graph tags)
- **FR28:** The system can provide enhanced previews when content is shared on Twitter (Twitter Card tags)

### 5. System Administration (7 FRs)
- **FR29:** Administrators can view analytics dashboard showing system metrics and usage statistics
- **FR30:** Administrators can monitor API usage and track remaining API quota
- **FR31:** Administrators can view cache performance metrics including hit rate and miss analysis
- **FR32:** Administrators can view search analytics including trending foods and popular categories
- **FR33:** Administrators can monitor system health including slow queries and error rates
- **FR34:** The system can send alerts when API quota approaches monthly limit
- **FR35:** The system can export analytics data for portfolio documentation purposes

### 6. User Experience & Accessibility (9 FRs)
- **FR36:** Users can access all functionality using keyboard-only navigation
- **FR37:** Users can perceive all content with screen readers and other assistive technologies
- **FR38:** Users can view content with sufficient color contrast (WCAG 2.1 AA standard)
- **FR39:** Users can resize text up to 200% without horizontal scrolling
- **FR40:** Users can access content on mobile, tablet, and desktop devices with responsive layouts
- **FR41:** Users can switch between light and dark visual themes
- **FR42:** Users can view loading states and skeleton screens while content is being fetched
- **FR43:** Users can receive clear error messages when functionality fails or is unavailable
- **FR44:** Users can navigate using consistent navigation patterns across all pages

### 7. Content Management (6 FRs)
- **FR45:** Administrators can add new foods to the database manually
- **FR46:** Administrators can edit nutrition information for existing foods
- **FR47:** Administrators can manage nutrition categories including create, read, update, and delete operations
- **FR48:** The system can generate XML sitemap for search engine crawlers
- **FR49:** The system can provide robots.txt file for search engine crawler guidance
- **FR50:** The system can include structured data markup (Schema.org) for food nutrition information

---

## FR Coverage Map

{{fr_coverage_map}}

---

## Epic 1: Foundation & Core Infrastructure

**Epic Goal:** Establish the complete technical foundation for nutrition-hub including project setup, database schema, server infrastructure, and deployment pipeline.

**User Value:** This epic enables all subsequent functionality by providing the technical platform. While not directly user-facing, it establishes the infrastructure that powers all user experiences.

**PRD Coverage:** Foundation for all FRs, directly enables FR29-FR35 (admin/monitoring infrastructure)

**Technical Context:**
- Project initialization: `npx nuxi@latest init nutrition-hub` (Architecture line 227)
- Nuxt v4 + Nuxt UI + @nuxt/icon setup (Architecture lines 99-100)
- SQLite schema: `foods`, `categories`, `food_categories` tables (Architecture lines 343-395)
- Server routes structure: `/server/api/foods/`, `/server/api/categories/` (Architecture line 858)
- Vercel deployment configuration (Architecture lines 673-691)

**Dependencies:** None (this is the foundation epic)

---

### Story 1.1: Project Initialization with Nuxt v4

As a developer,
I want to initialize a new Nuxt v4 project with TypeScript and required dependencies,
So that I have a modern, type-safe foundation for building the application.

**Acceptance Criteria:**

**Given** I have Node.js 18+ installed
**When** I run the initialization commands
**Then** a new Nuxt 4 project is created with the following specifications:

**Project Setup:**
- Project name: `nutrition-hub`
- Nuxt v4 with TypeScript enabled
- Package manager: npm (or yarn/pnpm based on developer preference)
- Initial project structure follows Nuxt conventions:
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

**Dependency Installation:**
- Nuxt UI v4 module added: `npx nuxi@latest module add @nuxt/ui`
- @nuxt/icon module added: `npx nuxi@latest module add @nuxt/icon`
- better-sqlite3 installed: `npm install better-sqlite3`
- html2canvas and types installed: `npm install html2canvas @types/html2canvas`
- All dependencies install without errors
- `npm run dev` starts development server successfully on http://localhost:3000

**Configuration:**
- `nuxt.config.ts` includes:
  ```typescript
  export default defineNuxtConfig({
    modules: ['@nuxt/ui', '@nuxt/icon'],
    devtools: { enabled: true },
    ssr: true,
  })
  ```
- TypeScript configuration includes strict mode
- `.gitignore` excludes `node_modules/`, `.nuxt/`, `.env.local`

**Verification:**
- Welcome page displays at http://localhost:3000
- Nuxt UI components are auto-imported (test with `<UButton>`)
- No console errors on initial load
- Hot Module Replacement (HMR) works for file changes

**Prerequisites:** None

**Technical Notes:**
- Use exact commands from Architecture document (line 227-240)
- Verify Nuxt v4 version (latest stable)
- Verify Nuxt UI v4 compatibility
- Ensure TypeScript strict mode enabled for type safety
- This creates the foundation for all subsequent development

---

### Story 1.2: SQLite Database Schema Implementation

As a developer,
I want to create the SQLite database schema with all required tables, indexes, and constraints,
So that the application has a structured data store for foods, categories, and relationships.

**Acceptance Criteria:**

**Given** the Nuxt project is initialized
**When** I implement the database schema
**Then** the following database structure is created:

**Database File and Connection:**
- SQLite database file created at: `./data/nutrition-hub.db`
- Database connection utility created at: `server/utils/database.ts`
- Connection uses better-sqlite3 package
- Database file and directory are gitignored (add `data/*.db` to `.gitignore`)

**Foods Table:**
```sql
CREATE TABLE foods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  serving_size_g REAL NOT NULL,
  calories REAL NOT NULL,
  protein_g REAL NOT NULL,
  carbohydrates_total_g REAL NOT NULL,
  fat_total_g REAL NOT NULL,
  fat_saturated_g REAL DEFAULT 0,
  fiber_g REAL DEFAULT 0,
  sugar_g REAL DEFAULT 0,
  sodium_mg INTEGER DEFAULT 0,
  potassium_mg INTEGER DEFAULT 0,
  cholesterol_mg INTEGER DEFAULT 0,
  data_source TEXT DEFAULT 'calorieninjas',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Categories Table:**
```sql
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  rules_json TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Food-Categories Junction Table:**
```sql
CREATE TABLE food_categories (
  food_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  match_score REAL DEFAULT 100,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (food_id, category_id),
  FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
```

**Performance Indexes:**
```sql
CREATE INDEX idx_foods_name ON foods(name);
CREATE INDEX idx_foods_slug ON foods(slug);
CREATE INDEX idx_foods_protein ON foods(protein_g);
CREATE INDEX idx_food_categories_food ON food_categories(food_id);
CREATE INDEX idx_food_categories_category ON food_categories(category_id);
```

**Database Utilities:**
- Schema migration script created at: `server/database/migrations/001_initial_schema.sql`
- Database initialization function: `initDatabase()` in `server/utils/database.ts`
- Database connection exported as: `export const db = getDatabase()`
- Type definitions created in `types/database.ts` matching schema

**Verification:**
- Database file is created on first run
- All tables are created successfully
- All indexes are created successfully
- Foreign key constraints are enforced
- Inserting a food with duplicate `slug` raises constraint error
- Cascade delete works: deleting a food removes its `food_categories` entries

**Prerequisites:** Story 1.1 - Project Initialization Complete

**Technical Notes:**
- Follow Architecture schema design exactly (lines 343-395)
- Use `snake_case` for all table and column names (Architecture line 783)
- Use better-sqlite3 synchronous API (simpler than async for serverless)
- Create TypeScript interfaces for all tables in `types/database.ts`
- Consider seed data script for development (Story 1.4)

---

### Story 1.3: Database Seed Data with Common Foods

As a developer,
I want to seed the database with 100-200 common foods,
So that the application has useful data for testing and initial user searches.

**Acceptance Criteria:**

**Given** the database schema is implemented
**When** I run the seed script
**Then** the database is populated with common food items:

**Seed Data Requirements:**
- 100-200 common foods across categories:
  - Proteins: chicken breast, turkey, fish (salmon, tuna), lean beef, eggs
  - Carbohydrates: rice, potatoes, oats, quinoa, bread, pasta
  - Vegetables: broccoli, spinach, carrots, tomatoes, avocados
  - Fruits: bananas, apples, berries, oranges
  - Dairy: milk, Greek yogurt, cottage cheese, cheese
  - Nuts/seeds: almonds, walnuts, chia seeds, peanut butter

**Nutrition Data Accuracy:**
- All nutrition values per 100g serving (standardized)
- Required fields populated: name, slug, calories, protein_g, carbohydrates_total_g, fat_total_g
- Optional fields populated where available: fiber_g, sugar_g, sodium_mg, potassium_mg
- `data_source` set to `'seed'` for manually entered foods
- Slugs are URL-safe (lowercase, hyphen-separated)

**Seed Script Implementation:**
- Seed script created at: `server/database/seed.ts`
- Run with: `npm run seed` (add script to package.json)
- Seed data can be reset with: `npm run seed:reset` (drops and recreates data)
- Idempotent: running multiple times doesn't create duplicates

**Categories Seeded:**
- 5-10 initial nutrition categories:
  - High Protein (≥20g protein per 100g)
  - Low Carb (≤10g carbs per 100g)
  - Healthy Fats (high fat, quality sources)
  - High Fiber (≥5g fiber per 100g)
  - Low Calorie (≤100 calories per 100g)
- Categories have `rules_json` defined with match criteria
- Initial food-category relationships established based on rules

**Verification:**
- After seeding, `SELECT COUNT(*) FROM foods` returns 100-200
- After seeding, `SELECT COUNT(*) FROM categories` returns 5-10
- Common searches return results: "chicken", "egg", "rice", "salmon"
- All seeded foods have valid nutrition data
- No duplicate slugs exist

**Prerequisites:** Story 1.2 - Database Schema Implementation

**Technical Notes:**
- Use accurate nutrition data from USDA FoodData Central or similar sources
- Consider importing from CSV or JSON file for maintainability
- Slugs should be generated consistently: `slugify(name)` utility function
- This data enables immediate testing of search functionality
- Seeded categories will be used for autocategorization testing

---

### Story 1.4: Server Routes Infrastructure Setup

As a developer,
I want to create the server routes infrastructure following Nuxt conventions,
So that API endpoints are organized and ready for implementation.

**Acceptance Criteria:**

**Given** the database schema is implemented
**When** I set up the server routes structure
**Then** the following API endpoint structure exists:

**Directory Structure:**
```
server/
└── api/
    ├── foods/
    │   ├── index.ts           # GET /api/foods (list, search)
    │   ├── [foodId].ts        # GET/PUT/DELETE /api/foods/:foodId
    │   └── search.ts          # POST /api/foods/search
    ├── categories/
    │   ├── index.ts           # GET /api/categories (list)
    │   ├── [categoryId].ts    # GET/PUT/DELETE /api/categories/:categoryId
    │   └── rules.ts           # POST /api/categories/batch-categorize
    └── admin/
        └── analytics.ts       # GET /api/admin/analytics
```

**Route Placeholder Implementations:**
- Each route file exists with basic structure
- All routes use `defineEventHandler()` from Nuxt
- All routes follow API response format: `{ data, success }` or `{ error, success }` (Architecture lines 891-941)
- All routes have error handling with `try/catch`
- All routes return 404 for missing resources

**Standard Response Format:**
- Success responses: `{ data: {...}, success: true }`
- Error responses: `{ error: { message, code, statusCode }, success: false }`
- Database `snake_case` transformed to API `camelCase` in all routes (Architecture lines 1200-1217)

**Example Placeholder Route:**
```typescript
// server/api/foods/index.ts
export default defineEventHandler(async (event) => {
  try {
    // TODO: Implement logic
    return {
      data: [],
      meta: { total: 0, page: 1, limit: 20 },
      success: true
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: 'Internal server error',
      statusMessage: 'INTERNAL_ERROR'
    })
  }
})
```

**Utilities Created:**
- `server/utils/transform.ts`: Transform database rows to API responses (snake_case → camelCase)
- `server/utils/response.ts`: Standard response wrappers
- `server/utils/errors.ts`: Error creation helpers with standard codes

**Verification:**
- All route files exist and are syntactically valid
- Each route returns valid response format
- Accessing `/api/foods` returns `{ data: [], success: true }`
- Accessing non-existent route returns 404
- No console errors on any route

**Prerequisites:** Story 1.2 - Database Schema Implementation

**Technical Notes:**
- Follow Nuxt server routes conventions (Architecture lines 853-859)
- Use descriptive route parameters: `:foodId` not `:id` (Architecture line 806)
- Group related endpoints in feature directories (Architecture line 854)
- All routes must follow response wrapper format (Architecture lines 891-941)
- This creates the skeleton for implementing actual business logic in Epic 2

---

### Story 1.5: TypeScript Type Definitions

As a developer,
I want to create comprehensive TypeScript type definitions for all data structures,
So that I have type safety throughout the application.

**Acceptance Criteria:**

**Given** the database schema is defined
**When** I create TypeScript type definitions
**Then** the following types are defined:

**Database Types (`types/database.ts`):**
```typescript
// Database row types (snake_case)
export interface FoodDbRow {
  id: number;
  name: string;
  slug: string;
  serving_size_g: number;
  calories: number;
  protein_g: number;
  carbohydrates_total_g: number;
  fat_total_g: number;
  fat_saturated_g: number;
  fiber_g: number;
  sugar_g: number;
  sodium_mg: number;
  potassium_mg: number;
  cholesterol_mg: number;
  data_source: string;
  created_at: string;
  updated_at: string;
}

export interface CategoryDbRow {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  rules_json: string;
  display_order: number;
  is_active: number;
  created_at: string;
}

export interface FoodCategoryDbRow {
  food_id: number;
  category_id: number;
  match_score: number;
  assigned_at: string;
}
```

**API Types (`types/api.ts`):**
```typescript
// API response types (camelCase)
export interface Food {
  id: number;
  name: string;
  slug: string;
  servingSizeG: number;
  calories: number;
  proteinG: number;
  carbohydratesTotalG: number;
  fatTotalG: number;
  fatSaturatedG: number;
  fiberG: number;
  sugarG: number;
  sodiumMg: number;
  potassiumMg: number;
  cholesterolMg: number;
  dataSource: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  icon: string | null;
  rulesJson: CategoryRule;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
}

export interface CategoryRule {
  name: string;
  description: string;
  weight: number;
  conditions: {
    minProteinG?: number;
    maxProteinG?: number;
    minProteinPerCalorie?: number;
    maxCarbsG?: number;
    minCarbsG?: number;
    maxFatG?: number;
    maxSaturatedFatG?: number;
    minFiberG?: number;
    maxSugarG?: number;
    maxCalories?: number;
    minCalories?: number;
  };
}
```

**API Response Wrapper Types:**
```typescript
export interface ApiResponse<T> {
  data: T;
  success: true;
}

export interface ApiListResponse<T> {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
  success: true;
}

export interface ApiError {
  error: {
    message: string;
    code: string;
    statusCode: number;
  };
  success: false;
}
```

**Composables State Types (`types/composables.ts`):**
```typescript
export interface UseAsyncState<T> {
  data: Ref<T | null>;
  loading: Ref<boolean>;
  error: Ref<string | null>;
}
```

**CalorieNinjas API Types:**
```typescript
export interface CalorieNinjasResponse {
  sugar_g: number;
  fiber_g: number;
  serving_size_g: number;
  sodium_mg: number;
  name: string;
  potassium_mg: number;
  fat_saturated_g: number;
  fat_total_g: number;
  calories: number;
  cholesterol_mg: number;
  protein_g: number;
  carbohydrates_total_g: number;
}
```

**Verification:**
- All types are exported from `types/index.ts`
- No TypeScript errors in the project
- Database types match schema exactly (snake_case)
- API types use camelCase consistently
- Type definitions include all optional fields
- Auto-imported types work in composables and components

**Prerequisites:** Story 1.2 - Database Schema Implementation

**Technical Notes:**
- Follow naming conventions: PascalCase for types (Architecture line 827)
- Use descriptive suffixes: `Food`, `Category`, `FoodDbRow` (Architecture line 827)
- Co-locate types with features or centralize in `types/index.ts` (Architecture line 828)
- These types will be used throughout: server routes, composables, components

---

### Story 1.6: Vercel Deployment Configuration

As a developer,
I want to configure the project for Vercel deployment with serverless storage,
So that the application can be deployed with zero-cost infrastructure.

**Acceptance Criteria:**

**Given** the Nuxt project is initialized
**When** I configure Vercel deployment
**Then** the following deployment configuration exists:

**Nuxt Configuration (`nuxt.config.ts`):**
```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/icon'],

  // Vercel-specific configuration
  vercel: {
    regions: ['iad1'], // US East
  },

  // Environment variables
  runtimeConfig: {
    // Public (exposed to client)
    public: {
      apiBase: process.env.API_BASE || '/api',
    },
    // Private (server-only)
    calorieNinjasApiKey: process.env.CALORIENINJAS_API_KEY,
    vercelBlobUrl: process.env.VERCEL_BLOB_URL,
    databaseUrl: process.env.DATABASE_URL,
  },
})
```

**Vercel Configuration (`vercel.json`):**
```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "nuxt",
  "regions": ["iad1"],
  "functions": {
    "api/**/*.ts": {
      "maxDuration": 10
    }
  }
}
```

**Environment Variables:**
- `.env.example` file created with all required variables:
  ```
  CALORIENINJAS_API_KEY=your_api_key_here
  VERCEL_BLOB_URL=your_blob_url_here
  DATABASE_URL=your_database_url_here
  ```
- `.env.local` gitignored (add to `.gitignore`)
- Environment variables documented in README

**Vercel Blob Storage Configuration:**
- Vercel Blob package installed: `npm install @vercel/blob`
- Blob storage utility created: `server/utils/storage.ts`
- Database file path configured for Blob storage
- Upload/download functions implemented for SQLite file

**Deployment Scripts:**
- Build script: `npm run build` works without errors
- Production start script: `npm run start` works
- `.vercelignore` excludes unnecessary files

**Deployment Verification:**
- Project deploys successfully to Vercel
- Homepage loads in production
- Server routes return valid responses
- Environment variables are accessible
- Database can read/write from Blob storage

**Documentation:**
- README.md includes deployment instructions
- Vercel project settings documented
- Environment variables setup documented

**Prerequisites:** Story 1.1 - Project Initialization Complete

**Technical Notes:**
- Follow Vercel deployment configuration (Architecture lines 673-691)
- Use Vercel Blob for SQLite file storage (Architecture line 693)
- Serverless architecture enables $0/month dormant costs
- Deploy to Vercel from Git repository (push to deploy)
- Database file stored in Blob: `/nutrition-hub.db`

---

### Story 1.7: Error Handling & Logging Infrastructure

As a developer,
I want to implement consistent error handling and logging across the application,
So that errors are handled gracefully and issues can be debugged effectively.

**Acceptance Criteria:**

**Given** the server routes infrastructure exists
**When** I implement error handling and logging
**Then** the application has robust error management:

**Error Handling Utilities (`server/utils/errors.ts`):**
```typescript
export enum ErrorCode {
  FOOD_NOT_FOUND = 'FOOD_NOT_FOUND',
  CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND',
  API_QUOTA_EXCEEDED = 'API_QUOTA_EXCEEDED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export function createNotFoundError(resource: string, id: string | number) {
  return createError({
    statusCode: 404,
    message: `${resource} not found`,
    statusMessage: `${resource.toUpperCase()}_NOT_FOUND`,
  });
}

export function createApiError(message: string, code: ErrorCode, statusCode: number) {
  return createError({
    statusCode,
    message,
    statusMessage: code,
  });
}
```

**Logging Utility (`server/utils/logger.ts`):**
```typescript
type LogLevel = 'info' | 'warn' | 'error';

export function log(level: LogLevel, message: string, meta?: any) {
  const timestamp = new Date().toISOString();
  const logEntry = { timestamp, level, message, ...meta };

  console.log(JSON.stringify(logEntry));

  // TODO: In production, send to monitoring service (Vercel Analytics)
}

export function logApiCall(endpoint: string, duration: number) {
  log('info', 'API_CALL', { endpoint, duration });
}

export function logError(error: Error, context?: any) {
  log('error', error.message, { stack: error.stack, ...context });
}
```

**Server Route Error Handling Pattern:**
```typescript
export default defineEventHandler(async (event) => {
  try {
    // Route logic here
    return { data: result, success: true };
  } catch (error) {
    logError(error, { route: event.node.req.url });
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal server error',
    });
  }
});
```

**Client-Side Error Handling (`composables/useErrorHandler.ts`):**
```typescript
export function useErrorHandler() {
  const errorMessage = ref<string | null>(null);

  const handleError = (error: any) => {
    console.error('Error:', error);

    // Map error codes to user-friendly messages
    const errorMessages: Record<string, string> = {
      'API_QUOTA_EXCEEDED': 'Search temporarily unavailable. Please try again later.',
      'NETWORK_ERROR': 'Connection problem. Check your internet.',
      'FOOD_NOT_FOUND': 'Food not found.',
      'DEFAULT': 'Something went wrong. Please try again.',
    };

    errorMessage.value = errorMessages[error.code] || errorMessages.DEFAULT;
  };

  return { errorMessage, handleError };
}
```

**Verification:**
- All server routes have try/catch error handling
- Errors are logged with context
- User-friendly error messages displayed in UI
- API errors return standard error format: `{ error, success }`
- No unhandled promise rejections in development console
- 404 errors return proper error response
- 500 errors don't crash the server

**Prerequisites:** Story 1.4 - Server Routes Infrastructure

**Technical Notes:**
- Follow error handling patterns from Architecture (lines 1019-1052)
- All errors return consistent format: `{ error: { message, code, statusCode }, success: false }`
- Log errors for debugging and monitoring
- In production, consider integrating Vercel Analytics for error tracking
- User-facing messages should be friendly, not technical

---

## Epic 1 Completion Review

**Stories Created:** 7

**FR Coverage:** Foundation for all FRs, directly enables FR29-FR35 (System Administration infrastructure)

**Technical Context Used:**
- Project initialization commands (Architecture line 227-240)
- Database schema design (Architecture lines 343-395)
- Server routes structure (Architecture lines 853-859)
- Vercel deployment configuration (Architecture lines 673-691)
- Error handling patterns (Architecture lines 1019-1052)

**Dependencies:** None - This epic establishes the foundation for all subsequent work

**Ready for:** Epic 2 - Search & Food Discovery

---

## Epic 2: Search & Food Discovery

**Epic Goal:** Enable users to instantly search for foods and discover comprehensive nutrition information with SEO-optimized detail pages.

**User Value:** Users can search for any food and instantly see comprehensive nutrition facts, visual indicators, and related foods. This is the first user-facing value delivery.

**PRD Coverage:** FR1-FR7 (Food Discovery & Search), FR8-FR13 (Nutrition Information Display)

**Technical Context:**
- SQLite-first search with autocomplete from `foods` table (Architecture lines 457-483)
- API fallback to CalorieNinjas with immediate caching (Architecture lines 443-489)
- Server routes: `GET /api/foods`, `POST /api/foods/search`, `GET /api/foods/:foodId` (Architecture lines 856-858)
- SSR food detail pages for SEO (PRD lines 526-530)
- Transform database `snake_case` to API `camelCase` (Architecture lines 1200-1217)
- Search autocomplete target: <200ms (NFR-PERF-001)

**Dependencies:** Epic 1 (Foundation & Core Infrastructure)

---

### Story 2.1: Food Search API with SQLite Query

As a developer,
I want to implement the food search API endpoint using SQLite database queries,
So that users can search for foods and receive instant results.

**Acceptance Criteria:**

**Given** the database is seeded with foods
**When** I send a GET request to `/api/foods` with search query
**Then** the API returns matching foods ranked by relevance:

**Search Endpoint Implementation:**
- Route: `GET /api/foods?q={searchQuery}&limit={limit}`
- Query parameters:
  - `q` (optional): Search query string
  - `limit` (optional, default 20): Number of results to return
- Searches `foods.name` using SQLite LIKE pattern matching
- Results ordered by name similarity (exact matches first, then alphabetical)

**SQL Query Implementation:**
```sql
SELECT * FROM foods
WHERE name LIKE :query || '%'
ORDER BY
  CASE WHEN name = :exactQuery THEN 0 ELSE 1 END,
  name ASC
LIMIT :limit
```

**Response Format:**
```typescript
{
  data: Food[],  // Transformed to camelCase
  meta: {
    total: number,
    limit: number
  },
  success: true
}
```

**Empty Query Handling:**
- If no `q` parameter provided, return all foods (paginated)
- If no results found, return empty array: `{ data: [], meta: { total: 0, limit }, success: true }`

**Database to API Transformation:**
- Transform `protein_g` → `proteinG`
- Transform `carbohydrates_total_g` → `carbohydratesTotalG`
- Transform `fat_total_g` → `fatTotalG`
- Transform `serving_size_g` → `servingSizeG`
- Transform all timestamp strings to ISO 8601 format

**Verification:**
- GET `/api/foods?q=chicken` returns chicken breast, chicken thigh, etc.
- GET `/api/foods?q=egg` returns egg, egg white, egg yolk
- GET `/api/foods` (no query) returns all foods (paginated)
- Response time <200ms for cached results (NFR-PERF-001)
- All response fields use camelCase
- No snake_case fields in API response

**Prerequisites:** Story 1.3 (Database Seed Data)

**Technical Notes:**
- Use parameterized queries to prevent SQL injection (NFR-SEC-007)
- Implement query performance logging: `logApiCall('/api/foods', duration)`
- Consider adding full-text search in future (PostgreSQL-specific, not available in SQLite)
- This endpoint is called by search autocomplete component

---

### Story 2.2: Food Detail API Endpoint

As a developer,
I want to implement the food detail API endpoint,
So that users can retrieve comprehensive nutrition information for a specific food.

**Acceptance Criteria:**

**Given** the database contains foods
**When** I send a GET request to `/api/foods/:foodId`
**Then** the API returns complete nutrition information for that food:

**Detail Endpoint Implementation:**
- Route: `GET /api/foods/:foodId`
- Route parameter: `foodId` (integer or string slug)
- Query by both `id` and `slug` for flexible routing
- Returns single food object with all nutrition fields

**SQL Query Implementation:**
```sql
SELECT * FROM foods WHERE id = :foodId OR slug = :foodId
```

**Response Format:**
```typescript
{
  data: {
    id: number,
    name: string,
    slug: string,
    servingSizeG: number,
    calories: number,
    proteinG: number,
    carbohydratesTotalG: number,
    fatTotalG: number,
    fatSaturatedG: number,
    fiberG: number,
    sugarG: number,
    sodiumMg: number,
    potassiumMg: number,
    cholesterolMg: number,
    dataSource: string,
    createdAt: string,  // ISO 8601
    updatedAt: string   // ISO 8601
  },
  success: true
}
```

**Error Handling:**
- If food not found (id/slug doesn't exist):
  - Return 404 status
  - Error response: `{ error: { message: 'Food not found', code: 'FOOD_NOT_FOUND', statusCode: 404 }, success: false }`

**Database to API Transformation:**
- All snake_case fields transformed to camelCase
- Timestamps converted to ISO 8601 strings
- Numeric fields validated (no null values for required fields)

**Verification:**
- GET `/api/foods/1` returns first food with all nutrition data
- GET `/api/foods/chicken-breast` returns food by slug
- GET `/api/foods/99999` returns 404 with proper error format
- Response time <200ms (NFR-PERF-002 target <500ms, but should be faster)
- All nutrition fields present and correctly typed

**Prerequisites:** Story 1.3 (Database Seed Data)

**Technical Notes:**
- Support both id and slug for flexible routing (SEO-friendly URLs)
- Use `createNotFoundError('Food', foodId)` utility from Story 1.7
- This endpoint powers the food detail page (Story 2.5)

---

### Story 2.3: CalorieNinjas API Integration with Caching

As a developer,
I want to integrate the CalorieNinjas API with automatic SQLite caching,
So that missing foods are fetched once and cached forever for zero-cost operation.

**Acceptance Criteria:**

**Given** a food is not found in the local database
**When** I search for that food
**Then** the system fetches from CalorieNinjas API and caches the result:

**CalorieNinjas API Client (`server/utils/calorieninjas.ts`):**
```typescript
interface CalorieNinjasResponse {
  sugar_g: number;
  fiber_g: number;
  serving_size_g: number;
  sodium_mg: number;
  name: string;
  potassium_mg: number;
  fat_saturated_g: number;
  fat_total_g: number;
  calories: number;
  cholesterol_mg: number;
  protein_g: number;
  carbohydrates_total_g: number;
}

async function fetchFromCalorieNinjas(query: string): Promise<CalorieNinjasResponse> {
  const apiKey = process.env.CALORIENINJAS_API_KEY;
  const url = `https://api.calorieninjas.com/v1/nutrition?query=${encodeURIComponent(query)}`;

  const response = await fetch(url, {
    headers: { 'X-Api-Key': apiKey }
  });

  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('API_QUOTA_EXCEEDED');
    }
    throw new Error('API_REQUEST_FAILED');
  }

  const data = await response.json();
  return data;
}
```

**Caching Strategy Implementation:**
```typescript
async function getFoodWithCache(query: string): Promise<Food | null> {
  const db = getDatabase();

  // Phase 1: Check SQLite first
  const slug = slugify(query);
  let food = db.get('SELECT * FROM foods WHERE slug = ?', [slug]);
  if (food) {
    return transformToApiFormat(food);
  }

  // Phase 2: Fetch from CalorieNinjas
  try {
    const apiResponse = await fetchFromCalorieNinjas(query);

    // Phase 3: Cache immediately in SQLite
    const foodToInsert = {
      name: apiResponse.name,
      slug: slug,
      serving_size_g: apiResponse.serving_size_g,
      calories: apiResponse.calories,
      protein_g: apiResponse.protein_g,
      carbohydrates_total_g: apiResponse.carbohydrates_total_g,
      fat_total_g: apiResponse.fat_total_g,
      fat_saturated_g: apiResponse.fat_saturated_g,
      fiber_g: apiResponse.fiber_g,
      sugar_g: apiResponse.sugar_g,
      sodium_mg: apiResponse.sodium_mg,
      potassium_mg: apiResponse.potassium_mg,
      cholesterol_mg: apiResponse.cholesterol_mg,
      data_source: 'calorieninjas'
    };

    const result = db.run(
      `INSERT INTO foods (name, slug, serving_size_g, calories, protein_g,
       carbohydrates_total_g, fat_total_g, fat_saturated_g, fiber_g, sugar_g,
       sodium_mg, potassium_mg, cholesterol_mg, data_source)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [foodToInsert.name, foodToInsert.slug, foodToInsert.serving_size_g,
       foodToInsert.calories, foodToInsert.protein_g, foodToInsert.carbohydrates_total_g,
       foodToInsert.fat_total_g, foodToInsert.fat_saturated_g, foodToInsert.fiber_g,
       foodToInsert.sugar_g, foodToInsert.sodium_mg, foodToInsert.potassium_mg,
       foodToInsert.cholesterol_mg, foodToInsert.data_source]
    );

    food = db.get('SELECT * FROM foods WHERE id = ?', [result.lastID]);
    return transformToApiFormat(food);
  } catch (error) {
    if (error.message === 'API_QUOTA_EXCEEDED') {
      // Graceful degradation - return null, show cached-only message
      return null;
    }
    throw error;
  }
}
```

**Retry Logic:**
- Implement 3 retries with exponential backoff (1s, 2s, 4s delays)
- Retry on 5xx server errors only
- Don't retry on 429 (rate limit) or 4xx (client errors)
- Log all retry attempts

**API Usage Monitoring:**
- Track API calls in analytics (count per day/month)
- Log cache hits vs cache misses
- Alert at 80% of 10,000 monthly quota (8,000 calls)

**Verification:**
- Search for "avocado" (not in seed data) fetches from CalorieNinjas
- Second search for "avocado" returns from SQLite (no API call)
- Cache hit rate tracked in metrics
- API quota exceeded returns null (graceful degradation)
- Retry logic works on transient failures
- All cached foods have `data_source: 'calorieninjas'`

**Prerequisites:** Story 1.3 (Database Seed Data), Story 2.1 (Food Search API)

**Technical Notes:**
- Follow caching strategy from Architecture (lines 443-489)
- Target 95%+ cache hit rate (Architecture line 487)
- Nutrition data is static (100g chicken = 31g protein, forever)
- Immediate caching means call API once, store forever
- This is the core business logic for zero-cost operation

---

### Story 2.4: Search Autocomplete Composable

As a developer,
I want to create a Vue composable for search autocomplete functionality,
So that components can easily implement instant search suggestions.

**Acceptance Criteria:**

**Given** the search API endpoint exists
**When** I use the search composable
**Then** I get reactive search state with instant autocomplete suggestions:

**Composable Implementation (`composables/useFoodSearch.ts`):**
```typescript
export function useFoodSearch() {
  const foods = ref<Food[]>([]);
  const loading = ref<boolean>(false);
  const error = ref<string | null>(null);
  const searchQuery = ref<string>('');

  const searchFoods = async (query: string) => {
    if (!query || query.length < 2) {
      foods.value = [];
      return;
    }

    loading.value = true;
    error.value = null;
    searchQuery.value = query;

    try {
      const response = await $fetch<ApiListResponse<Food>>(
        `/api/foods?q=${encodeURIComponent(query)}&limit=10`
      );

      if (response.success) {
        foods.value = response.data;
      } else {
        throw new Error('Search failed');
      }
    } catch (e) {
      error.value = e.message;
      foods.value = [];
    } finally {
      loading.value = false;
    }
  };

  // Debounced search (300ms delay)
  const debouncedSearch = useDebounceFn(searchFoods, 300);

  return {
    foods,
    loading,
    error,
    searchQuery,
    searchFoods: debouncedSearch
  };
}
```

**State Interface:**
- `foods`: Array of search results
- `loading`: Boolean loading state (true during API call)
- `error`: Error message string or null
- `searchQuery`: Current search query
- `searchFoods`: Function to trigger search (debounced)

**Debounce Implementation:**
- Use VueUse `useDebounceFn` or custom implementation
- 300ms delay prevents excessive API calls
- Cancel pending searches on new input

**Loading States:**
- Show loading indicator while fetching
- Display skeleton screens for better UX
- Clear previous results on new search

**Error Handling:**
- Display user-friendly error messages
- "API_QUOTA_EXCEEDED" → "Search temporarily unavailable. Please try again later."
- "NETWORK_ERROR" → "Connection problem. Check your internet."
- Retry mechanism for failed searches

**Verification:**
- Typing "chic" triggers search after 300ms delay
- Results display: "Chicken Breast", "Chicken Thigh", "Chickpeas"
- Loading spinner shows during fetch
- Empty query clears results
- Errors display user-friendly messages
- Rapid typing doesn't trigger excessive API calls (debounce works)

**Prerequisites:** Story 2.1 (Food Search API)

**Technical Notes:**
- Follow composable pattern from Architecture (lines 969-1001)
- Use standard `{ data, loading, error }` interface (Architecture line 1089)
- Auto-imported by Nuxt from `/composables` directory
- This composable is used by SearchBar component (Story 2.6)

---

### Story 2.5: Food Detail Page (SSR with SEO)

As a developer,
I want to create a server-side rendered food detail page,
So that food information is discoverable by search engines and loads fast for users.

**Acceptance Criteria:**

**Given** the food detail API endpoint exists
**When** I navigate to `/foods/[foodSlug]`
**Then** I see a comprehensive nutrition page with SEO optimization:

**Page Implementation (`pages/foods/[foodSlug].vue`):**
```vue
<script setup lang="ts">
const route = useRoute();
const foodSlug = route.params.foodSlug as string;

const { data, loading, error } = await useAsyncData(
  `food-${foodSlug}`,
  async () => {
    const response = await $fetch<ApiResponse<Food>>(`/api/foods/${foodSlug}`);
    if (!response.success) {
      throw createError({ statusCode: 404, message: 'Food not found' });
    }
    return response.data;
  }
);

// SEO metadata
useHead({
  title: `${data.value.name} Nutrition Facts - Nutrition Hub`,
  meta: [
    {
      name: 'description',
      content: `Discover ${data.value.name} nutrition: ${data.value.proteinG}g protein, ${data.value.calories} calories per 100g. Explore detailed nutrition information.`
    },
    {
      property: 'og:title',
      content: `${data.value.name}: ${data.value.proteinG}g Protein per 100g`
    },
    {
      property: 'og:description',
      content: `${data.value.calories} calories, ${data.value.carbohydratesTotalG}g carbs, ${data.value.fatTotalG}g fat per 100g serving`
    },
    {
      property: 'og:type',
      content: 'website'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    }
  ]
});
</script>

<template>
  <div v-if="loading" class="loading-container">
    <USkeleton class="h-64 w-full" />
    <USkeleton class="h-8 w-1/2 mt-4" />
  </div>

  <div v-else-if="error" class="error-container">
    <UAlert icon="i-heroicons-exclamation-triangle" color="red" title="Food not found" />
  </div>

  <div v-else-if="data" class="food-detail-page">
    <h1>{{ data.name }}</h1>
    <NutritionLabel :food="data" />
    <RelatedFoods :foodSlug="data.slug" />
  </div>
</template>
```

**SEO Optimization:**
- Unique `<title>` tag: "[Food Name] Nutrition Facts - Nutrition Hub"
- Meta description with nutrition highlights
- Open Graph tags for social sharing previews
- Twitter Card tags for enhanced Twitter previews
- Semantic HTML: `<h1>` for food name, structured content

**Structured Data (Schema.org):**
```vue
<script setup>
const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'NutritionInformation',
  name: data.value.name,
  calories: data.value.calories,
  proteinContent: `${data.value.proteinG} g`,
  carbohydrateContent: `${data.value.carbohydratesTotalG} g`,
  fatContent: `${data.value.fatTotalG} g`,
  servingSize: '100 g'
}));

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(jsonLd.value)
    }
  ]
});
</script>
```

**Page Performance:**
- SSR enabled for fast initial load
- Page load target: <500ms (NFR-PERF-002)
- LCP <2.5s, FID <100ms, CLS <0.1 (Core Web Vitals)
- Hydration for client-side navigation after initial load

**Deep-Linking Support:**
- URLs are human-readable: `/foods/chicken-breast`
- Links work when shared on social media
- Direct navigation to any food by slug

**Verification:**
- Navigate to `/foods/chicken-breast` shows full nutrition info
- Page source includes SEO meta tags
- Google Rich Results Test validates Schema.org markup
- Social media link preview shows food name and nutrition
- Page loads <500ms on 4G connection
- 404 displays for non-existent foods

**Prerequisites:** Story 2.2 (Food Detail API)

**Technical Notes:**
- Use `useAsyncData` for SSR data fetching (Nuxt convention)
- Follow SEO strategy from PRD (lines 637-689)
- This page is the primary SEO landing page
- Enables deep-linking from social media shares (Story 5.2)

---

### Story 2.6: SearchBar Component with Autocomplete

As a developer,
I want to create a SearchBar component with instant autocomplete suggestions,
So that users can easily find foods as they type.

**Acceptance Criteria:**

**Given** the search composable exists
**When** I use the SearchBar component
**Then** I see an intuitive search interface with autocomplete dropdown:

**Component Implementation (`components/SearchBar.vue`):**
```vue
<script setup lang="ts">
const query = ref<string>('');
const { foods, loading, searchFoods } = useFoodSearch();
const showDropdown = ref<boolean>(false);
const selectedIndex = ref<number>(0);

// Trigger search on input
watch(query, (newQuery) => {
  if (newQuery.length >= 2) {
    searchFoods(newQuery);
    showDropdown.value = true;
  } else {
    showDropdown.value = false;
  }
  selectedIndex.value = 0;
});

// Keyboard navigation
const handleKeydown = (e: KeyboardEvent) => {
  if (!showDropdown.value) return;

  if (e.key === 'ArrowDown') {
    e.preventDefault();
    selectedIndex.value = Math.min(selectedIndex.value + 1, foods.value.length - 1);
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    selectedIndex.value = Math.max(selectedIndex.value - 1, 0);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    if (foods.value[selectedIndex.value]) {
      navigateToFood(foods.value[selectedIndex.value]);
    }
  } else if (e.key === 'Escape') {
    showDropdown.value = false;
  }
};

const navigateToFood = (food: Food) => {
  navigateTo(`/foods/${food.slug}`);
  showDropdown.value = false;
  query.value = '';
};

// Close dropdown when clicking outside
onClickOutside(searchContainer, () => {
  showDropdown.value = false;
});
</script>

<template>
  <div ref="searchContainer" class="search-bar-container">
    <UInput
      v-model="query"
      type="text"
      placeholder="Search foods (e.g., chicken breast)"
      size="lg"
      icon="i-heroicons-magnifying-glass"
      @keydown="handleKeydown"
      aria-label="Search foods"
      aria-describedby="search-instructions"
    />

    <div v-if="showDropdown && (foods.length > 0 || loading)" class="autocomplete-dropdown">
      <div v-if="loading" class="loading-state">
        <UIcon name="i-heroicons-arrow-path" class="animate-spin" />
        <span>Searching...</span>
      </div>

      <ul v-else role="listbox">
        <li
          v-for="(food, index) in foods"
          :key="food.id"
          role="option"
          :aria-selected="index === selectedIndex"
          :class="{ 'selected': index === selectedIndex }"
          @click="navigateToFood(food)"
          @mouseenter="selectedIndex = index"
        >
          <div class="food-name">{{ food.name }}</div>
          <div class="food-preview">
            {{ food.proteinG }}g protein • {{ food.calories }} cal
          </div>
        </li>
      </ul>
    </div>

    <p id="search-instructions" class="sr-only">
      Use arrow keys to navigate, Enter to select, Escape to close
    </p>
  </div>
</template>

<style scoped>
.autocomplete-dropdown {
  position: absolute;
  width: 100%;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  z-index: 50;
  margin-top: 0.25rem;
}

li {
  padding: 0.75rem 1rem;
  cursor: pointer;
  border-bottom: 1px solid #f3f4f6;
}

li:hover,
li.selected {
  background: #f9fafb;
}

.food-name {
  font-weight: 500;
}

.food-preview {
  font-size: 0.875rem;
  color: #6b7280;
}
</style>
```

**Accessibility Features:**
- ARIA attributes: `role="listbox"`, `role="option"`, `aria-selected`
- Keyboard navigation: Arrow keys, Enter, Escape
- Screen reader announcements: `aria-describedby`
- Focus management
- Touch target ≥44x44px (WCAG AAA)

**Responsive Design:**
- Full-width on mobile
- Auto-positioning dropdown
- Touch-friendly results
- Works on 320px mobile viewport

**Loading States:**
- Show spinner while searching
- Skeleton screens for dropdown items
- Smooth transitions on open/close

**Verification:**
- Type "chi" → dropdown shows "Chicken Breast", "Chickpeas" after 300ms
- Arrow keys navigate results, visual selection indicator moves
- Enter navigates to selected food detail page
- Escape closes dropdown
- Click outside closes dropdown
- Tab navigation works correctly
- Screen reader announces results
- Works on mobile touch devices

**Prerequisites:** Story 2.4 (Search Autocomplete Composable)

**Technical Notes:**
- Use Nuxt UI `<UInput>` component (auto-imported)
- Follow keyboard navigation requirements (FR36, NFR-A11Y-001)
- Debounce prevents excessive API calls
- This component is used on homepage (Story 2.7)

---

### Story 2.7: Homepage with Search Interface

As a developer,
I want to create the homepage with a prominent search interface,
So that users can immediately start searching for foods.

**Acceptance Criteria:**

**Given** the SearchBar component exists
**When** I visit the homepage (`/`)
**Then** I see a welcoming search interface:

**Page Implementation (`pages/index.vue`):**
```vue
<script setup lang="ts">
useHead({
  title: 'Nutrition Hub - Instant Food Nutrition Search',
  meta: [
    {
      name: 'description',
      content: 'Search any food and get instant nutrition facts. High protein, low carb, healthy fats - discover what foods work for your goals.'
    }
  ]
});
</script>

<template>
  <div class="homepage-container">
    <section class="hero-section">
      <h1 class="hero-title">
        Know Your Food.
        <span class="highlight">Instantly.</span>
      </h1>

      <p class="hero-subtitle">
        Search thousands of foods and get comprehensive nutrition information in milliseconds.
      </p>

      <div class="search-container">
        <SearchBar />
      </div>

      <div class="example-searches">
        <span>Try:</span>
        <NuxtLink to="/foods/chicken-breast">Chicken Breast</NuxtLink>
        <NuxtLink to="/foods/avocado">Avocado</NuxtLink>
        <NuxtLink to="/foods/salmon">Salmon</NuxtLink>
      </div>
    </section>

    <section class="features-section">
      <div class="feature-card">
        <UIcon name="i-heroicons-bolt" class="feature-icon" />
        <h3>Instant Results</h3>
        <p>Search thousands of foods in under 200ms</p>
      </div>

      <div class="feature-card">
        <UIcon name="i-heroicons-chart-bar" class="feature-icon" />
        <h3>Visual Nutrition</h3>
        <p>See macros at a glance with progress indicators</p>
      </div>

      <div class="feature-card">
        <UIcon name="i-heroicons-tag" class="feature-icon" />
        <h3>Smart Categories</h3>
        <p>Discover foods by nutrition goals (high protein, low carb)</p>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero-section {
  text-align: center;
  padding: 4rem 1rem;
}

.hero-title {
  font-size: 3rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}

.highlight {
  color: #10b981; /* Tailwind green-500 */
}

.hero-subtitle {
  font-size: 1.25rem;
  color: #6b7280;
  margin-bottom: 2rem;
}

.search-container {
  max-width: 600px;
  margin: 0 auto 2rem;
}

.example-searches {
  display: flex;
  gap: 1rem;
  justify-content: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.features-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  text-align: center;
  padding: 2rem;
}

.feature-icon {
  font-size: 3rem;
  color: #10b981;
  margin-bottom: 1rem;
}
</style>
```

**Design Requirements:**
- Clean, modern hero section
- Prominent search bar (centered, large)
- Example search links for common foods
- Feature highlights (instant results, visual nutrition, smart categories)
- Mobile-responsive (single column on mobile)

**Performance:**
- Initial load <2s (NFR-PERF-004)
- LCP <2.5s, FID <100ms, CLS <0.1
- SEO optimized for homepage

**Accessibility:**
- Semantic HTML (`<section>`, `<h1>`, `<h3>`)
- ARIA labels on interactive elements
- Keyboard navigation works
- Color contrast ≥4.5:1

**Verification:**
- Homepage loads with search bar centered
- Type "chicken" → autocomplete shows suggestions
- Click example link "Chicken Breast" → navigates to `/foods/chicken-breast`
- Feature cards display correctly on mobile
- Page loads <2s on 4G connection
- Screen reader can navigate all content

**Prerequisites:** Story 2.6 (SearchBar Component)

**Technical Notes:**
- This is the primary user entry point
- Hero section establishes value proposition
- Example searches help users get started immediately
- Responsive design works from 320px to 2560px (NFR-A11Y-012)

---

### Story 2.8: NutritionLabel Component

As a developer,
I want to create a NutritionLabel component with visual nutrition indicators,
So that users can quickly understand nutrition facts with visual clarity.

**Acceptance Criteria:**

**Given** food data is available
**When** I display the NutritionLabel component
**Then** I see comprehensive nutrition information with visual progress indicators:

**Component Implementation (`components/NutritionLabel.vue`):**
```vue
<script setup lang="ts">
const props = defineProps<{
  food: Food;
}>();

// Calculate daily value percentages (based on 2000 calorie diet)
const calculatePercentage = (value: number, dailyValue: number) => {
  return Math.round((value / dailyValue) * 100);
};

const proteinPercentage = computed(() => calculatePercentage(props.food.proteinG, 50));
const carbsPercentage = computed(() => calculatePercentage(props.food.carbohydratesTotalG, 300));
const fatPercentage = computed(() => calculatePercentage(props.food.fatTotalG, 78));
const fiberPercentage = computed(() => calculatePercentage(props.food.fiberG, 28));

// Determine color based on percentage
const getColor = (percentage: number) => {
  if (percentage >= 50) return 'green';
  if (percentage >= 20) return 'yellow';
  return 'red';
};
</script>

<template>
  <div class="nutrition-label">
    <h2>Nutrition Facts</h2>
    <p class="serving-size">Serving Size: 100g</p>
    <p class="calories">{{ food.calories }} Calories</p>

    <div class="divider"></div>

    <div class="nutrient-row">
      <span class="nutrient-name">Protein</span>
      <span class="nutrient-value">{{ food.proteinG }}g</span>
      <span class="nutrient-percentage" :class="getColor(proteinPercentage)">
        {{ proteinPercentage }}%
      </span>
    </div>

    <UCircularProgress
      :value="proteinPercentage"
      :color="getColor(proteinPercentage)"
      size="md"
    />

    <div class="nutrient-row">
      <span class="nutrient-name">Total Carbohydrates</span>
      <span class="nutrient-value">{{ food.carbohydratesTotalG }}g</span>
      <span class="nutrient-percentage" :class="getColor(carbsPercentage)">
        {{ carbsPercentage }}%
      </span>
    </div>

    <div class="nutrient-row sub-nutrient">
      <span class="nutrient-name">Dietary Fiber</span>
      <span class="nutrient-value">{{ food.fiberG }}g</span>
      <span class="nutrient-percentage" :class="getColor(fiberPercentage)">
        {{ fiberPercentage }}%
      </span>
    </div>

    <div class="nutrient-row sub-nutrient">
      <span class="nutrient-name">Sugars</span>
      <span class="nutrient-value">{{ food.sugarG }}g</span>
    </div>

    <div class="nutrient-row">
      <span class="nutrient-name">Total Fat</span>
      <span class="nutrient-value">{{ food.fatTotalG }}g</span>
      <span class="nutrient-percentage" :class="getColor(fatPercentage)">
        {{ fatPercentage }}%
      </span>
    </div>

    <div class="nutrient-row sub-nutrient">
      <span class="nutrient-name">Saturated Fat</span>
      <span class="nutrient-value">{{ food.fatSaturatedG }}g</span>
    </div>

    <div class="nutrient-row">
      <span class="nutrient-name">Sodium</span>
      <span class="nutrient-value">{{ food.sodiumMg }}mg</span>
    </div>

    <div class="nutrient-row">
      <span class="nutrient-name">Potassium</span>
      <span class="nutrient-value">{{ food.potassiumMg }}mg</span>
    </div>

    <div class="nutrient-row">
      <span class="nutrient-name">Cholesterol</span>
      <span class="nutrient-value">{{ food.cholesterolMg }}mg</span>
    </div>
  </div>
</template>

<style scoped>
.nutrition-label {
  background: white;
  border: 2px solid #000;
  padding: 1.5rem;
  font-family: 'Helvetica', 'Arial', sans-serif;
  max-width: 400px;
}

.calories {
  font-size: 2rem;
  font-weight: 700;
  margin: 0.5rem 0;
}

.divider {
  border-top: 4px solid #000;
  margin: 0.5rem 0;
}

.nutrient-row {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem 0;
}

.nutrient-row.sub-nutrient {
  padding-left: 1rem;
}

.nutrient-name {
  font-weight: 700;
}

.nutrient-value {
  font-weight: 700;
}

.nutrient-percentage.green { color: #10b981; }
.nutrient-percentage.yellow { color: #f59e0b; }
.nutrient-percentage.red { color: #ef4444; }
</style>
```

**Visual Indicators:**
- Circular progress bars for macronutrients
- Color coding: green (high ≥50%), yellow (medium ≥20%), red (low <20%)
- FDA-style nutrition facts label layout
- Clear hierarchy: main nutrients bold, sub-nutrients indented

**Accessibility:**
- Semantic HTML structure
- ARIA labels for progress bars
- Color not the only indicator (percentages shown)
- High contrast for readability

**Responsive Design:**
- Max-width 400px (standard label width)
- Scales down for mobile
- Touch-friendly on small screens

**Verification:**
- Display chicken breast: Protein 31g (62% - green)
- Display avocado: Fat 15g (19% - yellow)
- All nutrients display with correct values
- Colors match percentages correctly
- Layout readable on mobile (320px viewport)
- Screen reader announces all nutrition data

**Prerequisites:** Story 2.5 (Food Detail Page)

**Technical Notes:**
- Visual nutrition clarity is a key differentiator (PRD line 69)
- Circular progress uses Nuxt UI `<UCircularProgress>` component
- Daily values based on standard 2000 calorie diet
- This component makes nutrition facts instantly understandable

---

## Epic 2 Completion Review

**Stories Created:** 8

**FR Coverage:**
- FR1-FR7: Food Discovery & Search (complete)
- FR8-FR13: Nutrition Information Display (complete)

**Technical Context Used:**
- SQLite-first search with API fallback (Architecture lines 457-489)
- Server route structure (Architecture lines 856-858)
- Response format transformation (Architecture lines 1200-1217)
- SEO optimization strategies (PRD lines 637-689)
- Performance targets: <200ms search, <500ms page load (NFR-PERF-001, NFR-PERF-002)

**User Value Delivered:**
- ✅ Users can search for foods and see instant autocomplete
- ✅ Users can view comprehensive nutrition information
- ✅ Users can navigate to food detail pages via deep links
- ✅ Pages are SEO-optimized for search engine discovery
- ✅ Visual nutrition indicators make data understandable

**Ready for:** Epic 3 - Intelligent Autocategorization Engine

---

## Epic 3: Intelligent Autocategorization Engine

**Epic Goal:** Automatically assign foods to nutrition categories using JSON rule engine with match scoring, enabling category-based discovery.

**User Value:** Users discover foods through intelligent nutrition categories and see multi-dimensional category assignments (e.g., a food can be "High Protein" AND "Low Carb").

**PRD Coverage:** FR14-FR23 (Categorization - excluding advanced analytics which are in Epic 4)

**Technical Context:**
- JSON rule engine with CategoryRule interface (Architecture lines 504-534)
- Match scoring algorithm (0-100) with condition evaluation (Architecture lines 559-594)
- Batch categorization for efficiency (Architecture lines 596-609)
- Manual override capability (Architecture lines 611-613)
- Category server routes: `GET /api/categories`, `GET /api/categories/:categoryId`

**Dependencies:** Epic 2 (Search & Food Discovery) - needs foods in database to categorize

---

### Story 3.1: Category Rule Engine Implementation

As a developer,
I want to implement the JSON-based rule engine for food categorization,
So that foods can be automatically assigned to nutrition categories based on flexible rules.

**Acceptance Criteria:**

**Given** category rules are defined in JSON
**When** I evaluate a food against those rules
**Then** the food receives a match score (0-100) based on how well it matches the category criteria:

**CategoryRule Type Definition:**
```typescript
interface CategoryRule {
  name: string;
  description: string;
  weight: number; // 1-10, influences match score
  conditions: {
    // Protein conditions
    minProteinG?: number;
    maxProteinG?: number;
    minProteinPerCalorie?: number; // protein/calories * 100

    // Carb conditions
    maxCarbsG?: number;
    minCarbsG?: number;

    // Fat conditions
    maxFatG?: number;
    maxSaturatedFatG?: number;

    // Fiber conditions
    minFiberG?: number;

    // Sugar conditions
    maxSugarG?: number;

    // Calorie conditions
    maxCalories?: number;
    minCalories?: number;
  };
}
```

**Match Scoring Algorithm (`server/utils/categorization.ts`):**
```typescript
export function calculateMatchScore(food: FoodDbRow, rule: CategoryRule): number {
  let score = 0;
  const maxScore = 100;

  // Each matching condition contributes to score
  const conditionCount = Object.keys(rule.conditions).length;
  const pointsPerCondition = maxScore / conditionCount;

  // Protein conditions
  if (rule.conditions.minProteinG && food.protein_g >= rule.conditions.minProteinG) {
    score += pointsPerCondition;
  }
  if (rule.conditions.maxProteinG && food.protein_g <= rule.conditions.maxProteinG) {
    score += pointsPerCondition;
  }
  if (rule.conditions.minProteinPerCalorie) {
    const proteinPerCalorie = (food.protein_g / food.calories) * 100;
    if (proteinPerCalorie >= rule.conditions.minProteinPerCalorie) {
      score += pointsPerCondition;
    }
  }

  // Carb conditions
  if (rule.conditions.maxCarbsG && food.carbohydrates_total_g <= rule.conditions.maxCarbsG) {
    score += pointsPerCondition;
  }
  if (rule.conditions.minCarbsG && food.carbohydrates_total_g >= rule.conditions.minCarbsG) {
    score += pointsPerCondition;
  }

  // Fat conditions
  if (rule.conditions.maxFatG && food.fat_total_g <= rule.conditions.maxFatG) {
    score += pointsPerCondition;
  }
  if (rule.conditions.maxSaturatedFatG && food.fat_saturated_g <= rule.conditions.maxSaturatedFatG) {
    score += pointsPerCondition;
  }

  // Fiber conditions
  if (rule.conditions.minFiberG && food.fiber_g >= rule.conditions.minFiberG) {
    score += pointsPerCondition;
  }

  // Sugar conditions
  if (rule.conditions.maxSugarG && food.sugar_g <= rule.conditions.maxSugarG) {
    score += pointsPerCondition;
  }

  // Calorie conditions
  if (rule.conditions.maxCalories && food.calories <= rule.conditions.maxCalories) {
    score += pointsPerCondition;
  }
  if (rule.conditions.minCalories && food.calories >= rule.conditions.minCalories) {
    score += pointsPerCondition;
  }

  // Apply weight multiplier
  const weightedScore = score * (rule.weight / 5); // 5 is neutral weight

  return Math.min(Math.round(weightedScore), maxScore);
}
```

**Example Category Rules:**
```typescript
const highProteinRule: CategoryRule = {
  name: "High Protein",
  description: "Foods with at least 20g protein per 100g",
  weight: 10,
  conditions: {
    minProteinG: 20,
    minProteinPerCalorie: 15
  }
};

const lowCarbRule: CategoryRule = {
  name: "Low Carb",
  description: "Foods with 10g or fewer carbs per serving",
  weight: 8,
  conditions: {
    maxCarbsG: 10
  }
};

const healthyFatsRule: CategoryRule = {
  name: "Healthy Fats",
  description: "High-fat foods with quality sources (nuts, avocados, fish)",
  weight: 7,
  conditions: {
    minFatG: 15,
    maxSaturatedFatG: 10
  }
};
```

**Verification:**
- Chicken breast (31g protein) scores 100 on "High Protein" category
- Salmon (20g protein, 13g fat) scores high on both "High Protein" and "Healthy Fats"
- Foods with 0g carbs score 100 on "Low Carb" category
- Score calculations are deterministic (same food always gets same score)
- Edge cases handled (division by zero, null values)

**Prerequisites:** Story 1.3 (Database Seed Data), Story 2.2 (Food Detail API)

**Technical Notes:**
- Follow match scoring algorithm from Architecture (lines 559-594)
- Flexible JSON rules allow adding categories without code changes
- Multi-dimensional scoring enables foods to belong to multiple categories
- Weight parameter allows prioritizing important conditions
- This is the core algorithmic feature of the application

---

### Story 3.2: Batch Categorization System

As a developer,
I want to implement batch categorization of multiple foods,
So that all foods in the database can be efficiently categorized.

**Acceptance Criteria:**

**Given** foods exist in the database
**When** I run the batch categorization process
**Then** all foods are evaluated against all active categories and assigned accordingly:

**Batch Categorization Function:**
```typescript
export async function categorizeFood(food: FoodDbRow): Promise<void> {
  const db = getDatabase();
  const categories = db.all('SELECT * FROM categories WHERE is_active = 1');

  for (const category of categories) {
    const rule = JSON.parse(category.rules_json) as CategoryRule;
    const score = calculateMatchScore(food, rule);

    if (score >= 50) { // Minimum threshold
      // Check if relationship already exists
      const existing = db.get(
        'SELECT * FROM food_categories WHERE food_id = ? AND category_id = ?',
        [food.id, category.id]
      );

      if (!existing) {
        db.run(
          'INSERT INTO food_categories (food_id, category_id, match_score) VALUES (?, ?, ?)',
          [food.id, category.id, score]
        );
      }
    }
  }
}

export async function batchCategorizeAllFoods(): Promise<number> {
  const db = getDatabase();
  const foods = db.all('SELECT * FROM foods');
  let categorizedCount = 0;

  for (const food of foods) {
    await categorizeFood(food);
    categorizedCount++;
  }

  return categorizedCount;
}
```

**Batch Categorization API Endpoint (`server/api/categories/batch-categorize.ts`):**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const result = await batchCategorizeAllFoods();

    return {
      data: {
        message: 'Batch categorization complete',
        categorizedCount: result
      },
      success: true
    };
  } catch (error) {
    logError(error, { route: '/api/categories/batch-categorize' });
    throw createError({
      statusCode: 500,
      message: 'Batch categorization failed'
    });
  }
});
```

**Admin Utility Script:**
- Script created at: `server/scripts/run-batch-categorize.ts`
- Can be run via: `npm run categorize` (add to package.json)
- Logs progress and results
- Reports categorization statistics

**Performance Optimization:**
- Process foods in batches of 100 to avoid memory issues
- Use database transactions for batch inserts
- Index on `food_categories(food_id, category_id)` for fast lookups

**Verification:**
- Running batch categorize processes all foods in database
- Foods meeting category criteria (score ≥50) are assigned
- Foods not meeting criteria are not assigned
- Existing food-category relationships are not duplicated
- Process completes in reasonable time (<30s for 1000 foods)
- Logs show categorization progress and results

**Prerequisites:** Story 3.1 (Category Rule Engine)

**Technical Notes:**
- Batch processing is efficient for large datasets (Architecture lines 596-609)
- Minimum threshold of 50 prevents weak category assignments
- Transaction support ensures data consistency
- This enables automatic categorization of all database foods

---

### Story 3.3: Category CRUD Operations

As a developer,
I want to implement CRUD operations for nutrition categories,
So that administrators can manage categories and their rules.

**Acceptance Criteria:**

**Given** the categories table exists
**When** I perform CRUD operations on categories
**Then** I can create, read, update, and delete categories with proper validation:

**Create Category API (`server/api/categories/index.ts` - POST):**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validation
    if (!body.name || !body.rulesJson) {
      throw createError({
        statusCode: 400,
        message: 'Name and rulesJson are required'
      });
    }

    // Validate rulesJson structure
    let rules: CategoryRule;
    try {
      rules = JSON.parse(body.rulesJson);
    } catch (e) {
      throw createError({
        statusCode: 400,
        message: 'Invalid rulesJson format'
      });
    }

    const db = getDatabase();
    const slug = slugify(body.name);

    const result = db.run(
      `INSERT INTO categories (slug, name, description, icon, rules_json, display_order, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [slug, body.name, body.description || null, body.icon || null, body.rulesJson, body.displayOrder || 0, body.is_active !== false]
    );

    const category = db.get('SELECT * FROM categories WHERE id = ?', [result.lastID]);

    return {
      data: transformCategoryToApiFormat(category),
      success: true
    };
  } catch (error) {
    logError(error, { route: 'POST /api/categories' });
    throw error;
  }
});
```

**List Categories API (`server/api/categories/index.ts` - GET):**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const db = getDatabase();
    const categories = db.all('SELECT * FROM categories ORDER BY display_order ASC, name ASC');

    return {
      data: categories.map(transformCategoryToApiFormat),
      success: true
    };
  } catch (error) {
    logError(error, { route: 'GET /api/categories' });
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch categories'
    });
  }
});
```

**Get Category by ID (`server/api/categories/[categoryId].ts` - GET):**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const categoryId = getRouterParam(event, 'categoryId');
    const db = getDatabase();

    const category = db.get('SELECT * FROM categories WHERE id = ? OR slug = ?', [categoryId, categoryId]);

    if (!category) {
      throw createNotFoundError('Category', categoryId);
    }

    return {
      data: transformCategoryToApiFormat(category),
      success: true
    };
  } catch (error) {
    logError(error, { route: `GET /api/categories/${getRouterParam(event, 'categoryId')}` });
    throw error;
  }
});
```

**Update Category (`server/api/categories/[categoryId].ts` - PUT):**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const categoryId = getRouterParam(event, 'categoryId');
    const body = await readBody(event);
    const db = getDatabase();

    // Validate category exists
    const existing = db.get('SELECT * FROM categories WHERE id = ? OR slug = ?', [categoryId, categoryId]);
    if (!existing) {
      throw createNotFoundError('Category', categoryId);
    }

    // Validate rulesJson if provided
    if (body.rulesJson) {
      try {
        JSON.parse(body.rulesJson);
      } catch (e) {
        throw createError({
          statusCode: 400,
          message: 'Invalid rulesJson format'
        });
      }
    }

    // Build update query dynamically
    const updates = [];
    const values = [];

    if (body.name !== undefined) {
      updates.push('name = ?');
      values.push(body.name);
    }
    if (body.description !== undefined) {
      updates.push('description = ?');
      values.push(body.description);
    }
    if (body.icon !== undefined) {
      updates.push('icon = ?');
      values.push(body.icon);
    }
    if (body.rulesJson !== undefined) {
      updates.push('rules_json = ?');
      values.push(body.rulesJson);
    }
    if (body.displayOrder !== undefined) {
      updates.push('display_order = ?');
      values.push(body.displayOrder);
    }
    if (body.isActive !== undefined) {
      updates.push('is_active = ?');
      values.push(body.isActive ? 1 : 0);
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(categoryId);

    db.run(
      `UPDATE categories SET ${updates.join(', ')} WHERE id = ? OR slug = ?`,
      [...values, categoryId]
    );

    const updated = db.get('SELECT * FROM categories WHERE id = ? OR slug = ?', [categoryId, categoryId]);

    return {
      data: transformCategoryToApiFormat(updated),
      success: true
    };
  } catch (error) {
    logError(error, { route: `PUT /api/categories/${getRouterParam(event, 'categoryId')}` });
    throw error;
  }
});
```

**Delete Category (`server/api/categories/[categoryId].ts` - DELETE):**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const categoryId = getRouterParam(event, 'categoryId');
    const db = getDatabase();

    // Cascade delete will handle food_categories entries
    const result = db.run('DELETE FROM categories WHERE id = ? OR slug = ?', [categoryId, categoryId]);

    if (result.changes === 0) {
      throw createNotFoundError('Category', categoryId);
    }

    return {
      data: { message: 'Category deleted' },
      success: true
    };
  } catch (error) {
    logError(error, { route: `DELETE /api/categories/${getRouterParam(event, 'categoryId')}` });
    throw error;
  }
});
```

**Verification:**
- POST `/api/categories` creates new category with validation
- GET `/api/categories` returns all categories ordered by display_order
- GET `/api/categories/high-protein` returns category by slug
- PUT `/api/categories/1` updates category fields
- DELETE `/api/categories/1` deletes category and cascades to food_categories
- Invalid rulesJson returns 400 error
- Non-existent category returns 404

**Prerequisites:** Story 1.2 (Database Schema Implementation)

**Technical Notes:**
- Transform database snake_case to API camelCase
- Support both id and slug for flexible routing
- Cascade delete configured in schema (Story 1.2)
- JSON validation ensures rule engine won't break

---

### Story 3.4: Food Category Relationships API

As a developer,
I want to implement API endpoints for food-category relationships,
So that applications can query which foods belong to which categories.

**Acceptance Criteria:**

**Given** foods and categories exist
**When** I query food-category relationships
**Then** I get proper relationship data with match scores:

**Get Foods by Category (`server/api/categories/[categoryId]/foods.ts`):**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const categoryId = getRouterParam(event, 'categoryId');
    const db = getDatabase();

    const foods = db.all(`
      SELECT f.*, fc.match_score, fc.assigned_at
      FROM foods f
      INNER JOIN food_categories fc ON f.id = fc.food_id
      WHERE fc.category_id = ?
      ORDER BY fc.match_score DESC, f.name ASC
    `, [categoryId]);

    return {
      data: foods.map(f => ({
        ...transformFoodToApiFormat(f),
        matchScore: f.match_score,
        assignedAt: f.assigned_at
      })),
      success: true
    };
  } catch (error) {
    logError(error, { route: `GET /api/categories/${getRouterParam(event, 'categoryId')}/foods` });
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch foods by category'
    });
  }
});
```

**Get Categories by Food (`server/api/foods/[foodId]/categories.ts`):**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const foodId = getRouterParam(event, 'foodId');
    const db = getDatabase();

    const categories = db.all(`
      SELECT c.*, fc.match_score, fc.assigned_at
      FROM categories c
      INNER JOIN food_categories fc ON c.id = fc.category_id
      WHERE fc.food_id = ? AND c.is_active = 1
      ORDER BY fc.match_score DESC
    `, [foodId]);

    return {
      data: categories.map(c => ({
        ...transformCategoryToApiFormat(c),
        matchScore: c.match_score,
        assignedAt: c.assigned_at
      })),
      success: true
    };
  } catch (error) {
    logError(error, { route: `GET /api/foods/${getRouterParam(event, 'foodId')}/categories` });
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch food categories'
    });
  }
});
```

**Assign Food to Category (Manual Override):**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const foodId = getRouterParam(event, 'foodId');
    const body = await readBody(event); // { categoryId, matchScore, manualOverride: true }

    if (!body.categoryId || !body.matchScore) {
      throw createError({
        statusCode: 400,
        message: 'categoryId and matchScore are required'
      });
    }

    const db = getDatabase();

    // Check if relationship exists
    const existing = db.get(
      'SELECT * FROM food_categories WHERE food_id = ? AND category_id = ?',
      [foodId, body.categoryId]
    );

    if (existing) {
      // Update existing
      db.run(
        'UPDATE food_categories SET match_score = ?, assigned_at = CURRENT_TIMESTAMP WHERE food_id = ? AND category_id = ?',
        [body.matchScore, foodId, body.categoryId]
      );
    } else {
      // Insert new
      db.run(
        'INSERT INTO food_categories (food_id, category_id, match_score) VALUES (?, ?, ?)',
        [foodId, body.categoryId, body.matchScore]
      );
    }

    return {
      data: { message: 'Food assigned to category' },
      success: true
    };
  } catch (error) {
    logError(error, { route: `POST /api/foods/${getRouterParam(event, 'foodId')}/categories` });
    throw error;
  }
});
```

**Remove Food from Category:**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const foodId = getRouterParam(event, 'foodId');
    const categoryId = getRouterParam(event, 'categoryId');
    const db = getDatabase();

    const result = db.run(
      'DELETE FROM food_categories WHERE food_id = ? AND category_id = ?',
      [foodId, categoryId]
    );

    if (result.changes === 0) {
      throw createNotFoundError('Food-Category relationship', `${foodId}-${categoryId}`);
    }

    return {
      data: { message: 'Food removed from category' },
      success: true
    };
  } catch (error) {
    logError(error, { route: `DELETE /api/foods/${getRouterParam(event, 'foodId')}/categories/${getRouterParam(event, 'categoryId')}` });
    throw error;
  }
});
```

**Verification:**
- GET `/api/categories/1/foods` returns all foods in category, ordered by match_score
- GET `/api/foods/chicken-breast/categories` returns all categories for chicken breast
- POST `/api/foods/1/categories` manually assigns food to category
- DELETE `/api/foods/1/categories/2` removes food from category
- Match scores are included in responses
- Manual overrides work (assigned_at timestamp updated)

**Prerequisites:** Story 3.1 (Category Rule Engine), Story 3.3 (Category CRUD)

**Technical Notes:**
- Manual override capability supports edge cases (Architecture lines 611-613)
- Relationships ordered by match_score for relevance
- This enables category-based food browsing (Story 3.5)

---

### Story 3.5: Category Browse Page

As a developer,
I want to create a category browse page showing foods in each category,
So that users can discover foods through nutrition categories.

**Acceptance Criteria:**

**Given** categories exist with categorized foods
**When** I navigate to `/categories/[categorySlug]`
**Then** I see a page with all foods in that category:

**Page Implementation (`pages/categories/[categorySlug].vue`):**
```vue
<script setup lang="ts">
const route = useRoute();
const categorySlug = route.params.categorySlug as string;

// Fetch category data
const { data: category } = await useAsyncData(
  `category-${categorySlug}`,
  async () => {
    const response = await $fetch<ApiResponse<Category>>(`/api/categories/${categorySlug}`);
    if (!response.success) {
      throw createError({ statusCode: 404, message: 'Category not found' });
    }
    return response.data;
  }
);

// Fetch foods in category
const { data: foods, pending, error } = await useAsyncData(
  `category-${categorySlug}-foods`,
  async () => {
    const response = await $fetch<ApiListResponse<ood>>(`/api/categories/${categorySlug}/foods`);
    if (!response.success) {
      throw new Error('Failed to fetch foods');
    }
    return response.data;
  }
);

// SEO metadata
useHead({
  title: `${category.value.name} Foods - Nutrition Hub`,
  meta: [
    {
      name: 'description',
      content: `${category.value.description || `Browse ${category.value.name} foods`}. Discover foods that fit your nutrition goals.`
    },
    {
      property: 'og:title',
      content: `${category.value.name} Foods`
    },
    {
      property: 'og:description',
      content: `${foods.value.length} ${category.value.name} foods to explore`
    }
  ]
});
</script>

<template>
  <div class="category-page">
    <div v-if="pending" class="loading-container">
      <USkeleton class="h-64 w-full" />
      <USkeleton class="h-8 w-1/2 mt-4" />
    </div>

    <div v-else-if="error" class="error-container">
      <UAlert icon="i-heroicons-exclamation-triangle" color="red" title="Failed to load category" />
    </div>

    <div v-else>
      <!-- Category Header -->
      <div class="category-header">
        <div class="category-icon">
          <UIcon :name="category.icon || 'i-heroicons-tag'" size="xl" />
        </div>
        <h1>{{ category.name }}</h1>
        <p class="category-description">{{ category.description }}</p>
        <p class="category-stats">{{ foods.length }} foods in this category</p>
      </div>

      <!-- Foods Grid -->
      <div class="foods-grid">
        <FoodCard
          v-for="food in foods"
          :key="food.id"
          :food="food"
          :matchScore="food.matchScore"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.category-header {
  text-align: center;
  padding: 3rem 1rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  color: white;
  margin-bottom: 2rem;
}

.category-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.category-description {
  font-size: 1.25rem;
  opacity: 0.9;
  margin-bottom: 0.5rem;
}

.category-stats {
  font-size: 0.875rem;
  opacity: 0.8;
}

.foods-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

@media (max-width: 640px) {
  .foods-grid {
    grid-template-columns: 1fr;
  }
}
</style>
```

**SEO Optimization:**
- Unique `<title>`: "[Category Name] Foods - Nutrition Hub"
- Meta description with category description
- Open Graph tags for social sharing
- SSR for search engine indexing

**Page Features:**
- Category header with icon and description
- Food count display
- Foods ordered by match_score (most relevant first)
- Responsive grid layout (1 column mobile, 3-4 desktop)

**Empty State:**
- If no foods in category, show helpful message
- Suggest browsing other categories or using search

**Verification:**
- Navigate to `/categories/high-protein` shows all high-protein foods
- Page loads with SSR (source HTML includes foods)
- Foods ordered by match_score (highest first)
- SEO meta tags present in page source
- Responsive layout works on mobile (320px) and desktop (1400px+)
- Empty category shows helpful message

**Prerequisites:** Story 3.4 (Food Category Relationships API)

**Technical Notes:**
- SSR enables SEO for category pages (organic discovery)
- Match scores show relevance ranking
- This enables category-based food discovery (FR17)

---

### Story 3.6: CategoryBadges Component for Food Pages

As a developer,
I want to create a CategoryBadges component showing all categories for a food,
So that users can see multi-dimensional nutrition categorization at a glance.

**Acceptance Criteria:**

**Given** a food has multiple categories
**When** I display the CategoryBadges component
**Then** I see visual badges for each category with match scores:

**Component Implementation (`components/CategoryBadges.vue`):**
```vue
<script setup lang="ts">
const props = defineProps<{
  foodSlug: string;
}>();

const { data, pending } = await useAsyncData(
  `food-${props.foodSlug}-categories`,
  async () => {
    const response = await $fetch<{ data: CategoryWithScore[]; success: boolean }>(
      `/api/foods/${props.foodSlug}/categories`
    );
    return response.success ? response.data : [];
  }
);
</script>

<template>
  <div v-if="pending" class="badges-loading">
    <USkeleton class="h-6 w-24" v-for="i in 3" :key="i" />
  </div>

  <div v-else-if="data && data.length > 0" class="category-badges">
    <h3>Categories</h3>
    <div class="badges-container">
      <NuxtLink
        v-for="category in data"
        :key="category.id"
        :to="`/categories/${category.slug}`"
        class="category-badge"
        :title="`Match score: ${category.matchScore}%`"
      >
        <div class="badge-icon">
          <UIcon :name="category.icon || 'i-heroicons-tag'" />
        </div>
        <span class="badge-name">{{ category.name }}</span>
        <div class="badge-score">
          <span class="score-value">{{ category.matchScore }}</span>
          <span class="score-label">% match</span>
        </div>
      </NuxtLink>
    </div>
  </div>

  <div v-else class="no-categories">
    <p>This food hasn't been categorized yet.</p>
  </div>
</template>

<style scoped>
.category-badges {
  margin: 2rem 0;
}

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.badges-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.category-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: white;
  border: 2px solid #e5e7eb;
  border-radius: 2rem;
  text-decoration: none;
  color: #1f2937;
  transition: all 0.2s;
  cursor: pointer;
}

.category-badge:hover {
  border-color: #10b981;
  box-shadow: 0 2px 8px rgba(16, 185, 129, 0.2);
  transform: translateY(-1px);
}

.badge-icon {
  font-size: 1.25rem;
  color: #10b981;
}

.badge-name {
  font-weight: 500;
}

.badge-score {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  font-size: 0.75rem;
  background: #f3f4f6;
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
}

.score-value {
  font-weight: 700;
  color: #10b981;
}

.score-label {
  color: #6b7280;
}

@media (max-width: 640px) {
  .badges-container {
    flex-direction: column;
  }

  .category-badge {
    width: 100%;
  }
}
</style>
```

**Component Features:**
- Display all categories for a food
- Show match score percentage
- Link to category browse page
- Visual hierarchy (icon, name, score)
- Hover effects for interactivity
- Responsive layout (row on desktop, column on mobile)

**Accessibility:**
- Semantic HTML structure
- ARIA labels for match scores
- Keyboard navigation on badge links
- Screen reader announces category names and scores

**Verification:**
- Chicken breast shows badges: "High Protein (100%)", "Low Carb (95%)"
- Badges link to respective category pages
- Hover effect shows visual feedback
- Match scores display correctly
- On mobile, badges stack vertically
- Empty state shows when no categories assigned

**Prerequisites:** Story 3.5 (Category Browse Page)

**Technical Notes:**
- This component demonstrates multi-dimensional categorization (FR16)
- Match scores provide transparency into algorithm decisions
- Links enable category exploration navigation

---

## Epic 3 Completion Review

**Stories Created:** 6

**FR Coverage:**
- FR14-FR23: Categorization & Analytics (basic categorization complete, advanced analytics in Epic 4)

**Technical Context Used:**
- JSON rule engine with CategoryRule interface (Architecture lines 504-534)
- Match scoring algorithm (0-100) (Architecture lines 559-594)
- Batch categorization (Architecture lines 596-609)
- Manual override capability (Architecture lines 611-613)

**User Value Delivered:**
- ✅ Foods automatically categorized using flexible JSON rules
- ✅ Users can browse foods by nutrition category
- ✅ Multi-dimensional categorization (food can be in multiple categories)
- ✅ Match scores show category relevance
- ✅ Admins can manage categories and rules

**Algorithmic Innovation:**
- Flexible JSON rules allow adding categories without code changes
- Match scoring algorithm evaluates multiple nutrition dimensions
- Weight parameter allows prioritizing important conditions
- Manual override supports edge cases and refinement

**Epic 3 Success Criteria:**
- Alex Chen can click "High Protein" category and discover 15 foods
- Sarah Mitchell sees salmon appears in "High Protein", "Healthy Fats", and "Low Carb"
- Category pages are SEO-optimized for organic discovery
- Foundation ready for Epic 4 (advanced analytics needs categorized foods)

**Ready for:** Epic 4 - Advanced Analytics & Discovery

---

## Epic 4: Advanced Analytics & Discovery

**Epic Goal:** Implement sophisticated food analytics including versatile foods leaderboard, category overlap analysis, and "bridge foods" discovery.

**User Value:** Users explore advanced food relationships and discover "bridge foods" that connect disparate nutrition categories (e.g., foods that are both high protein AND low carb).

**PRD Coverage:** FR18-FR20 (Advanced Analytics)

**Technical Context:**
- Versatile foods leaderboard with multi-dimensional scoring (protein/calorie ratios, category coverage)
- Jaccard similarity clustering for category overlap analysis
- Advanced SQL aggregations and clustering algorithms
- Category analytics pages with relationship visualization

**Dependencies:** Epic 3 (Autocategorization) - needs categorized foods to analyze

---

### Story 4.1: Versatile Foods Leaderboard Algorithm

As a developer,
I want to implement an algorithm that ranks foods by versatility across multiple categories,
So that users can discover foods that serve multiple nutrition goals.

**Acceptance Criteria:**

**Given** foods are categorized
**When** I query the versatile foods leaderboard
**Then** foods are ranked by multi-dimensional versatility scores:

**Versatility Scoring Algorithm:**
```typescript
interface VersatilityScore {
  foodId: number;
  categoryCount: number;        // Number of categories food belongs to
  averageMatchScore: number;    // Average match score across categories
  proteinToCalorieRatio: number; // Protein/calorie * 100
  versatilityScore: number;      // Combined score (0-100)
}

export function calculateVersatilityScore(food: FoodDbRow, categories: CategoryDbRow[]): number {
  // Category count score (0-40 points)
  const categoryCountScore = Math.min(categories.length * 10, 40);

  // Average match score (0-30 points)
  const avgMatchScore = categories.reduce((sum, cat) => sum + cat.match_score, 0) / categories.length;
  const matchScorePoints = (avgMatchScore / 100) * 30;

  // Protein-to-calorie ratio (0-30 points)
  const proteinCalorieRatio = (food.protein_g / food.calories) * 100;
  const ratioScore = Math.min(proteinCalorieRatio * 2, 30);

  // Combined versatility score
  return Math.round(categoryCountScore + matchScorePoints + ratioScore);
}
```

**SQL Query for Leaderboard:**
```sql
SELECT
  f.*,
  COUNT(fc.category_id) as category_count,
  AVG(fc.match_score) as avg_match_score,
  (f.protein_g / f.calories) * 100 as protein_calorie_ratio,
  (
    (LEAST(COUNT(fc.category_id) * 10, 40)) +
    (AVG(fc.match_score) * 0.3) +
    (LEAST((f.protein_g / f.calories) * 100 * 2, 30))
  ) as versatility_score
FROM foods f
INNER JOIN food_categories fc ON f.id = fc.food_id
INNER JOIN categories c ON fc.category_id = c.id AND c.is_active = 1
GROUP BY f.id
HAVING category_count >= 2  -- Must be in at least 2 categories
ORDER BY versatility_score DESC, category_count DESC
LIMIT 100
```

**API Endpoint (`server/api/analytics/versatile-foods.ts`):**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const db = getDatabase();

    const foods = db.all(`
      SELECT
        f.*,
        COUNT(fc.category_id) as category_count,
        AVG(fc.match_score) as avg_match_score,
        ROUND((f.protein_g / f.calories) * 100, 2) as protein_calorie_ratio,
        ROUND((
          LEAST(COUNT(fc.category_id) * 10, 40) +
          (AVG(fc.match_score) * 0.3) +
          LEAST(((f.protein_g / f.calories) * 100 * 2), 30)
        ), 2) as versatility_score
      FROM foods f
      INNER JOIN food_categories fc ON f.id = fc.food_id
      INNER JOIN categories c ON fc.category_id = c.id AND c.is_active = 1
      GROUP BY f.id
      HAVING category_count >= 2
      ORDER BY versatility_score DESC
      LIMIT 100
    `);

    return {
      data: foods.map(f => ({
        ...transformFoodToApiFormat(f),
        categoryCount: f.category_count,
        avgMatchScore: Math.round(f.avg_match_score),
        proteinCalorieRatio: f.protein_calorie_ratio,
        versatilityScore: f.versatility_score
      })),
      success: true
    };
  } catch (error) {
    logError(error, { route: '/api/analytics/versatile-foods' });
    throw createError({
      statusCode: 500,
      message: 'Failed to calculate versatile foods leaderboard'
    });
  }
});
```

**Verification:**
- Greek yogurt (appears in 5+ categories) ranks near top
- Egg whites (high protein/calorie ratio) ranks high
- Foods in only 1 category don't appear on leaderboard
- Versatility score calculated correctly (0-100 range)
- Results ordered by versatility_score DESC
- Query completes <1 second (NFR-PERF-003)

**Prerequisites:** Story 3.2 (Batch Categorization)

**Technical Notes:**
- Multi-dimensional scoring: category count + match scores + protein efficiency
- Demonstrates SQL aggregation skills (portfolio value)
- This enables discovery of "superfoods" that serve multiple goals

---

### Story 4.2: Category Overlap Analysis (Jaccard Similarity)

As a developer,
I want to implement Jaccard similarity clustering to analyze category overlap,
So that users can see relationships between nutrition categories.

**Acceptance Criteria:**

**Given** foods belong to multiple categories
**When** I analyze category overlap
**Then** I see similarity scores showing how categories relate:

**Jaccard Similarity Algorithm:**
```typescript
// Jaccard Similarity = (Intersection / Union)
// Measures how many foods two categories share relative to their total unique foods

interface CategoryOverlap {
  category1Id: number;
  category2Id: number;
  intersectionSize: number;  // Foods in both categories
  unionSize: number;          // Foods in either category
  jaccardSimilarity: number;  // Intersection / Union (0-1)
}

export function calculateCategoryOverlap(category1Id: number, category2Id: number): CategoryOverlap {
  const db = getDatabase();

  // Count foods in both categories (intersection)
  const intersection = db.get(`
    SELECT COUNT(*) as count
    FROM food_categories fc1
    INNER JOIN food_categories fc2 ON fc1.food_id = fc2.food_id
    WHERE fc1.category_id = ? AND fc2.category_id = ?
  `, [category1Id, category2Id]);

  // Count unique foods in either category (union)
  const union = db.get(`
    SELECT COUNT(*) as count
    FROM (
      SELECT food_id FROM food_categories WHERE category_id = ?
      UNION
      SELECT food_id FROM food_categories WHERE category_id = ?
    )
  `, [category1Id, category2Id]);

  const jaccardSimilarity = intersection.count / union.count;

  return {
    category1Id,
    category2Id,
    intersectionSize: intersection.count,
    unionSize: union.count,
    jaccardSimilarity: Math.round(jaccardSimilarity * 100) / 100
  };
}
```

**Batch Category Overlap API:**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const db = getDatabase();

    // Get all active categories
    const categories = db.all('SELECT * FROM categories WHERE is_active = 1');

    // Calculate overlap for all category pairs
    const overlaps: CategoryOverlap[] = [];

    for (let i = 0; i < categories.length; i++) {
      for (let j = i + 1; j < categories.length; j++) {
        const overlap = calculateCategoryOverlap(categories[i].id, categories[j].id);
        overlaps.push(overlap);
      }
    }

    // Sort by Jaccard similarity (highest first)
    overlaps.sort((a, b) => b.jaccardSimilarity - a.jaccardSimilarity);

    return {
      data: overlaps.map(o => ({
        category1Name: categories.find(c => c.id === o.category1Id)?.name,
        category2Name: categories.find(c => c.id === o.category2Id)?.name,
        ...o
      })),
      success: true
    };
  } catch (error) {
    logError(error, { route: '/api/analytics/category-overlap' });
    throw createError({
      statusCode: 500,
      message: 'Failed to calculate category overlap'
    });
  }
});
```

**Visualization Data Structure:**
```json
{
  "nodes": [
    { "id": "high-protein", "label": "High Protein", "group": 1 },
    { "id": "low-carb", "label": "Low Carb", "group": 2 },
    { "id": "healthy-fats", "label": "Healthy Fats", "group": 3 }
  ],
  "links": [
    { "source": "high-protein", "target": "low-carb", "value": 0.65, "foods": 42 },
    { "source": "high-protein", "target": "healthy-fats", "value": 0.48, "foods": 31 }
  ]
}
```

**Verification:**
- "High Protein" and "Low Carb" show high overlap (0.60-0.80)
- "High Fiber" and "Low Carb" show lower overlap (0.20-0.40)
- Jaccard similarity calculated correctly (0-1 range)
- Results sorted by similarity (highest first)
- Query completes <1 second for 10 categories (45 pairs)
- Visualization data format ready for graph library

**Prerequisites:** Story 3.2 (Batch Categorization)

**Technical Notes:**
- Jaccard similarity is standard clustering metric
- Demonstrates data science and SQL skills (portfolio value)
- Enables visual category relationship diagrams

---

### Story 4.3: "Bridge Foods" Discovery Algorithm

As a developer,
I want to implement an algorithm that discovers "bridge foods" connecting disparate categories,
So that users can find foods that serve multiple nutrition goals.

**Acceptance Criteria:**

**Given** categories have varying degrees of overlap
**When** I query for bridge foods between two categories
**Then** I see foods that effectively connect those categories:

**Bridge Foods Algorithm:**
```typescript
// Bridge foods = foods that belong to both categories with high match scores
// Ranked by combined match score (sum of both category match scores)

interface BridgeFood {
  food: Food;
  category1Score: number;
  category2Score: number;
  combinedScore: number;
}

export function findBridgeFoods(category1Slug: string, category2Slug: string): BridgeFood[] {
  const db = getDatabase();

  const foods = db.all(`
    SELECT
      f.*,
      fc1.match_score as category1_score,
      fc2.match_score as category2_score,
      (fc1.match_score + fc2.match_score) as combined_score
    FROM foods f
    INNER JOIN food_categories fc1 ON f.id = fc1.food_id
    INNER JOIN food_categories fc2 ON f.id = fc2.food_id
    INNER JOIN categories c1 ON fc1.category_id = c1.id
    INNER JOIN categories c2 ON fc2.category_id = c2.id
    WHERE c1.slug = ? AND c2.slug = ?
      AND fc1.match_score >= 60
      AND fc2.match_score >= 60
    ORDER BY combined_score DESC
    LIMIT 50
  `, [category1Slug, category2Slug]);

  return foods.map(f => ({
    food: transformFoodToApiFormat(f),
    category1Score: f.category1_score,
    category2Score: f.category2_score,
    combinedScore: f.combined_score
  }));
}
```

**API Endpoint (`server/api/analytics/bridge-foods.ts`):**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const category1Slug = getQuery(event).category1 as string;
    const category2Slug = getQuery(event).category2 as string;

    if (!category1Slug || !category2Slug) {
      throw createError({
        statusCode: 400,
        message: 'category1 and category2 query parameters required'
      });
    }

    const bridgeFoods = findBridgeFoods(category1Slug, category2Slug);

    return {
      data: bridgeFoods,
      meta: {
        category1Slug,
        category2Slug,
        count: bridgeFoods.length
      },
      success: true
    };
  } catch (error) {
    logError(error, { route: '/api/analytics/bridge-foods' });
    throw error;
  }
});
```

**Verification:**
- GET `/api/analytics/bridge-foods?category1=high-protein&category2=low-carb` returns bridge foods
- Egg whites appears (high protein + low carb)
- Salmon appears (high protein + healthy fats)
- Only foods with match_score ≥60 in both categories returned
- Results ordered by combined_score (sum of both match scores)
- Empty array returned if no bridge foods exist

**Prerequisites:** Story 3.2 (Batch Categorization), Story 4.2 (Category Overlap)

**Technical Notes:**
- Bridge foods connect disparate nutrition goals
- Sarah Mitchell's journey feature (finds foods for cutting: high protein + low carb)
- Demonstrates sophisticated SQL queries (portfolio value)

---

### Story 4.4: Analytics Dashboard Page

As a developer,
I want to create an analytics dashboard page showcasing advanced food relationships,
So that users can explore sophisticated nutrition insights.

**Acceptance Criteria:**

**Given** analytics algorithms exist
**When** I navigate to `/analytics`
**Then** I see a comprehensive dashboard with leaderboards and visualizations:

**Page Implementation (`pages/analytics/index.vue`):**
```vue
<script setup lang="ts">
// Fetch versatile foods leaderboard
const { data: versatileFoods } = await useAsyncData('versatile-foods', async () => {
  const response = await $fetch('/api/analytics/versatile-foods');
  return response.success ? response.data : [];
});

// Fetch category overlap data
const { data: categoryOverlap } = await useAsyncData('category-overlap', async () => {
  const response = await $fetch('/api/analytics/category-overlap');
  return response.success ? response.data : [];
});

useHead({
  title: 'Nutrition Analytics - Discover Food Relationships',
  meta: [
    {
      name: 'description',
      content: 'Explore advanced nutrition analytics: versatile foods, category overlap, and bridge foods that connect nutrition goals.'
    }
  ]
});
</script>

<template>
  <div class="analytics-dashboard">
    <h1>Advanced Nutrition Analytics</h1>

    <!-- Versatile Foods Section -->
    <section class="analytics-section">
      <h2>Versatile Foods Leaderboard</h2>
      <p class="section-description">
        Foods that serve multiple nutrition goals, ranked by versatility score.
      </p>

      <div class="leaderboard">
        <div v-for="(food, index) in versatileFoods.slice(0, 20)" :key="food.id" class="leaderboard-item">
          <div class="rank">{{ index + 1 }}</div>
          <div class="food-info">
            <h3>{{ food.name }}</h3>
            <div class="stats">
              <span class="badge">{{ food.categoryCount }} categories</span>
              <span class="badge">{{ food.versatilityScore }} versatility</span>
              <span class="badge">{{ food.proteinCalorieRatio.toFixed(1) }} P/C ratio</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Category Overlap Section -->
    <section class="analytics-section">
      <h2>Category Relationships</h2>
      <p class="section-description">
        See how nutrition categories relate to each other through shared foods.
      </p>

      <div class="overlap-grid">
        <div
          v-for="overlap in categoryOverlap.slice(0, 15)"
          :key="`${overlap.category1Name}-${overlap.category2Name}`"
          class="overlap-item"
        >
          <div class="category-names">
            <span class="category-name">{{ overlap.category1Name }}</span>
            <span class="connector">↔</span>
            <span class="category-name">{{ overlap.category2Name }}</span>
          </div>
          <div class="similarity-bar">
            <div
              class="similarity-fill"
              :style="{ width: `${overlap.jaccardSimilarity * 100}%` }"
            ></div>
          </div>
          <div class="similarity-score">
            {{ (overlap.jaccardSimilarity * 100).toFixed(0) }}% overlap
            <span class="food-count">({{ overlap.intersectionSize }} foods)</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Bridge Foods Explorer -->
    <section class="analytics-section">
      <h2>Bridge Foods Explorer</h2>
      <p class="section-description">
        Discover foods that connect two nutrition categories.
      </p>

      <BridgeFoodsExplorer />
    </section>
  </div>
</template>

<style scoped>
.analytics-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 3rem;
}

.analytics-section {
  margin-bottom: 4rem;
}

.section-description {
  text-align: center;
  color: #6b7280;
  margin-bottom: 2rem;
}

.leaderboard-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  margin-bottom: 0.75rem;
}

.rank {
  font-size: 2rem;
  font-weight: 700;
  color: #10b981;
  width: 3rem;
  text-align: center;
}

.food-info h3 {
  margin: 0 0 0.5rem 0;
}

.stats {
  display: flex;
  gap: 0.5rem;
}

.badge {
  padding: 0.25rem 0.5rem;
  background: #f3f4f6;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
}

.overlap-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}

.overlap-item {
  padding: 1rem;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.category-names {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.connector {
  color: #10b981;
  font-weight: 700;
}

.similarity-bar {
  height: 8px;
  background: #f3f4f6;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.similarity-fill {
  height: 100%;
  background: linear-gradient(90deg, #10b981, #059669);
  transition: width 0.5s ease;
}

.similarity-score {
  font-size: 0.875rem;
  color: #6b7280;
}

.food-count {
  margin-left: 0.5rem;
  font-size: 0.75rem;
}
</style>
```

**Verification:**
- `/analytics` page loads with versatile foods leaderboard
- Top 20 versatile foods displayed with stats
- Category overlap shown with visual similarity bars
- Bridge foods explorer component renders
- Responsive layout (mobile single column, desktop multi-column)
- Page load <1 second (NFR-PERF-003)

**Prerequisites:** Story 4.1 (Versatile Foods), Story 4.2 (Category Overlap), Story 4.3 (Bridge Foods)

**Technical Notes:**
- This is Marcus Johnson's "wow factor" page (recruiter demo)
- Demonstrates algorithmic thinking and data visualization
- Complex SQL aggregations showcase engineering skills

---

## Epic 4 Completion Review

**Stories Created:** 4

**FR Coverage:**
- FR18: Versatile foods leaderboard ✅
- FR19: Category overlap analysis ✅
- FR20: "Bridge foods" discovery ✅

**Technical Context Used:**
- Multi-dimensional scoring algorithms
- Jaccard similarity clustering
- Advanced SQL aggregations
- Data visualization techniques

**User Value Delivered:**
- ✅ Users see versatile foods serving multiple goals
- ✅ Users understand category relationships
- ✅ Users discover "bridge foods" connecting categories
- ✅ Analytics dashboard showcases sophisticated insights

**Portfolio Differentiation:**
- Algorithmic thinking demonstrated
- Advanced SQL skills showcased
- Data science and clustering visible
- Interactive analytics create "wow factor"

**Epic 4 Success Criteria:**
- Sarah Mitchell discovers versatile foods like Greek yogurt (5 categories)
- Marcus Johnson sees impressive analytics in demo
- Category overlap visualization reveals relationships
- Bridge foods help users with multiple nutrition goals

**Ready for:** Epic 5 - Social Sharing & Virality

---

## Epic 5: Social Sharing & Virality

**Epic Goal:** Enable users to share nutrition information to social media with beautiful, visually compelling cards for viral discovery.

**User Value:** Users can share food nutrition discoveries to social platforms, driving organic growth through viral loops.

**PRD Coverage:** FR24-FR28 (Social Sharing & Virality)

**Technical Context:**
- html2canvas integration for image generation (Architecture line 294)
- Open Graph and Twitter Card meta tags (PRD lines 667-687)
- Share image aspect ratio: 1200x630px (PRD line 687)
- Social sharing APIs (Twitter/X, LinkedIn, clipboard)

**Dependencies:** Epic 2 (Search & Food Discovery) - needs food detail pages to share

---

### Story 5.1: NutritionCard Visual Component

As a developer,
I want to create a beautiful NutritionCard component designed for social sharing,
So that users can generate visually compelling nutrition cards.

**Acceptance Criteria:**

**Given** food nutrition data exists
**When** I render the NutritionCard component
**Then** I see a visually stunning card optimized for social media:

**Component Implementation (`components/NutritionCard.vue`):**
```vue
<script setup lang="ts">
const props = defineProps<{
  food: Food;
  variant?: 'default' | 'compact';
}>();

const cardRef = ref<HTMLElement>();

// Generate unique ID for screenshot
const cardId = computed(() => `nutrition-card-${props.food.slug}`);

// Expose generate function for parent components
const generateImage = async () => {
  if (!cardRef.value) return null;

  const html2canvas = (await import('html2canvas')).default;

  const canvas = await html2canvas(cardRef.value, {
    backgroundColor: '#10b981',
    scale: 2, // Retina quality
    useCORS: true,
    logging: false
  });

  return canvas.toDataURL('image/png');
};

defineExpose({ generateImage });
</script>

<template>
  <div
    :id="cardId"
    ref="cardRef"
    class="nutrition-card"
    :class="`nutrition-card--${variant || 'default'}`"
  >
    <!-- Brand Header -->
    <div class="card-header">
      <div class="brand">Nutrition Hub</div>
      <div class="brand-tag">Know Your Food</div>
    </div>

    <!-- Food Name -->
    <h1 class="food-name">{{ food.name }}</h1>

    <!-- Hero Stat -->
    <div class="hero-stat">
      <div class="stat-value">{{ food.calories }}</div>
      <div class="stat-label">Calories</div>
      <div class="stat-unit">per 100g</div>
    </div>

    <!-- Macro Bars -->
    <div class="macro-section">
      <div class="macro-bar">
        <div class="macro-label">Protein</div>
        <div class="macro-bar-container">
          <div class="macro-bar-fill protein" :style="{ width: `${Math.min(food.proteinG * 2, 100)}%` }"></div>
        </div>
        <div class="macro-value">{{ food.proteinG }}g</div>
      </div>

      <div class="macro-bar">
        <div class="macro-label">Carbs</div>
        <div class="macro-bar-container">
          <div class="macro-bar-fill carbs" :style="{ width: `${Math.min(food.carbohydratesTotalG * 2, 100)}%` }"></div>
        </div>
        <div class="macro-value">{{ food.carbohydratesTotalG }}g</div>
      </div>

      <div class="macro-bar">
        <div class="macro-label">Fat</div>
        <div class="macro-bar-container">
          <div class="macro-bar-fill fat" :style="{ width: `${Math.min(food.fatTotalG * 3, 100)}%` }"></div>
        </div>
        <div class="macro-value">{{ food.fatTotalG }}g</div>
      </div>
    </div>

    <!-- Category Badges -->
    <div v-if="food.categories" class="category-badges">
      <div v-for="category in food.categories.slice(0, 3)" :key="category.id" class="badge">
        {{ category.name }}
      </div>
    </div>

    <!-- Footer -->
    <div class="card-footer">
      <div class="url">nutrition-hub.app/foods/{{ food.slug }}</div>
    </div>
  </div>
</template>

<style scoped>
.nutrition-card {
  width: 600px;
  padding: 2rem;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  border-radius: 1rem;
  color: white;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.brand {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
}

.brand-tag {
  font-size: 0.875rem;
  opacity: 0.9;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
}

.food-name {
  font-size: 3rem;
  font-weight: 800;
  margin: 1rem 0;
  line-height: 1.1;
}

.hero-stat {
  text-align: center;
  padding: 2rem 0;
}

.stat-value {
  font-size: 5rem;
  font-weight: 900;
  line-height: 1;
}

.stat-label {
  font-size: 1.5rem;
  font-weight: 600;
  margin-top: 0.5rem;
}

.stat-unit {
  font-size: 1rem;
  opacity: 0.8;
  margin-top: 0.25rem;
}

.macro-section {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.75rem;
  padding: 1.5rem;
}

.macro-bar {
  display: grid;
  grid-template-columns: 100px 1fr 60px;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.macro-bar:last-child {
  margin-bottom: 0;
}

.macro-label {
  font-weight: 600;
}

.macro-bar-container {
  height: 12px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  overflow: hidden;
}

.macro-bar-fill {
  height: 100%;
  border-radius: 6px;
  transition: width 0.3s ease;
}

.macro-bar-fill.protein { background: #fbbf24; }
.macro-bar-fill.carbs { background: #60a5fa; }
.macro-bar-fill.fat { background: #f472b6; }

.macro-value {
  font-weight: 700;
  text-align: right;
}

.category-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.card-footer {
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
}

.url {
  font-size: 0.875rem;
  opacity: 0.8;
}

/* Compact variant for smaller shares */
.nutrition-card--compact {
  width: 400px;
  padding: 1.5rem;
}

.nutrition-card--compact .food-name {
  font-size: 2rem;
}

.nutrition-card--compact .stat-value {
  font-size: 3rem;
}
</style>
```

**Verification:**
- Card renders with gradient background and white text
- Macro bars display with correct widths
- Category badges show up to 3 categories
- Card dimensions: 600px width (1200x630px when scaled 2x)
- Visual design is Instagram/Twitter-ready
- Colors have sufficient contrast for accessibility

**Prerequisites:** Story 2.5 (Food Detail Page)

**Technical Notes:**
- html2canvas generates PNG from DOM
- Scale 2 for Retina quality (social media optimization)
- This component is used for share image generation (Story 5.2)

---

### Story 5.2: Share Image Generation & Caching

As a developer,
I want to implement share image generation with caching,
So that users can share nutrition cards to social media.

**Acceptance Criteria:**

**Given** the NutritionCard component exists
**When** a user clicks the share button
**Then** a share image is generated and can be shared:

**Share Image Generation Utility (`server/utils/share-images.ts`):**
```typescript
export async function generateShareImage(foodSlug: string): Promise<string> {
  // Check if cached image exists
  const cachedPath = `/public/share-images/${foodSlug}.png`;
  if (fs.existsSync(cachedPath)) {
    return cachedPath;
  }

  // Fetch food data
  const food = await getFoodBySlug(foodSlug);
  if (!food) {
    throw new Error('Food not found');
  }

  // Render nutrition card to HTML (using puppeteer or server-side rendering)
  const html = renderNutritionCard(food);

  // Generate image using puppeteer (for server-side rendering)
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);
  const screenshot = await page.screenshot({
    type: 'png',
    clip: { x: 0, y: 0, width: 1200, height: 630 }
  });
  await browser.close();

  // Save to public folder for CDN caching
  fs.writeFileSync(cachedPath, screenshot);

  return cachedPath;
}
```

**API Endpoint (`server/api/foods/[foodSlug]/share-image.ts`):**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const foodSlug = getRouterParam(event, 'foodSlug');

    // Check if cached image exists
    const imagePath = `./public/share-images/${foodSlug}.png`;

    if (fs.existsSync(imagePath)) {
      // Serve cached image
      setHeader(event, 'Content-Type', 'image/png');
      setHeader(event, 'Cache-Control', 'public, max-age=31536000'); // 1 year
      return fs.readFileSync(imagePath);
    }

    // Generate new image
    const imagePath = await generateShareImage(foodSlug);

    setHeader(event, 'Content-Type', 'image/png');
    setHeader(event, 'Cache-Control', 'public, max-age=31536000');
    return fs.readFileSync(imagePath);
  } catch (error) {
    logError(error, { route: `/api/foods/${getRouterParam(event, 'foodSlug')}/share-image` });
    throw createError({
      statusCode: 500,
      message: 'Failed to generate share image'
    });
  }
});
```

**Client-Side Share Function (`composables/useShareImage.ts`):**
```typescript
export function useShareImage(foodSlug: string) {
  const generating = ref(false);
  const imageUrl = ref<string | null>(null);
  const error = ref<string | null>(null);

  const generateImage = async () => {
    generating.value = true;
    error.value = null;

    try {
      // Trigger server-side image generation
      const response = await $fetch(`/api/foods/${foodSlug}/share-image`, {
        method: 'POST'
      });

      imageUrl.value = `/share-images/${foodSlug}.png`;
    } catch (e) {
      error.value = 'Failed to generate share image';
      console.error(e);
    } finally {
      generating.value = false;
    }
  };

  return {
    generating,
    imageUrl,
    error,
    generateImage
  };
}
```

**Verification:**
- Click share button → image generated server-side
- Generated image saved to `/public/share-images/`
- Second share request serves cached image (no regeneration)
- Image dimensions: 1200x630px (Open Graph recommended)
- Images cached for 1 year (Cache-Control header)
- CDN serves images (Vercel Edge Network)

**Prerequisites:** Story 5.1 (NutritionCard Component)

**Technical Notes:**
- Server-side generation ensures consistency
- Caching prevents redundant generation
- CDN delivery ensures fast global access
- Images stored in Vercel Blob for persistence

---

### Story 5.3: Social Share Buttons Component

As a developer,
I want to create social share buttons for Twitter/X, LinkedIn, and clipboard,
So that users can easily share nutrition information.

**Acceptance Criteria:**

**Given** share images exist
**When** a user clicks a share button
**Then** the appropriate share dialog or action is triggered:

**Component Implementation (`components/ShareButtons.vue`):**
```vue
<script setup lang="ts">
const props = defineProps<{
  foodSlug: string;
  foodName: string;
  shareImageUrl?: string;
}>();

const { generating, imageUrl, generateImage, error } = useShareImage(props.foodSlug);

// Share URLs
const shareUrl = computed(() => `${window.location.origin}/foods/${props.foodSlug}`);

const twitterShareUrl = computed(() => {
  const text = encodeURIComponent(`${props.foodName}: ${props.shareImageUrl || 'Check nutrition facts'}`);
  const url = encodeURIComponent(shareUrl.value);
  return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
});

const linkedInShareUrl = computed(() => {
  const url = encodeURIComponent(shareUrl.value);
  return `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
});

// Copy to clipboard
const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(shareUrl.value);

    // Show success feedback
    alert('Link copied to clipboard!');
  } catch (e) {
    console.error('Failed to copy:', e);
    alert('Failed to copy link');
  }
};

// Generate share image before sharing
const handleShare = async (platform: 'twitter' | 'linkedin') => {
  await generateImage();

  if (platform === 'twitter') {
    window.open(twitterShareUrl.value, '_blank', 'width=600,height=400');
  } else if (platform === 'linkedin') {
    window.open(linkedInShareUrl.value, '_blank', 'width=600,height=400');
  }
};
</script>

<template>
  <div class="share-buttons">
    <button
      @click="handleShare('twitter')"
      :disabled="generating"
      class="share-button twitter"
      aria-label="Share to Twitter/X"
    >
      <UIcon name="i-simple-icons-x" />
      <span v-if="!generating">Share to X</span>
      <span v-else>Generating...</span>
    </button>

    <button
      @click="handleShare('linkedin')"
      :disabled="generating"
      class="share-button linkedin"
      aria-label="Share to LinkedIn"
    >
      <UIcon name="i-simple-icons-linkedin" />
      <span v-if="!generating">Share to LinkedIn</span>
      <span v-else>Generating...</span>
    </button>

    <button
      @click="copyToClipboard"
      class="share-button clipboard"
      aria-label="Copy link to clipboard"
    >
      <UIcon name="i-heroicons-clipboard-document" />
      <span>Copy Link</span>
    </button>

    <p v-if="error" class="error-message">{{ error }}</p>
  </div>
</template>

<style scoped>
.share-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.share-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  border: none;
  border-radius: 2rem;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.share-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.share-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.share-button.twitter {
  background: #000;
  color: white;
}

.share-button.linkedin {
  background: #0077b5;
  color: white;
}

.share-button.clipboard {
  background: #f3f4f6;
  color: #1f2937;
}

.error-message {
  color: #ef4444;
  font-size: 0.875rem;
  width: 100%;
}
</style>
```

**Verification:**
- Click "Share to X" → Twitter intent opens in popup
- Click "Share to LinkedIn" → LinkedIn share dialog opens
- Click "Copy Link" → URL copied to clipboard
- Share buttons disabled while generating image
- All buttons have ARIA labels for accessibility
- Hover effects provide visual feedback

**Prerequisites:** Story 5.2 (Share Image Generation)

**Technical Notes:**
- Social media intent URLs for platform-native sharing
- Popup windows prevent navigating away from app
- Clipboard API for copy-to-clipboard functionality

---

### Story 5.4: Open Graph & Twitter Card Meta Tags

As a developer,
I want to implement Open Graph and Twitter Card meta tags on food detail pages,
So that shared links show rich previews on social platforms.

**Acceptance Criteria:**

**Given** a food detail page exists
**When** the page is shared on social media
**Then** rich link previews display with nutrition card image:

**Meta Tags Implementation (update `pages/foods/[foodSlug].vue`):**
```vue
<script setup lang="ts">
// ... existing data fetching code

// Generate share image URL
const shareImageUrl = computed(() =>
  `${window.location.origin}/api/foods/${foodSlug}/share-image`
);

useHead({
  // Existing title and description

  // Open Graph tags (Facebook, LinkedIn, general)
  meta: [
    // ... existing meta tags
    {
      property: 'og:image',
      content: shareImageUrl.value
    },
    {
      property: 'og:image:width',
      content: '1200'
    },
    {
      property: 'og:image:height',
      content: '630'
    },
    {
      property: 'og:image:alt',
      content: `${data.value.name} nutrition facts`
    }
  ],

  // Twitter Card tags
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(jsonLd.value)
    },
    {
      innerHTML: `
        <meta name="twitter:card" content="summary_large_image">
        <meta name="twitter:title" content="${data.value.name}: ${data.value.proteinG}g Protein per 100g">
        <meta name="twitter:description" content="${data.value.calories} calories, ${data.value.carbohydratesTotalG}g carbs per 100g">
        <meta name="twitter:image" content="${shareImageUrl.value}">
        <meta name="twitter:image:alt" content="${data.value.name} nutrition facts">
      `
    }
  ]
});
</script>
```

**Verification:**
- Page source includes all Open Graph meta tags
- Twitter Card validator shows valid card
- Facebook Sharing Debugger displays rich preview
- LinkedIn shows image preview when sharing
- Image dimensions: 1200x630px (recommended)
- Alt text provided for accessibility

**Prerequisites:** Story 5.2 (Share Image Generation)

**Technical Notes:**
- Open Graph for Facebook, LinkedIn, general platforms
- Twitter Card tags for enhanced Twitter previews
- Follow PRD social sharing requirements (FR27, FR28)

---

## Epic 5 Completion Review

**Stories Created:** 4

**FR Coverage:**
- FR24: Share to social platforms ✅
- FR25: Copy shareable links ✅
- FR26: Generate visual nutrition cards ✅
- FR27: Open Graph rich previews ✅
- FR28: Twitter Card enhanced previews ✅

**Technical Context Used:**
- html2canvas for image generation
- Open Graph and Twitter Card meta tags
- Social media intent URLs
- Clipboard API for copy functionality

**User Value Delivered:**
- ✅ Users can share nutrition discoveries to social media
- ✅ Beautiful, shareable nutrition cards
- ✅ Rich link previews on all platforms
- ✅ Viral loop drives organic user acquisition

**Epic 5 Success Criteria:**
- Alex Chen shares tuna steak nutrition card to Instagram
- Social Media Visitor clicks link and lands on food detail page
- Rich previews display on Twitter/X, LinkedIn, Facebook
- Share buttons accessible with keyboard navigation

**Ready for:** Epic 6 - Admin Dashboard & System Monitoring

---

## Epic 6: Admin Dashboard & System Monitoring

**Epic Goal:** Create an admin analytics dashboard for system administrators to monitor performance, API usage, and cache effectiveness.

**User Value:** System administrators (you, Nabilakmal) can monitor system health, API quota usage, and analytics data for portfolio documentation.

**PRD Coverage:** FR29-FR35 (System Administration)

**Technical Context:**
- Admin dashboard components (Architecture lines 845-847)
- API usage monitoring with alerts at 80% quota (Architecture line 487)
- Cache hit rate tracking (Architecture line 485)
- Analytics data export (PDF/portfolio use)

**Dependencies:** Epic 2 (Search & Food Discovery) - needs search/activity data to monitor

---

### Story 6.1: Admin Analytics API Endpoints

As a developer,
I want to create API endpoints for system analytics,
So that the admin dashboard can display system metrics.

**Acceptance Criteria:**

**Given** the application has usage data
**When** I query analytics endpoints
**Then** I receive comprehensive system metrics:

**System Overview API (`server/api/admin/analytics/overview.ts`):**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const db = getDatabase();

    // Total foods in database
    const totalFoods = db.get('SELECT COUNT(*) as count FROM foods').count;

    // Total categories
    const totalCategories = db.get('SELECT COUNT(*) as count FROM categories WHERE is_active = 1').count;

    // Total categorizations
    const totalCategorizations = db.get('SELECT COUNT(*) as count FROM food_categories').count;

    // API calls this month (track in analytics table)
    const apiCallsThisMonth = db.get(`
      SELECT COUNT(*) as count
      FROM analytics
      WHERE created_at >= datetime('now', 'start of month')
      AND event_type = 'api_call'
    `).count || 0;

    // Cache hit rate
    const cacheHits = db.get(`
      SELECT COUNT(*) as count
      FROM analytics
      WHERE event_type = 'cache_hit'
      AND created_at >= datetime('now', 'start of month')
    `).count || 0;

    const cacheMisses = db.get(`
      SELECT COUNT(*) as count
      FROM analytics
      WHERE event_type = 'cache_miss'
      AND created_at >= datetime('now', 'start of month')
    `).count || 0;

    const cacheHitRate = cacheHits + cacheMisses > 0
      ? (cacheHits / (cacheHits + cacheMisses)) * 100
      : 0;

    // Unique foods cached this month
    const uniqueFoodsCached = db.get(`
      SELECT COUNT(DISTINCT food_id) as count
      FROM analytics
      WHERE event_type = 'cache_miss'
      AND created_at >= datetime('now', 'start of month')
    `).count || 0;

    return {
      data: {
        totalFoods,
        totalCategories,
        totalCategorizations,
        apiCallsThisMonth,
        cacheHitRate: Math.round(cacheHitRate),
        uniqueFoodsCached,
        apiQuotaUsed: Math.round((apiCallsThisMonth / 10000) * 100)
      },
      success: true
    };
  } catch (error) {
    logError(error, { route: '/api/admin/analytics/overview' });
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch analytics overview'
    });
  }
});
```

**Trending Foods API (`server/api/admin/analytics/trending-foods.ts`):**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const db = getDatabase();

    const trending = db.all(`
      SELECT
        f.name,
        f.slug,
        COUNT(*) as search_count
      FROM analytics a
      INNER JOIN foods f ON a.food_id = f.id
      WHERE a.event_type = 'food_view'
        AND a.created_at >= datetime('now', '-7 days')
      GROUP BY f.id
      ORDER BY search_count DESC
      LIMIT 20
    `);

    return {
      data: trending,
      success: true
    };
  } catch (error) {
    logError(error, { route: '/api/admin/analytics/trending-foods' });
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch trending foods'
    });
  }
});
```

**API Usage Monitoring (`server/api/admin/analytics/api-usage.ts`):**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const db = getDatabase();

    // Daily API usage for last 30 days
    const dailyUsage = db.all(`
      SELECT
        DATE(created_at) as date,
        COUNT(*) as calls
      FROM analytics
      WHERE event_type = 'api_call'
        AND created_at >= datetime('now', '-30 days')
      GROUP BY DATE(created_at)
      ORDER BY date DESC
    `);

    // API quota remaining
    const callsThisMonth = db.get(`
      SELECT COUNT(*) as count
      FROM analytics
      WHERE event_type = 'api_call'
        AND created_at >= datetime('now', 'start of month')
    `).count || 0;

    const quotaRemaining = 10000 - callsThisMonth;
    const quotaPercentUsed = (callsThisMonth / 10000) * 100;

    // Alert if approaching quota
    const alertThreshold = 80;
    const needsAlert = quotaPercentUsed >= alertThreshold;

    return {
      data: {
        dailyUsage,
        quotaUsed: Math.round(quotaPercentUsed),
        quotaRemaining,
        needsAlert,
        alertThreshold
      },
      success: true
    };
  } catch (error) {
    logError(error, { route: '/api/admin/analytics/api-usage' });
    throw createError({
      statusCode: 500,
      message: 'Failed to fetch API usage'
    });
  }
});
```

**Analytics Event Logging (`server/utils/analytics.ts`):**
```typescript
export function logAnalyticsEvent(event: {
  eventType: 'api_call' | 'cache_hit' | 'cache_miss' | 'food_view' | 'category_view';
  foodId?: number;
  categoryId?: number;
  metadata?: Record<string, any>;
}) {
  const db = getDatabase();

  db.run(`
    INSERT INTO analytics (event_type, food_id, category_id, metadata, created_at)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)
  `, [event.eventType, event.foodId || null, event.categoryId || null, event.metadata ? JSON.stringify(event.metadata) : null]);
}
```

**Verification:**
- GET `/api/admin/analytics/overview` returns system metrics
- GET `/api/admin/analytics/trending-foods` returns top 20 foods last 7 days
- GET `/api/admin/analytics/api-usage` returns daily usage and quota status
- Analytics events logged on API calls, cache hits/misses
- Quota alert triggers at 80% usage

**Prerequisites:** Story 1.2 (Database Schema - needs analytics table), Story 2.3 (API Integration)

**Technical Notes:**
- Analytics table needed in schema (add to migration)
- Admin routes should be protected (authentication in Vision phase)
- This enables Nabilakmal's journey (Journey 4)

---

### Story 6.2: Admin Dashboard Page

As a developer,
I want to create an admin dashboard page displaying system metrics,
So that administrators can monitor system health and usage.

**Acceptance Criteria:**

**Given** analytics API endpoints exist
**When** I navigate to `/admin/analytics`
**Then** I see a comprehensive dashboard with system metrics:

**Page Implementation (`pages/admin/analytics.vue`):**
```vue
<script setup lang="ts">
// Fetch overview stats
const { data: overview } = await useAsyncData('admin-overview', async () => {
  const response = await $fetch('/api/admin/analytics/overview');
  return response.success ? response.data : null;
});

// Fetch trending foods
const { data: trendingFoods } = await useAsyncData('trending-foods', async () => {
  const response = await $fetch('/api/admin/analytics/trending-foods');
  return response.success ? response.data : [];
});

// Fetch API usage
const { data: apiUsage } = await useAsyncData('api-usage', async () => {
  const response = await $fetch('/api/admin/analytics/api-usage');
  return response.success ? response.data : null;
});

useHead({
  title: 'Admin Analytics - Nutrition Hub',
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow' // Prevent admin pages from being indexed
    }
  ]
});
</script>

<template>
  <div class="admin-dashboard">
    <div class="dashboard-header">
      <h1>System Analytics Dashboard</h1>
      <p class="last-updated">Last updated: {{ new Date().toLocaleString() }}</p>
    </div>

    <!-- Key Metrics -->
    <section class="metrics-grid">
      <div class="metric-card">
        <div class="metric-label">Total Foods</div>
        <div class="metric-value">{{ overview?.totalFoods || 0 }}</div>
      </div>

      <div class="metric-card">
        <div class="metric-label">Total Categories</div>
        <div class="metric-value">{{ overview?.totalCategories || 0 }}</div>
      </div>

      <div class="metric-card">
        <div class="metric-label">API Calls This Month</div>
        <div class="metric-value">{{ overview?.apiCallsThisMonth || 0 }}</div>
        <div class="metric-sub">/ 10,000 quota</div>
      </div>

      <div class="metric-card">
        <div class="metric-label">Cache Hit Rate</div>
        <div class="metric-value" :class="{ 'good': overview?.cacheHitRate >= 95, 'warning': overview?.cacheHitRate < 95 }">
          {{ overview?.cacheHitRate || 0 }}%
        </div>
        <div class="metric-sub">Target: 95%+</div>
      </div>

      <div class="metric-card">
        <div class="metric-label">Unique Foods Cached</div>
        <div class="metric-value">{{ overview?.uniqueFoodsCached || 0 }}</div>
        <div class="metric-sub">This month</div>
      </div>

      <div class="metric-card">
        <div class="metric-label">API Quota Used</div>
        <div class="metric-value" :class="{ 'good': overview?.apiQuotaUsed < 80, 'warning': overview?.apiQuotaUsed >= 80 }">
          {{ overview?.apiQuotaUsed || 0 }}%
        </div>
        <UProgress v-if="overview" :value="overview.apiQuotaUsed" :color="overview.apiQuotaUsed >= 80 ? 'red' : 'green'" />
      </div>
    </section>

    <!-- Trending Foods -->
    <section class="trending-section">
      <h2>Trending Foods (Last 7 Days)</h2>
      <div class="trending-list">
        <div v-for="(food, index) in trendingFoods.slice(0, 10)" :key="food.slug" class="trending-item">
          <div class="rank">{{ index + 1 }}</div>
          <div class="food-info">
            <NuxtLink :to="`/foods/${food.slug}`">{{ food.name }}</NuxtLink>
            <span class="views">{{ food.search_count }} views</span>
          </div>
        </div>
      </div>
    </section>

    <!-- API Usage Chart -->
    <section class="chart-section">
      <h2>API Usage (Last 30 Days)</h2>
      <div v-if="apiUsage?.needsAlert" class="quota-alert">
        <UAlert icon="i-heroicons-exclamation-triangle" color="yellow" title="API Quota Alert">
          Approaching 80% of monthly quota. Monitor usage closely.
        </UAlert>
      </div>
      <AnalyticsChart :data="apiUsage?.dailyUsage || []" />
    </section>
  </div>
</template>

<style scoped>
.admin-dashboard {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
}

.dashboard-header {
  margin-bottom: 3rem;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.metric-card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
}

.metric-label {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
}

.metric-value {
  font-size: 2.5rem;
  font-weight: 700;
  color: #1f2937;
}

.metric-value.good { color: #10b981; }
.metric-value.warning { color: #f59e0b; }

.metric-sub {
  font-size: 0.75rem;
  color: #9ca3af;
  margin-top: 0.5rem;
}

.trending-section,
.chart-section {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 2rem;
  margin-bottom: 2rem;
}

.trending-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f3f4f6;
}

.trending-item:last-child {
  border-bottom: none;
}

.rank {
  font-size: 1.25rem;
  font-weight: 700;
  color: #10b981;
  width: 2rem;
}

.food-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.food-info a {
  font-weight: 500;
  color: #10b981;
  text-decoration: none;
}

.food-info a:hover {
  text-decoration: underline;
}

.views {
  font-size: 0.875rem;
  color: #6b7280;
}

.quota-alert {
  margin-bottom: 1rem;
}
</style>
```

**Verification:**
- `/admin/analytics` page loads with all metrics
- Key metrics display in grid layout
- Trending foods show top 10 last 7 days
- API usage chart displays daily usage
- Quota alert shows when usage ≥80%
- Cache hit rate colored green if ≥95%, yellow if <95%
- Responsive layout works on mobile and desktop

**Prerequisites:** Story 6.1 (Admin Analytics API)

**Technical Notes:**
- Admin page should be protected (add authentication in Vision phase)
- Real-time updates via polling or WebSocket (optional)
- This dashboard provides portfolio metrics documentation

---

### Story 6.3: Analytics Data Export

As a developer,
I want to implement analytics data export functionality,
So that administrators can export metrics for portfolio documentation.

**Acceptance Criteria:**

**Given** analytics data exists
**When** I click the export button
**Then** analytics data is exported as a downloadable file:

**Export API Endpoint (`server/api/admin/analytics/export.ts`):**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const format = getQuery(event).format as 'csv' | 'json' || 'json';

    // Fetch all analytics data
    const db = getDatabase();
    const analytics = db.all(`
      SELECT
        a.event_type,
        a.food_id,
        a.category_id,
        a.metadata,
        a.created_at,
        f.name as food_name,
        c.name as category_name
      FROM analytics a
      LEFT JOIN foods f ON a.food_id = f.id
      LEFT JOIN categories c ON a.category_id = c.id
      ORDER BY a.created_at DESC
      LIMIT 10000
    `);

    const timestamp = new Date().toISOString().split('T')[0];

    if (format === 'csv') {
      // Convert to CSV
      const headers = ['Event Type', 'Food Name', 'Category Name', 'Created At'];
      const rows = analytics.map(a => [
        a.event_type,
        a.food_name || '',
        a.category_name || '',
        a.created_at
      ]);

      const csv = [headers, ...rows].map(row => row.join(',')).join('\n');

      setHeader(event, 'Content-Type', 'text/csv');
      setHeader(event, 'Content-Disposition', `attachment; filename="analytics-${timestamp}.csv"`);

      return csv;
    } else {
      // Return JSON
      setHeader(event, 'Content-Type', 'application/json');
      setHeader(event, 'Content-Disposition', `attachment; filename="analytics-${timestamp}.json"`);

      return {
        data: analytics,
        exportedAt: new Date().toISOString(),
        totalRecords: analytics.length
      };
    }
  } catch (error) {
    logError(error, { route: '/api/admin/analytics/export' });
    throw createError({
      statusCode: 500,
      message: 'Failed to export analytics'
    });
  }
});
```

**Export Button Component:**
```vue
<script setup lang="ts">
const exporting = ref(false);
const exportFormat = ref<'csv' | 'json'>('csv');

const exportAnalytics = async () => {
  exporting.value = true;
  try {
    const url = `/api/admin/analytics/export?format=${exportFormat.value}`;
    window.open(url, '_blank');
  } catch (e) {
    console.error('Export failed:', e);
  } finally {
    exporting.value = false;
  }
};
</script>

<template>
  <div class="export-controls">
    <label>
      <input type="radio" value="csv" v-model="exportFormat" />
      CSV
    </label>
    <label>
      <input type="radio" value="json" v-model="exportFormat" />
      JSON
    </label>
    <UButton
      @click="exportAnalytics"
      :loading="exporting"
      icon="i-heroicons-arrow-down-tray"
    >
      Export Analytics
    </UButton>
  </div>
</template>
```

**Verification:**
- Click export button → file download starts
- CSV format downloads .csv file with analytics data
- JSON format downloads .json file with analytics data
- Filename includes timestamp: `analytics-2025-12-24.csv`
- Export limited to 10,000 records (prevent large file issues)
- Button shows loading state during export

**Prerequisites:** Story 6.1 (Admin Analytics API)

**Technical Notes:**
- Export useful for portfolio documentation (Nabilakmal's Journey 4)
- CSV format for spreadsheet analysis
- JSON format for data processing
- In future, add PDF export for presentation slides

---

## Epic 6 Completion Review

**Stories Created:** 3

**FR Coverage:**
- FR29: Admin analytics dashboard ✅
- FR30: API usage monitoring ✅
- FR31: Cache performance metrics ✅
- FR32: Search analytics (trending foods) ✅
- FR33: System health monitoring ✅
- FR34: API quota alerts ✅
- FR35: Analytics data export ✅

**Technical Context Used:**
- Analytics table for event tracking
- Aggregation queries for metrics
- Cache hit rate calculations
- API quota monitoring

**User Value Delivered:**
- ✅ Administrators can view comprehensive system metrics
- ✅ API usage tracked with quota alerts
- ✅ Cache performance monitored (target 95%+)
- ✅ Analytics data exportable for documentation

**Epic 6 Success Criteria:**
- Nabilakmal can view system health at a glance
- API quota alerts trigger at 80% usage
- Cache hit rate visible (optimization opportunities)
- Export functionality enables portfolio documentation

**Ready for:** Epic 7 - Content Management & SEO Optimization

---

## Epic 7: Content Management & SEO Optimization

**Epic Goal:** Implement CRUD operations for foods/categories and fully optimize the application for search engine discoverability.

**User Value:** Administrators can manage content, and the system is fully optimized for organic search traffic.

**PRD Coverage:** FR45-FR50 (Content Management)

**Technical Context:**
- CRUD operations for foods and categories
- XML sitemap generation
- Robots.txt configuration
- Schema.org structured data markup

**Dependencies:** Epic 3 (Autocategorization) - needs categories to manage

---

### Story 7.1: Food CRUD Operations

As a developer,
I want to implement full CRUD operations for foods,
So that administrators can manage the food database.

**Acceptance Criteria:**

**Given** the foods table exists
**When** I perform CRUD operations on foods
**Then** I can create, read, update, and delete foods:

**Create Food API (`server/api/foods/index.ts` - POST):**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    // Validation
    if (!body.name || !body.calories || !body.proteinG) {
      throw createError({
        statusCode: 400,
        message: 'Name, calories, and proteinG are required'
      });
    }

    const db = getDatabase();
    const slug = slugify(body.name);

    // Check for duplicate slug
    const existing = db.get('SELECT id FROM foods WHERE slug = ?', [slug]);
    if (existing) {
      throw createError({
        statusCode: 409,
        message: 'Food with this name already exists'
      });
    }

    const result = db.run(`
      INSERT INTO foods (name, slug, serving_size_g, calories, protein_g,
       carbohydrates_total_g, fat_total_g, fat_saturated_g, fiber_g, sugar_g,
       sodium_mg, potassium_mg, cholesterol_mg, data_source)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `, [
      body.name, slug, body.servingSizeG || 100, body.calories, body.proteinG,
      body.carbohydratesTotalG || 0, body.fatTotalG || 0, body.fatSaturatedG || 0,
      body.fiberG || 0, body.sugarG || 0, body.sodiumMg || 0, body.potassiumMg || 0,
      body.cholesterolMg || 0, 'manual'
    ]);

    const food = db.get('SELECT * FROM foods WHERE id = ?', [result.lastID]);

    return {
      data: transformFoodToApiFormat(food),
      success: true
    };
  } catch (error) {
    logError(error, { route: 'POST /api/foods' });
    throw error;
  }
});
```

**Update Food API (`server/api/foods/[foodId].ts` - PUT):**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const foodId = getRouterParam(event, 'foodId');
    const body = await readBody(event);
    const db = getDatabase();

    // Check food exists
    const existing = db.get('SELECT * FROM foods WHERE id = ? OR slug = ?', [foodId, foodId]);
    if (!existing) {
      throw createNotFoundError('Food', foodId);
    }

    // Build update query dynamically
    const updates = [];
    const values = [];

    const allowedFields = {
      name: 'name',
      servingSizeG: 'serving_size_g',
      calories: 'calories',
      proteinG: 'protein_g',
      carbohydratesTotalG: 'carbohydrates_total_g',
      fatTotalG: 'fat_total_g',
      fatSaturatedG: 'fat_saturated_g',
      fiberG: 'fiber_g',
      sugarG: 'sugar_g',
      sodiumMg: 'sodium_mg',
      potassiumMg: 'potassium_mg',
      cholesterolMg: 'cholesterol_mg'
    };

    for (const [apiField, dbField] of Object.entries(allowedFields)) {
      if (body[apiField] !== undefined) {
        updates.push(`${dbField} = ?`);
        values.push(body[apiField]);
      }
    }

    updates.push('updated_at = CURRENT_TIMESTAMP');
    values.push(foodId);

    db.run(
      `UPDATE foods SET ${updates.join(', ')} WHERE id = ? OR slug = ?`,
      [...values, foodId]
    );

    const updated = db.get('SELECT * FROM foods WHERE id = ? OR slug = ?', [foodId, foodId]);

    return {
      data: transformFoodToApiFormat(updated),
      success: true
    };
  } catch (error) {
    logError(error, { route: `PUT /api/foods/${getRouterParam(event, 'foodId')}` });
    throw error;
  }
});
```

**Delete Food API (`server/api/foods/[foodId].ts` - DELETE):**
```typescript
export default defineEventHandler(async (event) => {
  try {
    const foodId = getRouterParam(event, 'foodId');
    const db = getDatabase();

    // Cascade delete will handle food_categories entries
    const result = db.run('DELETE FROM foods WHERE id = ? OR slug = ?', [foodId, foodId]);

    if (result.changes === 0) {
      throw createNotFoundError('Food', foodId);
    }

    return {
      data: { message: 'Food deleted successfully' },
      success: true
    };
  } catch (error) {
    logError(error, { route: `DELETE /api/foods/${getRouterParam(event, 'foodId')}` });
    throw error;
  }
});
```

**Verification:**
- POST `/api/foods` creates new food with manual data_source
- PUT `/api/foods/1` updates food fields
- DELETE `/api/foods/1` deletes food and cascades to food_categories
- Duplicate food names return 409 conflict error
- Non-existent food returns 404
- All transformations (snake_case ↔ camelCase) work correctly

**Prerequisites:** Story 1.2 (Database Schema), Story 2.2 (Food Detail API)

**Technical Notes:**
- Manual foods have `data_source: 'manual'`
- Cascade delete configured in schema (Story 1.2)
- Admin authentication needed in Vision phase

---

### Story 7.2: XML Sitemap Generation

As a developer,
I want to implement automatic XML sitemap generation,
So that search engines can efficiently crawl and index content.

**Acceptance Criteria:**

**Given** foods and categories exist
**When** I request `/sitemap.xml`
**Then** I receive an XML sitemap with all URLs:

**Sitemap Server Route (`server/routes/sitemap.xml.ts`):**
```typescript
export default defineEventHandler(async (event) => {
  const db = getDatabase();
  const baseUrl = 'https://nutrition-hub.app'; // Use runtime config

  // Fetch all foods and categories
  const foods = db.all('SELECT slug, updated_at FROM foods ORDER BY updated_at DESC');
  const categories = db.all('SELECT slug, updated_at FROM categories WHERE is_active = 1 ORDER BY updated_at DESC');

  const urls = [];

  // Homepage
  urls.push({
    loc: baseUrl,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 1.0
  });

  // Analytics page
  urls.push({
    loc: `${baseUrl}/analytics`,
    lastmod: new Date().toISOString(),
    changefreq: 'weekly',
    priority: 0.8
  });

  // Food pages
  for (const food of foods) {
    urls.push({
      loc: `${baseUrl}/foods/${food.slug}`,
      lastmod: food.updated_at,
      changefreq: 'monthly',
      priority: 0.9
    });
  }

  // Category pages
  for (const category of categories) {
    urls.push({
      loc: `${baseUrl}/categories/${category.slug}`,
      lastmod: category.updated_at,
      changefreq: 'weekly',
      priority: 0.8
    });
  }

  // Generate XML
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(url => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  setHeader(event, 'Content-Type', 'application/xml');
  setHeader(event, 'Cache-Control', 'public, max-age=3600'); // Cache for 1 hour

  return xml;
});
```

**Verification:**
- GET `/sitemap.xml` returns valid XML sitemap
- Sitemap includes homepage, analytics page, all foods, all categories
- Lastmod dates match updated_at timestamps
- Priority values make sense (homepage 1.0, foods 0.9, categories 0.8)
- XML validates against sitemap schema
- Sitemap cached for 1 hour

**Prerequisites:** Story 2.5 (Food Detail Page), Story 3.5 (Category Browse Page)

**Technical Notes:**
- Follow PRD SEO requirements (FR48)
- Enables Google efficient crawling
- Lastmod dates help Google understand freshness
- In future, add sitemap index for multiple sitemaps (50,000 URL limit)

---

### Story 7.3: Robots.txt Configuration

As a developer,
I want to configure robots.txt,
So that search engine crawlers know which pages to index and which to skip.

**Acceptance Criteria:**

**Given** the application has public and admin routes
**When** I request `/robots.txt`
**Then** I receive robots.txt with proper crawl directives:

**Robots.txt Server Route (`server/routes/robots.txt.ts`):**
```typescript
export default defineEventHandler(async (event) => {
  const robotsTxt = `
# Allow all crawlers
User-agent: *
Allow: /

# Disallow admin pages
Disallow: /admin/

# Disallow API routes
Disallow: /api/

# Sitemap location
Sitemap: https://nutrition-hub.app/sitemap.xml
`.trim();

  setHeader(event, 'Content-Type', 'text/plain');
  setHeader(event, 'Cache-Control', 'public, max-age=86400'); // Cache for 1 day

  return robotsTxt;
});
```

**Verification:**
- GET `/robots.txt` returns valid robots.txt
- All user agents allowed (`User-agent: *`)
- Admin pages disallowed (`Disallow: /admin/`)
- API routes disallowed (`Disallow: /api/`)
- Sitemap URL included
- Google Robots.txt Tool validates

**Prerequisites:** None (independent)

**Technical Notes:**
- Follow PRD SEO requirements (FR49)
- Prevents admin pages from being indexed
- API routes don't need indexing (server-side only)

---

### Story 7.4: Schema.org Structured Data Validation

As a developer,
I want to validate and enhance Schema.org markup,
So that Google displays rich results in search listings.

**Acceptance Criteria:**

**Given** food detail pages have Schema.org markup
**When** I validate the markup with Google tools
**Then** all pages pass validation with no errors:

**Schema.org Markup Enhancement (update `pages/foods/[foodSlug].vue`):**
```vue
<script setup lang="ts">
// Enhanced JSON-LD with complete nutrition information
const jsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'NutritionInformation',
  name: data.value.name,
  description: `${data.value.proteinG}g protein, ${data.value.calories} calories per 100g serving`,
  calories: data.value.calories,
  proteinContent: `${data.value.proteinG} g`,
  carbohydratesContent: `${data.value.carbohydratesTotalG} g`,
  fatContent: `${data.value.fatTotalG} g`,
  saturatedFatContent: `${data.value.fatSaturatedG} g`,
  fiberContent: `${data.value.fiberG} g`,
  sugarContent: `${data.value.sugarG} g`,
  sodiumContent: `${data.value.sodiumMg} mg`,
  servingSize: '100 g',
  unsaturatedFatContent: `${data.value.fatTotalG - data.value.fatSaturatedG} g`
}));

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(jsonLd.value)
    }
  ]
});
</script>
```

**Category Page Schema.org:**
```vue
<script setup lang="ts">
const categoryJsonLd = computed(() => ({
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: category.value.name,
  description: category.value.description,
  url: `https://nutrition-hub.app/categories/${category.value.slug}`,
  numberOfItems: foods.value.length,
  itemListElement: foods.value.slice(0, 10).map((food, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    item: {
      '@type': 'NutritionInformation',
      name: food.name,
      url: `https://nutrition-hub.app/foods/${food.slug}`
    }
  }))
}));

useHead({
  script: [
    {
      type: 'application/ld+json',
      children: JSON.stringify(categoryJsonLd.value)
    }
  ]
});
</script>
```

**Verification:**
- Google Rich Results Test validates Schema.org on food pages
- No errors or warnings in structured data
- All required fields present (name, calories, proteinContent, etc.)
- Optional fields included for richer results (fiber, sugar, sodium)
- Category pages include CollectionPage markup

**Prerequisites:** Story 2.5 (Food Detail Page), Story 3.5 (Category Browse Page)

**Technical Notes:**
- Schema.org enables rich results in Google search
- NutritionInformation type for food pages
- CollectionPage type for category pages
- Follow PRD requirements (FR50)

---

## Epic 7 Completion Review

**Stories Created:** 4

**FR Coverage:**
- FR45: Manually add foods ✅
- FR46: Edit food nutrition info ✅
- FR47: Manage categories (CRUD from Epic 3) ✅
- FR48: XML sitemap generation ✅
- FR49: Robots.txt configuration ✅
- FR50: Schema.org structured data ✅

**Technical Context Used:**
- CRUD operations with proper validation
- XML sitemap generation with dynamic URLs
- Robots.txt for crawler guidance
- Schema.org markup for rich results

**User Value Delivered:**
- ✅ Administrators can manage food database
- ✅ Search engines can efficiently crawl content
- ✅ Google displays rich results in search listings
- ✅ Organic search traffic optimized

**Epic 7 Success Criteria:**
- Administrators can add/edit/delete foods
- Google indexes all food and category pages
- Rich results display in Google search
- Sitemap automatically updates as content changes

**Ready for:** Epic 8 - Polish & Accessibility Excellence

---

## Epic 8: Polish & Accessibility Excellence

**Epic Goal:** Ensure full WCAG 2.1 AA compliance, implement professional polish with loading states, animations, dark mode, and error handling throughout.

**User Value:** Users with disabilities can fully use the application, and all users experience a professional, polished interface.

**PRD Coverage:** FR36-FR44 (User Experience & Accessibility)

**Stories Created:** 7

---

## FR Coverage Matrix

**Complete Functional Requirement Coverage:**

### 1. Food Discovery & Search (FR1-FR7) ✅
- **FR1:** Instant search autocomplete → Story 2.1 (Food Search API), Story 2.6 (SearchBar Component)
- **FR2:** Search results ranked by relevance → Story 2.1 (Food Search API)
- **FR3:** Query SQLite database → Story 2.1 (Food Search API)
- **FR4:** Fetch from CalorieNinjas API → Story 2.3 (API Integration)
- **FR5:** Cache API responses → Story 2.3 (API Integration with Caching)
- **FR6:** Mobile-responsive search → Story 2.6 (SearchBar Component), Story 8.7 (Responsive Design)
- **FR7:** Navigate to food detail pages → Story 2.5 (Food Detail Page)

### 2. Nutrition Information Display (FR8-FR13) ✅
- **FR8:** Comprehensive nutrition information → Story 2.2 (Food Detail API), Story 2.8 (NutritionLabel Component)
- **FR9:** Visual nutrition indicators → Story 2.8 (NutritionLabel Component)
- **FR10:** Serving size standardized (100g) → Story 2.8 (NutritionLabel Component)
- **FR11:** Related foods by category → Story 3.5 (Category Browse Page)
- **FR12:** SEO-optimized food detail pages → Story 2.5 (Food Detail Page SSR), Story 7.4 (Schema.org)
- **FR13:** Deep-linking support → Story 2.5 (Food Detail Page with slugs)

### 3. Categorization & Analytics (FR14-FR23) ✅
- **FR14:** JSON rule-based autocategorization → Story 3.1 (Category Rule Engine)
- **FR15:** Match scoring (0-100) → Story 3.1 (Match Scoring Algorithm)
- **FR16:** View all food categories → Story 3.6 (CategoryBadges Component)
- **FR17:** Browse foods by category → Story 3.5 (Category Browse Page)
- **FR18:** Versatile foods leaderboard → Story 4.1 (Versatile Foods Algorithm)
- **FR19:** Category overlap analysis → Story 4.2 (Jaccard Similarity)
- **FR20:** "Bridge foods" discovery → Story 4.3 (Bridge Foods Algorithm)
- **FR21:** Define category rules (JSON) → Story 3.3 (Category CRUD)
- **FR22:** Manual category overrides → Story 3.4 (Food Category Relationships)
- **FR23:** Batch categorization → Story 3.2 (Batch Categorization System)

### 4. Social Sharing & Virality (FR24-FR28) ✅
- **FR24:** Share to social platforms → Story 5.3 (Social Share Buttons)
- **FR25:** Copy shareable links → Story 5.3 (Social Share Buttons)
- **FR26:** Generate visual nutrition cards → Story 5.1 (NutritionCard Component), Story 5.2 (Image Generation)
- **FR27:** Open Graph rich previews → Story 5.4 (Open Graph Tags)
- **FR28:** Twitter Card enhanced previews → Story 5.4 (Twitter Card Tags)

### 5. System Administration (FR29-FR35) ✅
- **FR29:** Admin analytics dashboard → Story 6.2 (Admin Dashboard Page)
- **FR30:** Monitor API quota → Story 6.1 (API Usage Monitoring)
- **FR31:** Cache performance metrics → Story 6.1 (Cache Hit Rate Tracking)
- **FR32:** Search analytics (trending foods) → Story 6.1 (Trending Foods API)
- **FR33:** System health monitoring → Story 6.2 (Dashboard Health Metrics)
- **FR34:** API quota alerts → Story 6.1 (Alert at 80% quota)
- **FR35:** Export analytics data → Story 6.3 (Analytics Data Export)

### 6. User Experience & Accessibility (FR36-FR44) ✅
- **FR36:** Keyboard-only navigation → Story 8.4 (Keyboard Navigation)
- **FR37:** Screen reader compatibility → Story 8.5 (Screen Reader Optimization)
- **FR38:** Color contrast ≥4.5:1 → Story 8.6 (Color Contrast)
- **FR39:** Text resize to 200% → Story 8.6 (Visual Accessibility)
- **FR40:** Responsive layouts → Story 8.7 (Responsive Design)
- **FR41:** Dark mode support → Story 8.3 (Dark Mode Implementation)
- **FR42:** Loading states and skeleton screens → Story 8.1 (Loading States)
- **FR43:** Clear error messages → Story 8.2 (Error Boundaries)
- **FR44:** Consistent navigation patterns → Story 8.4 (Navigation Consistency)

### 7. Content Management (FR45-FR50) ✅
- **FR45:** Manually add foods → Story 7.1 (Food CRUD - Create)
- **FR46:** Edit food nutrition info → Story 7.1 (Food CRUD - Update)
- **FR47:** Manage categories (CRUD) → Story 3.3 (Category CRUD)
- **FR48:** XML sitemap generation → Story 7.2 (XML Sitemap)
- **FR49:** Robots.txt configuration → Story 7.3 (Robots.txt)
- **FR50:** Schema.org structured data → Story 7.4 (Schema.org Validation)

**Summary:**
- **Total FRs:** 50
- **FRs Covered:** 50 (100%)
- **Stories Created:** 44 stories across 8 epics

---

## Summary

**Epic Breakdown Summary:**

| Epic | Stories | Primary Value | Key Technical Achievements |
|------|---------|---------------|---------------------------|
| **1. Foundation** | 7 | Technical platform | Nuxt v4 setup, SQLite schema, deployment config |
| **2. Search** | 8 | Instant food discovery | SQLite-first search, API caching, SEO pages |
| **3. Autocategorization** | 6 | Smart category discovery | JSON rule engine, match scoring, batch processing |
| **4. Analytics** | 4 | Advanced insights | Versatile foods, Jaccard similarity, bridge foods |
| **5. Social Sharing** | 4 | Viral growth | Share image generation, Open Graph tags |
| **6. Admin Dashboard** | 3 | System visibility | Analytics monitoring, quota tracking, data export |
| **7. Content Management** | 4 | SEO optimization | CRUD operations, sitemap, Schema.org |
| **8. Polish** | 7 | Professional quality | WCAG 2.1 AA compliance, dark mode, loading states |
| **TOTAL** | **44** | **Complete MVP** | **Full-stack portfolio showcase** |

**Implementation Ready:**

✅ **All 50 Functional Requirements** mapped to specific stories with acceptance criteria
✅ **All Technical Architecture** decisions incorporated into implementation details
✅ **All Non-Functional Requirements** addressed (performance, security, accessibility)
✅ **User Journeys Supported:**
  - Alex Chen (Confused Beginner) → Epic 2, Epic 3
  - Sarah Mitchell (Optimizing Gym-Goer) → Epic 4
  - Marcus Johnson (Recruiter) → All epics (portfolio showcase)
  - Nabilakmal (System Admin) → Epic 6
  - Social Media Visitor → Epic 5

**Development Sequence:**
```
Week 1-2:   Epic 1 (Foundation)
Week 2-3:   Epic 2 (Search & Discovery)
Week 3-4:   Epic 3 (Autocategorization)
Week 4-5:   Epic 4 (Advanced Analytics)
Week 5:     Epic 5 (Social Sharing)
Week 5-6:   Epic 6 (Admin Dashboard)
Week 6:     Epic 7 (Content Management & SEO)
Week 6-7:   Epic 8 (Polish & Accessibility)
Week 7+:    Launch & Iteration
```

**Ready for Phase 4:** Sprint Planning and Development Implementation

---

_For implementation: Use the `create-story` workflow to generate individual story implementation plans from this epic breakdown._

_This document incorporates all PRD requirements and Architecture technical decisions. Stories include complete acceptance criteria with technical implementation guidance._

## Epic 8: Polish & Accessibility Excellence

**Epic Goal:** Ensure full WCAG 2.1 AA compliance, implement professional polish with loading states, animations, dark mode, and error handling throughout.

**User Value:** Users with disabilities can fully use the application, and all users experience a professional, polished interface.

**PRD Coverage:** FR36-FR44 (User Experience & Accessibility)

**Technical Context:**
- Nuxt UI dark mode built-in (Architecture line 56)
- WCAG 2.1 AA compliance requirements (PRD lines 692-729)
- Loading state patterns: `{ data, loading, error }` interface (Architecture lines 1085-1091)
- ARIA attributes and semantic HTML (PRD lines 717-718)

**Dependencies:** Epic 5 (Social Sharing) - all features need accessibility polish

---

### Story 8.1: Global Loading States and Skeleton Screens

As a developer,
I want to implement consistent loading states with skeleton screens,
So that users see visual feedback during data fetching.

**Acceptance Criteria:**

**Given** async operations occur throughout the app
**When** data is loading
**Then** users see skeleton screens matching the content structure:

**Global Loading Component (`components/LoadingState.vue`):**
```vue
<script setup lang="ts">
const props = defineProps<{
  type?: 'card' | 'list' | 'detail' | 'table';
  count?: number;
}>();

const count = computed(() => props.count || 3);
const type = computed(() => props.type || 'card');
</script>

<template>
  <div class="loading-state" :class="`loading-state--${type}`">
    <!-- Card skeleton -->
    <template v-if="type === 'card'">
      <div v-for="i in count" :key="i" class="skeleton-card">
        <USkeleton class="skeleton-image" />
        <USkeleton class="skeleton-title" />
        <USkeleton class="skeleton-text" />
        <USkeleton class="skeleton-text short" />
      </div>
    </template>

    <!-- List skeleton -->
    <template v-if="type === 'list'">
      <div v-for="i in count" :key="i" class="skeleton-list-item">
        <USkeleton class="skeleton-avatar" />
        <div class="skeleton-content">
          <USkeleton class="skeleton-title" />
          <USkeleton class="skeleton-text" />
        </div>
      </div>
    </template>

    <!-- Detail skeleton -->
    <template v-if="type === 'detail'">
      <USkeleton class="skeleton-hero" />
      <USkeleton class="skeleton-title large" />
      <div class="skeleton-grid">
        <USkeleton v-for="i in 6" :key="i" class="skeleton-stat" />
      </div>
    </template>
  </div>
</template>

<style scoped>
.skeleton-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.75rem;
  padding: 1.5rem;
  margin-bottom: 1rem;
}

.skeleton-image {
  height: 200px;
  width: 100%;
  margin-bottom: 1rem;
}

.skeleton-title {
  height: 1.5rem;
  width: 75%;
  margin-bottom: 0.75rem;
}

.skeleton-text {
  height: 1rem;
  width: 100%;
  margin-bottom: 0.5rem;
}

.skeleton-text.short {
  width: 50%;
}

.skeleton-list-item {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-bottom: 1px solid #f3f4f6;
}

.skeleton-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.skeleton-content {
  flex: 1;
}

.skeleton-hero {
  height: 300px;
  width: 100%;
  margin-bottom: 2rem;
}

.skeleton-title.large {
  height: 2.5rem;
  width: 50%;
  margin-bottom: 1.5rem;
}

.skeleton-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.skeleton-stat {
  height: 100px;
  border-radius: 0.5rem;
}
</style>
```

**Usage Pattern:**
```vue
<template>
  <LoadingState v-if="pending" type="card" :count="5" />
  <div v-else-if="error">{{ error }}</div>
  <FoodCard v-else v-for="food in foods" :key="food.id" :food="food" />
</template>
```

**Verification:**
- Skeleton screens match final content structure
- Loading animations are smooth (pulse effect)
- Skeletons display on all async operations
- Loading duration <200ms feels instant (no skeleton needed)
- Loading duration >500ms shows skeleton
- Dark mode skeleton colors work correctly

**Prerequisites:** All epic stories with async operations

**Technical Notes:**
- Use Nuxt UI `<USkeleton>` component
- Follow loading state patterns (Architecture lines 1081-1119)
- Skeleton screens reduce perceived wait time

---

### Story 8.2: Error Boundaries and User-Friendly Error Messages

As a developer,
I want to implement global error handling with user-friendly messages,
So that users see helpful error messages instead of technical jargon.

**Acceptance Criteria:**

**Given** errors can occur throughout the app
**When** an error occurs
**Then** users see clear, actionable error messages:

**Global Error Component (`components/ErrorDisplay.vue`):**
```vue
<script setup lang="ts">
const props = defineProps<{
  error: string | null;
  code?: string;
}>();

const errorMessages: Record<string, string> = {
  'API_QUOTA_EXCEEDED': 'Search temporarily unavailable. Please try again later.',
  'NETWORK_ERROR': 'Connection problem. Check your internet.',
  'FOOD_NOT_FOUND': 'Food not found.',
  'CATEGORY_NOT_FOUND': 'Category not found.',
  'DEFAULT': 'Something went wrong. Please try again.'
};

const friendlyMessage = computed(() => {
  if (!props.error) return null;
  return errorMessages[props.code || ''] || errorMessages.DEFAULT;
});
</script>

<template>
  <div v-if="friendlyMessage" class="error-display">
    <UAlert
      icon="i-heroicons-exclamation-triangle"
      color="red"
      :title="friendlyMessage"
      :description="error && friendlyMessage === errorMessages.DEFAULT ? error : undefined"
      :close-button="true"
    />

    <div class="error-actions">
      <UButton @click="$router.go(0)" icon="i-heroicons-arrow-path">
        Try Again
      </UButton>
      <UButton @click="$router.push('/')" variant="ghost" color="gray">
        Go Home
      </UButton>
    </div>
  </div>
</template>

<style scoped>
.error-display {
  padding: 2rem;
}

.error-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}
</style>
```

**Global Error Handler (`plugins/error-handler.ts`):**
```typescript
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    console.error('Global error:', error, info);

    // Log to monitoring service (in production)
    if (process.env.NODE_ENV === 'production') {
      // Send to error tracking service
    }
  };
});
```

**Verification:**
- API errors show user-friendly messages
- Network errors display helpful guidance
- "Try Again" button retries failed operation
- "Go Home" button navigates to homepage
- Technical errors hidden from users (logged to console)
- Error messages meet accessibility standards (ARIA alerts)

**Prerequisites:** All epic stories with error handling

**Technical Notes:**
- Follow error handling patterns (Architecture lines 1019-1052)
- Map error codes to user messages (Architecture lines 1054-1071)
- Never show raw error messages to users

---

### Story 8.3: Dark Mode Implementation and Theme Persistence

As a developer,
I want to implement dark mode with theme persistence,
So that users can switch between light and dark themes.

**Acceptance Criteria:**

**Given** Nuxt UI includes dark mode support
**When** I toggle dark mode
**Then** the theme changes and preference is saved:

**Dark Mode Toggle Component (`components/ThemeToggle.vue`):**
```vue
<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed({
  get() {
    return colorMode.value === 'dark';
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
  }
});
</script>

<template>
  <UButton
    :icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
    variant="ghost"
    color="gray"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="isDark = !isDark"
  />
</template>
```

**Dark Mode Configuration (`nuxt.config.ts`):**
```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/color-mode'],

  colorMode: {
    preference: 'light', // Default theme
    fallback: 'light', // Fallback if system preference not available
    classSuffix: '',
    dataValue: 'theme'
  }
});
```

**Theme-Specific Styles:**
```css
/* Dark mode nutrition label adjustments */
.dark .nutrition-label {
  background: #1f2937;
  border-color: #374151;
  color: white;
}

.dark .macro-bar-container {
  background: rgba(255, 255, 255, 0.1);
}

/* Dark mode cards */
.dark .food-card {
  background: #1f2937;
  border-color: #374151;
}
```

**Verification:**
- Theme toggle switches between light/dark
- Theme preference persists across sessions (localStorage)
- System theme preference respected on first visit
- All components work in both themes
- Nutrition labels readable in dark mode
- Color contrast ≥4.5:1 in both themes
- Smooth transition between themes

**Prerequisites:** None (can be implemented independently)

**Technical Notes:**
- Nuxt UI dark mode built-in (Architecture line 56)
- Uses `@nuxt/color-mode` module
- Theme persistence in localStorage
- This is FR41 requirement

---

### Story 8.4: Keyboard Navigation and Focus Management

As a developer,
I want to implement full keyboard navigation support,
So that users can navigate the entire application without a mouse.

**Acceptance Criteria:**

**Given** the app has interactive elements
**When** I navigate using keyboard only
**Then** I can access all functionality:

**Keyboard Navigation Implementation:**

**Focus Management:**
- All interactive elements are focusable (`<button>`, `<a>`, `<input>`)
- Custom components have `tabindex` where needed
- Focus indicators visible on all elements (outline style)
- Logical tab order follows visual layout

**Skip Navigation Link (`components/SkipLink.vue`):**
```vue
<template>
  <a href="#main-content" class="skip-link">
    Skip to main content
  </a>
</template>

<style scoped>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  z-index: 100;
}

.skip-link:focus {
  top: 0;
}
</template>
```

**Keyboard Event Handlers:**
```vue
<!-- SearchBar keyboard shortcuts -->
<script setup lang="ts">
const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    closeDropdown();
  } else if (e.key === 'ArrowDown') {
    navigateResults('down');
  } else if (e.key === 'ArrowUp') {
    navigateResults('up');
  } else if (e.key === 'Enter') {
    selectResult();
  }
};
</script>

<template>
  <input
    @keydown="handleKeydown"
    aria-label="Search foods"
    role="searchbox"
  />
</template>
```

**Modal Focus Trap:**
```typescript
// Trap focus within modal when open
const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  element.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement.focus();
      }
    }
  });
};
```

**Verification:**
- Tab key navigates through all interactive elements
- Shift+Tab navigates backwards
- Enter activates buttons and links
- Escape closes modals and dropdowns
- Arrow keys navigate lists and grids
- Skip link appears on first tab (allows skipping navigation)
- Focus indicators always visible (high contrast)
- Screen reader announces focused elements

**Prerequisites:** All UI components

**Technical Notes:**
- FR36 requirement (keyboard-only navigation)
- WCAG 2.1 AA requirement (NFR-A11Y-001)
- Test with keyboard only (no mouse)

---

### Story 8.5: Screen Reader Optimization and ARIA Attributes

As a developer,
I want to optimize the app for screen readers,
So that visually impaired users can access all information.

**Acceptance Criteria:**

**Given** the app has visual content
**When** I use a screen reader
**Then** I hear accurate descriptions of all content:

**ARIA Implementation:**

**Semantic HTML:**
```vue
<template>
  <!-- Use semantic elements -->
  <header>
    <nav aria-label="Main navigation">
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/analytics">Analytics</NuxtLink></li>
      </ul>
    </nav>
  </header>

  <main id="main-content">
    <h1>Page Title</h1>
    <!-- Page content -->
  </main>

  <footer>
    <p>&copy; 2025 Nutrition Hub</p>
  </footer>
</template>
```

**ARIA Attributes:**
```vue
<template>
  <!-- Icon buttons need labels -->
  <button
    @click="handleSearch"
    aria-label="Search foods"
  >
    <UIcon name="i-heroicons-magnifying-glass" />
  </button>

  <!-- Live regions for dynamic content -->
  <div
    role="status"
    aria-live="polite"
    aria-atomic="true"
  >
    {{ searchResultCount }} foods found
  </div>

  <!-- Progress indicators -->
  <div
    role="progressbar"
    :aria-valuenow="progress"
    :aria-valuemin="0"
    :aria-valuemax="100"
    aria-label="Loading..."
  />

  <!-- Expandable sections -->
  <button
    :aria-expanded="isExpanded"
    :aria-controls="`panel-${id}`"
    @click="toggle"
  >
    {{ title }}
  </button>
  <div
    :id="`panel-${id}`"
    :hidden="!isExpanded"
    role="region"
    :aria-labelledby="`button-${id}`"
  >
    Content...
  </div>
</template>
```

**Alt Text for Images:**
```vue
<template>
  <!-- Informative alt text -->
  <img
    src="/images/chicken-breast.jpg"
    alt="Grilled chicken breast fillet on white plate"
  />

  <!-- Decorative images -->
  <img src="/icons/spacer.png" alt="" role="presentation" />

  <!-- Nutrition chart with detailed description -->
  <img
    :src="chartImageUrl"
    alt="Bar chart showing chicken breast has 31g protein, 0g carbs, 3.6g fat per 100g"
  />
</template>
```

**Form Accessibility:**
```vue
<template>
  <form @submit="handleSubmit">
    <div class="form-field">
      <label for="search-input">Search foods</label>
      <input
        id="search-input"
        v-model="query"
        type="search"
        placeholder="e.g., chicken breast"
        aria-describedby="search-help"
        required
      />
      <p id="search-help" class="help-text">
        Type at least 2 characters to see suggestions
      </p>
    </div>
  </form>
</template>
```

**Verification:**
- NVDA screen reader announces all content correctly
- VoiceOver (iOS/macOS) reads all elements
- TalkBack (Android) works correctly
- All images have descriptive alt text
- Icon buttons have aria-label
- Dynamic content updates announced via live regions
- Form inputs have associated labels
- Heading structure is logical (h1 → h2 → h3)
- Landmarks used correctly (header, nav, main, footer)

**Prerequisites:** All UI components

**Technical Notes:**
- FR37 requirement (screen reader compatibility)
- NFR-A11Y-002 through NFR-A11Y-010
- Test with actual screen readers

---

### Story 8.6: Color Contrast and Visual Accessibility

As a developer,
I want to ensure all text meets WCAG 2.1 AA color contrast requirements,
So that visually impaired users can read all content.

**Acceptance Criteria:**

**Given** the app has colored text and backgrounds
**When** I measure color contrast
**Then** all text meets or exceeds WCAG AA requirements:

**Color Contrast Requirements:**
- Normal text (<18pt or <14pt bold): ≥4.5:1 contrast ratio
- Large text (≥18pt or ≥14pt bold): ≥3:1 contrast ratio
- Interactive elements (buttons, links): ≥4.5:1 contrast ratio
- Focus indicators: ≥3:1 contrast ratio against background

**Color Palette:**
```css
:root {
  /* Light mode colors */
  --text-primary: #1f2937;      /* Gray-900 */
  --text-secondary: #6b7280;    /* Gray-500 */
  --bg-primary: #ffffff;
  --bg-secondary: #f9fafb;      /* Gray-50 */

  /* Accent colors (4.5:1+ contrast on white) */
  --color-green: #10b981;       /* Emerald-500 */
  --color-blue: #3b82f6;        /* Blue-500 */
  --color-red: #ef4444;         /* Red-500 */
}

.dark {
  /* Dark mode colors */
  --text-primary: #f9fafb;      /* Gray-50 */
  --text-secondary: #9ca3af;    /* Gray-400 */
  --bg-primary: #111827;        /* Gray-900 */
  --bg-secondary: #1f2937;      /* Gray-800 */
}
```

**Contrast Testing:**
```typescript
// Automated contrast checking utility
function checkContrast(foreground: string, background: string, fontSize: number, isBold: boolean): boolean {
  const ratio = calculateContrastRatio(foreground, background);
  const threshold = fontSize >= 18 || isBold ? 3 : 4.5;
  return ratio >= threshold;
}
```

**Visualization Components:**
```vue
<template>
  <!-- Progress bars with pattern overlay for accessibility -->
  <div class="progress-bar">
    <div
      class="progress-fill"
      :style="{ width: `${percent}%` }"
      :aria-valuenow="percent"
      role="progressbar"
    >
      <!-- Pattern overlay for color blindness -->
      <div class="pattern-overlay"></div>
    </div>
    <span class="progress-label">{{ percent }}%</span>
  </div>
</template>

<style scoped>
.progress-fill {
  background: #10b981;
}

.pattern-overlay {
  /* Striped pattern for accessibility */
  background-image: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 5px,
    rgba(0, 0, 0, 0.1) 5px,
    rgba(0, 0, 0, 0.1) 10px
  );
}
</style>
```

**Verification:**
- All text passes Axe DevTools contrast check
- Lighthouse accessibility score 100
- No contrast errors in Wave browser extension
- Color blind simulator shows content is readable
- Progress indicators use both color AND patterns
- Error states use both color AND icons/text
- Links are underlined or have clear visual style

**Prerequisites:** All UI components with colors

**Technical Notes:**
- FR38 requirement (color contrast ≥4.5:1)
- NFR-A11Y-003 (contrast ratios)
- Test with contrast checker tools

---

### Story 8.7: Responsive Design and Touch Target Optimization

As a developer,
I want to ensure responsive design and proper touch targets,
So that users on all devices can easily interact with the app.

**Acceptance Criteria:**

**Given** the app runs on devices from 320px to 2560px
**When** I view the app on any device
**Then** the layout adapts correctly and touch targets are usable:

**Responsive Breakpoints:**
```css
/* Tailwind default breakpoints */
@media (min-width: 640px)  { /* sm: Tablet */ }
@media (min-width: 1024px) { /* lg: Desktop */ }
@media (min-width: 1280px) { /* xl: Wide desktop */ }
```

**Touch Target Sizes:**
```css
/* Minimum touch target: 44x44px (WCAG AAA) */
.button {
  min-height: 44px;
  min-width: 44px;
  padding: 0.75rem 1.25rem;
}

.link {
  display: inline-block;
  padding: 0.5rem 0.75rem;
}

.icon-button {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

**Responsive Layouts:**
```vue
<template>
  <!-- Food cards: 1 column mobile, 2 tablet, 3-4 desktop -->
  <div class="foods-grid">
    <FoodCard v-for="food in foods" :key="food.id" :food="food" />
  </div>
</template>

<style scoped>
.foods-grid {
  display: grid;
  gap: 1.5rem;
  padding: 1rem;
  /* Mobile: 1 column */
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .foods-grid {
    /* Tablet: 2 columns */
    grid-template-columns: repeat(2, 1fr);
    padding: 2rem;
  }
}

@media (min-width: 1024px) {
  .foods-grid {
    /* Desktop: 3-4 columns */
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    padding: 2rem;
  }
}
</style>
```

**Mobile-Specific Optimizations:**
```vue
<template>
  <!-- Bottom sheet on mobile, modal on desktop -->
  <ClientOnly>
    <div v-if="isMobile" class="bottom-sheet">
      <!-- Mobile bottom sheet content -->
    </div>
    <UModal v-else>
      <!-- Desktop modal content -->
    </UModal>
  </ClientOnly>
</template>

<script setup lang="ts">
const isMobile = computed(() => {
  if (process.client) {
    return window.innerWidth < 640;
  }
  return false;
});
</script>
```

**Verification:**
- Layout works on 320px mobile viewport (smallest)
- Layout works on 2560px desktop viewport (largest)
- Touch targets ≥44x44px on mobile (tested)
- Text readable without zooming on mobile
- No horizontal scrolling at any breakpoint
- Orientation change (portrait ↔ landscape) works
- Tap targets don't overlap on mobile
- Pull-to-refresh works on mobile search results

**Prerequisites:** All UI components

**Technical Notes:**
- FR40 requirement (responsive layouts)
- NFR-A11Y-011 (touch target ≥44x44px)
- NFR-A11Y-012 (reflows 320px-2560px)

---

## Epic 8 Completion Review

**Stories Created:** 7

**FR Coverage:**
- FR36: Keyboard navigation ✅
- FR37: Screen reader compatibility ✅
- FR38: Color contrast ≥4.5:1 ✅
- FR39: Text resize to 200% ✅
- FR40: Responsive layouts ✅
- FR41: Dark mode support ✅
- FR42: Loading states and skeleton screens ✅
- FR43: Clear error messages ✅
- FR44: Consistent navigation patterns ✅

**Technical Context Used:**
- Nuxt UI dark mode (Architecture line 56)
- Loading state patterns (Architecture lines 1085-1091)
- WCAG 2.1 AA requirements (PRD lines 692-729)
- ARIA attributes and semantic HTML

**User Value Delivered:**
- ✅ Users with disabilities can fully use the application
- ✅ Professional polish with loading states and animations
- ✅ Dark mode support with theme persistence
- ✅ Smooth, responsive experience on all devices

**Epic 8 Success Criteria:**
- Lighthouse accessibility score 100
- WCAG 2.1 AA compliance verified
- Keyboard-only navigation works everywhere
- Dark mode persists across sessions
- Loading states provide visual feedback
- All users have professional experience

---

---

## FR Coverage Matrix

{{fr_coverage_matrix}}

---

## Summary

{{epic_breakdown_summary}}

---

_For implementation: Use the `create-story` workflow to generate individual story implementation plans from this epic breakdown._

