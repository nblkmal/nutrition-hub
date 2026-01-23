# Code Review Report - Story 2.3

**Story:** CalorieNinjas API Integration with Caching
**Status:** ready-for-dev
**Review Date:** 2026-01-23
**Reviewer:** Claude Code (jebat:report-code-review)

---

## Summary

Story 2.3 provides comprehensive documentation for integrating the CalorieNinjas API with SQLite caching. The story is well-structured with clear acceptance criteria, detailed dev notes, and implementation patterns. However, several critical issues, enhancements, and nice-to-have improvements have been identified to ensure successful implementation.

**Overall Assessment:** The story is mostly ready for development but requires addressing the critical issues before implementation begins.

---

## CRITICAL ISSUES

### Issue CRI-0001: Missing Slugify Implementation Details

**Issue Description**

The story references a `slugify` utility function but does not provide the implementation details. The slugify function is critical for consistent cache lookups as it normalizes food names (e.g., "Avocado" and "avocado" should match the same slug). Without a clear specification, developers may implement inconsistent slugification logic leading to cache misses.

**Evidence**

- Story mentions `server/utils/slugify.ts` in File Structure (line 437)
- Story references slugify in Caching Logic Pattern (line 238) but does not define the function
- Story states "Slugify function for query normalization (lowercase, hyphens)" (AC2, line 67) but no implementation details provided
- Dev Notes mention "server/utils/slugify.ts - Check if exists, if not create utility" (line 159)

**Fix**

Create a slugify utility with the following specification:

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
```

**Expected Outcome**

All food searches use consistent slug normalization, ensuring cache hits for case-insensitive and special character variations.

**Tasks / Subtasks**

- [ ] Task 1 (AC: 2)
  - [ ] Define slugify interface and implementation in `server/utils/slugify.ts`
  - [ ] Add unit tests for slugify covering edge cases (spaces, special characters, mixed case)
  - [ ] Verify slugify produces consistent results for test cases: "Avocado" → "avocado", "Sweet Potato" → "sweet-potato", "Jalapeño" → "jalapeo"
  - [ ] Update story to include slugify implementation details

---

### Issue CRI-0002: Incomplete Error Code Definitions

**Issue Description**

The story references error codes like `API_QUOTA_EXCEEDED` and `API_REQUEST_FAILED` in error handling patterns, but these error codes are not defined in the error utilities. This will cause TypeScript errors and runtime failures during implementation.

**Evidence**

- Story references `ErrorCode.EXTERNAL_API_ERROR` in Error Handling Pattern (line 360)
- Story references `API_QUOTA_EXCEEDED` error message in multiple places (lines 77, 277, 349, 605, 614)
- Story references `API_REQUEST_FAILED` error message (lines 80, 611)
- Story 1.7 (docs/sprint-artifacts/1-7-error-handling-and-logging-infrastructure.md) defines error utilities but may not include these specific error codes

**Fix**

Add the missing error codes to `server/utils/errors.ts`:

```typescript
// server/utils/errors.ts

// Add to ErrorCode enum
export enum ErrorCode {
  // ... existing codes
  EXTERNAL_API_ERROR = 'EXTERNAL_API_ERROR',
  API_QUOTA_EXCEEDED = 'API_QUOTA_EXCEEDED',
  API_REQUEST_FAILED = 'API_REQUEST_FAILED',
}

// Add error code definitions to the error codes object
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

**Expected Outcome**

All error codes referenced in the story are properly defined and type-safe, preventing TypeScript compilation errors and ensuring consistent error handling.

**Tasks / Subtasks**

- [ ] Task 1 (AC: 1)
  - [ ] Read existing `server/utils/errors.ts` to understand current structure
  - [ ] Add `API_QUOTA_EXCEEDED` and `API_REQUEST_FAILED` to ErrorCode enum
  - [ ] Add corresponding error code definitions
  - [ ] Verify TypeScript compilation passes

---

### Issue CRI-0003: Missing Quota Tracking Implementation Details

**Issue Description**

The story requires tracking API calls per day/month and alerting at 80% of 10,000 monthly quota, but does not specify how quota tracking should be implemented. This includes storage mechanism, date handling, and alert triggering logic.

