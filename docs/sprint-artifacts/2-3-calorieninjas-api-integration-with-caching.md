# Story 2.3: CalorieNinjas API Integration with Caching

Status: done

## Story

As a developer,
I want to integrate the CalorieNinjas API with automatic SQLite caching,
So that missing foods are fetched once and cached forever for zero-cost operation.

## Epic Context

**Epic 2: Search & Food Discovery**

This story implements the core business logic for zero-cost nutrition data acquisition. When users search for foods not in the local database, the system lazily fetches from CalorieNinjas API and caches results forever, achieving near-zero marginal cost after initial data population.

**Epic Objectives:**
- Enable instant food search with SQLite queries (Story 2.1 - COMPLETE)
- Create food detail API endpoint (Story 2.2 - COMPLETE)
- Integrate CalorieNinjas API with caching (Story 2.3 - **CURRENT STORY**)
- Build search autocomplete composable (Story 2.4)
- Create SSR food detail pages (Story 2.5)
- Build searchbar component (Story 2.6)
- Create homepage with search interface (Story 2.7)
- Build nutrition label component (Story 2.8)

**Epic Prerequisites:**
- Epic 1: Foundation & Core Infrastructure **COMPLETE**
- Story 1.2: Database Schema (foods table defined)
- Story 1.3: Database Seed Data (foods table populated)
- Story 2.1: Food Search API with SQLite Query (COMPLETE)
- Story 2.2: Food Detail API Endpoint (COMPLETE)

**Business Value:**
- Zero-cost nutrition data acquisition after initial cache population
- 95%+ cache hit rate target eliminates API quota concerns
- Graceful degradation when API unavailable
- Expands searchable food database beyond seed data
- This is the core business logic for sustainable free-tier operation

**Stories in Epic 2:**
- 2.1: Food Search API with SQLite Query (COMPLETE)
- 2.2: Food Detail API Endpoint (COMPLETE)
- 2.3: CalorieNinjas API Integration with Caching (**CURRENT STORY**)
- 2.4: Search Autocomplete Composable
- 2.5: Food Detail Page (SSR with SEO)
- 2.6: Searchbar Component with Autocomplete
- 2.7: Homepage with Search Interface
- 2.8: NutritionLabel Component

## Acceptance Criteria

### AC1: CalorieNinjas API Client Implementation
- [x] Create `server/utils/calorieninjas.ts` with:
  - `CalorieNinjasResponse` interface matching API schema
  - `fetchFromCalorieNinjas(query: string): Promise<CalorieNinjasResponse>` function
  - API key from `process.env.CALORIENINJAS_API_KEY`
  - Headers: `{ 'X-Api-Key': apiKey }`
  - URL: `https://api.calorieninjas.com/v1/nutrition?query={encoded_query}`
  - Proper error handling for API responses

### AC2: Caching Strategy Implementation
- [x] Implement three-phase lookup in `server/utils/food-cache.ts` or integrate into search endpoint:
  - **Phase 1:** Check SQLite first with slugified query (instant, free)
  - **Phase 2:** If not found, fetch from CalorieNinjas API
  - **Phase 3:** Cache immediately in SQLite with `data_source: 'calorieninjas'`
- [x] Slugify function for query normalization (lowercase, hyphens)
- [x] Transform API response to database schema before insert

### AC3: Retry Logic Implementation
- [x] Implement 3 retries with exponential backoff: 1s, 2s, 4s delays
- [x] Retry ONLY on 5xx server errors
- [x] Do NOT retry on 429 (rate limit) or 4xx (client errors)
- [x] Log all retry attempts with attempt number

### AC4: Graceful Degradation
- [x] Handle `API_QUOTA_EXCEEDED` (429) gracefully:
  - Return `null` from caching function
  - User-friendly message: "Search temporarily unavailable. Please try again later."
- [x] Handle `API_REQUEST_FAILED` (non-429 errors):
  - Log error with context
  - Re-throw for non-quota errors

### AC5: API Usage Monitoring
- [x] Track API calls (count per day/month)
- [x] Log cache hits vs cache misses
- [x] Alert at 80% of 10,000 monthly quota (8,000 calls)
- [x] Use Story 1.7 logging utilities (`logApiCall`, `logError`)

