---
stepsCompleted: [1, 2, 3, 4, 5]
inputDocuments: ['docs/prd.md']
apiEndpoint: 'https://api.calorieninjas.com/v1/nutrition?query='
workflowType: 'architecture'
lastStep: 5
project_name: 'nutrition-hub'
user_name: 'Nabilakmal'
date: '2025-12-23T12:58:13Z'
---

# Architecture Decision Document

_This document builds collaboratively through step-by-step discovery. Sections are appended as we work through each architectural decision together._

## Project Context Analysis

### Requirements Overview

**Functional Requirements:**

**50 Functional Requirements organized into 7 capability areas:**

1. **Food Discovery & Search (7 FRs):** Instant search autocomplete from SQLite with CalorieNinjas API fallback, mobile-responsive interface
2. **Nutrition Information Display (6 FRs):** Visual nutrition indicators, SEO-optimized SSR pages, deep-linking support
3. **Categorization & Analytics (10 FRs):** Autocategorization engine with JSON rules, category overlap analysis (Jaccard similarity), versatile foods leaderboard with multi-dimensional scoring
4. **Social Sharing & Virality (5 FRs):** Image generation (html2canvas), Open Graph/Twitter Card meta tags
5. **System Administration (7 FRs):** Analytics dashboard, API quota monitoring, cache performance tracking
6. **User Experience & Accessibility (9 FRs):** Full WCAG 2.1 AA compliance, keyboard navigation, dark mode, responsive design
7. **Content Management (6 FRs):** CRUD for foods/categories, XML sitemap, Schema.org markup

**Non-Functional Requirements:**

**Performance (10 NFRs):**
- Search autocomplete: <200ms (p95)
- Food detail pages: <500ms (p95)
- Category analytics: <1000ms (p95)
- Core Web Vitals: LCP <2.5s, FID <100ms, CLS <0.1
- Bundle size limits: JS <200KB, CSS <50KB, initial payload <500KB

**Security (8 NFRs):**
- HTTPS/TLS 1.3 required
- API keys stored as environment variables
- SQL injection and XSS prevention
- Rate limiting for API quota protection (10K calls/month)

**Scalability (6 NFRs):**
- Support 50→1,000 monthly users with <10% performance degradation
- Support 10K→100K searches/month with linear cost scaling
- SQLite database up to 50,000 food items with maintained query performance
- 95%+ cache hit rate as database grows

**Accessibility (13 NFRs):**
- Full WCAG 2.1 AA compliance
- Screen reader compatibility (NVDA, VoiceOver, TalkBack)
- Touch targets ≥44x44 pixels
- Keyboard-only navigation for all functionality
- Color contrast ≥4.5:1 (normal text), ≥3:1 (large text)

**Integration (7 NFRs):**
- CalorieNinjas API: `https://api.calorieninjas.com/v1/nutrition?query=`
- Retry logic: 3 retries with exponential backoff
- Immediate caching of API responses in SQLite
- CDN for static assets (Vercel Edge/Cloudflare CDN)
- SQLite on object storage (Vercel Blob/Cloudflare R2)
- Automated deployment: Git push triggers deploy within 5 minutes

**Reliability (6 NFRs):**
- 99.5% uptime target
- Daily SQLite backups to separate storage
- Zero data loss requirement for nutrition data
- Graceful degradation for non-critical features

---

### Scale & Complexity

**Project Complexity Assessment:**

- **Real-time features:** None (search feels instant but no WebSockets)
- **Multi-tenancy:** None (no user accounts in MVP)
- **Regulatory compliance:** None (wellness/fitness, not healthcare)
- **Integration complexity:** MEDIUM (CalorieNinjas API with smart caching strategy)
- **User interaction complexity:** MEDIUM-HIGH (advanced analytics, autocategorization algorithms)
- **Data complexity:** MEDIUM (SQLite with advanced SQL: Jaccard similarity, multi-dimensional scoring)

**Scale Indicators:**

- **Primary domain:** Full-stack web application (Nuxt v4 + SQLite + Serverless)
- **Complexity level:** MEDIUM (algorithmic features + advanced SQL + serverless architecture)
- **Estimated architectural components:** 8-10 major components
- **Database schema:** 3 main tables + 1 junction table (foods, categories, food_categories, analytics)

---

### Technical Constraints & Dependencies