**Evidence**

- AC5 states: "Track API calls (count per day/month)" (line 85)
- AC5 states: "Alert at 80% of 10,000 monthly quota (8,000 calls)" (line 87)
- Story references Story 1.7 logging utilities but quota tracking is separate from logging
- No implementation pattern or storage mechanism specified for quota counters

**Fix**

Create a quota tracking utility:

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

const DAILY_LIMIT = 1000  // Example daily limit (adjust based on API)
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

Also create the tracking table:

```sql
CREATE TABLE api_usage_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  api_endpoint TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_api_usage_logs_date ON api_usage_logs(date(created_at));
CREATE INDEX idx_api_usage_logs_month ON api_usage_logs(created_at);
```

**Expected Outcome**

Accurate tracking of API usage with proper warnings and alerts when approaching quota limits.

**Tasks / Subtasks**

- [ ] Task 1 (AC: 5)
  - [ ] Create `server/utils/quota.ts` with quota tracking functions
  - [ ] Add `api_usage_logs` table migration to database setup
  - [ ] Integrate quota tracking into CalorieNinjas API client
  - [ ] Test quota warning and exceeded scenarios
  - [ ] Add monitoring dashboard endpoint (optional, for visibility)

---

## ENHANCEMENTS

### Issue EHN-0001: Add Race Condition Protection for Concurrent Cache Writes

**Issue Description**

When multiple users search for the same food simultaneously (cache miss scenario), the current implementation may result in duplicate API calls before the first response is cached. This wastes API quota and may cause database constraint violations if both responses attempt to insert simultaneously.

**Evidence**

- Caching Logic Pattern (lines 232-283) shows sequential flow without synchronization
- No mention of locking mechanisms or upsert patterns
- Database schema has UNIQUE constraint on `name` and `slug` fields (line 291)

**Enhancement**

Implement concurrent request handling using database upsert pattern:

```typescript
// In food-cache.ts
async function getFoodWithCache(query: string): Promise<Food | null> {
  const db = getDb()
  const slug = slugify(query)

  // Phase 1: Check SQLite first (with shared lock)
  const food = db.get<Food>('SELECT * FROM foods WHERE slug = ?', [slug])
  if (food) {
    logCacheHit(query)
    return transformFood(food)
  }

  // Phase 2: Try upsert (race condition protection)
  try {
    const apiResponse = await fetchFromCalorieNinjasWithRetry(query)

    // Use INSERT OR IGNORE to prevent duplicate key errors
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

    // Fetch the cached entry (either newly inserted or existing)
    const cachedFood = db.get<Food>('SELECT * FROM foods WHERE slug = ?', [slug])
    return cachedFood ? transformFood(cachedFood) : null
  } catch (error) {
    logCacheMissError(query, error)
    throw error
  }
}
```

**Enhancement Expected Outcome**

Concurrent searches for the same food result in only one API call, preventing quota waste and database errors.

**Enhancement Tasks / Subtasks**

- [ ] Task 1 (AC: 2)
  - [ ] Modify cache insertion to use INSERT OR IGNORE pattern
  - [ ] Add logging for duplicate prevention events
  - [ ] Test concurrent request handling with load testing
  - [ ] Document race condition handling in dev notes

---

### Issue EHN-0002: Add Input Validation for Search Query

**Issue Description**

The story does not specify input validation for the search query parameter. Without validation, users could pass empty strings, excessively long queries, or malicious input that could cause unexpected behavior.

**Evidence**

- AC2 mentions "slugified query" but doesn't specify validation before slugification
- No minimum/maximum length constraints mentioned
- No sanitization for special characters or SQL injection prevention beyond parameterization

**Enhancement**

Add input validation layer:

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

  // Check for empty or null query
  if (!trimmed) {
    errors.push('Search query is required')
    return { isValid: false, errors, normalizedQuery: '' }
  }

  // Check minimum length
  if (trimmed.length < MIN_QUERY_LENGTH) {
    errors.push(`Search query must be at least ${MIN_QUERY_LENGTH} characters`)
  }

  // Check maximum length
  if (trimmed.length > MAX_QUERY_LENGTH) {
    errors.push(`Search query must be less than ${MAX_QUERY_LENGTH} characters`)
  }

  // Check for only whitespace
  if (/^\s+$/.test(trimmed)) {
    errors.push('Search query cannot be only whitespace')
  }

  // Normalize query (keep original for API, use slugified for cache)
  const normalizedQuery = trimmed

  return {
    isValid: errors.length === 0,
    errors,
    normalizedQuery,
  }
}