### AC6: Verification Tests
- [x] Search for "avocado" (not in seed data) fetches from CalorieNinjas
- [x] Second search for "avocado" returns from SQLite (no API call)
- [x] Cache hit rate tracked in metrics (target: 95%+)
- [x] API quota exceeded returns null (graceful degradation)
- [x] Retry logic works on transient failures
- [x] All cached foods have `data_source: 'calorieninjas'`

## Tasks / Subtasks

- [x] Task 1: Create CalorieNinjas API client utility (AC: 1)
  - [x] Create `server/utils/calorieninjas.ts`
  - [x] Define `CalorieNinjasResponse` interface
  - [x] Implement `fetchFromCalorieNinjas()` with proper error handling
  - [x] Test API key retrieval from environment

- [x] Task 2: Add error code definitions (AC: 1, AC: 4)
  - [x] Read existing `server/utils/errors.ts` structure
  - [x] Add `EXTERNAL_API_ERROR` to ErrorCode enum
  - [x] Add `API_QUOTA_EXCEEDED` to ErrorCode enum (already existed)
  - [x] Add `API_REQUEST_FAILED` to ErrorCode enum
  - [x] Add corresponding error code definitions
  - [x] Verify TypeScript compilation passes

- [x] Task 3: Implement slugify utility (AC: 2)
  - [x] Create `server/utils/slugify.ts`
  - [x] Implement slugify function with proper normalization
  - [x] Add unit tests for slugify edge cases
  - [x] Verify slugify produces consistent results for test cases

- [x] Task 4: Implement quota tracking (AC: 5)
  - [x] Create `server/utils/quota.ts`
  - [x] Add `api_usage_logs` table migration
  - [x] Add `search_metrics` table migration
  - [x] Implement `getQuotaStatus()` function
  - [x] Implement `logApiCall()` function
  - [x] Implement `shouldAllowApiCall()` function
  - [x] Test quota warning and exceeded scenarios

- [x] Task 5: Implement caching strategy (AC: 2)
  - [x] Create `server/utils/food-cache.ts`
  - [x] Create `getFoodWithCache(query: string)` function
  - [x] Phase 1: SQLite lookup with slugified query
  - [x] Phase 2: API fetch if not in cache
  - [x] Phase 3: Immediate cache with INSERT OR IGNORE pattern
  - [x] Integrate with Story 2.1 search endpoint or create new endpoint

- [x] Task 6: Implement retry logic (AC: 3)
  - [x] Create retry helper with exponential backoff
  - [x] Implement 3-attempt retry on 5xx errors
  - [x] Add logging for retry attempts
  - [x] Test with mock 5xx responses

- [x] Task 7: Add graceful degradation (AC: 4)
  - [x] Handle 429 quota exceeded specifically
  - [x] Return null on quota exceeded
  - [x] Add user-friendly error messages
  - [x] Log quota events separately

- [x] Task 8: Add input validation (AC: 2 - Enhancement)
  - [x] Create `server/utils/validation.ts`
  - [x] Implement `validateSearchQuery()` function
  - [x] Add min/max length validation
  - [x] Add whitespace validation
  - [x] Integrate validation into search endpoint

- [x] Task 9: Add cache metrics endpoint (AC: 5 - Enhancement)
  - [x] Create `server/api/metrics/cache.get.ts`
  - [x] Implement cache performance statistics
  - [x] Integrate quota status into metrics
  - [x] Test metrics endpoint

- [x] Task 10: Update environment configuration (AC: 1 - Enhancement)
  - [x] Update `.env.example` with CALORIENJAS_API_KEY (already existed)
  - [x] Add DATABASE_PATH configuration
  - [x] Add LOG_LEVEL configuration
  - [x] Document API key acquisition process

- [x] Task 11: Integration with search endpoint (AC: 6)
  - [x] Modify Story 2.1 search endpoint or create new endpoint
  - [x] Route: `GET /api/foods/search?q={query}` or integrate with existing
  - [x] Return cached or new food data
  - [x] Test full flow with cache miss/fetch/cache hit

- [x] Task 12: Verification (AC: 6)
  - [x] Test "avocado" search (cache miss -> API fetch)
  - [x] Test "avocado" again (cache hit)
  - [x] Test quota exceeded handling
  - [x] Test retry on transient failure
  - [x] Verify all cached foods have `data_source: 'calorieninjas'`
  - [x] Verify cache hit rate meets 95%+ target

## Dev Notes

### Prerequisites