**Mandatory Technology Choices:**
- **Framework:** Nuxt v4 (Vue 3 + TypeScript + Nitro server engine)
- **UI Library:** Nuxt UI (official ecosystem components)
- **Database:** SQLite (file-based)
- **Storage:** Vercel Blob or Cloudflare R2 (for SQLite file and static assets)
- **Deployment:** Vercel or Cloudflare Pages (serverless)
- **API Provider:** CalorieNinjas free tier (10,000 calls/month quota)

**API Integration:**
- **Endpoint:** `https://api.calorieninjas.com/v1/nutrition?query={food_name}`
- **Authentication:** API key via X-Api-Key header
- **Rate Limit:** 10,000 calls/month hard limit
- **Caching Strategy:** Call once, cache forever in SQLite (nutrition data is static)

**Infrastructure Constraints:**
- **Zero-Cost Requirement:** $0/month when dormant (portfolio project sustainability)
- **Serverless Architecture:** Pay-per-use model, no always-on servers
- **File-Based Database:** SQLite with portable single-file database
- **CDN Delivery:** All static assets delivered via edge CDN

---

### Cross-Cutting Concerns Identified

**1. Performance (Critical):**
- Aggressive latency targets (<200ms search, <500ms pages)
- Bundle size budgets (JS <200KB, CSS <50KB)
- Core Web Vitals compliance for SEO ranking

**2. SEO & Discoverability:**
- Hybrid rendering: SSR for food detail pages, CSR for interactive features
- XML sitemap and robots.txt generation
- Schema.org structured data markup
- Open Graph and Twitter Card meta tags

**3. Accessibility (Mandatory):**
- WCAG 2.1 AA compliance affects every UI component choice
- Semantic HTML, ARIA attributes, keyboard navigation
- Screen reader and assistive technology compatibility

**4. Caching Strategy (Business-Critical):**
- Achieve 95%+ cache hit rate to stay within 10K API quota
- SQLite-first with API fallback
- Edge caching for static assets
- Cache invalidation strategy for food data updates

**5. Error Handling & Resilience:**
- Graceful degradation when API quota exhausted
- Fallback to cached data when external API unavailable
- User-friendly error messages
- Retry logic with exponential backoff

**6. Dark Mode Support:**
- Built-in Nuxt UI dark mode capability
- Theme persistence (user preference)
- Visual nutrition clarity in both themes

**7. Mobile-First Responsive Design:**
- Breakpoints: 320px (mobile), 640px-1024px (tablet), >1024px (desktop)
- Touch-optimized interactions (44x44px targets)
- Progressive enhancement approach

## Starter Template Evaluation

### Primary Technology Domain

**Identified Domain:** Full-stack Web Application with Nuxt v4 + Nuxt UI + SQLite + Serverless Deployment

Based on project requirements and established technology decisions, the architecture requires:
- Nuxt v4 with TypeScript configuration
- Nuxt UI v4 integration (125+ accessible components)
- Serverless-ready architecture (Vercel/Cloudflare compatible)
- SQLite database setup with serverless storage
- SEO/SSR capabilities for food detail pages
- Dark mode support built-in
- WCAG 2.1 AA accessibility foundation

---

### Starter Options Considered

**Option 1: Official Nuxt v4 Starter + Manual Nuxt UI Integration**
- ✅ Latest Nuxt v4 with all optimizations
- ✅ TypeScript configuration out of the box
- ✅ SSR/SSG hybrid rendering ready
- ⚠️ Nuxt UI needs manual installation
- ⚠️ SQLite setup requires manual configuration
- ⚠️ Serverless deployment configuration needed

**Option 2: Nuxt UI Templates (Dashboard/Starter)**
- ✅ Nuxt UI v4 pre-integrated
- ✅ Tailwind CSS configured
- ✅ Dark mode support built-in
- ✅ Accessibility components (WCAG-compliant)
- ⚠️ SQLite and serverless-specific setup still manual
- ⚠️ CalorieNinjas API integration needs custom implementation

**Option 3: Custom Build from Scratch (Maximum Control)**
- ✅ Every decision intentional
- ✅ No unnecessary abstractions
- ⚠️ More initial setup work
- ⚠️ Need to configure everything manually

---

### Selected Approach: Nuxt v4 Starter + Nuxt UI v4 Module

**Rationale for Selection:**

Given the **portfolio-first** requirements and desire to demonstrate **modern full-stack engineering**, the selected approach is:

**Start with clean Nuxt v4 project and add Nuxt UI as a module.**

**Why this approach:**

