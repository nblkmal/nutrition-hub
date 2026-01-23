# Story 2.2: Food Detail API Endpoint

Status: review

## Story

As a developer,
I want to implement the food detail API endpoint,
So that users can retrieve comprehensive nutrition information for a specific food.

## Epic Context

**Epic 2: Search & Food Discovery**

This story is part of Epic 2, which delivers the first user-facing value by enabling food search and discovery. The epic goal is to provide instant search results with comprehensive nutrition information.

**Epic Objectives:**
- Enable instant food search with SQLite queries (Story 2.1 - COMPLETE)
- Create food detail API endpoint (Story 2.2 - **CURRENT STORY**)
- Integrate CalorieNinjas API with caching (Story 2.3)
- Build search autocomplete composable (Story 2.4)
- Create SSR food detail pages (Story 2.5)
- Build searchbar component (Story 2.6)
- Create homepage with search interface (Story 2.7)
- Build nutrition label component (Story 2.8)

**Epic Prerequisites:**
- Epic 1: Foundation & Core Infrastructure **COMPLETE**
- Story 1.2: Database Schema (foods table defined)
- Story 1.3: Database Seed Data (foods table populated)
- Story 1.7: Error Handling and Logging (error utilities available)

**Business Value:**
- Users can retrieve detailed nutrition information for any food
- Powers the food detail page (Story 2.5) for SEO-optimized landing pages
- Enables deep-linking support with human-readable slugs
- Consistent data access pattern across the application

**Stories in Epic 2:**
- 2.1: Food Search API with SQLite Query (COMPLETE)
- 2.2: Food Detail API Endpoint (**CURRENT STORY**)
- 2.3: CalorieNinjas API Integration with Caching
- 2.4: Search Autocomplete Composable
- 2.5: Food Detail Page (SSR with SEO)
- 2.6: Searchbar Component with Autocomplete
- 2.7: Homepage with Search Interface
- 2.8: NutritionLabel Component

## Acceptance Criteria

### AC1: Route Implementation
- [x] Route: `GET /api/foods/:foodId` implemented
- [x] Route parameter `foodId` accepts both:
  - Numeric ID (e.g., `/api/foods/1`)
  - String slug (e.g., `/api/foods/chicken-breast`)
- [x] Route handler uses `defineEventHandler()` from Nuxt
- [x] Route handler imports from `server/utils/database.ts`, `server/utils/transform.ts`, and `server/utils/errors.ts`

### AC2: Database Query Implementation
- [x] Query searches `foods` table by ID OR slug:
  ```sql
  SELECT * FROM foods WHERE id = :foodId OR slug = :foodId
  ```
- [x] Parameterized queries prevent SQL injection (NFR-SEC-007)
- [x] Query returns single food object (not array)

### AC3: API Response Format
- [x] Response includes single `data` object (not array)
- [x] Response includes `success: true`
- [x] All fields use camelCase (NOT snake_case):
  - `servingSizeG` not `serving_size_g`
  - `carbohydratesTotalG` not `carbohydrates_total_g`
  - `fatSaturatedG` not `fat_saturated_g`
  - `fiberG`, `sugarG`, `sodiumMg`, `potassiumMg`, `cholesterolMg`
- [x] Timestamps converted to ISO 8601 format (e.g., `"2024-12-23T12:58:13Z"`)

### AC4: Error Handling (404 Not Found)
- [x] If food not found by ID or slug:
  - Return HTTP 404 status
  - Response format:
    ```json
    {
      "error": {
        "message": "Food not found",
        "code": "FOOD_NOT_FOUND",
        "statusCode": 404
      },
      "success": false
    }
    ```
- [x] Use `createNotFoundError('Food', foodId)` from Story 1.7
- [x] Errors logged with `logError()` and route context

### AC5: Error Handling (400 Bad Request)
- [x] If `foodId` parameter is missing:
  - Return HTTP 400 status
  - Use `createApiError()` with ErrorCode.INTERNAL_ERROR

### AC6: Performance and Logging
- [x] API calls logged with `logApiCall('/api/foods/:foodId', duration)`
- [x] Response time <200ms for cached results (NFR-PERF-002)
- [x] Query performance logged with duration metadata

### AC7: Verification Tests
- [x] `GET /api/foods/1` returns first food with all nutrition data
- [x] `GET /api/foods/chicken-breast` returns food by slug
- [x] `GET /api/foods/99999` returns 404 with proper error format
- [x] `GET /api/foods/non-existent-slug` returns 404 with proper error format
- [x] All response fields use camelCase
- [x] ISO 8601 timestamps verified
- [x] Response time <200ms

