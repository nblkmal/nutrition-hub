# Story 2.1: Food Search API with SQLite Query

Status: Done

## Story

As a developer,
I want to implement the food search API endpoint using SQLite database queries,
So that users can search for foods and receive instant results.

## Epic Context

**Epic 2: Search & Food Discovery**

This story is part of Epic 2, which delivers the first user-facing value by enabling food search and discovery. The epic goal is to provide instant search results with comprehensive nutrition information.

**Epic Objectives:**
- Enable instant food search with SQLite queries ← **CURRENT STORY**
- Create food detail API endpoint (Story 2.2)
- Integrate CalorieNinjas API with caching (Story 2.3)
- Build search autocomplete composable (Story 2.4)
- Create SSR food detail pages (Story 2.5)
- Build searchbar component (Story 2.6)
- Create homepage with search interface (Story 2.7)
- Build nutrition label component (Story 2.8)

**Epic Prerequisites:**
- Epic 1: Foundation & Core Infrastructure **COMPLETE** ✅
- Story 1.3: Database Seed Data (foods table populated)
- Story 1.7: Error Handling and Logging (error utilities available)

**Business Value:**
- Users can search for any food and get instant results
- Search results include comprehensive nutrition data
- Performance target <200ms for cached results
- Powers the entire search and discovery experience

**Stories in Epic 2:**
- 2.1: Food Search API with SQLite Query ← **CURRENT STORY**
- 2.2: Food Detail API Endpoint
- 2.3: CalorieNinjas API Integration with Caching
- 2.4: Search Autocomplete Composable
- 2.5: Food Detail Page (SSR with SEO)
- 2.6: Searchbar Component with Autocomplete
- 2.7: Homepage with Search Interface
- 2.8: NutritionLabel Component

## Acceptance Criteria

### AC1: Search Endpoint Route Implementation
- [x] Route: `GET /api/foods?q={searchQuery}&page={page}&pageSize={pageSize}` implemented
- [x] Query parameter `q` (optional): Search query string
- [x] Query parameter `page` (optional, default 1): Page number for pagination
- [x] Query parameter `pageSize` (optional, default 20, max 100): Results per page
- [x] Legacy `limit` parameter supported as alias for `pageSize`
- [x] Route handler uses `defineEventHandler()` from Nuxt
- [x] Route handler imports from `server/utils/database.ts` and `server/utils/transform.ts`

### AC2: SQLite Query Implementation
- [x] Query searches `foods.name` using SQLite LIKE pattern matching
- [x] Parameterized queries prevent SQL injection (NFR-SEC-007)
- [x] SQL query orders by exact match first, then alphabetical:
  ```sql
  SELECT * FROM foods
  WHERE name LIKE :query || '%'
  ORDER BY
    CASE WHEN name = :exactQuery THEN 0 ELSE 1 END,
    name ASC
  LIMIT :limit
  ```

### AC3: API Response Format
- [x] Response includes `data` array with transformed Food objects
- [x] Response includes `meta` object with pagination fields:
  - `total`: Total number of matching records
  - `pageSize`: Results per page (alias for `limit`)
  - `page`: Current page number
  - `totalPages`: Total number of pages
  - `hasNextPage`: True if more pages available
  - `hasPrevPage`: True if previous page available
- [x] Response includes `success: true`
- [x] All fields use camelCase (not snake_case):
  - `proteinG` not `protein_g`
  - `carbohydratesTotalG` not `carbohydrates_total_g`
  - `fatTotalG` not `fat_total_g`
  - `servingSizeG` not `serving_size_g`
- [x] Timestamps converted to ISO 8601 format

### AC4: Empty Query Handling
- [x] If no `q` parameter, return all foods (paginated by limit)
- [x] If no results found, return empty array: `{ data: [], meta: { total: 0, limit }, success: true }`

### AC5: Error Handling
- [x] Query errors caught and logged with `logError()`
- [x] Errors thrown using `createApiError()` with ErrorCode.INTERNAL_ERROR
- [x] Errors logged with route context: `{ route: '/api/foods' }`
- [x] API response format follows error pattern from Story 1.7

### AC6: Performance and Logging
- [x] API calls logged with `logApiCall('/api/foods', duration)`
- [x] Response time <200ms for cached results (NFR-PERF-001)
- [x] Query performance logged with duration metadata

