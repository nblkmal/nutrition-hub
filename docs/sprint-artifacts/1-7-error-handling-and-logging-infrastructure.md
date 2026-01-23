# Story 1.7: Error Handling and Logging Infrastructure

Status: Done

## Story

As a developer,
I want to implement consistent error handling and logging across the application,
So that errors are handled gracefully and issues can be debugged effectively.

## Epic Context

**Epic 1: Foundation & Core Infrastructure**

This story is part of Epic 1, which establishes the complete technical foundation for nutrition-hub. The epic goal is to provide the technical platform that powers all user experiences.

**Epic Objectives:**
- Establish project structure with Nuxt v4 + Nuxt UI + SQLite (Stories 1.1 COMPLETE)
- Create database schema with foods, categories, and relationships (Stories 1.2-1.3 COMPLETE)
- Set up server routes infrastructure (Story 1.4 COMPLETE)
- Set up TypeScript type definitions (Story 1.5 COMPLETE)
- Configure Vercel deployment (Story 1.6 COMPLETE)
- **Configure error handling and logging** ← **CURRENT STORY**

**Business Value:**
- Graceful error handling improves user experience
- Structured logging enables effective debugging
- Consistent error responses help API consumers
- Error tracking supports production monitoring
- User-friendly messages reduce support burden

**Stories in Epic 1:**
- 1.1: Project Initialization with Nuxt v4 ✅ (DONE)
- 1.2: SQLite Database Schema Implementation ✅ (DONE)
- 1.3: Database Seed Data with Common Foods ✅ (DONE)
- 1.4: Server Routes Infrastructure Setup ✅ (DONE)
- 1.5: TypeScript Type Definitions ✅ (DONE)
- 1.6: Vercel Deployment Configuration ✅ (DONE)
- 1.7: Error Handling and Logging Infrastructure ← **CURRENT STORY**

**Epic Dependencies:**
- Story 1.4: Server Routes Infrastructure **COMPLETED** ✅

## Acceptance Criteria

### AC1: Error Codes Enumeration Defined
- [ ] `server/utils/errors.ts` file created
- [ ] `ErrorCode` enum defined with standard codes:
  - `FOOD_NOT_FOUND = 'FOOD_NOT_FOUND'`
  - `CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND'`
  - `API_QUOTA_EXCEEDED = 'API_QUOTA_EXCEEDED'`
  - `NETWORK_ERROR = 'NETWORK_ERROR'`
  - `INTERNAL_ERROR = 'INTERNAL_ERROR'`
- [ ] Error code constants are exported for use across the application

### AC2: Error Helper Functions Created
- [ ] `createNotFoundError(resource: string, id: string | number)` function implemented
- [ ] `createApiError(message: string, code: ErrorCode, statusCode: number)` function implemented
- [ ] All helper functions use Nuxt's `createError()` for consistent error objects
- [ ] Helper functions return properly typed error objects

### AC3: Logging Utility Implemented
- [ ] `server/utils/logger.ts` file created
- [ ] `LogLevel` type defined: `'info' | 'warn' | 'error'`
- [ ] `log(level, message, meta?)` function implemented with JSON output
- [ ] `logApiCall(endpoint, duration)` function implemented
- [ ] `logError(error, context?)` function implemented with stack trace
- [ ] Logs include timestamp in ISO 8601 format

### AC4: Server Routes Updated with Error Handling
- [ ] All existing server routes in `server/api/` updated with try/catch
- [ ] Errors logged with context using `logError()`
- [ ] Errors thrown with standardized format
- [ ] Error handling pattern applied to:
  - `server/api/foods/index.ts`
  - `server/api/foods/[foodId].ts`
  - `server/api/foods/search.ts`
  - `server/api/categories/index.ts`
  - `server/api/categories/[categoryId].ts`
  - `server/api/admin/analytics.ts`

### AC5: Client-Side Error Handler Composable Created
- [ ] `composables/useErrorHandler.ts` file created
- [ ] `errorMessage` ref initialized to `null`
- [ ] `handleError(error)` function implemented with:
  - Console error logging
  - User-friendly message mapping for error codes
- [ ] Error message mapping includes:
  - `'API_QUOTA_EXCEEDED'`: 'Search temporarily unavailable. Please try again later.'
  - `'NETWORK_ERROR'`: 'Connection problem. Check your internet.'
  - `'FOOD_NOT_FOUND'`: 'Food not found.'
  - `'DEFAULT'`: 'Something went wrong. Please try again.'

### AC6: API Error Response Consistency
- [ ] All API errors return consistent format:
  ```typescript
  {
    error: {
      message: string,
      code: string,
      statusCode: number
    },
    success: false
  }
  ```
- [ ] 404 errors use `FOOD_NOT_FOUND` or `CATEGORY_NOT_FOUND` codes
- [ ] 400 errors use descriptive validation codes
- [ ] 500 errors use `INTERNAL_ERROR` code

### AC7: Error Handling Verification
- [ ] Accessing `/api/foods/99999` returns 404 with proper error format
- [ ] Invalid API calls return `{ error, success: false }` format
- [ ] Server errors logged with context
- [ ] No unhandled promise rejections in development console
- [ ] 500 errors don't crash the server