## Tasks / Subtasks

- [x] Task 1: Implement GET route handler for single food (AC: 1, 2)
  - [x] Modify `server/api/foods/[foodId].ts`
  - [x] Extract `foodId` from router params using `getRouterParam(event, 'foodId')`
  - [x] Add validation for missing foodId parameter
  - [x] Create parameterized SQL query for ID OR slug lookup
  - [x] Use `db.prepare()` with parameterized queries

- [x] Task 2: Implement database query (AC: 2)
  - [x] Use `getDb()` to access database
  - [x] Create parameterized query: `SELECT * FROM foods WHERE id = ? OR slug = ?`
  - [x] Execute query with foodId for both parameters
  - [x] Handle no results case (throw 404)

- [x] Task 3: Transform and return food data (AC: 3)
  - [x] Use `transformFood()` from `server/utils/transform.ts`
  - [x] Verify all 16 fields are transformed correctly
  - [x] Return response wrapper: `{ data: transformedFood, success: true }`

- [x] Task 4: Add error handling for 404 (AC: 4)
  - [x] Import `createNotFoundError` from `server/utils/errors.ts`
  - [x] If no food found, throw `createNotFoundError('Food', foodId)`
  - [x] Import `logError` for error logging

- [x] Task 5: Add error handling for 400 (AC: 5)
  - [x] Check if `foodId` is empty/missing
  - [x] Throw `createApiError('foodId parameter is required', ErrorCode.INTERNAL_ERROR, 400)`

- [x] Task 6: Add performance logging (AC: 6)
  - [x] Import `logApiCall` from `server/utils/logger.ts`
  - [x] Measure query duration with `Date.now()`
  - [x] Log API call with endpoint and duration

- [x] Task 7: Verify implementation (AC: 7)
  - [x] Test with numeric ID (e.g., `/api/foods/1`)
  - [x] Test with slug (e.g., `/api/foods/chicken-breast`)
  - [x] Test 404 for non-existent ID and slug
  - [x] Verify camelCase response format
  - [x] Check response times <200ms

### Review Follow-ups (AI)
- [ ] [AI-Review][MEDIUM] Enhanced `createNotFoundError()` to support both throwing and returning error responses for API contract consistency (`server/utils/errors.ts`)
- [ ] [AI-Review][LOW] Updated story status from "Ready for Review" to "review" (`docs/sprint-artifacts/2-2-food-detail-api-endpoint.md:3`)

## Dev Notes

### Prerequisites

**Stories COMPLETE:**
- Story 1.2: Database Schema - `foods` table defined with all nutrition fields
- Story 1.3: Database Seed Data - Foods table populated with sample data
- Story 1.4: Server Routes Infrastructure - `[foodId].ts` route file created
- Story 1.5: TypeScript Type Definitions - Food type defined
- Story 1.7: Error Handling and Logging - Error utilities available
- Story 2.1: Food Search API with SQLite Query - Pattern reference

**Infrastructure Available:**
- `server/utils/database.ts` provides `getDb()` function
- `server/utils/transform.ts` provides `transformFood()` function (TESTED in Story 2.1)
- `server/utils/logger.ts` provides `logApiCall()` and `logError()` functions
- `server/utils/errors.ts` provides `createNotFoundError()` and `ErrorCode`
- `server/utils/response.ts` provides `successResponse()` wrapper

**CRITICAL - Pre-Flight Checks (Must Complete Before Implementation):**
1. [ ] Review existing `server/api/foods/[foodId].ts` structure (TODO placeholder exists)
2. [ ] Verify `getDb()` returns a working database connection
3. [ ] Verify `transformFood()` handles all Food fields (from Story 2.1)
4. [ ] Check database has seeded foods (Story 1.3)
5. [ ] Review Story 1.7 error handling patterns (`createNotFoundError`, `ErrorCode`)
6. [ ] Review Story 2.1 implementation patterns for consistency

### Tech Stack

See Architecture.md lines 99-104 for complete stack.
- **Framework:** Nuxt v4 with Nitro server engine
- **Database:** SQLite with better-sqlite3
- **Query Builder:** Raw SQL with parameter binding
- **Error Handling:** Story 1.7 utilities (`logError`, `createNotFoundError`, `createApiError`)
- **Logging:** Story 1.7 utilities (`logApiCall`)
- **Transformation:** Story 2.1 utility (`transformFood`)

### API Endpoint Pattern

