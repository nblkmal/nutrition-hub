// Server middleware to initialize database
// This runs before any API routes, ensuring database is ready
import { getDb } from '../utils/database'

// TypeScript type augmentation for H3Event context
declare module 'h3' {
  interface H3EventContext {
    db: import('better-sqlite3').Database
  }
}

export default defineEventHandler((event) => {
  // Get or initialize the singleton database connection
  // The database is initialized once and reused across all requests
  const db = getDb()

  // Attach database instance to event context for use in API routes
  event.context.db = db
})