1. **Portfolio Value:** Shows understanding of how to integrate modules intentionally, not just use a template
2. **Learning:** Deeper understanding of Nuxt architecture and module ecosystem
3. **Flexibility:** Full control over SQLite setup, API integration, and serverless configuration
4. **Nuxt UI Benefits:** Still get 125+ accessible components, dark mode, Tailwind integration
5. **Simplicity:** Clean starting point without template overhead

**Project Name:** **nutrition-hub** (updated from generic name)

---

### Initialization Command

```bash
# Create new Nuxt 4 project with TypeScript
npx nuxi@latest init nutrition-hub

# Navigate to project
cd nutrition-hub

# Install dependencies
npm install

# Add Nuxt UI module
npx nuxi@latest module add @nuxt/ui

# Install additional dependencies
npm install better-sqlite3 html2canvas @types/html2canvas
```

**Note:** Project initialization using this command should be the first implementation story.

---

### Architectural Decisions Provided by Starter

**Language & Runtime:**
- **TypeScript** - Type safety throughout application
- **Node.js** - Server-side runtime for Nuxt Nitro server
- **Vue 3 Composition API** - Modern reactive programming model

**Styling Solution:**
- **Tailwind CSS** - Utility-first CSS framework (via Nuxt UI)
- **Nuxt UI Theme System** - CSS variables for theming
- **Dark Mode** - Built-in color mode switching (@nuxt/color-mode module)
- **Responsive Design** - Mobile-first breakpoints configured

**Build Tooling:**
- **Vite** - Fast build tool and dev server
- **Nuxt CLI** - Project scaffolding and module management
- **TypeScript Compiler** - Type checking and compilation
- **Production Optimizations** - Automatic code splitting, tree shaking, minification

**Testing Framework:**
- **Vitest** - Fast unit testing (configured in Nuxt v4 by default)
- **@nuxt/test-utils** - End-to-end testing utilities (optional, for later)

**Code Organization:**
- **File-based Routing** - `/pages` directory for routes
- **Auto-imports** - Components, composables, utilities auto-imported
- **Server Routes** - `/server/api` for API endpoints
- **Middleware** - `/middleware` for route guards
- **Plugins** - `/plugins` for Nuxt app extensions

**Development Experience:**
- **Hot Module Replacement (HMR)** - Instant updates during development
- **TypeScript Auto-completion** - Full IntelliSense support
- **Nitro Dev Server** - Development server with SSR
- **Debugging** - Vue DevTools integration
- **Documentation** - Auto-generated component documentation

---

### Custom Architecture Additions Required

**Additional Setup (Not from Starter):**

1. **SQLite Database** - Manual setup with better-sqlite3 package
2. **CalorieNinjas API Integration** - Custom API client with caching strategy
3. **Serverless Storage** - Vercel Blob or Cloudflare R2 configuration for SQLite file
4. **Analytics Dashboard** - Custom admin interface for monitoring
5. **Autocategorization Engine** - Custom JSON rule-based algorithm
6. **Social Sharing** - html2canvas integration for image generation

**Portfolio Demonstration Value:**

This approach demonstrates ability to:
- Integrate databases into Nuxt server architecture
- Build custom API integrations with intelligent caching
- Implement algorithmic features (autocategorization, analytics)
- Configure serverless deployment and storage
- Build production-ready features from architectural decisions

Perfect for showcasing full-stack engineering capabilities in a portfolio context.

## Core Architectural Decisions

### Decision Priority Analysis

**Critical Decisions (Block Implementation):**
- Database schema design for foods, categories, and autocategorization
- API caching strategy with SQLite-first approach
- CalorieNinjas API integration with response structure mapping
- Autocategorization algorithm with JSON rule engine
- Serverless deployment platform selection

**Important Decisions (Shape Architecture):**
- Icon module selection (@nuxt/icon)
- Project folder structure for Nuxt v4
- Server route organization pattern
- Component architecture approach

**Deferred Decisions (Post-MVP):**
- User authentication (not in MVP)
- Advanced caching strategies (beyond MVP needs)
- Multi-region deployment (future scaling)

---

### Data Architecture

**Database Choice:** SQLite with better-sqlite3 package

**Rationale:** 
- File-based database compatible with serverless architecture
- Zero external dependencies
- Portable single-file database
- Sufficient performance for nutrition data scale

**Schema Design:**