## Tasks / Subtasks

- [x] Task 1: Create error codes enumeration (AC: 1)
  - [x] Create `server/utils/errors.ts` file
  - [x] Define `ErrorCode` enum with all standard codes
  - [x] Export enum for use across application

- [x] Task 2: Create error helper functions (AC: 2)
  - [x] Implement `createNotFoundError()` function
  - [x] Implement `createApiError()` function
  - [x] Add JSDoc documentation with @throws tags
  - [x] Verify functions work with Nuxt's createError()

- [x] Task 3: Implement logging utility (AC: 3)
  - [x] Create `server/utils/logger.ts` file
  - [x] Define `LogLevel` type
  - [x] Implement `log()` function with JSON output
  - [x] Implement `logApiCall()` function
  - [x] Implement `logError()` function with stack trace

- [x] Task 4: Update server routes with error handling (AC: 4)
  - [x] Update `server/api/foods/index.ts` with try/catch
  - [x] Update `server/api/foods/[foodId].ts` with try/catch
  - [x] Update `server/api/foods/search.ts` with try/catch
  - [x] Update `server/api/categories/index.ts` with try/catch
  - [x] Update `server/api/categories/[categoryId].ts` with try/catch
  - [x] Update `server/api/admin/analytics.ts` with try/catch

- [x] Task 5: Create client-side error handler (AC: 5)
  - [x] Create `composables/useErrorHandler.ts` file
  - [x] Implement `useErrorHandler()` composable
  - [x] Add error code to user message mapping
  - [x] Export composable for use in components

- [x] Task 6: Verify API error consistency (AC: 6)
  - [x] Test all route error responses match format
  - [x] Verify 404 errors use correct codes
  - [x] Verify 400/500 errors use correct codes
  - [x] Update type definitions if needed

- [x] Task 7: Run verification tests (AC: 7)
  - [x] Test non-existent food returns 404
  - [x] Test invalid requests return error format
  - [x] Verify logs appear in console
  - [x] Check no unhandled rejections

## Dev Notes

### Prerequisites
- Story 1.4: Server Routes Infrastructure COMPLETE
- Story 1.5: TypeScript Type Definitions COMPLETE
- Server routes exist at: `server/api/foods/`, `server/api/categories/`, `server/api/admin/`
- Type definitions at: `types/index.ts`

**CRITICAL - Pre-Flight Checks (Must Complete Before Implementation):**
1. [ ] Review Architecture.md lines 1019-1052 for error handling patterns
2. [ ] Review Story 1.4 server routes structure at `server/api/`
3. [ ] Review Story 1.5 type definitions for `ApiError` type
4. [ ] Verify existing server routes don't already have error handling

### Tech Stack
See Architecture.md lines 99-104 for complete stack.
- **Framework:** Nuxt v4 with Nitro server engine
- **Error Handling:** Nuxt `createError()` utility
- **Logging:** Console output with JSON formatting
- **Monitoring:** Vercel Analytics (production)

### Error Code Standards

**`server/utils/errors.ts`:**
```typescript
export enum ErrorCode {
  FOOD_NOT_FOUND = 'FOOD_NOT_FOUND',
  CATEGORY_NOT_FOUND = 'CATEGORY_NOT_FOUND',
  API_QUOTA_EXCEEDED = 'API_QUOTA_EXCEEDED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
}

export function createNotFoundError(resource: string, id: string | number) {
  /**
   * Creates a standardized 404 error for resource not found scenarios
   * @param resource - Resource type name (e.g., 'Food', 'Category')
   * @param id - Resource ID that was not found
   * @throws Always throws a NuxtError with statusCode 404
   */
  return createError({
    statusCode: 404,
    message: `${resource} not found`,
    statusMessage: `${resource.toUpperCase()}_NOT_FOUND`,
  });
}

export function createApiError(message: string, code: ErrorCode, statusCode: number) {
  /**
   * Creates a standardized API error with custom code and status
   * @param message - Human-readable error message
   * @param code - ErrorCode enum value for client-side handling
   * @param statusCode - HTTP status code
   * @throws Always throws a NuxtError with specified statusCode
   */
  return createError({
    statusCode,
    message,
    statusMessage: code,
  });
}
```

### Logging Implementation

**`server/utils/logger.ts`:**
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

### Server Route Error Handling Pattern

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

### Client-Side Error Handler

**`composables/useErrorHandler.ts`:**
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

### API Error Response Format

**Success Response:**
```typescript
{
  data: Food[],
  meta: { total: number, page: number, limit: number },
  success: true
}
```

**Error Response:**
```typescript
{
  error: {
    message: "Food not found",
    code: "FOOD_NOT_FOUND",
    statusCode: 404
  },
  success: false
}
```

### Previous Story Patterns Reference

| Story | Key Patterns for This Story |
|-------|----------------------------|
| 1.4 | Server routes at `server/api/foods/`, `server/api/categories/` |
| 1.5 | Type definitions at `types/index.ts`, ApiResponse types |
| 1.6 | `server/utils/` pattern for utilities, JSDoc documentation |