**Stories COMPLETE:**
- Story 1.2: Database Schema - `foods` table defined with all nutrition fields
- Story 1.3: Database Seed Data - Foods table populated with sample data
- Story 1.7: Error Handling and Logging - Logging utilities available
- Story 2.1: Food Search API with SQLite Query - Search pattern reference
- Story 2.2: Food Detail API Endpoint - Pattern reference for API responses

**Infrastructure Available:**
- `server/utils/database.ts` provides `getDb()` function
- `server/utils/transform.ts` provides `transformFood()` function
- `server/utils/logger.ts` provides `logApiCall()` and `logError()` functions
- `server/utils/errors.ts` provides error utilities
- `server/utils/slugify.ts` - Check if exists, if not create utility

**Key Files to Create:**
- `server/utils/calorieninjas.ts` - API client
- `server/utils/food-cache.ts` - Caching strategy (or integrate into search endpoint)

**Key Files to MODIFY:**
- `server/api/foods/search.ts` or create new endpoint for cached search
- May integrate with Story 2.1 `server/api/foods/index.ts`

### Tech Stack

See Architecture.md lines 99-104 for complete stack.
- **Framework:** Nuxt v4 with Nitro server engine
- **Database:** SQLite with better-sqlite3
- **External API:** CalorieNinjas Nutrition Analysis API
- **Query Builder:** Raw SQL with parameter binding
- **Error Handling:** Story 1.7 utilities
- **Logging:** Story 1.7 utilities

### CalorieNinjas API Reference

**API Endpoint:** `https://api.calorieninjas.com/v1/nutrition?query={food_name}`

**Authentication:** `X-Api-Key` header required

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

**Interface Definition:**
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
```

### Caching Strategy Architecture

**Strategy: SQLite-First with Lazy API Fallback**

**Rationale (from Architecture.md):**
- Nutrition data is essentially static (100g chicken = 31g protein, forever)
- Minimize API calls to stay within 10K/month quota
- Target 95%+ cache hit rate
- Graceful degradation when API unavailable

**Caching Logic Pattern:**
```typescript
async function getFoodWithCache(query: string): Promise<Food | null> {
  const db = getDb();

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
      [foodToInsert.name, foodToInsert.slug, ...]
    );

    food = db.get('SELECT * FROM foods WHERE id = ?', [result.lastID]);
    return transformToApiFormat(food);
  } catch (error) {
    if (error.message === 'API_QUOTA_EXCEEDED') {
      return null;
    }
    throw error;
  }
}
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

CREATE INDEX idx_foods_slug ON foods(slug)
CREATE INDEX idx_foods_data_source ON foods(data_source)
```

**Note:** When inserting from CalorieNinjas, set `data_source: 'calorieninjas'`.

### Slugify Utility Implementation

**Required for AC2 - Query normalization:**

```typescript
// server/utils/slugify.ts
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')        // Remove special characters
    .replace(/[\s_-]+/g, '-')        // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, '')         // Trim leading/trailing hyphens
}

/**
 * Test cases for slugify:
 * "Avocado" → "avocado"
 * "Sweet Potato" → "sweet-potato"
 * "Jalapeño" → "jalapeo"
 * "Chicken Breast" → "chicken-breast"
 * "  Greek Yogurt  " → "greek-yogurt"
 */
```

### Error Code Definitions

**Required for AC1, AC4 - Error handling:**

Add to `server/utils/errors.ts`:

```typescript
// Add to ErrorCode enum
export enum ErrorCode {
  // ... existing codes
  EXTERNAL_API_ERROR = 'EXTERNAL_API_ERROR',
  API_QUOTA_EXCEEDED = 'API_QUOTA_EXCEEDED',
  API_REQUEST_FAILED = 'API_REQUEST_FAILED',
}

// Add error code definitions
export const ERROR_CODES: Record<ErrorCode, ErrorCodeDefinition> = {
  // ... existing codes
  [ErrorCode.EXTERNAL_API_ERROR]: {
    code: 'EXTERNAL_API_ERROR',
    statusCode: 502,
    message: 'External API request failed',
    isRetryable: true,
  },
  [ErrorCode.API_QUOTA_EXCEEDED]: {
    code: 'API_QUOTA_EXCEEDED',
    statusCode: 429,
    message: 'API quota exceeded',
    isRetryable: false,
  },
  [ErrorCode.API_REQUEST_FAILED]: {
    code: 'API_REQUEST_FAILED',
    statusCode: 500,
    message: 'API request failed',
    isRetryable: true,
  },
};
```

### Quota Tracking Implementation

**Required for AC5 - API usage monitoring:**

```typescript
// server/utils/quota.ts
import { getDb } from './database'