```sql
-- Foods table (primary nutrition data)
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

-- Categories table (autocategorization rules)
CREATE TABLE categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  rules_json TEXT NOT NULL, -- JSON rule definitions
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Food-Category junction table (many-to-many)
CREATE TABLE food_categories (
  food_id INTEGER NOT NULL,
  category_id INTEGER NOT NULL,
  match_score REAL DEFAULT 100,
  assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (food_id, category_id),
  FOREIGN KEY (food_id) REFERENCES foods(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- Performance indexes
CREATE INDEX idx_foods_name ON foods(name);
CREATE INDEX idx_foods_slug ON foods(slug);
CREATE INDEX idx_foods_protein ON foods(protein_g);
CREATE INDEX idx_food_categories_food ON food_categories(food_id);
CREATE INDEX idx_food_categories_category ON food_categories(category_id);
```

**CalorieNinjas API Response Structure Mapping:**

```typescript
// API response interface
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

// Database insert mapping
function mapApiToDatabase(apiResponse: CalorieNinjasResponse) {
  return {
    name: apiResponse.name,
    slug: generateSlug(apiResponse.name),
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
}
```

**API Endpoint:** `https://api.calorieninjas.com/v1/nutrition?query={food_name}`

**Authentication:** X-Api-Key header required

---

### API Caching Strategy

**Strategy: SQLite-First with Lazy API Fallback**

**Rationale:**
- Nutrition data is essentially static (100g chicken = 31g protein, forever)
- Minimize API calls to stay within 10K/month quota
- Target 95%+ cache hit rate
- Graceful degradation when API unavailable

**Caching Logic:**

```typescript
// Server-side caching strategy
async function getFood(query: string): Promise<Food | null> {
  // Phase 1: Check SQLite first (instant, free)
  let food = await db.foods.findBySlug(slugify(query));
  if (food) {
    return food;
  }
  
  // Phase 2: Lazy-load from CalorieNinjas API
  try {
    const apiResponse = await calorieNinjasAPI.query(query);
    
    // Phase 3: Cache immediately in SQLite
    food = await db.foods.create({
      ...mapApiToDatabase(apiResponse),
      slug: slugify(apiResponse.name)
    });
    
    return food;
  } catch (error) {
    if (error.quotaExceeded) {
      // Graceful degradation
      return null;
    }
    throw error;
  }
}
```

**Cache Performance Monitoring:**
- Track cache hit rate (target: 95%+)
- Monitor API quota usage (alert at 80%)
- Log cache misses for analysis

---

### Autocategorization Algorithm Design

**Approach: JSON Rule Engine with Match Scoring (0-100)**

**Rationale:**
- Flexible rule definition without code changes
- Transparent categorization logic
- Multi-dimensional match scoring
- Supports manual overrides

**Rule Structure:**

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

