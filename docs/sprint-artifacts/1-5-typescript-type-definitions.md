# Story 1.5: TypeScript Type Definitions

Status: Done

## Story

As a developer,
I want to create comprehensive TypeScript type definitions for all data structures,
so that I have type safety throughout the application.

## Epic Context

**Epic 1: Foundation & Core Infrastructure**

This story is part of Epic 1, which establishes the complete technical foundation for nutrition-hub. The epic goal is to provide the technical platform that powers all user experiences.

**Epic Objectives:**
- Establish project structure with Nuxt v4 + Nuxt UI + SQLite ✅ (Stories 1.1-1.3 COMPLETE)
- Create database schema with foods, categories, and relationships ✅ (Stories 1.2-1.3 COMPLETE)
- Set up server routes infrastructure ✅ (Story 1.4 COMPLETE)
- **Configure TypeScript type definitions** ← **CURRENT STORY**
- Set up deployment pipeline with Vercel (Story 1.6)
- Configure error handling and logging (Story 1.7)

**Business Value:**
While not directly user-facing, comprehensive TypeScript type definitions ensure type safety across the entire application. This prevents runtime errors, improves developer experience with IntelliSense, and serves as living documentation for data structures.

**Stories in Epic 1:**
- 1.1: Project Initialization with Nuxt v4 ✅ (DONE)
- 1.2: SQLite Database Schema Implementation ✅ (DONE)
- 1.3: Database Seed Data with Common Foods ✅ (DONE)
- 1.4: Server Routes Infrastructure Setup ✅ (DONE)
- 1.5: TypeScript Type Definitions ← **CURRENT STORY**
- 1.6: Vercel Deployment Configuration (NEXT)
- 1.7: Error Handling and Logging Infrastructure

**Epic Dependencies:**
- Stories 1.1, 1.2, 1.3, 1.4: **COMPLETED** ✅

## Acceptance Criteria

### AC1: Database Types File Verified
- [x] `types/database.ts` exists with all database row types
- [x] `FoodDbRow` interface matches foods table schema exactly (snake_case)
- [x] `CategoryDbRow` interface matches categories table schema exactly
- [x] `FoodCategoryDbRow` interface matches food_categories table schema exactly
- [x] All numeric fields are typed as `number`
- [x] All timestamp fields are typed as `string` (SQLite returns ISO 8601 strings)
- [x] Boolean fields typed as `number` (SQLite stores 0/1)

### AC2: API Types File Created
- [x] `types/api.ts` exists with all API response types
- [x] `Food` interface defined with camelCase field names
- [x] `Category` interface defined with camelCase field names
- [x] `CategoryRule` interface defined or verified from database types
- [x] Boolean fields typed as `boolean` in API types, `number` in database types
- [x] All required fields are present, optional fields marked with `?`

### AC3: API Response Wrapper Types Defined
- [x] `ApiResponse<T>` generic type for single item responses
- [x] `ApiListResponse<T>` generic type for paginated list responses
- [x] `ApiError` type for error responses
- [x] Response types include `data/success` or `error/success` fields

### AC4: Composables Types File Created
- [x] `types/composables.ts` exists with composable state types
- [x] `UseAsyncState<T>` interface defined with `data`, `loading`, `error` Refs
- [x] Generic type parameter `<T>` for data type flexibility

### AC5: External API Types Defined
- [x] `CalorieNinjasResponse` interface defined in `types/api.ts` with external API marker
- [x] All CalorieNinjas API fields included (snake_case)
- [x] Field types match API specification

### AC6: Type Index File Created and Verified
- [x] `types/index.ts` exports all types from sub-modules
- [x] Database types exported (`export * from './database'`)
- [x] API types exported (`export * from './api'`)
- [x] Composables types exported (`export * from './composables'`)
- [x] Exports work in component, server, and composable contexts