### AC7: Verification Tests
- [x] `GET /api/foods?q=chicken` returns chicken breast, chicken thigh, etc.
- [x] `GET /api/foods?q=egg` returns egg, egg white, egg yolk
- [x] `GET /api/foods` (no query) returns all foods (paginated)
- [x] `GET /api/foods?q=xyz` returns empty data array
- [x] All response fields use camelCase
- [x] No snake_case fields in API response

### AC8: Pagination Implementation
- [x] Page parameter supported (`?page=1`)
- [x] Page size parameter supported (`?pageSize=10`, max 100)
- [x] Legacy `limit` parameter works as `pageSize` alias
- [x] Meta includes `total`, `page`, `pageSize`, `totalPages`, `hasNextPage`, `hasPrevPage`
- [x] `GET /api/foods?page=1&pageSize=5` returns first 5 records
- [x] `GET /api/foods?page=2&pageSize=5` returns next 5 records (different from page 1)
- [x] Invalid page values default to 1
- [x] Page size bounds validated (1-100)
- [x] `usePagination()` composable provided for UI integration

## Tasks / Subtasks

- [x] Task 1: Implement search endpoint route (AC: 1)
  - [x] Create/modify `server/api/foods/index.ts`
  - [x] Extract query parameters from event
  - [x] Set up default limit value (20)
  - [x] Add route handler with try/catch

- [x] Task 2: Implement SQLite query (AC: 2)
  - [x] Use `getDb()` to access database
  - [x] Create parameterized query with LIKE pattern
  - [x] Add ORDER BY for exact match priority
  - [x] Add LIMIT clause

- [x] Task 3: Transform database results (AC: 3)
  - [x] Use `transformFood()` from `server/utils/transform.ts`
  - [x] Transform all snake_case to camelCase
  - [x] Convert timestamps to ISO 8601

- [x] Task 4: Handle empty queries (AC: 4)
  - [x] Check if `q` parameter exists
  - [x] Return all foods when no query
  - [x] Return empty array for no results

- [x] Task 5: Add error handling (AC: 5)
  - [x] Import `logError` from `server/utils/logger.ts`
  - [x] Import `createApiError`, `ErrorCode` from `server/utils/errors.ts`
  - [x] Wrap route logic in try/catch
  - [x] Log errors with context

- [x] Task 6: Add performance logging (AC: 6)
  - [x] Import `logApiCall` from `server/utils/logger.ts`
  - [x] Measure query duration
  - [x] Log API call with endpoint and duration

- [x] Task 7: Verify implementation (AC: 7)
  - [x] Test search queries work correctly
  - [x] Verify camelCase response format
  - [x] Check response times <200ms
  - [x] Test empty query and no results cases

- [x] Task 8: Implement full pagination support (AC: 8)
  - [x] Add `page` parameter with validation (default 1)
  - [x] Add `pageSize` parameter with bounds (1-100, default 20)
  - [x] Support `limit` as legacy alias for `pageSize`
  - [x] Add COUNT query for totalRecords
  - [x] Calculate totalPages, hasNextPage, hasPrevPage
  - [x] Add OFFSET for SQL pagination
  - [x] Create `usePagination()` composable for UI
  - [x] Add pagination tests (24 total tests passing)

## Dev Notes

### Prerequisites
- Story 1.3: Database Seed Data **COMPLETE** ✅
- Story 1.4: Server Routes Infrastructure **COMPLETE** ✅
- Story 1.5: TypeScript Type Definitions **COMPLETE** ✅
- Story 1.7: Error Handling and Logging **COMPLETE** ✅
- Foods table populated in database
- `server/utils/database.ts` provides `getDb()` function
- `server/utils/transform.ts` provides `transformFood()` function
- `server/utils/logger.ts` provides logging utilities
- `server/utils/errors.ts` provides error utilities

**CRITICAL - Pre-Flight Checks (Must Complete Before Implementation):**
1. [ ] Review existing `server/api/foods/index.ts` structure
2. [ ] Verify `getDb()` returns a working database connection
3. [ ] Verify `transformFood()` handles all Food fields
4. [ ] Check database has seeded foods (Story 1.3)
5. [ ] Review Story 1.7 error handling patterns

### Tech Stack
See Architecture.md lines 99-104 for complete stack.
- **Framework:** Nuxt v4 with Nitro server engine
- **Database:** SQLite with better-sqlite3
- **Query Builder:** Raw SQL with parameter binding
- **Error Handling:** Story 1.7 utilities (`logError`, `createApiError`)
- **Logging:** Story 1.7 utilities (`logApiCall`)

### API Endpoint Pattern