// Example category rules
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
```

**Match Scoring Algorithm:**

```typescript
function calculateMatchScore(food: Food, rule: CategoryRule): number {
  let score = 0;
  const maxScore = 100;
  
  // Each matching condition contributes to score
  const conditionCount = Object.keys(rule.conditions).length;
  const pointsPerCondition = maxScore / conditionCount;
  
  // Protein conditions
  if (rule.conditions.minProteinG && food.protein_g >= rule.conditions.minProteinG) {
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
  
  // Fat conditions
  if (rule.conditions.maxFatG && food.fat_total_g <= rule.conditions.maxFatG) {
    score += pointsPerCondition;
  }
  
  // Fiber conditions
  if (rule.conditions.minFiberG && food.fiber_g >= rule.conditions.minFiberG) {
    score += pointsPerCondition;
  }
  
  return Math.min(Math.round(score), maxScore);
}

// Batch categorization
async function categorizeFood(food: Food): Promise<void> {
  const categories = await db.categories.findAllActive();
  
  for (const category of categories) {
    const rule = JSON.parse(category.rules_json) as CategoryRule;
    const score = calculateMatchScore(food, rule);
    
    if (score >= 50) { // Minimum threshold
      await db.foodCategories.addFoodToCategory(food.id, category.id, score);
    }
  }
}
```

**Manual Override Capability:**
- Admin can manually add/remove foods from categories
- Manual assignments flagged to prevent auto-categorization overwrite

---

### Frontend Architecture

**Icon Module:** @nuxt/icon (official Nuxt Icons module)

**Rationale:**
- Access to 200,000+ icons from Iconify
- Auto-imported components
- Tree-shakeable (only import used icons)
- SSR compatible
- TypeScript support with auto-completion

**Usage:**

```vue
<template>
  <div>
    <!-- Icon from Heroicons -->
    <Icon name="heroicons:magnifying-glass" />
    
    <!-- Icon for search -->
    <Icon name="mdi:search" />
    
    <!-- Icon for high protein category -->
    <Icon name="mdi:dumbbell" />
  </div>
</template>
```

**State Management Approach:** Vue 3 Composition API with Composables

**Rationale:**
- Nuxt v4 auto-imports composables
- Lightweight state management for food search, categories
- No need for Pinia/Vuex for this scale
- Server state (foods, categories) managed via server routes

**Component Architecture:**
- **Pages:** File-based routing in `/pages`
- **Components:** Reusable Vue components in `/components`
- **Composables:** Reactive logic in `/composables`
- **Server Routes:** API endpoints in `/server/api`

---

### Infrastructure & Deployment

**Platform:** Vercel (Primary Choice)

**Rationale:**
- Official Nuxt framework support
- Vercel Blob storage for SQLite file
- Built-in analytics (meets NFR-REL-002)
- Edge Network for global CDN
- Seamless Git deployment (push to deploy)
- Generous free tier for hobby projects

**Deployment Configuration:**

```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  modules: ['@nuxt/ui', '@nuxt/icon'],
  
  // Vercel-specific configuration
  vercel: {
    regions: ['iad1'], // US East
  },
  
  // Environment variables
  runtimeConfig: {
    calorieNinjasApiKey: process.env.CALORIENINJAS_API_KEY,
    vercelBlobUrl: process.env.VERCEL_BLOB_URL,
  }
});
```

**Storage:** Vercel Blob for SQLite database file

**Database Storage Strategy:**
- SQLite file stored in Vercel Blob
- Cached locally in serverless function during execution
- Periodic backups to separate storage
- Connection pooling via better-sqlite3

**CI/CD Pipeline:**
1. Push to `main` branch
2. Vercel automatically deploys
3. Database migrations run automatically
4. Analytics and monitoring enabled by default

---

### Decision Impact Analysis

**Implementation Sequence:**

1. **Foundation First:** Project setup (Nuxt + SQLite + Nuxt UI + @nuxt/icon)
2. **Database Layer:** Schema creation and seeding (100-200 common foods)
3. **API Integration:** CalorieNinjas client with caching
4. **Autocategorization:** Rule engine and batch processing
5. **Frontend:** Search UI, food detail pages, category pages
6. **Analytics:** Admin dashboard and monitoring
7. **Polish:** Dark mode, accessibility, SEO optimization

**Cross-Component Dependencies:**

- Database schema → Autocategorization algorithm (must match fields)
- API response mapping → Database insert structure
- Icon module → All UI components (search, categories, analytics)
- Serverless deployment → SQLite file storage (Vercel Blob)
- Caching strategy → API quota monitoring (admin dashboard)

**Version Verification:**

- Nuxt v4 (latest stable)
- Nuxt UI v4 (latest stable)
- @nuxt/icon (latest stable)
- better-sqlite3 (latest stable)
- Vercel CLI (latest stable)

---

### Icon Module Configuration

**Module:** @nuxt/icon

**Setup Command:**

```bash
npx nuxi@latest module add @nuxt/icon
```

**Configuration (nuxt.config.ts):**

```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/icon'],
  
  icon: {
    // Custom icon sets if needed
    customCollections: []
  }
});
```

**Icon Collections Used:**
- **Heroicons:** Search, menu, UI elements (default in Nuxt UI)
- **Material Design Icons (MDI):** Category-specific icons (dumbbell, carrot, etc.)
- **Simple Icons:** Brand icons (social sharing)

**Accessibility:** All icons include aria-labels for screen readers

---

## Implementation Patterns & Consistency Rules

### Pattern Categories Defined

**Critical Conflict Points Identified:**
6 major areas where AI agents could make different choices, leading to implementation conflicts

### Naming Patterns

**Database Naming Conventions:**

*SQLite Schema (Internal Storage):*
- **Tables:** `snake_case` plural (e.g., `foods`, `categories`, `food_categories`)
- **Columns:** `snake_case` with descriptive suffixes (e.g., `protein_g`, `carbohydrates_total_g`, `fat_saturated_g`)
- **Foreign Keys:** `{table}_id` pattern (e.g., `food_id`, `category_id`)
- **Indexes:** `idx_{table}_{column}` pattern (e.g., `idx_foods_name`, `idx_foods_slug`)
- **Primary Keys:** `id` (integer auto-increment)

**Examples:**
```sql
CREATE TABLE foods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  protein_g REAL NOT NULL,
  carbohydrates_total_g REAL NOT NULL,
  fat_total_g REAL NOT NULL
);
```

**API Naming Conventions:**

*Server Routes (Nuxt API):*
- **Endpoint Pattern:** Feature-based nested structure (see Structure Patterns below)
- **Query Parameters:** `camelCase` (e.g., `?searchQuery=chicken&category=high-protein`)
- **Route Parameters:** Descriptive names (e.g., `/api/foods/:foodId` not `/api/foods/:id`)
- **Headers:** Standard headers (no custom X- headers unless necessary)

**Code Naming Conventions:**

*Components:*
- **File Name:** `PascalCase` (e.g., `FoodCard.vue`, `SearchBar.vue`, `NutritionLabel.vue`)
- **Component Usage:** `<FoodCard />` in templates
- **Consistency:** Matches Nuxt UI convention (e.g., `UButton`, `UCard`)

*Composables:*
- **File Name:** `use + PascalCase` (e.g., `useFoodSearch.ts`, `useNutritionData.ts`, `useCategories.ts`)
- **Function Name:** Matches file name exactly (e.g., `useFoodSearch()`)
- **Auto-Import:** Nuxt auto-imports from `/composables` directory

*Utilities & Helpers:*
- **File Name:** `camelCase` (e.g., `slugify.ts`, `calculateScore.ts`)
- **Function Name:** Can differ from file name, but export default

*TypeScript Interfaces/Types:*
- **Name:** `PascalCase` with descriptive suffix (e.g., `Food`, `Category`, `FoodSearchResult`)
- **File Location:** `/types/index.ts` or co-located with feature

### Structure Patterns

**Project Organization:**

*Nuxt v4 File Structure:*
```
nutrition-hub/
├── components/
│   ├── ui/              # Nuxt UI components (auto-imported)
│   ├── food/            # Food-related components
│   │   ├── FoodCard.vue
│   │   ├── NutritionLabel.vue
│   │   └── FoodSearchBar.vue
│   ├── category/        # Category-related components
│   │   ├── CategoryCard.vue
│   │   └── CategoryBadge.vue
│   └── admin/           # Admin dashboard components
│       ├── AnalyticsChart.vue
│       └── ApiQuotaMeter.vue
├── composables/
│   ├── useFoodSearch.ts      # Food search logic
│   ├── useNutritionData.ts   # Nutrition data fetching
│   ├── useCategories.ts      # Category management
│   └── useApiQuota.ts        # API quota monitoring
├── server/
│   └── api/
│       └── foods/
│           ├── index.ts           # GET /api/foods (list, search)
│           ├── [foodId].ts        # GET/PUT/DELETE /api/foods/:foodId
│           └── search.ts          # POST /api/foods/search
├── types/
│   └── index.ts             # Shared TypeScript interfaces
├── utils/
│   ├── slugify.ts          # URL slug generation
│   └── calculateScore.ts   # Autocategorization scoring
└── pages/
    ├── index.vue           # Home page with search
    ├── foods/
    │   ├── [foodSlug].vue  # Food detail page (SSR)
    └── categories/
        └── [categorySlug].vue  # Category page (SSR)
