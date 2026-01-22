# Nutrition Hub

A full-stack nutrition tracking application built with Nuxt v4, featuring instant food search, nutrition information display, and autocategorization engine.

## Tech Stack

- **Framework:** Nuxt v4 (Vue 3 + TypeScript + Nitro)
- **UI Library:** Nuxt UI v4 (Tailwind CSS + accessible components)
- **Database:** SQLite with better-sqlite3
- **API:** CalorieNinjas Nutrition API
- **Icons:** @nuxt/icon (200K+ icons from Iconify)
- **Testing:** Vitest
- **Deployment:** Vercel/Cloudflare Pages (serverless)

## Prerequisites

### Required Software

- **Node.js:** v20.19+ (required for Nuxt v4)
  - Check your version: `node --version`
  - Install: [nodejs.org](https://nodejs.org/)

- **Package Manager:** npm (bundled with Node.js)
  - Alternative: pnpm, yarn, or bun

### Development Tools

```bash
# Verify Node.js version (must be v20.19+)
node --version

# Navigate to project
cd nutrition-hub
```

## Development Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup (Automatic)

The SQLite database is automatically initialized on first run:

- **Database Location:** `data/nutrition-hub.db`
- **Schema:** Auto-migrated from `server/database/migrations/*.sql`
- **Seed Data:** 125 common foods + 5 nutrition categories

Run database seed manually (optional - auto-seeds on first run):

```bash
# Seed database with initial data
npm run seed

# Reset and reseed database
npm run seed:reset
```

### 3. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

### 4. Run Tests

```bash
# Run all tests
npm test

# Watch mode
npm run test:watch
```

## Development Requirements Summary

| Requirement | Version/Value | Notes |
|------------|---------------|-------|
| Node.js | v20.19+ | Required for Nuxt v4 |
| Database | SQLite 3 | better-sqlite3 v12.5.0 |
| Storage | Local filesystem | `data/` directory |
| API Key | Optional | CalorieNinjas (for API fallback) |

## Production Setup

### Required Environment Variables

Create a `.env` file in the project root (see `.env.example` for reference):

```bash
# CalorieNinjas API (optional but recommended)
# Get free API key: https://calorieninjas.com/
CALORIENINJAS_API_KEY=your_api_key_here

# Vercel Blob Storage (required for Vercel deployment)
VERCEL_BLOB_URL=blob_storage_url_here

# Or Cloudflare R2 (for Cloudflare deployment)
# R2_ACCOUNT_ID=your_account_id
# R2_ACCESS_KEY_ID=your_access_key
# R2_SECRET_ACCESS_KEY=your_secret_key
# R2_BUCKET_NAME=your_bucket_name
```

### 1. Get CalorieNinjas API Key

1. Visit [calorieninjas.com](https://calorieninjas.com/)
2. Sign up for free account (10,000 calls/month)
3. Copy your API key
4. Add to `.env`: `CALORIENINJAS_API_KEY=your_key`

**Note:** The app uses SQLite-first strategy with API fallback, so quota usage is minimal.

### 2. Configure Database Storage (Serverless)

#### Option A: Vercel Blob (Recommended for Vercel)

1. Install Vercel CLI: `npm i -g vercel`
2. Link project: `vercel link`
3. Create Blob storage: `vercel blob create`
4. Add `VERCEL_BLOB_URL` to environment variables

#### Option B: Cloudflare R2 (Recommended for Cloudflare)

1. Create R2 bucket in Cloudflare dashboard
2. Add R2 credentials to environment variables
3. Update `nuxt.config.ts` with R2 configuration

### 3. Build for Production

```bash
npm run build
```

### 4. Deploy

#### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

#### Cloudflare Pages

```bash
# Install Wrangler CLI
npm install -g wrangler

# Build and deploy
npm run build
wrangler pages deploy .output/public
```

## Production Requirements Summary

| Requirement | Service | Purpose |
|------------|---------|---------|
| API Key | CalorieNinjas | Food nutrition data fallback |
| Database Storage | Vercel Blob / R2 | SQLite file persistence |
| Runtime | Node.js v20.19+ | Serverless execution |

## Project Structure

```
nutrition-hub/
├── components/          # Vue components
│   ├── ui/             # Nuxt UI components (auto-imported)
│   ├── food/           # Food-related components
│   └── category/       # Category-related components
├── composables/        # Vue 3 composition API functions
├── pages/              # File-based routing
│   ├── index.vue       # Home page
│   ├── foods/[...].vue # Food detail pages (SSR)
│   └── categories/[...].vue # Category pages (SSR)
├── server/
│   ├── api/            # API endpoints
│   ├── database/       # Database operations & migrations
│   │   ├── migrations/ # SQL migration files
│   │   ├── seed.ts     # Database seed script
│   │   └── seed-*.ts   # Seed data files
│   └── utils/          # Server utilities
├── types/              # TypeScript type definitions
├── utils/              # Shared utility functions
├── data/               # SQLite database (local dev only)
└── public/             # Static assets
```

## Key Patterns

### Singleton Database Pattern

**CRITICAL:** Always call `getDb()` ONCE before loops:

```typescript
// ✅ CORRECT
const db = getDb()  // Call once
for (const food of foods) {
  db.prepare('SELECT...').all()
}

// ❌ WRONG - Creates multiple connections
for (const food of foods) {
  const db = getDb()  // Bug!
}
```

### Server File Import Pattern

Server files (`/server/api/`, `/server/database/`) must use **relative imports**:

```typescript
// ✅ CORRECT for server files
import { getDb } from '../utils/database'

// ❌ WRONG - fails in server context
import { getDb } from '~/utils/database'
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run test` | Run all tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run seed` | Seed database (idempotent) |
| `npm run seed:reset` | Reset and reseed database |

## Troubleshooting

### Database Not Found

If you get "Database not found" error:

```bash
# Re-run migrations and seed
npm run seed:reset
```

### Wrong Node.js Version

If you get "Unsupported Node.js version" error:

```bash
# Check version
node --version

# Must be v20.19 or higher
# Install from nodejs.org
```

### Better-sqlite3 Build Errors

If native module compilation fails:

```bash
# Rebuild native modules
npm rebuild better-sqlite3
```

## License

MIT

## Credits

- [Nuxt.js](https://nuxt.com/) - Vue.js Framework
- [Nuxt UI](https://ui.nuxt.com/) - UI Component Library
- [CalorieNinjas](https://calorieninjas.com/) - Nutrition API
- [USDA FoodData Central](https://fdc.nal.usda.gov/) - Nutrition Data Source