### AC7: TypeScript Compilation Passes
- [x] TypeScript version is 5.x (Nuxt v4 requirement)
- [x] Running `npx tsc --noEmit` produces no errors
- [x] Running `npx tsc --noEmit --strict` produces no errors
- [x] All type definitions are syntactically valid
- [x] No circular dependency errors
- [x] No duplicate identifier errors

## Tasks / Subtasks

- [x] Task 1: Create API types file (AC: 2, 5)
  - [x] `cd nutrition-hub && touch types/api.ts`
  - [x] Define `Food` interface with camelCase fields (all fields from FoodDbRow, converted to camelCase)
  - [x] Define `Category` interface with camelCase fields
  - [x] **Check if `CategoryRule` exists in `types/database.ts`** - it does NOT exist, define in api.ts below
  - [x] Define `CalorieNinjasResponse` interface with external API JSDoc marker
  - [x] Define `ApiResponse<T>` generic type
  - [x] Define `ApiListResponse<T>` generic type
  - [x] Define `ApiError` type

- [x] Task 2: Create composables types file (AC: 4)
  - [x] `cd nutrition-hub && touch types/composables.ts`
  - [x] Define `UseAsyncState<T>` interface
  - [x] Import `Ref` type from Vue

- [x] Task 3: Create type index file (AC: 6)
  - [x] `cd nutrition-hub && touch types/index.ts`
  - [x] Export database types: `export * from './database'`
  - [x] Export API types: `export * from './api'`
  - [x] Export composables types: `export * from './composables'`

- [x] Task 4: Verify existing types/database.ts against schema (AC: 1)
  - [x] Extract foods schema: `cat server/database/migrations/001_initial_schema.sql | grep -A 20 'CREATE TABLE foods'`
  - [x] Field-by-field compare: Check `FoodDbRow` matches each column name and type
  - [x] Extract categories schema: `cat server/database/migrations/001_initial_schema.sql | grep -A 10 'CREATE TABLE categories'`
  - [x] Field-by-field compare: Check `CategoryDbRow` matches each column (is_active: number)
  - [x] **Only modify if schema mismatch detected**

- [x] Task 5: Comprehensive verification (AC: 1-7)
  - [x] `cd nutrition-hub && npx tsc --version` - verify TypeScript 5.x (Nuxt v4 requirement)
  - [x] `cd nutrition-hub && npx tsc --noEmit` - verify no TypeScript errors
  - [x] `cd nutrition-hub && npx tsc --noEmit --strict` - verify strict mode compliance
  - [x] `cd nutrition-hub && ls -la types/` - confirm 4 files exist
  - [x] Test barrel export in component context: `echo "import type { Food } from '~/types'" > test-component-types.ts`
  - [x] Test barrel export in server context: `echo "import type { Food } from '../../types'" > server/test-types.ts`
  - [x] Run type check: `cd nutrition-hub && npx tsc --noEmit test-component-types.ts server/test-types.ts`
  - [x] Verify transform.ts compatibility: Add `import type { Food, Category } from '../../types/api'` to `server/utils/transform.ts`
  - [x] Run full type check: `cd nutrition-hub && npx tsc --noEmit`
  - [x] Clean up test files: `rm nutrition-hub/test-component-types.ts nutrition-hub/server/test-types.ts`

## Dev Notes

### Prerequisites
- Stories 1.1-1.4 COMPLETE
- Database schema: `server/database/migrations/001_initial_schema.sql`
- Transform utilities: `server/utils/transform.ts`
- Existing types: `types/database.ts`

### Tech Stack
See Architecture.md lines 99-104 for complete stack. **TypeScript-specific:** Strict mode enabled, Vue 3 Composition API with Ref<T> types.

### TypeScript Configuration Verification

**Verify `tsconfig.json` has correct path aliases:**
```bash
cd nutrition-hub && cat tsconfig.json | grep -A 5 '"paths"'
```

Expected:
```json
{
  "compilerOptions": {
    "paths": {
      "~/*": ["./*"],
      "@/*": ["./*"],
      "~~/*": ["./*"],
      "@@/*": ["./*"]
    }
  }
}
```