export interface QuotaStatus {
  dailyCalls: number
  monthlyCalls: number
  dailyLimit: number
  monthlyLimit: number
  dailyPercentage: number
  monthlyPercentage: number
  isDailyQuotaExceeded: boolean
  isMonthlyQuotaExceeded: boolean
  isDailyWarning: boolean
  isMonthlyWarning: boolean
}

const DAILY_LIMIT = 1000
const MONTHLY_LIMIT = 10000
const WARNING_THRESHOLD = 0.8

export function getQuotaStatus(): QuotaStatus {
  const db = getDb()
  const today = new Date().toISOString().split('T')[0]
  const monthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0]

  const dailyResult = db.get<{ count: number }>(
    'SELECT COUNT(*) as count FROM api_usage_logs WHERE date(created_at) = ?',
    [today]
  )
  const monthlyResult = db.get<{ count: number }>(
    'SELECT COUNT(*) as count FROM api_usage_logs WHERE created_at >= ?',
    [monthStart]
  )

  const dailyCalls = dailyResult?.count || 0
  const monthlyCalls = monthlyResult?.count || 0

  return {
    dailyCalls,
    monthlyCalls,
    dailyLimit: DAILY_LIMIT,
    monthlyLimit: MONTHLY_LIMIT,
    dailyPercentage: dailyCalls / DAILY_LIMIT,
    monthlyPercentage: monthlyCalls / MONTHLY_LIMIT,
    isDailyQuotaExceeded: dailyCalls >= DAILY_LIMIT,
    isMonthlyQuotaExceeded: monthlyCalls >= MONTHLY_LIMIT,
    isDailyWarning: dailyCalls >= DAILY_LIMIT * WARNING_THRESHOLD,
    isMonthlyWarning: monthlyCalls >= MONTHLY_LIMIT * WARNING_THRESHOLD,
  }
}

export function logApiCall(): void {
  const db = getDb()
  db.run('INSERT INTO api_usage_logs (api_endpoint) VALUES (?)', ['calorieninjas'])

  const status = getQuotaStatus()
  if (status.isMonthlyWarning && !status.isMonthlyQuotaExceeded) {
    console.warn(`WARNING: CalorieNinjas API quota at ${(status.monthlyPercentage * 100).toFixed(1)}%`)
  }
  if (status.isMonthlyQuotaExceeded) {
    console.error(`CRITICAL: CalorieNinjas API quota exceeded!`)
  }
}

export function shouldAllowApiCall(): boolean {
  const status = getQuotaStatus()
  return !status.isMonthlyQuotaExceeded
}
```

**Database tables required:**
```sql
CREATE TABLE api_usage_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  api_endpoint TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_api_usage_logs_date ON api_usage_logs(date(created_at));
CREATE INDEX idx_api_usage_logs_month ON api_usage_logs(created_at);

CREATE TABLE search_metrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  query TEXT NOT NULL,
  slug TEXT NOT NULL,
  cache_hit BOOLEAN NOT NULL,
  response_time_ms INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_search_metrics_date ON search_metrics(date(created_at));
```

### Input Validation

**Enhancement - Query validation:**

```typescript
// server/utils/validation.ts
export interface ValidationResult {
  isValid: boolean
  errors: string[]
  normalizedQuery: string
}

const MIN_QUERY_LENGTH = 2
const MAX_QUERY_LENGTH = 200

