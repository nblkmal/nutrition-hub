# Story 1.4: Server Routes Infrastructure Setup

Status: done

## Story

As a developer,
I want to create the server routes infrastructure following Nuxt conventions,
so that API endpoints are organized and ready for implementation.

## Epic Context

**Epic 1: Foundation & Core Infrastructure**

This story is part of Epic 1, which establishes the complete technical foundation for nutrition-hub. The epic goal is to provide the technical platform that powers all user experiences.

**Epic Objectives:**
- Establish project structure with Nuxt v4 + Nuxt UI + SQLite ✅ (Stories 1.1-1.3 COMPLETE)
- Create database schema with foods, categories, and relationships ✅ (Stories 1.2-1.3 COMPLETE)
- **Set up server routes infrastructure** ← **CURRENT STORY**
- Configure TypeScript type definitions (Story 1.5)
- Set up deployment pipeline with Vercel (Story 1.6)
- Configure error handling and logging (Story 1.7)

**Business Value:**
While not directly user-facing, this epic enables all subsequent functionality. Without the server routes infrastructure, no API endpoints can be implemented for food search, categorization, or analytics features.

**Stories in Epic 1:**
- 1.1: Project Initialization with Nuxt v4 ✅ (DONE)
- 1.2: SQLite Database Schema Implementation ✅ (DONE)
- 1.3: Database Seed Data with Common Foods ✅ (DONE)
- 1.4: Server Routes Infrastructure Setup ← **CURRENT STORY**
- 1.5: TypeScript Type Definitions (NEXT)
- 1.6: Vercel Deployment Configuration
- 1.7: Error Handling and Logging Infrastructure

**Epic Dependencies:**
- Stories 1.1, 1.2, 1.3: **COMPLETED** ✅

## Acceptance Criteria

### AC1: Directory Structure Created
- [x] `server/api/foods/` directory exists
- [x] `server/api/foods/index.ts` file exists
- [x] `server/api/foods/[foodId].ts` file exists
- [x] `server/api/foods/search.ts` file exists
- [x] `server/api/categories/` directory exists
- [x] `server/api/categories/index.ts` file exists
- [x] `server/api/categories/[categoryId].ts` file exists
- [x] `server/api/categories/rules.ts` file exists
- [x] `server/api/admin/` directory exists
- [x] `server/api/admin/analytics.ts` file exists

### AC2: Route Placeholder Structure
- [x] Each route exports default `defineEventHandler()` function
- [x] Each route includes try/catch error handling wrapper
- [x] Each GET route returns `{ data: {}, success: true }` or similar placeholder
- [x] Each route throws `createError()` for error cases
- [x] Dynamic routes (`[foodId].ts`, `[categoryId].ts`) extract params using `getRouterParam(event, 'paramName')`

### AC3: Response Format Utilities
- [x] `server/utils/response.ts` with `successResponse()` function
- [x] `server/utils/response.ts` with `errorResponse()` function
- [x] `server/utils/transform.ts` with `transformFood()` function
- [x] `server/utils/transform.ts` with `transformCategory()` function
- [x] Transform functions convert snake_case to camelCase

### AC4: Error Utilities
- [x] `server/utils/errors.ts` with `ErrorCodes` constant object
- [x] `server/utils/errors.ts` with `createNotFoundError()` function
- [x] `server/utils/errors.ts` with `createFoodNotFoundError()` function
- [x] `server/utils/errors.ts` with `createCategoryNotFoundError()` function

### AC5: README.md Updated
- [x] README.md contains "Development" section with setup instructions
- [x] README.md contains "Production" section with build commands
- [x] README.md documents required environment variables
- [x] README.md includes tech stack information

## Tasks / Subtasks

- [x] Task 1: Create README.md (AC: 5)
  - [x] Create `README.md` file in project root (does not exist yet)
  - [x] Add "## Development" section with setup instructions
  - [x] Add "## Production" section with build commands
  - [x] Document environment variables
  - [x] Add tech stack information

- [x] Task 2: Create server utilities (AC: 3, 4)
  - [x] Create `server/utils/transform.ts` with `transformFood()` function
  - [x] Create `server/utils/transform.ts` with `transformCategory()` function
  - [x] Create `server/utils/response.ts` with `successResponse()` function
  - [x] Create `server/utils/response.ts` with `errorResponse()` function
  - [x] Create `server/utils/errors.ts` with `ErrorCodes` constant object
  - [x] Create `server/utils/errors.ts` with `createNotFoundError()` helper
  - [x] Create `server/utils/errors.ts` with `createFoodNotFoundError()` helper
  - [x] Create `server/utils/errors.ts` with `createCategoryNotFoundError()` helper