```

**File Structure Patterns:**

*Configuration Files:*
- Root level: `nuxt.config.ts`, `tailwind.config.ts`, `tsconfig.json`
- Environment: `.env.local` (gitignored), `.env.example` (template)

*Test Organization:*
- Co-located with features using `.test.ts` suffix
- E2E tests in `/tests/e2e/` directory

*Static Assets:*
- `/public/images/` for static images
- `/public/icons/` for custom icons

### Format Patterns

**API Response Formats:**

*Success Response Wrapper:*
```typescript
// GET /api/foods/:foodId
{
  data: {
    id: 1,
    name: "Chicken Breast",
    slug: "chicken-breast",
    proteinG: 31,
    carbohydratesTotalG: 0,
    fatTotalG: 3.6,
    // ... other fields in camelCase
  },
  success: true
}

// GET /api/foods (list)
{
  data: [
    { /* food object */ },
    { /* food object */ }
  ],
  meta: {
    total: 150,
    page: 1,
    limit: 20
  },
  success: true
}
```

*Error Response Wrapper:*
```typescript
// Error response (consistent structure)
{
  error: {
    message: "Food not found",
    code: "FOOD_NOT_FOUND",
    statusCode: 404
  },
  success: false
}

// API quota exceeded
{
  error: {
    message: "CalorieNinjas API quota exceeded. Please try again later.",
    code: "API_QUOTA_EXCEEDED",
    statusCode: 429
  },
  success: false
}
```

**Data Exchange Formats:**

*JSON Field Naming:*
- **API Responses:** `camelCase` (e.g., `proteinG`, `carbohydratesTotalG`)
- **Database Storage:** `snake_case` (e.g., `protein_g`, `carbohydrates_total_g`)
- **Transformation Layer:** Server routes transform between DB and API

*Date/Time Formats:*
- **API Responses:** ISO 8601 strings (e.g., `"2024-12-23T12:58:13Z"`)
- **Database:** SQLite TIMESTAMP (auto-converted by better-sqlite3)

*Boolean Representations:*
- **API Responses:** JavaScript `true`/`false`
- **Database:** SQLite INTEGER 0/1 (auto-converted)

*Null Handling:*
- **API:** Explicit `null` for missing optional fields
- **Database:** SQLite NULL for missing values

### Communication Patterns

**State Management Patterns:**

*Vue 3 Composition API (Reactive State):*
```typescript
// Composable pattern for reactive state
export function useFoodSearch() {
  const foods = ref<Food[]>([])
  const loading = ref<boolean>(false)
  const error = ref<string | null>(null)

  const searchFoods = async (query: string) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await $fetch<{data: Food[], success: boolean}>('/api/foods/search', {
        method: 'POST',
        body: { query }
      })
      
      if (response.success) {
        foods.value = response.data
      }
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  return {
    foods,
    loading,
    error,
    searchFoods
  }
}
```

*State Update Patterns:*
- **Immutable updates:** Always create new objects/arrays (Vue 3 reactivity)
- **Computed values:** Use `computed()` for derived state
- **Watch side effects:** Use `watch()` for API calls, logging

**Event Naming Conventions:**

*No global event system needed* (Nuxt state management with composables is sufficient)

*If events are added later:*
- Event names: `kebab-case` (e.g., `food:added`, `category:updated`)
- Event payloads: Typed interfaces for payload structure

### Process Patterns

**Error Handling Patterns:**

*Server Route Error Handling:*
```typescript
// /server/api/foods/[foodId].ts
export default defineEventHandler(async (event) => {
  const foodId = getRouterParam(event, 'foodId')
  
  try {
    const food = await getFoodById(foodId)
    
    if (!food) {
      throw createError({
        statusCode: 404,
        message: 'Food not found',
        statusMessage: 'FOOD_NOT_FOUND'
      })
    }
    
    return {
      data: food,
      success: true
    }
  } catch (error) {
    // Log to monitoring (Vercel Analytics)
    console.error('Error fetching food:', error)
    
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Internal server error'
    })
  }
})
```

*Component Error Handling:*
```vue
<script setup lang="ts">
const { data, loading, error } = useFoodSearch()