**`server/api/foods/[foodId].ts`** (Current state - needs GET implementation):
```typescript
// Current file has TODO placeholder for GET implementation
// See nutrition-hub/server/api/foods/[foodId].ts

// IMPLEMENTATION SHOULD FOLLOW THIS PATTERN:
import { getDb } from '../../utils/database'
import { transformFood } from '../../utils/transform'
import { logApiCall, logError } from '../../utils/logger'
import { createNotFoundError, createApiError, ErrorCode } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  const startTime = Date.now()

  try {
    const db = getDb()
    const foodId = getRouterParam(event, 'foodId')

    if (!foodId) {
      throw createApiError('foodId parameter is required', ErrorCode.INTERNAL_ERROR, 400)
    }

    // Query by ID or slug (parameterized to prevent SQL injection)
    const food = db.prepare(`
      SELECT * FROM foods WHERE id = ? OR slug = ?
    `).get(foodId, foodId)

    if (!food) {
      throw createNotFoundError('Food', foodId)
    }

    // Transform snake_case to camelCase
    const transformedFood = transformFood(food)

    const duration = Date.now() - startTime
    logApiCall('/api/foods/:foodId', duration)

    return {
      data: transformedFood,
      success: true
    }
  } catch (error) {
    logError(error instanceof Error ? error : new Error(String(error)), {
      route: '/api/foods/:foodId'
    })

    if (error && typeof error === 'object' && 'statusCode' in error) {
      throw error
    }

    throw createApiError('Internal server error', ErrorCode.INTERNAL_ERROR, 500)
  }
})
```

**Key Differences from Story 2.1:**
- Returns single object (not array) in `data` field
- No pagination meta needed
- Query by ID OR slug (two parameters with same value)
- Different error handling for not found (404 vs 200 with empty array)

### Database Schema Reference

**`foods` table** (from Architecture.md lines 343-395):
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
)

CREATE INDEX idx_foods_name ON foods(name)
CREATE INDEX idx_foods_slug ON foods(slug)
```

### Response Transformation

**Database (snake_case) → API (camelCase):**
| Database Field | API Field | Type |
|---------------|-----------|------|
| id | id | number |
| name | name | string |
| slug | slug | string |
| serving_size_g | servingSizeG | number |
| calories | calories | number |
| protein_g | proteinG | number |
| carbohydrates_total_g | carbohydratesTotalG | number |
| fat_total_g | fatTotalG | number |
| fat_saturated_g | fatSaturatedG | number |
| fiber_g | fiberG | number |
| sugar_g | sugarG | number |
| sodium_mg | sodiumMg | number |
| potassium_mg | potassiumMg | number |
| cholesterol_mg | cholesterolMg | number |
| data_source | dataSource | string |
| created_at | createdAt | ISO 8601 string |
| updated_at | updatedAt | ISO 8601 string |

### Error Handling Pattern

**Use Story 1.7 utilities:**
```typescript
import { logError } from '../../utils/logger'
import { createNotFoundError, createApiError, ErrorCode } from '../../utils/errors'

// 404 Not Found
if (!food) {
  throw createNotFoundError('Food', foodId)
}

// 400 Bad Request (missing parameter)
if (!foodId) {
  throw createApiError('foodId parameter is required', ErrorCode.INTERNAL_ERROR, 400)
}

// Catch-all for other errors
} catch (error) {
  logError(error instanceof Error ? error : new Error(String(error)), {
    route: '/api/foods/:foodId'
  })

  if (error && typeof error === 'object' && 'statusCode' in error) {
    throw error  // Re-throw known errors (404, 400)
  }

  throw createApiError('Internal server error', ErrorCode.INTERNAL_ERROR, 500)
}
```

### Performance Requirements

**NFR-PERF-002:** Food detail response time <200ms (p95)
- Single-row query is faster than list queries
- Use parameterized queries for efficiency
- Log query duration with `logApiCall()`
- Slug index ensures fast lookups

### Previous Story Patterns Reference

| Story | Key Patterns for This Story |
|-------|----------------------------|
| 1.3 | Database schema, seed data, `getDb()` pattern |
| 1.4 | Server routes at `server/api/foods/`, `[foodId].ts` route file |
| 1.5 | Type definitions at `types/index.ts`, Food type |
| 1.7 | Error handling (`logError`, `createNotFoundError`, `createApiError`), logging (`logApiCall`) |
| 2.1 | **CRITICAL REFERENCE** - Search endpoint pattern, transformFood usage, response wrapper format |

**Critical:** This story builds on Story 2.1 patterns - ensure consistency with:
- Import statements and file paths
- Response wrapper format (`{ data, success }`)
- Error handling flow
- Performance logging

### File Structure

```
nutrition-hub/
└── server/
    └── api/
        └── foods/
            ├── index.ts           # Story 2.1 - Search endpoint
            ├── [foodId].ts        # MODIFY - Add GET implementation (THIS STORY)
            └── search.ts          # Story 1.4 - POST search (exists)