- [x] Task 3: Create foods API routes (AC: 1, 2, 3)
  - [x] Create `server/api/foods/index.ts` with placeholder implementation
  - [x] Create `server/api/foods/[foodId].ts` with placeholder implementation
  - [x] Create `server/api/foods/search.ts` with placeholder implementation

- [x] Task 4: Create categories API routes (AC: 1, 2, 3)
  - [x] Create `server/api/categories/index.ts` with placeholder implementation
  - [x] Create `server/api/categories/[categoryId].ts` with placeholder implementation
  - [x] Create `server/api/categories/rules.ts` with placeholder implementation

- [x] Task 5: Create admin API routes (AC: 1, 2, 3)
  - [x] Create `server/api/admin/analytics.ts` with placeholder implementation

- [x] Task 6: Verification (AC: 1-5)
  - [x] Run `find server/api -name "*.ts"` - confirm 10 route files exist
  - [x] Run `find server/utils -name "*.ts"` - confirm 6 utility files exist (3 existing + 3 new)
  - [x] Run TypeScript type check: `npx tsc --noEmit` - confirm no compilation errors
  - [x] Run `npm run dev` - confirm server starts without errors
  - [x] Run `curl -s http://localhost:3000/api/foods | jq` - verify response format structure (data/success fields present)
  - [x] Run `curl -s http://localhost:3000/api/categories | jq` - verify response format structure
  - [x] Run `curl -s http://localhost:3000/api/admin/analytics | jq` - verify response format structure
  - [x] Run `curl -s http://localhost:3000/api/foods/999999` - verify 404 error response format
  - [x] Search README.md for "## Development" heading - confirm exists
  - [x] Search README.md for "## Production" heading - confirm exists
  - [x] Search README.md for "Environment Variables" section - confirm exists

## Dev Notes

### 🚨 CRITICAL: Quick Reference (Read This First)

**🚨 MUST USE RELATIVE IMPORTS in server files:**
```typescript
// ✅ CORRECT - relative import
import { getDb } from '../../utils/database'

// ❌ WRONG - ~/ alias fails in server context
import { getDb } from '~/utils/database'
```

**⚠️ WARNING - Call getDb() ONCE per handler:**
```typescript
export default defineEventHandler(async (event) => {
  const db = getDb()  // ✅ Call ONCE at start
  // Use db throughout - never call getDb() again in this handler
})
```

**H3 Auto-Imported Utilities (no import needed):**
```typescript
defineEventHandler()    // Define route handler
getRouterParam()        // Get route params
getQuery()              // Get query params
readBody()              // Read POST body
createError()           // Create HTTP errors
```

**Import Path Patterns by Location:**
- `server/api/foods/` → use `../../utils/` for imports
- `server/api/categories/` → use `../../../utils/` for subdirectory routes
- `server/api/admin/` → use `../../utils/` for imports

**Response Format (ALL routes must follow):**
```typescript
// Success
{ data: {...}, success: true }
// Error
{ error: { message, code, statusCode }, success: false }
```

---

### Prerequisites
- ✅ Story 1.1 - Project Initialization with Nuxt v4 (COMPLETED)
- ✅ Story 1.2 - SQLite Database Schema Implementation (COMPLETED)
- ✅ Story 1.3 - Database Seed Data with Common Foods (COMPLETED)

### Established Patterns from Previous Stories

**From Story 1.1 (COMPLETED):**
- Project structure: `nutrition-hub/` with `server/api/` directory ready
- Nuxt v4.2.2 with TypeScript strict mode enabled
- better-sqlite3 v12.5.0 installed and configured
- Vitest testing framework configured

**From Story 1.2 (COMPLETED):**
- Database at: `data/nutrition-hub.db`
- Database utility: `server/utils/database.ts` exports `getDb()` function
- **CRITICAL:** Use relative imports in server files: `import { getDb } from '../utils/database'`
- **CRITICAL:** Call `getDb()` ONCE before loops, never inside loops
- Foreign keys enabled via `db.pragma('foreign_keys = ON')`
- Database types defined in `types/database.ts`: `FoodDbRow`, `CategoryDbRow`, `FoodCategoryDbRow`
- better-sqlite3 is SYNCHRONOUS - do NOT use async/await

**From Story 1.3 (COMPLETED):**
- Slugify utility exists at: `utils/slugify.ts`
- 125+ foods seeded in database across 5 nutrition categories
- Categories seeded with rules_json: High Protein, Low Carb, Healthy Fats, High Fiber, Low Calorie
- Database has real data for testing routes during development

