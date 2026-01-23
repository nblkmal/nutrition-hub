// server/utils/logger.ts
// Logging utilities for consistent server-side logging

/**
 * Log severity levels
 */
export type LogLevel = 'info' | 'warn' | 'error'

/**
 * Log a message with the specified level and optional metadata
 * @param level - Log severity level
 * @param message - Log message
 * @param meta - Optional metadata to include in log entry
 */
export function log(level: LogLevel, message: string, meta?: Record<string, unknown>) {
  const timestamp = new Date().toISOString()
  const logEntry = {
    timestamp,
    level,
    message,
    ...meta,
  }

  console.log(JSON.stringify(logEntry))

  // TODO: In production, send to monitoring service (Vercel Analytics)
}

/**
 * Log an API call with endpoint and duration
 * @param endpoint - API endpoint path
 * @param duration - Request duration in milliseconds
 */
export function logApiCall(endpoint: string, duration: number) {
  log('info', 'API_CALL', { endpoint, duration })
}

/**
 * Log an error with stack trace and optional context
 * @param error - Error object to log
 * @param context - Optional context information
 */
export function logError(error: Error, context?: Record<string, unknown>) {
  log('error', error.message, { stack: error.stack, ...context })
}