// Usage in search endpoint
import { validateSearchQuery, createApiError, ErrorCode } from '../../utils'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const searchQuery = query.q as string

  const validation = validateSearchQuery(searchQuery)
  if (!validation.isValid) {
    throw createApiError(validation.errors.join(', '), ErrorCode.VALIDATION_ERROR, 400)
  }

  // ... rest of search logic
})
```

**Enhancement Expected Outcome**

Robust input validation prevents edge cases and provides clear error messages for invalid queries.

**Enhancement Tasks / Subtasks**

- [ ] Task 1 (AC: 1)
  - [ ] Create `server/utils/validation.ts` with search query validation
  - [ ] Add unit tests for validation edge cases
  - [ ] Integrate validation into search endpoint
  - [ ] Add appropriate error responses for invalid queries

---

### Issue EHN-0003: Add Cache Metrics Endpoint

**Issue Description**

The story requires tracking API calls and cache hit rates but does not provide a way to monitor these metrics. Development and operations teams need visibility into cache performance to verify the 95%+ cache hit rate target.

**Evidence**

- AC5 requires tracking API calls and cache hit/miss rates
- No monitoring endpoint or dashboard specified
- Performance requirements (lines 384-393) mention metrics but no visibility mechanism

**Enhancement**

Create a metrics endpoint for monitoring:

```typescript
// server/api/metrics/cache.get.ts
import { getDb } from '../../utils/database'
import { getQuotaStatus } from '../../utils/quota'

export default defineEventHandler(async () => {
  const db = getDb()

  // Get cache statistics
  const totalFoods = db.get<{ count: number }>('SELECT COUNT(*) as count FROM foods')
  const cachedFromApi = db.get<{ count: number }>(
    "SELECT COUNT(*) as count FROM foods WHERE data_source = 'calorieninjas'"
  )
  const seedFoods = db.get<{ count: number }>(
    "SELECT COUNT(*) as count FROM foods WHERE data_source = 'seed'"
  )

  // Get cache performance metrics
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
        fromSeed: seedFoods?.count || 0,
      },
      performance: {
        today: {
          cacheHits: cacheHits?.count || 0,
          cacheMisses: cacheMisses?.count || 0,
          totalLookups: totalLookups,
          cacheHitRate: cacheHitRate.toFixed(2) + '%',
        },
      },
      quota: getQuotaStatus(),
    },
    success: true,
  }
})
```

Add metrics logging table:

```sql
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

**Enhancement Expected Outcome**

Development and operations teams can monitor cache performance in real-time to verify system health and cache hit rate targets.

**Enhancement Tasks / Subtasks**

- [ ] Task 1 (AC: 5)
  - [ ] Create `search_metrics` table for performance tracking
  - [ ] Create `server/utils/metrics.ts` for metric logging functions
  - [ ] Create `server/api/metrics/cache.get.ts` endpoint
  - [ ] Integrate metric logging into search endpoint
  - [ ] Add metrics dashboard or documentation for viewing

---

## NICE TO HAVE

### Issue NTH-0001: Add Cache Warming Strategy Documentation

**Issue Description**

The story focuses on lazy caching (fetch on first request) but does not document a cache warming strategy. Proactively caching common foods during deployment would improve initial user experience and reduce cold-start API calls.

**Enhancement**

Add cache warming documentation to the story:

```markdown
### Cache Warming Strategy (Optional)

For optimal user experience, consider warming the cache with common foods during deployment:

```typescript
// scripts/warm-cache.ts
import { getDb } from '../server/utils/database'
import { getFoodWithCache } from '../server/utils/food-cache'

const COMMON_FOODS = [
  'avocado', 'banana', 'apple', 'orange', 'chicken breast',
  'salmon', 'egg', 'rice', 'potato', 'broccoli',
  'spinach', 'almonds', 'oats', 'greek yogurt', 'bread',
]