// User-friendly error messages
const errorMessage = computed(() => {
  if (!error.value) return null
  
  // Map error codes to user messages
  const errorMessages = {
    'API_QUOTA_EXCEEDED': 'Search temporarily unavailable. Please try again later.',
    'NETWORK_ERROR': 'Connection problem. Check your internet.',
    'DEFAULT': 'Something went wrong. Please try again.'
  }
  
  return errorMessages[error.value.code] || errorMessages.DEFAULT
})
</script>

<template>
  <div v-if="errorMessage" class="error-message">
    {{ errorMessage }}
  </div>
</template>
```

**Loading State Patterns:**

*Consistent Loading State Interface:*
```typescript
// ALL composables MUST return this interface
interface UseAsyncState<T> {
  data: Ref<T | null>
  loading: Ref<boolean>
  error: Ref<string | null>
}
```

*Component Loading UI:*
```vue
<script setup lang="ts">
const { data, loading, error } = useFoodSearch('chicken')
</script>

<template>
  <!-- Loading state -->
  <div v-if="loading" class="loading-spinner">
    <UIcon name="i-heroicons-arrow-path" class="animate-spin" />
    <span>Searching...</span>
  </div>
  
  <!-- Error state -->
  <UAlert
    v-else-if="error"
    icon="i-heroicons-exclamation-triangle"
    color="red"
    :title="error"
  />
  
  <!-- Success state -->
  <div v-else-if="data">
    <FoodCard v-for="food in data" :key="food.id" :food="food" />
  </div>