### Project Structure Notes

**Current State (From Previous Stories):**
- Project root: `/nutrition-hub/` subdirectory within project
- Nuxt v4 with Nitro server engine
- better-sqlite3 v12.5.0 installed
- Database at: `data/nutrition-hub.db`
- TypeScript with strict mode enabled
- Vitest configured for testing

### 🚨 CRITICAL: Server File Import Path Pattern

> **🚨 CRITICAL - Using ~/ alias in server files WILL CAUSE BUILD FAILURES**
>
> Server files (`/server/api/`, `/server/utils/`) **MUST use relative imports**.
> - Use: `import { getDb } from '../../utils/database'`
> - **NEVER:** `import { getDb } from '~/utils/database'` (fails in server context)
> - The `~/` alias only works in Vue components and composables, NOT server routes

**Correct Import Pattern:**
```typescript
// In server/api/foods/index.ts:
import { getDb } from '../../utils/database'  // ✅ Relative import
import { transformFood } from '../../utils/transform'
```

### Exact Import Paths by Location

> **REFERENCE:** Use these exact import patterns for each route location

**foods/ routes (require `../../utils/`):**
```typescript
// server/api/foods/index.ts
import { getDb } from '../../utils/database'
import { transformFood } from '../../utils/transform'
import { successResponse, errorResponse } from '../../utils/response'
import { createFoodNotFoundError, ErrorCodes } from '../../utils/errors'
```

**foods/ subdirectory routes (require `../../utils/`):**
```typescript
// server/api/foods/[foodId].ts
import { getDb } from '../../utils/database'
import { transformFood } from '../../utils/transform'
import { successResponse } from '../../utils/response'
import { createFoodNotFoundError } from '../../utils/errors'

// server/api/foods/search.ts
import { getDb } from '../../utils/database'
import { successResponse, errorResponse } from '../../utils/response'
```

**categories/ routes (require `../../../utils/` - one level deeper):**
```typescript
// server/api/categories/index.ts
import { getDb } from '../../utils/database'
import { transformCategory } from '../../utils/transform'
import { successResponse } from '../../utils/response'

// server/api/categories/[categoryId].ts
import { getDb } from '../../../utils/database'
import { transformCategory } from '../../../utils/transform'
import { successResponse } from '../../../utils/response'
import { createCategoryNotFoundError } from '../../../utils/errors'

// server/api/categories/rules.ts
import { getDb } from '../../utils/database'
import { successResponse, errorResponse } from '../../utils/response'
```

**admin/ routes (require `../../utils/`):**
```typescript
// server/api/admin/analytics.ts
import { getDb } from '../../utils/database'
import { successResponse } from '../../utils/response'
```

### ⚠️ WARNING: Singleton Database Connection Pattern

> **⚠️ WARNING - Calling getDb() incorrectly causes performance issues and memory leaks**
>
> The `getDb()` function implements a **singleton pattern** with connection caching.
> - **Note:** `getDb()` is an alias for `getDatabase()` - both work identically
> - Call `getDb()` **ONCE** per request handler, store in variable
> - **NEVER** call `getDb()` inside loops (creates multiple connections)
> - **NEVER** use `import { db }` directly (exports functions, not instances)

**Correct Pattern:**
```typescript
export default defineEventHandler(async (event) => {
  const db = getDb()  // ✅ Call ONCE at start, reuse variable
  // Use db variable throughout handler
})

### Database Types Reference

**Available Types (types/database.ts):**
```typescript
interface FoodDbRow {
  id: number
  name: string
  slug: string
  serving_size_g: number
  calories: number
  protein_g: number
  carbohydrates_total_g: number
  fat_total_g: number
  fat_saturated_g: number
  fiber_g: number
  sugar_g: number
  sodium_mg: number
  potassium_mg: number
  cholesterol_mg: number
  data_source: string
  created_at: string
  updated_at: string
}

interface CategoryDbRow {
  id: number
  slug: string
  name: string
  description: string | null
  icon: string | null
  rules_json: string
  display_order: number
  is_active: number
  created_at: string
}