**`server/api/foods/index.ts`:**
```typescript
import { getDb } from '../../utils/database'
import { successResponse } from '../../utils/response'
import { transformFood } from '../../utils/transform'
import { logApiCall, logError } from '../../utils/logger'
import { createApiError, ErrorCode } from '../../utils/errors'

export default defineEventHandler(async (event) => {
  const startTime = Date.now()

  try {
    const db = getDb()
    const query = getQuery(event)
    const searchQuery = query.q as string | undefined
    const limit = parseInt(query.limit as string) || 20

    let foods

    if (searchQuery) {
      // Search with query parameter
      const searchPattern = searchQuery + '%'
      foods = db.prepare(`
        SELECT * FROM foods
        WHERE name LIKE ?
        ORDER BY
          CASE WHEN name = ? THEN 0 ELSE 1 END,
          name ASC
        LIMIT ?
      `).all(searchPattern, searchQuery, limit)
    } else {
      // Return all foods (paginated)
      foods = db.prepare('SELECT * FROM foods LIMIT ?').all(limit)
    }

    // Transform snake_case to camelCase
    const transformedFoods = foods.map(transformFood)

    const duration = Date.now() - startTime
    logApiCall('/api/foods', duration)

    return successResponse(transformedFoods, { total: transformedFoods.length, limit })
  } catch (error) {
    logError(error instanceof Error ? error : new Error(String(error)), { route: '/api/foods' })
    throw createApiError('Internal server error', ErrorCode.INTERNAL_ERROR, 500)
  }
})
```

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
  fat_saturated_g REAL,
  fiber_g REAL,
  sugar_g REAL,
  sodium_mg REAL,
  potassium_mg REAL,
  cholesterol_mg REAL,
  data_source TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)

CREATE INDEX idx_foods_name ON foods(name)
```

### Response Transformation

**Database (snake_case) → API (camelCase):**
| Database Field | API Field |
|---------------|-----------|
| id | id |
| name | name |
| slug | slug |
| serving_size_g | servingSizeG |
| calories | calories |
| protein_g | proteinG |
| carbohydrates_total_g | carbohydratesTotalG |
| fat_total_g | fatTotalG |
| fat_saturated_g | fatSaturatedG |
| fiber_g | fiberG |
| sugar_g | sugarG |
| sodium_mg | sodiumMg |
| potassium_mg | potassiumMg |
| cholesterol_mg | cholesterolMg |
| data_source | dataSource |
| created_at | createdAt (ISO 8601) |
| updated_at | updatedAt (ISO 8601) |

### Error Handling Pattern

**Use Story 1.7 utilities:**
```typescript
import { logError } from '../../utils/logger'
import { createApiError, ErrorCode } from '../../utils/errors'

try {
  // Route logic
} catch (error) {
  logError(error instanceof Error ? error : new Error(String(error)), { route: '/api/foods' })
  throw createApiError('Internal server error', ErrorCode.INTERNAL_ERROR, 500)
}
```

### Performance Requirements

**NFR-PERF-001:** Search response time <200ms (p95)
- Use parameterized queries for efficiency
- Log query duration with `logApiCall()`
- Consider database indexes for name searches

### Previous Story Patterns Reference

| Story | Key Patterns for This Story |
|-------|----------------------------|
| 1.3 | Database schema, seed data, `getDb()` pattern |
| 1.4 | Server routes at `server/api/foods/`, `getQuery()` usage |
| 1.5 | Type definitions at `types/index.ts`, Food type |
| 1.7 | Error handling (`logError`, `createApiError`), logging (`logApiCall`) |

**Critical:** This story builds on ALL previous stories - ensure compatibility with existing implementation.

### File Structure

```
nutrition-hub/
└── server/
    └── api/
        └── foods/
            ├── index.ts           # MODIFY - Add search implementation
            ├── [foodId].ts        # Already exists (Story 1.4)
            └── search.ts          # Already exists (Story 1.4, for POST)
```

### Testing Standards

**API Testing:**
```bash
# Test search with query
curl "http://localhost:3000/api/foods?q=chicken"

# Expected: JSON with chicken foods, camelCase fields, success: true

# Test no query (all foods)
curl "http://localhost:3000/api/foods"

# Expected: JSON with paginated foods

# Test no results
curl "http://localhost:3000/api/foods?q=xyz"