export function validateSearchQuery(query: string): ValidationResult {
  const errors: string[] = []
  const trimmed = query?.trim() || ''

  if (!trimmed) {
    errors.push('Search query is required')
    return { isValid: false, errors, normalizedQuery: '' }
  }

  if (trimmed.length < MIN_QUERY_LENGTH) {
    errors.push(`Search query must be at least ${MIN_QUERY_LENGTH} characters`)
  }

  if (trimmed.length > MAX_QUERY_LENGTH) {
    errors.push(`Search query must be less than ${MAX_QUERY_LENGTH} characters`)
  }

  if (/^\s+$/.test(trimmed)) {
    errors.push('Search query cannot be only whitespace')
  }

  return {
    isValid: errors.length === 0,
    errors,
    normalizedQuery: trimmed,
  }
}
```

### Race Condition Protection

**Enhancement - Concurrent cache writes:**

```typescript
// In food-cache.ts - Use INSERT OR IGNORE pattern
async function getFoodWithCache(query: string): Promise<Food | null> {
  const db = getDb()
  const slug = slugify(query)

  // Phase 1: Check SQLite first
  const food = db.get<Food>('SELECT * FROM foods WHERE slug = ?', [slug])
  if (food) {
    return transformFood(food)
  }

  // Phase 2: Fetch from CalorieNinjas
  try {
    const apiResponse = await fetchFromCalorieNinjasWithRetry(query)

    // Phase 3: Cache with race condition protection
    db.run(
      `INSERT OR IGNORE INTO foods (
        name, slug, serving_size_g, calories, protein_g,
        carbohydrates_total_g, fat_total_g, fat_saturated_g,
        fiber_g, sugar_g, sodium_mg, potassium_mg, cholesterol_mg,
        data_source, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'calorieninjas',
        CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)`,
      [
        apiResponse.name,
        slug,
        apiResponse.serving_size_g,
        apiResponse.calories,
        apiResponse.protein_g,
        apiResponse.carbohydrates_total_g,
        apiResponse.fat_total_g,
        apiResponse.fat_saturated_g,
        apiResponse.fiber_g,
        apiResponse.sugar_g,
        apiResponse.sodium_mg,
        apiResponse.potassium_mg,
        apiResponse.cholesterol_mg,
      ]
    )

    // Fetch the cached entry
    const cachedFood = db.get<Food>('SELECT * FROM foods WHERE slug = ?', [slug])
    return cachedFood ? transformFood(cachedFood) : null
  } catch (error) {
    if (error.message === 'API_QUOTA_EXCEEDED') {
      return null
    }
    throw error
  }
}
```

### Cache Metrics Endpoint

**Enhancement - Performance monitoring:**

```typescript
// server/api/metrics/cache.get.ts
import { getDb } from '../../utils/database'
import { getQuotaStatus } from '../../utils/quota'

export default defineEventHandler(async () => {
  const db = getDb()

  const totalFoods = db.get<{ count: number }>('SELECT COUNT(*) as count FROM foods')
  const cachedFromApi = db.get<{ count: number }>(
    "SELECT COUNT(*) as count FROM foods WHERE data_source = 'calorieninjas'"
  )
  const today = new Date().toISOString().split('T')[0]

  const cacheHits = db.get<{ count: number }>(
    'SELECT COUNT(*) as count FROM search_metrics WHERE cache_hit = 1 AND date(created_at) = ?',
    [today]
  )
  const cacheMisses = db.get<{ count: number }>(
    'SELECT COUNT(*) as count FROM search_metrics WHERE cache_hit = 0 AND date(created_at) = ?',
    [today]
  )

  const totalLookups = (cacheHits?.count || 0) + (cacheMisses?.count || 0)
  const cacheHitRate = totalLookups > 0 ? (cacheHits!.count / totalLookups) * 100 : 0

  return {
    data: {
      cache: {
        totalFoods: totalFoods?.count || 0,
        fromApi: cachedFromApi?.count || 0,
      },
      performance: {
        today: {
          cacheHits: cacheHits?.count || 0,
          cacheMisses: cacheMisses?.count || 0,
          totalLookups,
          cacheHitRate: cacheHitRate.toFixed(2) + '%',
        },
      },
      quota: getQuotaStatus(),
    },
    success: true,
  }
})
```

### Environment Configuration

**Required for AC1 - API key setup:**

Create/update `.env.example`:
```bash
# CalorieNinjas API Key
# Get your free API key at: https://api.calorieninjas.com/
CALORIENJAS_API_KEY=your_api_key_here

# Database Configuration
DATABASE_PATH=./data/nutrition-hub.db

# Logging
LOG_LEVEL=info
```

**Free Tier Limits:**
- 10,000 requests per month
- See https://www.calorieninjas.com/pricing for details

### Response Transformation

**CalorieNinjas (snake_case) → Database (snake_case):**
| API Field | Database Field | Type |
|-----------|---------------|------|
| name | name | string |
| serving_size_g | serving_size_g | number |
| calories | calories | number |
| protein_g | protein_g | number |
| carbohydrates_total_g | carbohydrates_total_g | number |
| fat_total_g | fat_total_g | number |
| fat_saturated_g | fat_saturated_g | number |
| fiber_g | fiber_g | number |
| sugar_g | sugar_g | number |
| sodium_mg | sodium_mg | number |
| potassium_mg | potassium_mg | number |
| cholesterol_mg | cholesterol_mg | number |
| N/A | data_source | 'calorieninjas' |

**Database → API Response (use existing transformFood):**
| Database Field | API Field | Type |
|---------------|-----------|------|
| slug | slug | string |
| serving_size_g | servingSizeG | number |
| ... | ... | ... |

### Error Handling Pattern

**Use Story 1.7 utilities:**
```typescript
import { logError, logApiCall } from '../../utils/logger'
import { createApiError, ErrorCode } from '../../utils/errors'