**Critical:** This story adds error handling to existing server routes from Story 1.4. Ensure compatibility with existing implementation.

### File Structure

```
nutrition-hub/
├── server/
│   └── utils/
│       ├── errors.ts              # CREATE - Error codes and helpers
│       └── logger.ts              # CREATE - Logging utilities
├── composables/
│   └── useErrorHandler.ts         # CREATE - Client-side error handler
└── server/
    └── api/
        └── foods/
            ├── index.ts           # MODIFY - Add error handling
            ├── [foodId].ts        # MODIFY - Add error handling
            └── search.ts          # MODIFY - Add error handling
```

### Testing Standards

**Error Handling Tests:**
```bash
# Test 404 error response
curl http://localhost:3000/api/foods/99999

# Expected: {"error":{"message":"Food not found","code":"FOOD_NOT_FOUND","statusCode":404},"success":false}

# Test non-existent category
curl http://localhost:3000/api/categories/99999

# Expected: {"error":{"message":"Category not found","code":"CATEGORY_NOT_FOUND","statusCode":404},"success":false}

# Test server logging
# Check console output for JSON log entries
```

**Client-Side Error Handler Test:**
```typescript
// In a component
const { errorMessage, handleError } = useErrorHandler()

// Simulate an error
handleError({ code: 'API_QUOTA_EXCEEDED' })
console.log(errorMessage.value)
// Expected: 'Search temporarily unavailable. Please try again later.'
```

### Dependencies

**This story enables:**
- All subsequent epics have consistent error handling
- Better debugging for production issues
- User-friendly error messages in UI
- Structured logs for monitoring

**Blocking dependencies:**
- Story 1.4 must be COMPLETE before this story

### References

- **Architecture.md** lines 1019-1052 - Error handling patterns
- **Architecture.md** lines 891-941 - API response formats
- **Architecture.md** lines 1200-1217 - Database to API transformation
- **Nuxt.js Error Handling:** https://nuxt.com/docs/getting-started/error-handling
- **Nitro Error Handling:** https://nitro.build/guide/error-handling

## Dev Agent Record

### Context Reference

- **PRD:** docs/PRD.md - Project requirements (50 FRs)
- **Architecture:** docs/architecture.md - Technical stack and patterns
- **Epics:** docs/epics.md - Story 1.7 requirements
- **Story 1.6:** docs/sprint-artifacts/1-6-vercel-deployment-configuration.md - Vercel deployment (for production logging context)
- **Story 1.5:** docs/sprint-artifacts/1-5-typescript-type-definitions.md - Type definitions for ApiResponse
- **Story 1.4:** docs/sprint-artifacts/1-4-server-routes-infrastructure-setup.md - Server routes structure

### Agent Model Used

Claude Code CLI (runcloud/minimax-m2.1)

### Debug Log References

### Completion Notes List

**Story created with comprehensive developer context including:**

- Complete error code enumeration with standard codes
- Error helper functions for consistent error creation
- Logging utility with JSON output and structured logs
- Server route error handling pattern with try/catch
- Client-side error handler composable with user-friendly messages
- API error response format consistency
- Testing standards and verification procedures
- Previous story patterns for consistency
- Architecture document references for patterns

**Developer Guardrails Applied:**

- Standardized error codes across the application
- JSON-structured logging for production monitoring
- Consistent API error response format
- User-friendly error messages for better UX
- Error logging with context for debugging
- Clear separation between server and client error handling
- Proper use of Nuxt's createError() utility

**Implementation Notes:**

- Follow Architecture.md lines 1019-1052 for exact error handling patterns
- Use ErrorCode enum for all error codes to prevent typos
- Log errors with context (route, params) for debugging
- User-facing messages should be friendly, not technical
- In production, consider integrating Vercel Analytics for error tracking
- Ensure all server routes follow the same error handling pattern

### File List

**Story File:**
- `docs/sprint-artifacts/1-7-error-handling-and-logging-infrastructure.md` - Updated with completion status

**Files Created:**
- `nutrition-hub/server/utils/logger.ts` - Logging utilities with JSON output
- `nutrition-hub/composables/useErrorHandler.ts` - Client-side error handler composable

**Files Modified:**
- `nutrition-hub/server/utils/errors.ts` - Updated to use Nuxt createError() with ErrorCode enum
- `nutrition-hub/server/api/foods/index.ts` - Added logError() for error logging
- `nutrition-hub/server/api/foods/[foodId].ts` - Added logError() for error logging
- `nutrition-hub/server/api/foods/search.ts` - Added logError() for error logging
- `nutrition-hub/server/api/categories/index.ts` - Added logError() for error logging
- `nutrition-hub/server/api/categories/[categoryId].ts` - Added logError() for error logging
- `nutrition-hub/server/api/admin/analytics.ts` - Added logError() for error logging

**Files to Reference (No Changes):**
- `nutrition-hub/types/index.ts` - Type definitions (Story 1.5)
- `nutrition-hub/server/utils/transform.ts` - Transform utilities (Story 1.4)
- `nutrition-hub/server/utils/response.ts` - Response utilities (Story 1.4)