### ⚠️ Existing Types - DO NOT MODIFY UNLESS SCHEMA MISMATCH

**Already exists in `types/database.ts`:**
- `FoodDbRow`, `CategoryDbRow`, `FoodCategoryDbRow`, `FoodInsertData`
- `CategoryRule` does NOT exist in database.ts - will define in api.ts

**Verification in Task 4:** Compare against `server/database/migrations/001_initial_schema.sql` field-by-field.

**Only modify if:** Schema column names or types don't match database.

---

### Type Definition Requirements

**Database Types (`types/database.ts`):**
- ✅ Already exists - verify in Task 4
- Use `snake_case` field names, `string` timestamps, `number` for booleans (SQLite 0/1)

**API Types (`types/api.ts` - CREATE):**

**Food interface** (camelCase version of FoodDbRow):
```typescript
export interface Food {
  id: number
  name: string
  slug: string
  servingSizeG: number
  calories: number
  proteinG: number
  carbohydratesTotalG: number
  fatTotalG: number
  fatSaturatedG: number
  fiberG: number
  sugarG: number
  sodiumMg: number
  potassiumMg: number
  cholesterolMg: number
  dataSource: string
  createdAt: string
  updatedAt: string
}
```

**Category interface:**
```typescript
export interface Category {
  id: number
  slug: string
  name: string
  description: string | null
  icon: string | null
  rulesJson: CategoryRule  // Parsed JSON object (not string like DB)
  displayOrder: number
  isActive: boolean  // Converted from number (0/1)
  createdAt: string
}
```

**Key differences from CategoryDbRow:**
- `rules_json: string` → `rulesJson: CategoryRule` (parsed)
- `is_active: number` → `isActive: boolean` (converted via `Boolean()`)

**CategoryRule interface** (define in api.ts - does NOT exist in database.ts):
```typescript
export interface CategoryRule {
  name: string
  description: string
  weight: number  // 1-10, influences match score
  conditions: {
    // Protein conditions
    minProteinG?: number
    maxProteinG?: number
    minProteinPerCalorie?: number  // protein/calories * 100
    // Carb conditions
    maxCarbsG?: number
    minCarbsG?: number
    // Fat conditions
    maxFatG?: number
    maxSaturatedFatG?: number
    // Fiber conditions
    minFiberG?: number
    // Sugar conditions
    maxSugarG?: number
    // Calorie conditions
    maxCalories?: number
    minCalories?: number
  }
}
```

**External API Contract:**
```typescript
/**
 * External API contract - CalorieNinjas API response format
 * @see https://api.calorieninjas.com/doc
 * NOTE: This is external API format, not internal API response type
 */
export interface CalorieNinjasResponse {
  sugar_g: number
  fiber_g: number
  serving_size_g: number
  sodium_mg: number
  name: string
  potassium_mg: number
  fat_saturated_g: number
  fat_total_g: number
  calories: number
  cholesterol_mg: number
  protein_g: number
  carbohydrates_total_g: number
}
```

**Response Wrappers:** Standard format from Architecture.md lines 891-941
```typescript
export interface ApiResponse<T> {
  data: T
  success: true
}

export interface ApiListResponse<T> {
  data: T[]
  meta: { total: number; page: number; limit: number }
  success: true
}

export interface ApiError {
  error: { message: string; code: string; statusCode: number }
  success: false
}
```

**Composables Types (`types/composables.ts` - CREATE):**
```typescript
import type { Ref } from 'vue'

// Note: Nuxt auto-imports ref, computed from Vue
// BUT Ref type requires explicit import above
export interface UseAsyncState<T> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<string | null>
}
```

**Type Index File (`types/index.ts` - CREATE):**
```typescript
// Database types (snake_case - matches SQLite)
export * from './database'

// API types (camelCase - matches API responses)
export * from './api'

// Composables types
export * from './composables'
```

### Field Mapping: Database (snake_case) → API (camelCase)