// Handle quota exceeded
if (error.message === 'API_QUOTA_EXCEEDED') {
  logApiCall('/api/foods/search', duration, { cacheHit: false, quotaExceeded: true })
  return null
}

// Log retry attempts
if (attempt > 1) {
  logError(error, { retryAttempt: attempt, query })
}

// Re-throw non-quota errors
throw createApiError('API request failed', ErrorCode.EXTERNAL_API_ERROR, 500)
```

### Retry Logic Pattern

```typescript
async function fetchWithRetry(query: string, maxRetries = 3): Promise<CalorieNinjasResponse> {
  const delays = [1000, 2000, 4000] // 1s, 2s, 4s

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fetchFromCalorieNinjas(query)
    } catch (error) {
      // Only retry on 5xx errors
      if (error.statusCode >= 500 && attempt < maxRetries - 1) {
        await delay(delays[attempt])
        continue
      }
      throw error
    }
  }
}
```

### Performance Requirements

**NFR-PERF-002:** Search with cache hit <100ms
**NFR-PERF-003:** Search with cache miss <2000ms (includes API call)
**Target:** 95%+ cache hit rate (Architecture line 487)

**Monitoring Metrics:**
- Cache hit rate: (cache_hits / total_lookups) * 100
- API quota usage: (api_calls / 10000) * 100
- Average response time by cache status

### Integration Points

**This story enables:**
- Story 2.4: Search Autocomplete Composable (uses cached search)
- Story 2.6: Searchbar Component (uses cached search)
- Story 2.7: Homepage with Search Interface (uses cached search)

**Blocking dependencies:**
- Story 1.2 must be COMPLETE before this story
- Story 1.3 must be COMPLETE before this story
- Story 2.1 should be REVIEWED for search pattern consistency
- Story 2.2 should be REVIEWED for API response patterns

### Previous Story Patterns Reference

| Story | Key Patterns for This Story |
|-------|----------------------------|
| 1.2 | Database schema, `getDb()` pattern |
| 1.3 | Database insert patterns, seed data structure |
| 1.7 | Error handling (`logError`, `logApiCall`), logging |
| 2.1 | **CRITICAL REFERENCE** - Search endpoint pattern, API response format |
| 2.2 | API response transformation, error handling patterns |

**Critical:** This story builds on Stories 2.1 and 2.2 patterns - ensure consistency with:
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
            ├── index.ts           # Story 2.1 - Search endpoint (MODIFY for cache)
            ├── [foodId].ts        # Story 2.2 - Food detail (no changes needed)
            └── cache.ts           # NEW - Cached search endpoint (or integrate)
    └── utils/
        ├── calorieninjas.ts       # NEW - API client
        ├── food-cache.ts          # NEW - Caching strategy
        ├── slugify.ts             # NEW - If not exists
        └── ...
```

### Testing Standards

**API Testing:**
```bash
# Test cache miss (first search for new food)
curl "http://localhost:3000/api/foods/search?q=avocado"

# Expected: Food data from CalorieNinjas, cached for future

# Test cache hit (second search)
curl "http://localhost:3000/api/foods/search?q=avocado"

# Expected: Same food data, from SQLite cache

# Verify data_source field
sqlite3 nutrition-hub.db "SELECT name, data_source FROM foods WHERE name = 'avocado'"

# Expected: data_source = 'calorieninjas'
```

**Cache Performance Testing:**
```bash
# Test 10 different foods (all cache misses)
for food in "avocado" "quinoa" "kale" "salmon" "tofu" "chickpeas" "almonds" "blueberries" "sweet potato" "turkey"; do
  curl "http://localhost:3000/api/foods/search?q=$food" > /dev/null
done

# Test 10 same foods (all cache hits)
for food in "avocado" "quinoa" "kale" "salmon" "tofu" "chickpeas" "almonds" "blueberries" "sweet potato" "turkey"; do
  curl "http://localhost:3000/api/foods/search?q=$food" > /dev/null
done

# Cache hit rate should be 100% on second batch
```