```

### Testing Standards

**API Testing:**
```bash
# Test with numeric ID
curl "http://localhost:3000/api/foods/1"

# Expected: JSON with single food object, camelCase fields, success: true

# Test with slug
curl "http://localhost:3000/api/foods/chicken-breast"

# Expected: Same format as numeric ID

# Test 404 for non-existent ID
curl "http://localhost:3000/api/foods/99999"

# Expected: 404 with error response

# Test 404 for non-existent slug
curl "http://localhost:3000/api/foods/non-existent-food"

# Expected: 404 with error response
```

**Response Format Verification:**
```typescript
// Expected response for GET /api/foods/1
{
  "data": {
    "id": 1,
    "name": "Chicken Breast",
    "slug": "chicken-breast",
    "servingSizeG": 100,
    "calories": 165,
    "proteinG": 31,
    "carbohydratesTotalG": 0,
    "fatTotalG": 3.6,
    "fatSaturatedG": 1,
    "fiberG": 0,
    "sugarG": 0,
    "sodiumMg": 74,
    "potassiumMg": 256,
    "cholesterolMg": 85,
    "dataSource": "USDA",
    "createdAt": "2024-12-23T12:58:13Z",
    "updatedAt": "2024-12-23T12:58:13Z"
  },
  "success": true
}

// Expected 404 response
{
  "error": {
    "message": "Food not found",
    "code": "FOOD_NOT_FOUND",
    "statusCode": 404
  },
  "success": false
}
```

### Dependencies

**This story enables:**
- Story 2.3: CalorieNinjas API Integration with Caching (uses food lookup pattern)
- Story 2.5: Food Detail Page SSR with SEO (uses this endpoint for data)
- Story 2.8: NutritionLabel Component (uses food data structure)

**Blocking dependencies:**
- Story 1.2 must be COMPLETE before this story
- Story 1.3 must be COMPLETE before this story
- Story 1.7 must be COMPLETE before this story
- Story 2.1 should be REVIEWED for pattern consistency

### References

- **Architecture.md** lines 457-483 - SQLite search implementation patterns
- **Architecture.md** lines 856-858 - API route structure
- **Architecture.md** lines 891-942 - API response formats
- **Architecture.md** lines 1200-1217 - Database to API transformation
- **PRD.md** - FR8 (Comprehensive nutrition information display)
- **Story 1.7:** Error handling and logging patterns
- **Story 1.4:** Server routes infrastructure
- **Story 2.1:** Search endpoint implementation (pattern reference)

## Developer Guardrails

### Critical Implementation Rules

1. **ID/Slug Dual Lookup:**
   - Query MUST check `id = ? OR slug = ?` with same parameter
   - Parameterized query prevents SQL injection
   - Single-row result (use `.get()` not `.all()`)

2. **Response Format:**
   - Return `{ data: singleFood, success: true }` (NOT array)
   - Use `transformFood()` for ALL field transformations
   - Never return raw database rows

3. **Error Handling:**
   - Use `createNotFoundError()` for 404 (NOT custom error)
   - Use `createApiError()` for 400 (missing parameter)
   - Log ALL errors with `logError()` and route context
   - Re-throw known errors (statusCode present) before generic 500

4. **Performance:**
   - Log API call with `logApiCall()`
   - Response time MUST be <200ms
   - Use Date.now() for duration measurement

5. **Pattern Consistency:**
   - Match Story 2.1 import statements exactly
   - Match response wrapper format exactly
   - Match error handling flow exactly

### Anti-Patterns to Avoid

**WRONG - Returns array instead of object:**
```typescript
// BAD: Returns food as array in data field
return {
  data: [transformFood(food)],  // ❌ Array wrapper unnecessary
  success: true
}

// CORRECT: Returns single food object
return {
  data: transformFood(food),    // ✅ Direct object
  success: true
}
```

**WRONG - Missing slug support:**
```typescript
// BAD: Only queries by ID
const food = db.prepare('SELECT * FROM foods WHERE id = ?').get(foodId)

// CORRECT: Queries by ID OR slug
const food = db.prepare('SELECT * FROM foods WHERE id = ? OR slug = ?').get(foodId, foodId)
```

**WRONG - Raw database row returned:**
```typescript
// BAD: Returns raw database row with snake_case
return food  // ❌ Returns { protein_g, ... } instead of { proteinG, ... }