**All nutrition fields:** `*_g` → `*G` (e.g., protein_g → proteinG)
**All timestamp fields:** `*_at` → `*At` (e.g., created_at → createdAt)
**Metadata fields:** data_source → dataSource

| Category | Examples | Type Conversion |
|----------|----------|-----------------|
| Nutrition (per 100g) | servingSizeG, proteinG, carbohydratesTotalG, fatTotalG, fatSaturatedG, fiberG, sugarG | number → number |
| Minerals (mg) | sodiumMg, potassiumMg, cholesterolMg | number → number |
| Metadata | dataSource, createdAt, updatedAt | string → string |
| Booleans | is_active → isActive | number (0/1) → boolean |

**Null handling:**
- `description: TEXT` → `description: string \| null`
- `icon: TEXT` → `icon: string \| null`

> See `server/utils/transform.ts` (Story 1.4) for transformation implementation

### Type Import Patterns

**Server utility files** (`server/utils/`):
```typescript
// ✅ CORRECT - ~/ alias works in server/utils (Story 1.4 transform.ts pattern)
import type { FoodDbRow, CategoryDbRow } from '~/types/database'
import type { Food, Category } from '~/types/api'
```

**Server route files** (`server/api/`):
```typescript
// ✅ ALSO CORRECT - Relative imports work in server/api routes
import type { FoodDbRow } from '../../types/database'
import type { Food, ApiResponse } from '../../types/api'
```

**Client files** (`composables/`, `components/`, `pages/`):
```typescript
// ✅ CORRECT - Auto-import alias
import type { Food, Category, ApiResponse } from '~/types'
import type { UseAsyncState } from '~/types'
```

**Vue types:**
```typescript
// Ref type requires explicit import (ref is auto-imported but Ref type is not)
import type { Ref } from 'vue'
```

**Note:** Both `~/types` and relative imports work in server context. Story 1.4's transform.ts uses `~/types/database`. Use whichever pattern you prefer, but be consistent within each file.

### Usage Examples by Context

**In Composables:**
```typescript
// composables/useFoodSearch.ts
import type { Food, ApiResponse } from '~/types'

export function useFoodSearch() {
  const foods = ref<Food[]>([])
  const loading = ref(false)

  const search = async (query: string) => {
    const response = await $fetch<ApiResponse<Food[]>>(`/api/foods?q=${query}`)
    if (response.success) {
      foods.value = response.data
    }
  }

  return { foods, loading, search }
}
```

**In Server Routes:**
```typescript
// server/api/foods/[foodId].ts
import type { FoodDbRow } from '~/types/database'  // or '../../types/database'
import type { Food, ApiResponse } from '~/types/api'

export default defineEventHandler((event) => {
  const dbRow = getDb().prepare('SELECT * FROM foods WHERE id = ?').get(foodId) as FoodDbRow
  const food = transformFood(dbRow) as Food

  return { data: food, success: true }
})
```

**In Components:**
```typescript
// components/FoodCard.vue
<script setup lang="ts">
import type { Food } from '~/types'

defineProps<{
  food: Food
}>()
</script>
```

### Type Dependency Graph

**database.ts** (no dependencies):
- FoodDbRow, CategoryDbRow, FoodCategoryDbRow, FoodInsertData

**api.ts** (depends on database.ts):
- Food (transforms from FoodDbRow)
- Category (transforms from CategoryDbRow, uses CategoryRule)
- CategoryRule (embedded in Category)
- ApiResponse<T>, ApiListResponse<T>, ApiError
- CalorieNinjasResponse (external API)

**composables.ts** (depends on Vue):
- UseAsyncState<T> (uses Ref<T> from Vue)

**index.ts** (barrel export):
- Re-exports all above types

⚠️ **Circular Dependency Prevention:**
- api.ts imports FROM database.ts (FoodDbRow → Food transformation)
- database.ts MUST NOT import FROM api.ts (prevents circular reference)

### Boolean Type Conversion