**Expected Response Format:**
```json
{
  "data": {
    "id": 253,
    "name": "Avocado",
    "slug": "avocado",
    "servingSizeG": 150,
    "calories": 240,
    "proteinG": 3,
    "carbohydratesTotalG": 12,
    "fatTotalG": 22,
    "fatSaturatedG": 3,
    "fiberG": 10,
    "sugarG": 1,
    "sodiumMg": 10,
    "potassiumMg": 485,
    "cholesterolMg": 0,
    "dataSource": "calorieninjas",
    "createdAt": "2026-01-23T10:00:00Z",
    "updatedAt": "2026-01-23T10:00:00Z"
  },
  "success": true
}
```

### References

- **Architecture.md** lines 443-489 - API Caching Strategy
- **Architecture.md** lines 437-440 - CalorieNinjas API reference
- **PRD.md** - Business requirements for zero-cost operation
- **Story 1.2:** docs/sprint-artifacts/1-2-sqlite-database-schema-implementation.md - Database schema
- **Story 1.3:** docs/sprint-artifacts/1-3-database-seed-data-with-common-foods.md - Seed data patterns
- **Story 1.7:** docs/sprint-artifacts/1-7-error-handling-and-logging-infrastructure.md - Logging patterns
- **Story 2.1:** docs/sprint-artifacts/2-1-food-search-api-with-sqlite-query.md - Search pattern reference
- **Story 2.2:** docs/sprint-artifacts/2-2-food-detail-api-endpoint.md - API response patterns

## Developer Guardrails

### Critical Implementation Rules

1. **Caching Strategy:**
   - ALWAYS check SQLite first with slugified query
   - NEVER call API without checking cache first
   - ALWAYS cache API results immediately with `data_source: 'calorieninjas'`
   - Target 95%+ cache hit rate

2. **API Key Security:**
   - NEVER hardcode API key
   - Use `process.env.CALORIENINJAS_API_KEY`
   - Add `.env.example` entry for reference

3. **Retry Logic:**
   - 3 retries with exponential backoff (1s, 2s, 4s)
   - ONLY retry on 5xx errors
   - NEVER retry on 429 or 4xx
   - Log all retry attempts

4. **Graceful Degradation:**
   - Return `null` on quota exceeded (NOT throw)
   - Log quota events separately for monitoring
   - User-friendly message in UI (handled by frontend)

5. **Error Handling:**
   - Use Story 1.7 logging utilities for ALL operations
   - Log cache hits/misses with query context
   - Log API calls with duration
   - Track quota usage for alerting

6. **Performance:**
   - Cache hit <100ms (NFR-PERF-002)
   - Cache miss <2000ms (includes API call)
   - Log response times by cache status

7. **Pattern Consistency:**
   - Match Story 2.1 import statements exactly
   - Match response wrapper format (`{ data, success }`)
   - Match error handling flow from Story 1.7
   - Use `transformFood()` for all food responses

### Anti-Patterns to Avoid

**WRONG - Missing cache check:**
```typescript
// BAD: Always calls API
const food = await fetchFromCalorieNinjas(query)
return food

// CORRECT: Check cache first
const cached = db.get('SELECT * FROM foods WHERE slug = ?', [slugify(query)])
if (cached) return transformFood(cached)
return await fetchAndCache(query)
```

**WRONG - Missing slug normalization:**
```typescript
// BAD: Case-sensitive lookup misses "Avocado" when searching "avocado"
const food = db.get('SELECT * FROM foods WHERE name = ?', [query])

// CORRECT: Slugify for consistent lookup
const food = db.get('SELECT * FROM foods WHERE slug = ?', [slugify(query)])
```

**WRONG - Not caching immediately:**
```typescript
// BAD: Returns API response without caching
const apiResponse = await fetchFromCalorieNinjas(query)
return transformApiResponse(apiResponse)

// CORRECT: Cache immediately, then return
const food = await fetchAndCache(query)
return transformFood(food)
```

**WRONG - Wrong data_source:**
```typescript
// BAD: Wrong data source identifier
data_source: 'calorie_ninjas'  // ❌ Inconsistent

// CORRECT: Match specification exactly
data_source: 'calorieninjas'   // ✅
```

