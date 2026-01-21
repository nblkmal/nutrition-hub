import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), 'data')
const DB_PATH = path.join(DATA_DIR, 'nutrition-hub.db')
const MIGRATIONS_DIR = path.join(process.cwd(), 'server', 'database', 'migrations')

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true })
}

/**
 * Get or create the singleton database connection.
 * Foreign keys are enabled permanently on this connection.
 * The connection remains open for the lifetime of the server process.
 */
let dbInstance: Database.Database | null = null

export function getDatabase(): Database.Database {
  // Return existing instance if available (singleton pattern)
  if (dbInstance) {
    return dbInstance
  }

  try {
    const db = new Database(DB_PATH)

    // CRITICAL: Enable foreign keys for CASCADE DELETE to work
    // This PRAGMA must be set on every new database connection
    db.pragma('foreign_keys = ON')

    // Verify FK is enabled (pragma returns the current value: 1 = enabled, 0 = disabled)
    const fkEnabled = db.pragma('foreign_keys', { simple: true }) as number
    if (fkEnabled !== 1) {
      throw new Error(`Foreign keys could not be enabled (got: ${fkEnabled}, expected: 1)`)
    }

    console.log('[database] Foreign keys enabled, CASCADE DELETE active')
    dbInstance = db
    return db
  } catch (error) {
    console.error('[database] Failed to open database:', error)
    throw new Error(`Database initialization failed: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export function runMigrations(db: Database.Database): void {
  try {
    // Check if migrations directory exists
    if (!fs.existsSync(MIGRATIONS_DIR)) {
      console.warn('[database] Migrations directory not found:', MIGRATIONS_DIR)
      return
    }

    const migrationFiles = fs.readdirSync(MIGRATIONS_DIR)
      .filter(f => f.endsWith('.sql'))
      .sort()

    if (migrationFiles.length === 0) {
      console.warn('[database] No migration files found in', MIGRATIONS_DIR)
      return
    }

    for (const file of migrationFiles) {
      const migrationPath = path.join(MIGRATIONS_DIR, file)

      try {
        const migration = fs.readFileSync(migrationPath, 'utf-8')
        db.exec(migration)
        console.log(`[database] Executed migration: ${file}`)
      } catch (error) {
        console.error(`[database] Migration failed: ${file}`, error)
        throw new Error(`Migration "${file}" failed: ${error instanceof Error ? error.message : String(error)}`)
      }
    }
  } catch (error) {
    console.error('[database] Failed to run migrations:', error)
    throw error
  }
}

export function initDatabase(): Database.Database {
  const db = getDatabase()
  runMigrations(db)
  console.log('[database] Database initialized successfully')
  return db
}

/**
 * Get the singleton database instance.
 * Initializes the database on first call.
 * The database connection is reused across all requests in the server process.
 */
export function getDb(): Database.Database {
  if (!dbInstance) {
    dbInstance = initDatabase()
  }
  return dbInstance
}

// Export the database getter function for use in API routes
export { getDb as db }