</template>
```

**Retry Logic Patterns:**

*CalorieNinjas API Retry (Server-Side):*
```typescript
// /server/utils/calorieninjas.ts
async function fetchFromCalorieNinjas(query: string, retries = 3): Promise<Food> {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
        headers: { 'X-Api-Key': process.env.CALORIENINJAS_API_KEY }
      })
      
      if (!response.ok) {
        if (response.status === 429) {
          // Rate limit - don't retry
          throw new Error('API_QUOTA_EXCEEDED')
        }
        if (response.status >= 500 && i < retries - 1) {
          // Server error - retry with exponential backoff
          await new Promise(resolve => setTimeout(resolve, Math.pow(2, i) * 1000))
          continue
        }
      }
      
      return await response.json()
    } catch (error) {
      if (i === retries - 1) throw error
    }
  }
}
```

### Enforcement Guidelines

**All AI Agents MUST:**

1. **Follow Data Format Transformation:**
   - Database `snake_case` → API `camelCase` transformation in ALL server routes
   - Never return raw database rows to API clients

2. **Use Consistent Response Wrappers:**
   - ALL API endpoints return `{ data, success }` or `{ error, success }`
   - Never throw raw errors without proper wrapping

3. **Match File Naming to Usage:**
   - Components: PascalCase files → `<ComponentName />` usage
   - Composables: `use + PascalCase` files → `useFunctionName()` calls

4. **Implement Standard Loading States:**
   - ALL async composables return `{ data, loading, error }` interface
   - ALL components handle `loading`, `error`, and `success` UI states

5. **Use Nested Server Routes:**
   - Group related endpoints in feature directories (e.g., `/server/api/foods/`)
   - Use descriptive route parameters (e.g., `:foodId` not `:id`)

**Pattern Enforcement:**

*Verification During Code Review:*
- Check all API responses match standard wrapper format
- Verify all database columns use `snake_case`
- Verify all API responses use `camelCase`
- Check composables return consistent `{ data, loading, error }` interface

*Documentation of Violations:*
- If pattern must be violated: Add `// EXCEPTION: [reason]` comment
- Document in code review why standard pattern couldn't be used

*Pattern Update Process:*
- Patterns documented in `docs/architecture.md`
- Changes require updating architecture document first
- Notify team of pattern changes before implementing

### Pattern Examples

**Good Examples:**

*✅ Correct: Database to API transformation*
```typescript
// Server route - transforms snake_case to camelCase
export default defineEventHandler(async (event) => {
  const foodDb = await db.get('SELECT * FROM foods WHERE id = ?', [foodId])
  
  // Transform to camelCase
  return {
    data: {
      id: foodDb.id,
      name: foodDb.name,
      slug: foodDb.slug,
      proteinG: foodDb.protein_g,          // snake_case → camelCase
      carbohydratesTotalG: foodDb.carbohydrates_total_g,
      fatTotalG: foodDb.fat_total_g
    },
    success: true
  }
})
```

*✅ Correct: Composable with standard interface*
```typescript
// composables/useFoodSearch.ts
export function useFoodSearch() {
  const data = ref<Food[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  // ... implementation
  
  return { data, loading, error, searchFoods }
}
```

*✅ Correct: Component file naming*
```typescript
// components/food/FoodCard.vue
<script setup lang="ts">
defineProps<{
  food: Food
}>()
</script>

<template>
  <div class="food-card">
    {{ food.name }}
  </div>
</template>
```

**Anti-Patterns:**

*❌ Avoid: No data transformation*
```typescript
// BAD: Returns raw database row with snake_case
export default defineEventHandler(async (event) => {
  const food = await db.get('SELECT * FROM foods WHERE id = ?', [foodId])
  return food  // ❌ Returns { protein_g, ... } instead of { proteinG, ... }
})
```

*❌ Avoid: Inconsistent response format*
```typescript
// BAD: Returns data directly without wrapper
export default defineEventHandler(async (event) => {
  return {
    id: 1,
    name: 'Chicken'
  }  // ❌ Should be { data: {...}, success: true }
})
```

*❌ Avoid: Non-standard composable interface*
```typescript
// BAD: Different return interface
export function useFood() {
  const foods = ref([])
  const isLoading = ref(false)  // ❌ Should be 'loading'
  const err = ref(null)          // ❌ Should be 'error'
  
  return { foods, isLoading, err }  // ❌ Inconsistent naming
}
```

*❌ Avoid: Inconsistent component naming*
```typescript
// components/food/food-card.vue  // ❌ Should be FoodCard.vue
// components/food/foodCard.vue   // ❌ Should be FoodCard.vue
```