# Expected: { "data": [], "meta": { "total": 0, "limit": 20 }, "success": true }
```

**Response Format Verification:**
```typescript
// Expected response structure
{
  "data": [
    {
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
    }
  ],
  "meta": {
    "total": 5,
    "limit": 20,
    "page": 1,
    "pageSize": 20,
    "totalPages": 1,
    "hasNextPage": false,
    "hasPrevPage": false
  },
  "success": true
}
```

### UI Integration Reference

**Composable Location:** `nutrition-hub/composables/usePagination.ts`

**Usage in Vue Components:**
```vue
<script setup lang="ts">
import { usePagination, usePaginatedFetch } from '~/composables/usePagination'

// Simple pagination state and actions
const {
  currentPage,
  pageSize,
  totalRecords,
  totalPages,
  hasNextPage,
  hasPrevPage,
  nextPage,
  prevPage,
  setPage,
  setPageSize
} = usePagination(20)

// With automatic data fetching
interface Food {
  id: number
  name: string
  // ... other food fields
}

async function fetchFoods(params: Record<string, string>) {
  const response = await fetch(`/api/foods?${new URLSearchParams(params)}`)
  return response.json()
}

const {
  data,
  error,
  isLoading,
  fetchPage,
  fetchWithQuery
} = usePaginatedFetch<Food>(fetchFoods)

// Fetch initial data
onMounted(() => fetchPage())

// Refetch when page or pageSize changes
watch([currentPage, pageSize], () => fetchPage())
</script>

<template>
  <div>
    <!-- Loading state -->
    <div v-if="isLoading">Loading...</div>

    <!-- Food list -->
    <div v-else>
      <FoodCard
        v-for="food in data"
        :key="food.id"
        :food="food"
      />
    </div>

    <!-- Pagination controls -->
    <div class="pagination">
      <button
        :disabled="!hasPrevPage"
        @click="prevPage"
      >
        Previous
      </button>

      <span>Page {{ currentPage }} of {{ totalPages }}</span>

      <button
        :disabled="!hasNextPage"
        @click="nextPage"
      >
        Next
      </button>

      <!-- Page size selector -->
      <select v-model="pageSize" @change="fetchPage">
        <option :value="10">10 per page</option>
        <option :value="20">20 per page</option>
        <option :value="50">50 per page</option>
      </select>
    </div>
  </div>