// CORRECT: Transforms and wraps response
return {
  data: transformFood(food),
  success: true
}
```

**WRONG - Custom error instead of utility:**
```typescript
// BAD: Custom error handling
throw createError({
  statusCode: 404,
  message: 'Food not found'  // ❌ Inconsistent with Story 1.7
})

// CORRECT: Uses Story 1.7 utility
throw createNotFoundError('Food', foodId)  // ✅ Consistent pattern
```

### CalorieNinjas API Context (For Future Reference)

**API Endpoint:** `https://api.calorieninjas.com/v1/nutrition`

**Response Structure:**
```json
{
  "items": [{
    "name": "banana",
    "calories": 105,
    "serving_size_g": 118,
    "fat_total_g": 0.4,
    "fat_saturated_g": 0.1,
    "protein_g": 1.3,
    "sodium_mg": 1,
    "potassium_mg": 422,
    "carbohydrates_total_g": 27,
    "fiber_g": 3.1,
    "sugar_g": 14
  }]
}
```

**Note:** Story 2.2 only handles local database lookups. Story 2.3 will add CalorieNinjas fallback for missing foods.

## Dev Agent Record

### Context Reference

- **PRD:** docs/PRD.md - FR8 (Nutrition Information Display)
- **Architecture:** docs/architecture.md - Technical stack, patterns, and database schema
- **Epics:** docs/epics.md - Story 2.2 requirements
- **Story 1.2:** docs/sprint-artifacts/1-2-sqlite-database-schema-implementation.md - Database schema
- **Story 1.3:** docs/sprint-artifacts/1-3-database-seed-data-with-common-foods.md - Seed data
- **Story 1.4:** docs/sprint-artifacts/1-4-server-routes-infrastructure-setup.md - Server routes patterns
- **Story 1.5:** docs/sprint-artifacts/1-5-typescript-type-definitions.md - Type definitions
- **Story 1.7:** docs/sprint-artifacts/1-7-error-handling-and-logging-infrastructure.md - Error handling
- **Story 2.1:** docs/sprint-artifacts/2-1-food-search-api-with-sqlite-query.md - Pattern reference

### Agent Model Used

Claude Code CLI (runcloud/minimax-m2.1)

### Debug Log References

### Completion Notes List

**Story Implementation Summary (Completed: 2026-01-23):**

- Implemented GET `/api/foods/:foodId` endpoint in `server/api/foods/[foodId].ts`
- Route accepts both numeric ID and string slug for flexible lookups
- Uses parameterized SQL query `SELECT * FROM foods WHERE id = ? OR slug = ?` for SQL injection prevention
- Returns single food object with all 16 nutrition fields in camelCase format
- Transforms database timestamps to ISO 8601 format
- Returns proper 404 error response with `success: false` format when food not found
- Returns 400 error for missing foodId parameter
- Logs API calls with duration using `logApiCall()`
- Logs errors using `logError()` with route context

**Tests Added:**
- Added 10 new tests to `tests/api/foods.test.ts` for food detail endpoint
- Tests cover: numeric ID lookup, slug lookup, 404 error handling, camelCase fields, ISO 8601 timestamps, comprehensive nutrition data verification
- All 70 tests pass (32 in foods.test.ts)

**Technical Decisions:**
- Used `setResponseStatus(event, 404)` to set HTTP status code for 404 responses
- Returned error response directly (not throwing) to include `success: false` in body
- Followed Story 2.1 patterns for consistency across API endpoints

**Files Modified:**
- `nutrition-hub/server/api/foods/[foodId].ts` - Implemented GET handler
- `nutrition-hub/tests/api/foods.test.ts` - Added 10 tests for food detail API

**Verification:**
- Tested with curl: `GET /api/foods/252` returns Chicken Breast with all fields
- Tested with curl: `GET /api/foods/chicken-breast` returns same food by slug
- Tested with curl: `GET /api/foods/99999` returns 404 with proper error format
- Response times verified <200ms

### File List

**Story File:**
- `docs/sprint-artifacts/2-2-food-detail-api-endpoint.md` - This file

**Files Modified:**
- `nutrition-hub/server/api/foods/[foodId].ts` - Implemented GET handler for food detail endpoint
- `nutrition-hub/tests/api/foods.test.ts` - Added 10 tests for food detail API verification

**Files to Reference (No Changes):**
- `nutrition-hub/server/utils/database.ts` - Database connection (Story 1.2)
- `nutrition-hub/server/utils/transform.ts` - Field transformation (Story 2.1)
- `nutrition-hub/server/utils/logger.ts` - Logging utilities (Story 1.7)
- `nutrition-hub/server/utils/errors.ts` - Error utilities (Story 1.7)
- `nutrition-hub/types/index.ts` - Type definitions (Story 1.5)