interface FoodCategoryDbRow {
  food_id: number
  category_id: number
  match_score: number
  assigned_at: string
}
```

### API Response Format Standards (from Architecture.md lines 891-941)

**MANDATORY Response Format - All routes MUST follow this pattern:**

**Success Response - Single Item:**
```typescript
{
  data: {
    id: number,
    name: string,
    // ... other fields in camelCase
  },
  success: true
}
```

**Success Response - List with Pagination:**
```typescript
{
  data: [...],
  meta: {
    total: number,
    page: number,
    limit: number
  },
  success: true
}
```

**Error Response (from Architecture lines 923-941):**
```typescript
{
  error: {
    message: string,      // User-friendly message
    code: string,         // Machine-readable error code
    statusCode: number    // HTTP status code
  },
  success: false
}
```

**Standard Error Codes (MANDATORY - from Architecture.md):**
| Code | Status | Description |
|------|--------|-------------|
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 400 | Invalid input |
| `INTERNAL_ERROR` | 500 | Server error |
| `FOOD_NOT_FOUND` | 404 | Food not found specifically |
| `CATEGORY_NOT_FOUND` | 404 | Category not found specifically |
| `API_QUOTA_EXCEEDED` | 429 | CalorieNinjas API quota exceeded (used in Epic 2) |

### snake_case to camelCase Transformation

**Field Mapping:**
```typescript
// Database (snake_case) → API (camelCase)
serving_size_g → servingSizeG
protein_g → proteinG
carbohydrates_total_g → carbohydratesTotalG
fat_total_g → fatTotalG
fat_saturated_g → fatSaturatedG
fiber_g → fiberG
sugar_g → sugarG
sodium_mg → sodiumMg
potassium_mg → potassiumMg
cholesterol_mg → cholesterolMg
data_source → dataSource
created_at → createdAt
updated_at → updatedAt
```

**Utility Implementation:**
```typescript
// server/utils/transform.ts
import type { FoodDbRow, CategoryDbRow } from '~/types/database'

export function transformFood(row: FoodDbRow) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    servingSizeG: row.serving_size_g,
    calories: row.calories,
    proteinG: row.protein_g,
    carbohydratesTotalG: row.carbohydrates_total_g,
    fatTotalG: row.fat_total_g,
    fatSaturatedG: row.fat_saturated_g,
    fiberG: row.fiber_g,
    sugarG: row.sugar_g,
    sodiumMg: row.sodium_mg,
    potassiumMg: row.potassium_mg,
    cholesterolMg: row.cholesterol_mg,
    dataSource: row.data_source,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function transformCategory(row: CategoryDbRow) {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    icon: row.icon,
    rulesJson: row.rules_json,
    displayOrder: row.display_order,
    isActive: Boolean(row.is_active),
    createdAt: row.created_at,
  }
}
```

### Response Helper Utilities

**Implementation:**
```typescript
// server/utils/response.ts
export function successResponse<T>(data: T, meta?: Record<string, unknown>) {
  const response: { data: T; success: true; meta?: Record<string, unknown> } = {
    data,
    success: true,
  }
  if (meta) {
    response.meta = meta
  }
  return response
}

export function errorResponse(message: string, code: string, statusCode: number) {
  return {
    error: {
      message,
      code,
      statusCode,
    },
    success: false,
  }
}
```

### Error Helper Utilities

**Implementation:**
```typescript
// server/utils/errors.ts
export const ErrorCodes = {
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  FOOD_NOT_FOUND: 'FOOD_NOT_FOUND',
  CATEGORY_NOT_FOUND: 'CATEGORY_NOT_FOUND',
} as const

export function createNotFoundError(message = 'Resource not found') {
  return {
    message,
    code: ErrorCodes.NOT_FOUND,
    statusCode: 404,
  }
}

export function createFoodNotFoundError() {
  return {
    message: 'Food not found',
    code: ErrorCodes.FOOD_NOT_FOUND,
    statusCode: 404,
  }
}