</template>
```

**Pagination Meta Fields Available:**
| Field | Type | Description |
|-------|------|-------------|
| `total` | number | Total matching records |
| `page` | number | Current page (1-based) |
| `pageSize` | number | Results per page (1-100) |
| `totalPages` | number | Total number of pages |
| `hasNextPage` | boolean | True if not on last page |
| `hasPrevPage` | boolean | True if not on first page |

**API Query Parameters:**
| Parameter | Default | Description |
|-----------|---------|-------------|
| `q` | - | Search query (optional) |
| `page` | 1 | Page number (1-based) |
| `pageSize` | 20 | Results per page (max 100) |
| `limit` | 20 | Legacy alias for pageSize |

### Dependencies

**This story enables:**
- Story 2.2: Food Detail API Endpoint (uses same transform utilities)
- Story 2.4: Search Autocomplete Composable (uses this endpoint)
- Story 2.6: Searchbar Component (uses this endpoint)
- Story 2.7: Homepage with Search Interface (uses this endpoint)

**Blocking dependencies:**
- Story 1.3 must be COMPLETE before this story
- Story 1.7 must be COMPLETE before this story

### References

- **Architecture.md** lines 457-483 - SQLite search implementation
- **Architecture.md** lines 856-858 - API route structure
- **Architecture.md** lines 891-942 - API response formats
- **Architecture.md** lines 1200-1217 - Database to API transformation
- **PRD.md** - FR1-FR3 (Search functionality requirements)
- **Story 1.7:** Error handling and logging patterns
- **Story 1.4:** Server routes infrastructure

## Dev Agent Record

### Context Reference

- **PRD:** docs/PRD.md - FR1-FR3 (Food Discovery & Search)
- **Architecture:** docs/architecture.md - Technical stack and patterns
- **Epics:** docs/epics.md - Story 2.1 requirements
- **Story 1.3:** docs/sprint-artifacts/1-3-database-seed-data-with-common-foods.md - Database schema
- **Story 1.4:** docs/sprint-artifacts/1-4-server-routes-infrastructure-setup.md - Server routes patterns
- **Story 1.7:** docs/sprint-artifacts/1-7-error-handling-and-logging-infrastructure.md - Error handling

### Agent Model Used

Claude Code CLI (runcloud/minimax-m2.1)

### Debug Log References

### Completion Notes List

**Story created with comprehensive developer context including:**

- Complete search endpoint implementation with SQLite queries
- Parameterized query pattern for SQL injection prevention
- Database to API transformation (snake_case to camelCase)
- Error handling using Story 1.7 utilities
- Performance logging with logApiCall()
- Response format matching Architecture.md specifications
- Testing standards and verification procedures
- Previous story patterns for consistency
- Architecture document references for patterns

**Developer Guardrails Applied:**

- SQL injection prevention via parameterized queries
- Proper error handling with logging context
- Performance logging for NFR compliance
- Consistent API response format (success/error wrappers)
- camelCase field naming in API responses
- ISO 8601 timestamp format
- Proper use of existing utilities (getDb, transformFood, logError, logApiCall)

**Implementation Notes:**

- Follow Architecture.md lines 457-483 for exact search implementation
- Use parameterized queries to prevent SQL injection (NFR-SEC-007)
- Log API calls with duration for performance monitoring
- Use transformFood() for consistent field transformation
- Return successResponse() wrapper for consistent format
- Handle empty queries by returning all foods (paginated)
- Response time target <200ms for cached results

**IMPLEMENTATION COMPLETED:**

**Implementation Date:** 2026-01-23

**Changes Made:**
- Implemented `GET /api/foods` endpoint with search and pagination support
- Added parameterized SQLite queries with LIKE pattern matching
- Added exact match priority in ORDER BY clause
- Added timestamp conversion to ISO 8601 format in transform.ts
- Added comprehensive test suite (14 tests, all passing)
- All acceptance criteria verified and passing

**Verification Results:**
- `GET /api/foods?q=chicken` returns chicken foods (2 results)
- `GET /api/foods?q=egg` returns egg foods (2+ results)
- `GET /api/foods` returns all paginated foods (limit 20)
- `GET /api/foods?q=xyz` returns empty data array
- All fields use camelCase format
- ISO 8601 timestamps verified
- Response times <200ms (typically ~20-50ms)
- Case-insensitive search works (e.g., "CHICKEN" finds "Chicken Breast")
- Limit parameter validated (rejects negative values, max 100)
- Pagination: `page=1&pageSize=5` returns first 5 records
- Pagination: `page=2&pageSize=5` returns different records (not on page 1)
- Pagination meta includes: total, page, pageSize, totalPages, hasNextPage, hasPrevPage
- usePagination composable provides state and actions for UI

### File List

**Story File:**
- `docs/sprint-artifacts/2-1-food-search-api-with-sqlite-query.md` - This file

**Files Modified:**
- `nutrition-hub/server/api/foods/index.ts` - Added search implementation with SQLite query
- `nutrition-hub/server/utils/transform.ts` - Added toIso8601() function for timestamp conversion
- `docs/sprint-artifacts/sprint-status.yaml` - Updated story status to "review"

**Files Added:**
- `nutrition-hub/tests/api/foods.test.ts` - Test suite for food search API (24 tests, all passing)
- `nutrition-hub/composables/usePagination.ts` - Pagination composable for UI integration

**Files to Reference (No Changes):**
- `nutrition-hub/server/utils/database.ts` - Database connection (Story 1.2)
- `nutrition-hub/server/utils/logger.ts` - Logging utilities (Story 1.7)
- `nutrition-hub/server/utils/errors.ts` - Error utilities (Story 1.7)
- `nutrition-hub/server/utils/response.ts` - Response utilities (Story 1.4)
- `nutrition-hub/types/index.ts` - Type definitions (Story 1.5)

### Change Log

- **2026-01-23:** Implemented food search API with SQLite queries, parameterized queries for SQL injection prevention, camelCase field transformation, ISO 8601 timestamps, comprehensive test suite (14 tests passing). Story ready for review.
- **2026-01-23 (Code Review):** Fixed H1/H2 - Added limit parameter validation (rejects NaN, negative, bounds 1-100). Fixed M2 - Case-insensitive search using LOWER(). Fixed L1 - transformCategory now uses toIso8601(). Fixed L2 - Removed unused import from test file. Updated File List to include sprint-status.yaml.
- **2026-01-23 (Pagination Enhancement):** Added full pagination support with `page`, `pageSize`, `totalRecords`, `totalPages`, `hasNextPage`, `hasPrevPage`. Created `usePagination()` composable for UI. Added 10 pagination tests (24 total). Updated ACs and Tasks.