export async function warmCache(): Promise<void> {
  console.log('Starting cache warming...')

  for (const food of COMMON_FOODS) {
    try {
      const result = await getFoodWithCache(food)
      console.log(`Warmed: ${food} - ${result ? 'success' : 'failed'}`)
    } catch (error) {
      console.error(`Failed to warm: ${food}`, error)
    }
  }

  console.log('Cache warming complete')
}

warmCache().catch(console.error)
```

Run after deployment:
```bash
npx tsx scripts/warm-cache.ts
```

**Benefits:**
- First users get instant responses for common foods
- Reduces initial API quota consumption
- Validates cache and API connectivity on startup

**Considerations:**
- Run during off-peak hours
- Monitor API quota during initial warming
- Add/remove foods based on actual user search patterns
```

**Enhancement Tasks / Subtasks**

- [ ] Task 1 (AC: 6)
  - [ ] Add cache warming script template
  - [ ] Add cache warming to deployment documentation
  - [ ] Document common foods list based on user research

---

### Issue NTH-0002: Add Unit Test Coverage Examples

**Issue Description**

The story mentions verification tests but does not provide specific unit test patterns or coverage requirements. Clear test examples ensure consistent testing across the implementation.

**Enhancement**

Add test patterns to the story:

```markdown
### Test Coverage Requirements

#### Unit Tests Required

**calorieninjas.ts:**
```typescript
// tests/unit/calorieninjas.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchFromCalorieNinjas } from '../../server/utils/calorieninjas'

describe('CalorieNinjas API Client', () => {
  beforeEach(() => {
    vi.resetAllMocks()
  })

  it('should fetch nutrition data successfully', async () => {
    const mockResponse = {
      items: [{
        name: 'avocado',
        calories: 160,
        serving_size_g: 100,
        protein_g: 2,
        carbohydrates_total_g: 8,
        fat_total_g: 15,
        fat_saturated_g: 2,
        fiber_g: 7,
        sugar_g: 1,
        sodium_mg: 7,
        potassium_mg: 485,
        cholesterol_mg: 0,
      }]
    }

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => mockResponse,
    })

    const result = await fetchFromCalorieNinjas('avocado')
    expect(result).toEqual(mockResponse.items[0])
  })

  it('should throw on 429 quota exceeded', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 429,
    })

    await expect(fetchFromCalorieNinjas('avocado')).rejects.toThrow('API_QUOTA_EXCEEDED')
  })

  it('should retry on 500 error', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({ ok: false, status: 500 })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({ items: [{ name: 'avocado' }] }),
      })

    const result = await fetchFromCalorieNinjas('avocado')
    expect(result.name).toBe('avocado')
    expect(global.fetch).toHaveBeenCalledTimes(2)
  })
})
```

**food-cache.ts:**
```typescript
// tests/unit/food-cache.test.ts
import { describe, it, expect, beforeEach } from 'vitest'
import { getFoodWithCache } from '../../server/utils/food-cache'

describe('Food Cache', () => {
  beforeEach(() => {
    // Setup test database with fresh schema
  })

  it('should return cached food on cache hit', async () => {
    // Insert test food
    // Call getFoodWithCache
    // Verify no API call made
  })

  it('should fetch from API on cache miss', async () => {
    // Mock API response
    // Call getFoodWithCache
    // Verify API called and result cached
  })
})
```

**Required Coverage:**
- CalorieNinjas API client: 100% line coverage
- Food cache logic: 95%+ line coverage
- Slugify utility: 100% line coverage
- Retry logic: 100% line coverage
```

**Enhancement Tasks / Subtasks**

- [ ] Task 1 (AC: 6)
  - [ ] Add unit test examples to story
  - [ ] Create test utilities for API mocking
  - [ ] Document coverage requirements
  - [ ] Add CI test configuration

---

### Issue NTH-0003: Add Environment Configuration Documentation

**Issue Description**

The story mentions `process.env.CALORIENINJAS_API_KEY` but does not provide complete environment configuration documentation. Developers need clear guidance on setting up their environment variables.