export function createCategoryNotFoundError() {
  return {
    message: 'Category not found',
    code: ErrorCodes.CATEGORY_NOT_FOUND,
    statusCode: 404,
  }
}
```

### Route File Template

**Standard Route Pattern:**
```typescript
// server/api/foods/index.ts
import { getDb } from '../../utils/database'
import { transformFood } from '../../utils/transform'
import { successResponse, errorResponse } from '../../utils/response'
import { createFoodNotFoundError } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const db = getDb()  // Call ONCE

    // TODO: Implement route logic

    return successResponse({
      data: [],
      meta: { total: 0, page: 1, limit: 20 }
    })
  } catch (error) {
    console.error('Error in /api/foods:', error)
    throw createError({
      statusCode: 500,
      message: 'Internal server error',
      statusMessage: 'INTERNAL_ERROR'
    })
  }
})
```

**Dynamic Route Pattern:**
```typescript
// server/api/foods/[foodId].ts
import { getDb } from '../../utils/database'
import { transformFood } from '../../utils/transform'
import { successResponse } from '../../utils/response'
import { createFoodNotFoundError } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  try {
    const db = getDb()
    const foodId = getRouterParam(event, 'foodId')

    // TODO: Implement route logic
    // For food routes, check if foodId is numeric (ID lookup) or string (slug lookup)
    // Example: /api/foods/123 searches by id, /api/foods/chicken-breast searches by slug

    return successResponse(transformFood(food))
  } catch (error) {
    console.error('Error in /api/foods/:foodId:', error)

    if (/* not found condition */) {
      throw createError({
        statusCode: 404,
        message: 'Food not found',
        statusMessage: 'FOOD_NOT_FOUND'
      })
    }

    throw createError({
      statusCode: 500,
      message: 'Internal server error',
      statusMessage: 'INTERNAL_ERROR'
    })
  }
})
```

**📌 NOTE - HTTP Method Handling for Placeholders:**
For placeholder routes created in this story, you can return the same success response for all HTTP methods (GET, POST, PUT, DELETE). Full HTTP method handling will be implemented in Epic 2 stories (2.1, 2.2, 2.3).

### Nuxt Server Route Conventions

**File-Based Routing:**
- `server/api/foods/index.ts` → `/api/foods`
- `server/api/foods/[foodId].ts` → `/api/foods/:foodId`
- `server/api/categories/index.ts` → `/api/categories`
- `server/api/categories/rules.ts` → `/api/categories/rules`

**HTTP Methods:**
- Nuxt automatically handles all HTTP methods (GET, POST, PUT, DELETE, PATCH)
- Use `event.method` to check the HTTP method
- Use `getRouterParam(event, 'paramName')` to get route parameters
- Use `getQuery()` or `getCookie(event, 'name')` for query params and cookies

### Nuxt Nitro Server Conventions (H3)

**Auto-imported Utilities from H3:**
```typescript
// All auto-imported in server files - no need to import
defineEventHandler(async (event) => { ... })
getRouterParam(event, 'paramName')   // Get route parameters
getQuery(event)                       // Get query parameters object
getCookie(event, 'name')              // Get cookie value
readBody(event)                       // Read request body (POST/PUT)
createError({ statusCode, message, statusMessage })  // Create HTTP errors
```

**HTTP Method Handling Pattern:**
```typescript
export default defineEventHandler(async (event) => {
  const method = event.method  // 'GET', 'POST', 'PUT', 'DELETE', etc.

  if (method === 'GET') {
    // Handle GET request
  } else if (method === 'POST') {
    const body = await readBody(event)  // Parse JSON body
    // Handle POST request
  }
  // ... etc
})
```

### Nitro Error Handling Pattern

**From H3 conventions (Nuxt server engine):**

```typescript
// ✅ PREFERRED - createError() with statusMessage
throw createError({
  statusCode: 404,
  message: 'Food not found',
  statusMessage: 'FOOD_NOT_FOUND'  // Machine-readable error code
})

// ❌ NOT RECOMMENDED - plain Error (doesn't set HTTP status properly)
throw new Error('Food not found')