**Database → API transformation:**
```typescript
// In server/utils/transform.ts
export function transformCategory(row: CategoryDbRow): Category {
  return {
    // ... other fields
    isActive: Boolean(row.is_active)  // number 0/1 → boolean false/true
  }
}
```

**Type handling:**
- Database: `is_active: number` (SQLite INTEGER 0/1)
- API: `isActive: boolean` (JavaScript boolean)
- Conversion: `Boolean(row.is_active)` in transform functions

### Previous Story Patterns Reference

| Story | Key Patterns for This Story |
|-------|----------------------------|
| 1.1 | Nuxt v4.2.2, TypeScript 5.x strict mode, auto-imports enabled |
| 1.2 | Database schema at `server/database/migrations/001_initial_schema.sql`, `types/database.ts` exists |
| 1.3 | Slugify utility at `utils/slugify.ts`, seed data populated |
| 1.4 | Transform utilities at `server/utils/transform.ts` use `~/types/database` pattern |

**Critical:** Transform functions (Story 1.4) will use types created in this story - ensure compatibility.

### File Structure

> **🚨 CRITICAL: All types files are in nutrition-hub/ subdirectory**

```
nutrition-hub/
└── types/
    ├── database.ts              # EXISTS - DO NOT MODIFY
    ├── api.ts                   # CREATE - API types (camelCase)
    ├── composables.ts           # CREATE - Composable state types
    └── index.ts                 # CREATE - Type exports barrel
├── server/
│   └── utils/
│       └── transform.ts         # EXISTS - Uses types for transformation
└── composables/
    └── (future)                 # Will UseAsyncState in Epic 2
```

### Testing Standards

**TypeScript Compilation Verification:**
```bash
# Verify TypeScript version
npx tsc --version  # Should be 5.x for Nuxt v4

# Run type check (no emit)
npx tsc --noEmit

# Verify strict mode compliance
npx tsc --noEmit --strict

# Expected: No errors
# If errors occur, check:
# 1. All field names match database schema exactly
# 2. Import paths are correct (~/types or ../../types both work in server)
# 3. No duplicate type definitions
```

**Verification Checklist:**
- [ ] TypeScript version is 5.x (`npx tsc --version`)
- [ ] TypeScript compilation passes (`npx tsc --noEmit`)
- [ ] Strict mode passes (`npx tsc --noEmit --strict`)
- [ ] All type files exist (database.ts, api.ts, composables.ts, index.ts)
- [ ] Types can be imported with `import type { } from '~/types'` in client files
- [ ] Types can be imported with `import type { } from '~/types'` or `../../types` in server files
- [ ] No duplicate identifier errors
- [ ] No circular dependency errors
- [ ] Transform.ts type compatibility verified

### Dependencies

**Stories BLOCKED until this story is complete:**

**Epic 2 - Search & Food Discovery:**
- Story 2.1 - Food Search API → uses `Food` API type
- Story 2.2 - Food Detail API → uses `ApiResponse<Food>` type
- Story 2.4 - Search Autocomplete → uses `UseAsyncState<Food[]>` type

**Epic 3 - Autocategorization:**
- Story 3.1 - Category Rule Engine → uses `CategoryRule` type
- Story 3.3 - Category CRUD → uses `ApiResponse<Category>` type

**This story is a BLOCKER for all above stories.**

### References

- **Story 1.2** - Database schema at `server/database/migrations/001_initial_schema.sql`, existing `types/database.ts`
- **Story 1.4** - Transform utilities at `server/utils/transform.ts`, response format standards
- **Architecture.md** lines 505-534 - CategoryRule structure (now defined in this story)
- **Architecture.md** lines 809-828 - Naming conventions (snake_case DB, camelCase API)
- **Architecture.md** lines 891-941 - Response wrapper formats

## Dev Agent Record

### Context Reference

<!-- Path(s) to story context XML will be added here by context workflow -->

### Agent Model Used

claude-opus-4-5-20251101

### Debug Log References