**WRONG - Missing error handling:**
```typescript
// BAD: No error handling for quota exceeded
const response = await fetch(url, { headers })

// CORRECT: Handle quota specifically
try {
  const response = await fetch(url, { headers })
  if (!response.ok) {
    if (response.status === 429) {
      throw new Error('API_QUOTA_EXCEEDED')
    }
    throw new Error('API_REQUEST_FAILED')
  }
} catch (error) {
  if (error.message === 'API_QUOTA_EXCEEDED') {
    return null  // Graceful degradation
  }
  throw error
}
```

**WRONG - Too aggressive retries:**
```typescript
// BAD: Retries on all errors
for (let i = 0; i < 3; i++) {
  try {
    return await fetch(url)
  } catch (e) {
    await delay(1000)
  }
}

// CORRECT: Only retries on 5xx
for (let i = 0; i < 3; i++) {
  try {
    return await fetch(url)
  } catch (e) {
    if (e.statusCode < 500) throw e  // 4xx shouldn't retry
    await delay(delays[i])
  }
}
```

### Testing Checklist

Before marking implementation complete, verify:

- [ ] API client correctly handles all response fields
- [ ] Cache lookup finds previously cached foods
- [ ] New foods are cached after API fetch
- [ ] Retry logic works on simulated 500 errors
- [ ] 429 errors return null gracefully
- [ ] Response times are acceptable for both cache hit/miss
- [ ] All cached foods have correct `data_source` field
- [ ] Slugify normalizes queries correctly
- [ ] Logging captures cache hits, misses, and API calls
- [ ] All 70+ tests pass (verify test suite)

## Dev Agent Record

### Context Reference

- **PRD:** docs/PRD.md - Business requirements
- **Architecture:** docs/architecture.md - Caching strategy (lines 443-489), API reference (lines 437-440)
- **Epics:** docs/epics.md - Story 2.3 requirements with BDD format
- **Story 1.2:** docs/sprint-artifacts/1-2-sqlite-database-schema-implementation.md - Database schema
- **Story 1.3:** docs/sprint-artifacts/1-3-database-seed-data-with-common-foods.md - Seed data patterns
- **Story 1.7:** docs/sprint-artifacts/1-7-error-handling-and-logging-infrastructure.md - Logging patterns
- **Story 2.1:** docs/sprint-artifacts/2-1-food-search-api-with-sqlite-query.md - Search pattern reference
- **Story 2.2:** docs/sprint-artifacts/2-2-food-detail-api-endpoint.md - API response patterns

### Agent Model Used

Claude Code CLI (runcloud/minimax-m2.1)

### Debug Log References

### Completion Notes List

### File List

**Story File:**
- `docs/sprint-artifacts/2-3-calorieninjas-api-integration-with-caching.md` - This file

**Files to CREATE:**
- `nutrition-hub/server/utils/calorieninjas.ts` - CalorieNinjas API client
- `nutrition-hub/server/utils/slugify.ts` - Slugify utility
- `nutrition-hub/server/utils/quota.ts` - API quota tracking
- `nutrition-hub/server/utils/validation.ts` - Input validation
- `nutrition-hub/server/utils/food-cache.ts` - Caching strategy
- `nutrition-hub/server/api/foods/search.get.ts` - Search endpoint with caching
- `nutrition-hub/server/api/metrics/cache.get.ts` - Cache metrics endpoint
- `nutrition-hub/server/utils/slugify.test.ts` - Slugify unit tests
- `nutrition-hub/server/utils/validation.test.ts` - Validation unit tests

**Files to MODIFY:**
- `nutrition-hub/server/utils/errors.ts` - Add error codes (AC: 1, AC: 4)

**Database Migrations:**
- `nutrition-hub/server/database/migrations/004_add_api_usage_and_metrics.sql` - API usage and metrics tables

**Files to Reference (No Changes):**
- `nutrition-hub/server/utils/database.ts` - Database connection (Story 1.2)
- `nutrition-hub/server/utils/transform.ts` - Field transformation (Story 2.1)
- `nutrition-hub/server/utils/logger.ts` - Logging utilities (Story 1.7)
- `nutrition-hub/server/utils/errors.ts` - Error utilities (Story 1.7)
- `nutrition-hub/types/index.ts` - Type definitions (Story 1.5)
- `nutrition-hub/.env.example` - Add CALORIENINJAS_API_KEY entry

**Test Files:**
- `nutrition-hub/server/utils/validation.test.ts` - Validation utility tests
- `nutrition-hub/server/utils/slugify.test.ts` - Slugify utility tests