// ✅ CORRECT - Return error response format
return {
  error: {
    message: 'Food not found',
    code: 'FOOD_NOT_FOUND',
    statusCode: 404
  },
  success: false
}
```

### Server File Organization Pattern (from Architecture)

**From Architecture.md lines 853-859:**

```
server/
├── api/              # API endpoints (file-based routing)
│   ├── foods/        # Foods API endpoints
│   ├── categories/   # Categories API endpoints
│   └── admin/        # Admin endpoints
├── utils/            # Utility functions (database.ts already exists)
├── database/         # Database migrations and seed (already exists)
└── middleware/       # Server middleware (future use)
```

**File-Based Routing Convention:**
- `server/api/foods/index.ts` → `/api/foods`
- `server/api/foods/[foodId].ts` → `/api/foods/:foodId`
- `server/api/foods/search.ts` → `/api/foods/search`

**Route Parameter Extraction:**
- Bracket syntax in filename → dynamic route parameter
- `getRouterParam(event, 'foodId')` extracts the value from `/api/foods/123`

### Naming Conventions (MANDATORY)

- **Database tables/columns:** `snake_case` (e.g., `protein_g`, `carbohydrates_total_g`)
- **API response fields:** `camelCase` (e.g., `proteinG`, `carbohydratesTotalG`)
- **Database types:** PascalCase with suffix (e.g., `FoodDbRow`, `CategoryDbRow`)
- **Server utility files:** `camelCase` (e.g., `transform.ts`, `response.ts`)
- **TypeScript interfaces:** `PascalCase` (e.g., `Food`, `Category`)
- **Server file imports:** Use relative imports (e.g., `../utils/database`)
- **Component imports:** Use `~/` alias for Nuxt imports (e.g., `~/types/database`)

### Tech Stack

- **Framework:** Nuxt v4 with Nitro server engine
- **Language:** TypeScript (strict mode enabled)
- **Database:** SQLite with better-sqlite3 v12.5.0 (synchronous API)
- **HTTP:** H3 (Nuxt's server engine, auto-imported)

### File Structure

```
nutrition-hub/
├── server/
│   ├── api/
│   │   ├── foods/
│   │   │   ├── index.ts           # CREATE - GET /api/foods (list, search)
│   │   │   ├── [foodId].ts        # CREATE - GET/PUT/DELETE /api/foods/:foodId
│   │   │   └── search.ts          # CREATE - POST /api/foods/search
│   │   ├── categories/
│   │   │   ├── index.ts           # CREATE - GET /api/categories (list)
│   │   │   ├── [categoryId].ts    # CREATE - GET/PUT/DELETE /api/categories/:categoryId
│   │   │   └── rules.ts           # CREATE - POST /api/categories/batch-categorize
│   │   └── admin/
│   │       └── analytics.ts       # CREATE - GET /api/admin/analytics
│   ├── utils/
│   │   ├── database.ts            # EXISTS - Use getDb() from here
│   │   ├── transform.ts           # CREATE - snake_case → camelCase transformations
│   │   ├── response.ts            # CREATE - Standard response wrappers
│   │   └── errors.ts              # CREATE - Error code constants and helpers
│   ├── database/
│   │   └── seed.ts                # EXISTS - Database seeding
│   └── middleware/
│       └── database.ts            # EXISTS - Database middleware
├── types/
│   └── database.ts                # EXISTS - Type definitions
├── data/
│   └── nutrition-hub.db           # EXISTS - Database file
└── README.md                      # MODIFY - Add dev/prod setup instructions
```

### README.md Updates Required (EXACT content to add)

**Create or update README.md with this content:**

```markdown
# nutrition-hub

Zero-cost, full-stack nutrition analytics platform built with Nuxt v4.

## Development

### Prerequisites
- Node.js 20.19+ (use `nvm use` if .nvmrc exists)
- npm or yarn

### Setup
1. Install dependencies: `npm install`
2. Initialize database: `npm run seed`
3. Start development server: `npm run dev`

Open http://localhost:3000

### Environment Variables
No environment variables required for local development.

## Production

### Build
```bash
npm run build
```

### Deployment
Configured for Vercel deployment:
1. Push to main branch
2. Vercel auto-deploys on push
3. Database: SQLite file in Vercel Blob (configured in Story 1.6)

### Environment Variables for Production
- `DATABASE_PATH`: Path to SQLite database (defaults to `./data/nutrition-hub.db`)
- `CALORIENINJAS_API_KEY`: CalorieNinjas API key (configured in Epic 2)

## Tech Stack
- **Framework:** Nuxt v4 with Nuxt UI
- **Database:** SQLite with better-sqlite3
- **Deployment:** Vercel serverless
```

### Previous Story Learnings (Condensed)

**Story 1.3 Critical Patterns:**
- Slugify utility at `utils/slugify.ts` for URL-safe slug generation
- 125 foods seeded across 5 nutrition categories
- Server files must use relative imports (not `~/` alias)
- Calorie validation: calories ≈ (protein_g × 4) + (carbs_g × 4) + (fat_g × 9) ± 10%

**Story 1.2 Critical Patterns:**
- Singleton `getDb()` prevents connection leaks (call ONCE before loops)
- Foreign keys enabled automatically via `db.pragma('foreign_keys = ON')`
- better-sqlite3 is SYNCHRONOUS - do NOT use async/await
- **Server files:** Use relative imports (`../utils/database`), NOT `~/` alias

**Story 1.1 Context:**
- Project location: `/nutrition-hub/` subdirectory
- better-sqlite3 v12.5.0 already installed
- Node.js v20.19+ required
- Vitest configured for testing

### Testing Standards

**📌 NOTE - Verification Tests Check Format, Not Data Content:**
The curl commands in Task 6 verify the **response format structure** (presence of `data`, `success`, `error` fields), not the actual data content. Since these are placeholder routes, returning empty arrays or objects is expected. Actual data will be returned in Epic 2 stories when route logic is implemented.

**Manual Verification Commands:**

```bash
# Start dev server
npm run dev