**2025-01-22 - Implementation Session:**
- Created `types/api.ts` with Food, Category, CategoryRule, CalorieNinjasResponse interfaces and response wrapper types
- Created `types/composables.ts` with UseAsyncState interface
- Created `types/index.ts` barrel export file
- Verified existing `types/database.ts` matches schema (no modifications needed)
- Updated `server/utils/transform.ts` to use new API types with proper return type annotations
- TypeScript 5.9.3 verified
- All type checks pass: `npx tsc --noEmit` and `npx tsc --noEmit --strict`

**2026-01-22 - Code Review Fixes Applied:**
- **HIGH:** Added error handling for JSON.parse in transformCategory function (throws descriptive error for malformed rules_json)
- **HIGH:** Removed `updatedAt` field from Category interface (categories table schema does not have this column)
- **MEDIUM:** Added JSDoc comments to transformFood and transformCategory functions for API documentation

### Completion Notes List

**Story created with comprehensive developer context including:**
- Complete type definition requirements for all data structures
- Explicit Food interface with all camelCase fields
- Complete CategoryRule interface definition (prevents duplication)
- snake_case (database) to camelCase (API) field mapping
- Existing type definitions reference (types/database.ts)
- Type safety standards and strict mode requirements (TypeScript 5.x)
- Import patterns for server (~/types OR relative) and component (~/) contexts
- Nuxt auto-import configuration for types
- Database schema reference for type validation (correct migration file path)
- TypeScript compilation verification steps with version check
- Previous story learnings and critical patterns

**Quality Competition Improvements Applied (2026-01-22):**

*Critical Fixes Applied:*
1. ✅ Fixed import path documentation - clarified that both ~/types and relative paths work in server context
2. ✅ Added explicit Food interface with all 18 fields in camelCase
3. ✅ Added complete CategoryRule interface definition (prevents duplication)
4. ✅ Fixed schema path to correct migration file location
5. ✅ Added TypeScript 5.x version check to AC7 and verification tasks
6. ✅ Updated all references to schema.sql to use migrations/001_initial_schema.sql

*Enhancements Added:*
7. ✅ Clarified server import patterns with both ~/types and relative examples
8. ✅ Added usage examples by context (composables, server routes, components)
9. ✅ Added type dependency graph with circular dependency prevention
10. ✅ Consolidated boolean type explanation into single clear section
11. ✅ Updated Previous Story Patterns Reference with correct paths
12. ✅ Enhanced completion notes with explicit field list mention

**Developer Guardrails Applied:**
- Explicit import path patterns (server = ~/types OR relative, client = ~/)
- Field-by-field schema verification commands (correct migration file path)
- Transform function type compatibility checks
- Boolean conversion explanation (0/1 → true/false)
- Circular dependency prevention guidance
- Complete CategoryRule type definition (no duplication)
- External API contract markers
- TypeScript 5.x version verification requirement

**Implementation Notes:**
- `types/database.ts` already exists - verify in Task 4 with specific migration file commands
- `types/api.ts` must be created with Food, Category, CategoryRule interfaces
- `types/composables.ts` must be created with UseAsyncState interface
- `types/index.ts` must be created as barrel export for auto-imports
- **Import patterns:** Both `~/types` and relative paths work in server context - be consistent per file

### File List

**Story File:**
- `docs/sprint-artifacts/1-5-typescript-type-definitions.md`

**Files Created:**
- `nutrition-hub/types/api.ts` - API response types (Food, Category, CategoryRule, CalorieNinjasResponse, ApiResponse, ApiListResponse, ApiError)
- `nutrition-hub/types/composables.ts` - Composable state types (UseAsyncState)
- `nutrition-hub/types/index.ts` - Type exports barrel file

**Files Modified:**
- `nutrition-hub/server/utils/transform.ts` - Added type annotations using new API types (Food, Category, CategoryRule); added JSDoc comments; added error handling for JSON.parse in transformCategory

**Files Verified (No Changes):**
- `nutrition-hub/types/database.ts` - Verified existing types match `server/database/migrations/001_initial_schema.sql` schema