**Enhancement**

Add environment configuration section to the story:

```markdown
### Environment Configuration

#### Required Environment Variables

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `CALORIENJAS_API_KEY` | CalorieNinjas API key | Yes | `abc123xyz...` |
| `DATABASE_PATH` | Path to SQLite database | No (default: `data/nutrition-hub.db`) | `./data/prod.db` |
| `LOG_LEVEL` | Logging verbosity | No (default: `info`) | `debug`, `info`, `warn`, `error` |

#### .env.example

Create a `.env` file in the project root:

```bash
# CalorieNinjas API Key
# Get your free API key at: https://api.calorieninjas.com/
CALORIENJAS_API_KEY=your_api_key_here

# Database Configuration
DATABASE_PATH=./data/nutrition-hub.db

# Logging
LOG_LEVEL=info
```

#### Getting API Key

1. Visit https://api.calorieninjas.com/
2. Sign up for a free account
3. Navigate to your dashboard
4. Copy your API key
5. Add to `.env` file

**Free Tier Limits:**
- 10,000 requests per month
- See [CalorieNinjas pricing](https://www.calorieninjas.com/pricing) for details

**Security Notes:**
- Never commit API keys to version control
- Use `.env.example` for template (no actual keys)
- Rotate keys if accidentally exposed
```

**Enhancement Tasks / Subtasks**

- [ ] Task 1 (AC: 1)
  - [ ] Update `.env.example` with all required variables
  - [ ] Add environment configuration section to story
  - [ ] Add environment validation on startup
  - [ ] Document API key acquisition process

---

## RECOMMENDED REVIEW FLOW

### Before Implementation

1. **Complete CRI-0001, CRI-0002, CRI-0003** (Critical Issues)
   - These issues will cause implementation failures if not addressed
   - Estimated effort: 2-3 hours

2. **Review EHN-0001, EHN-0002, EHN-003** (Enhancements)
   - These improve the implementation quality
   - Estimated effort: 3-4 hours
   - Can be addressed during implementation

3. **Consider NTH-0001, NTH-0002, NTH-0003** (Nice to Have)
   - These provide additional value
   - Can be addressed after basic implementation

### After Implementation

1. Run all unit tests (target: 90%+ coverage)
2. Perform integration testing with mock API
3. Test concurrent request handling
4. Verify cache hit rate meets 95%+ target
5. Test quota warning and exceeded scenarios
6. Document API key setup for team members

---

## APPENDIX: Files Reference

### Files to CREATE

| File | Description | Issue Reference |
|------|-------------|-----------------|
| `server/utils/slugify.ts` | Slugify utility | CRI-0001 |
| `server/utils/quota.ts` | API quota tracking | CRI-0003 |
| `server/utils/validation.ts` | Input validation | EHN-0002 |
| `server/utils/metrics.ts` | Performance metrics | EHN-0003 |
| `server/api/metrics/cache.get.ts` | Cache metrics endpoint | EHN-0003 |

### Files to MODIFY

| File | Description | Issue Reference |
|------|-------------|-----------------|
| `server/utils/errors.ts` | Add error codes | CRI-0002 |
| `server/api/foods/index.ts` | Integrate caching | AC2 |
| `.env.example` | Add API key entry | NTH-0003 |

### Database Migrations

| Change | Description | Issue Reference |
|--------|-------------|-----------------|
| Add `api_usage_logs` table | Track API usage | CRI-0003 |
| Add `search_metrics` table | Track cache performance | EHN-0003 |

---

## REVIEW CHECKLIST

- [ ] CRI-0001: Slugify implementation details added to story
- [ ] CRI-0002: Error codes added to `server/utils/errors.ts`
- [ ] CRI-003: Quota tracking implementation designed
- [ ] EHN-0001: Race condition protection reviewed
- [ ] EHN-0002: Input validation added
- [ ] EHN-0003: Metrics endpoint designed
- [ ] NTH-0001: Cache warming documentation added
- [ ] NTH-0002: Test patterns documented
- [ ] NTH-0003: Environment configuration documented
- [ ] All files properly referenced with issue numbers
- [ ] Tasks/subtasks clearly defined for each issue