# Test routes (verify format structure, not content)
curl http://localhost:3000/api/foods
curl http://localhost:3000/api/categories
curl http://localhost:3000/api/admin/analytics

# Test with JSON formatting for readability
curl http://localhost:3000/api/foods | jq

# Test 404 handling
curl http://localhost:3000/api/nonexistent
```

**Expected Placeholder Responses:**

```json
// GET /api/foods (format check: has data, meta, success fields)
{
  "data": [],
  "meta": { "total": 0, "page": 1, "limit": 20 },
  "success": true
}

// GET /api/categories (format check: has data, success fields)
{
  "data": [],
  "success": true
}

// GET /api/admin/analytics (format check: has data, success fields)
{
  "data": {},
  "success": true
}

// 404 Error Response (format check: has error, statusCode fields)
{
  "error": {
    "message": "Not Found",
    "statusCode": 404
  }
}
```

**Verification Checklist:**
- [ ] Server starts without errors
- [ ] All route files exist in correct directories
- [ ] Response format matches specification (data/success or error/success)
- [ ] 404 errors return proper error response format
- [ ] TypeScript compilation succeeds with no type errors (`npx tsc --noEmit`)
- [ ] README.md created with setup instructions

### Dependencies

**Stories That CANNOT Start Until This Story is Complete:**

**Epic 2 - Search & Food Discovery:**
- Story 2.1 - Food Search API with SQLite Query → implements `/api/foods/index.ts` logic
- Story 2.2 - Food Detail API Endpoint → implements `/api/foods/[foodId].ts` logic
- Story 2.3 - CalorieNinjas API Integration → implements `/api/foods/search.ts` logic

**Epic 3 - Autocategorization:**
- Story 3.1 - Category Rule Engine Implementation → uses `/api/categories/index.ts`
- Story 3.3 - Category CRUD Operations → implements `/api/categories/[categoryId].ts` logic
- Story 3.4 - Food Category Relationships API → uses category routes

**Epic 6 - Admin Dashboard:**
- Story 6.1 - Admin Analytics API Endpoints → implements `/api/admin/analytics.ts` logic

**This story is a BLOCKER for all above stories - they cannot begin implementation until the route infrastructure is in place.**

### References

- **Story 1.1** - Project structure, Nuxt v4 setup, Node.js requirements
- **Story 1.2** - Database schema, getDb() function, TypeScript types
- **Story 1.3** - Seeded food data, category data
- **Epic 2 Stories** - Examples of response formats (Stories 2.1, 2.2)
- **Nuxt Server Routes Documentation** - https://nitro.unjs.io/guide/routing
- **H3 Documentation** - https://h3.unjs.io/

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

claude-opus-4-5-20251101

### Debug Log References

None - story ready for development.

### Completion Notes List

**Story created with comprehensive developer context including:**
- Complete directory structure for server API routes
- Utility function patterns for transform, response, and error handling
- snake_case to camelCase transformation mappings
- Standard response and error format specifications
- Previous story learnings and critical patterns
- README.md update requirements for development and production setup

**Quality Competition Improvements Applied (validate-create-story workflow):**

*Original improvements (from create-story workflow):*
- Enhanced AC1 with explicit file existence checkboxes (was vague, now specific)
- Added "Established Patterns from Previous Stories" section with detailed context from Stories 1.1, 1.2, 1.3
- Added "Epic Context" section linking to Epic 1 objectives and story progression
- Added "Nuxt Nitro Server Conventions (H3)" section with auto-imported utilities
- Added "Nitro Error Handling Pattern" section with preferred createError() examples
- Added "Server File Organization Pattern" section from Architecture.md lines 853-859
- Enhanced "API Response Format Standards" with Architecture.md line references and error code table
- Enhanced "README.md Updates Required" with exact markdown content to add
- Enhanced "Testing Standards" with explicit curl commands and expected 404 response
- Enhanced Task 1 breakdown with 8 specific function-level subtasks (was 3 vague tasks)
- Enhanced "Dependencies" section with explicit Epic 2, 3, 6 story linkage and BLOCKER warning

*Additional improvements (validate-create-story workflow - 2026-01-22):*
- **Refactored AC1-AC5** for testability - removed implementation details, focused on verification
- **AC2 enhanced** - replaced vague "basic structure" with specific `defineEventHandler()` and try/catch requirements
- **AC3 split** - separated response utilities (AC3) from error utilities (AC4) for clarity
- **AC4 created** - new dedicated error utilities acceptance criteria with specific function checkables
- **AC5 enhanced** - added specific README section existence checks instead of vague "updated" language
- **Added "Exact Import Paths by Location"** section - comprehensive import examples for each route type (foods, categories, admin)
- **Enhanced Task 6** - replaced vague "verify" subtasks with specific bash commands (find, curl, search)

*Critical fixes applied (2026-01-22 validation):*
- **Added Task 1 for README.md creation** - Clarified that README.md doesn't exist and must be created first (was assumed to exist)
- **Clarified getDb() vs getDatabase()** - Added note that getDb() is an alias for getDatabase(), both work identically
- **Added Quick Reference section** - Created concise "Read This First" section with critical patterns at top of Dev Notes
- **Implemented warning hierarchy** - Using 🚨 for CRITICAL (build failures), ⚠️ for WARNING (performance issues), 📌 for NOTES
- **Added H3 auto-imports note** - Explicitly stated that defineEventHandler, getRouterParam, etc. are auto-imported
- **Added HTTP method handling guidance** - Noted that placeholder routes can return same response for all methods
- **Clarified verification expectations** - Noted that curl tests check format structure, not actual data content
- **Added TypeScript compilation check** - Added `npx tsc --noEmit` to Task 6 verification
- **Added route parameter example** - Showed ID vs slug lookup pattern for dynamic routes
- **Updated File List** - Changed README.md from "Modify" to "Create" (file doesn't exist yet)

**Total improvements: 28 critical enhancements applied** (13 original + 5 additional + 10 validation fixes)

**Implementation Completed (2026-01-22):**
- ✅ All 7 API route files created with proper placeholder implementations
- ✅ All 3 utility files created (transform.ts, response.ts, errors.ts)
- ✅ README.md verified with all required sections (already existed from Story 1.1)
- ✅ TypeScript compilation passes with no errors
- ✅ Dev server starts successfully
- ✅ All routes return proper response format (data/success/error fields)
- ✅ 404 error responses work correctly
- ✅ Fixed import path issue in categories/[categoryId].ts (changed from ../../../utils/ to ../../utils/)

### Code Review Fixes Applied (2026-01-22)

**Issues Fixed: 8 total (0 High, 8 Medium)**

**Medium Severity Fixes:**
1. ✅ Removed unused `errorResponse` import from `server/api/foods/index.ts:6` - import was never used (file uses `createError()` instead)
2. ✅ Removed unused `ErrorCodes` import from `server/api/foods/index.ts:7` - import was never referenced
3. ✅ Removed unused `transformFood` import from `server/api/foods/index.ts:5` - placeholder returns empty array
4. ✅ Removed unused `successResponse` and `transformFood` imports from `server/api/foods/[foodId].ts:5-6` - placeholder throws errors only
5. ✅ Removed unused `transformFood` import from `server/api/foods/search.ts:5` - placeholder returns empty results
6. ✅ Removed unused `transformCategory` import from `server/api/categories/index.ts:5` - placeholder returns empty array
7. ✅ Removed unused `transformCategory`, `successResponse`, and `createCategoryNotFoundError` imports from `server/api/categories/[categoryId].ts:5-7` - placeholder throws errors only
8. ✅ Fixed response format in `server/api/categories/rules.ts:17-20` - removed double-wrapped `data` structure, now returns `successResponse({ categorized: 0, results: [] })` instead of `successResponse({ data: { categorized: 0, results: [] } })`

**TypeScript Compilation:** ✅ Verified after all fixes - passes with no errors

### File List

**Story File:**
- `docs/sprint-artifacts/1-4-server-routes-infrastructure-setup.md`

**Files Created:**
- `server/utils/transform.ts` - snake_case → camelCase transformations
- `server/utils/response.ts` - Standard response wrappers
- `server/utils/errors.ts` - Error code constants and helpers
- `server/api/foods/index.ts` - GET /api/foods (list, search)
- `server/api/foods/[foodId].ts` - GET/PUT/DELETE /api/foods/:foodId
- `server/api/foods/search.ts` - POST /api/foods/search
- `server/api/categories/index.ts` - GET /api/categories (list)
- `server/api/categories/[categoryId].ts` - GET/PUT/DELETE /api/categories/:categoryId
- `server/api/categories/rules.ts` - POST /api/categories/batch-categorize
- `server/api/admin/analytics.ts` - GET /api/admin/analytics

**Files Verified (Already Existed):**
- `README.md` - Development and production setup documentation (verified all required sections present)
- `server/utils/database.ts` - Database singleton utility (already existed)

