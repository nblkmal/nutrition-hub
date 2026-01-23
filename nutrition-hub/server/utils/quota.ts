// server/utils/quota.ts
// API quota tracking for CalorieNinjas

import { getDb } from './database'
import { logError } from './logger'

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

/**
 * Get current quota status for CalorieNinjas API
 * @returns QuotaStatus with current usage and limits
 */
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

/**
 * Log an API call to the usage tracking table
 * Also checks quota thresholds and logs warnings
 */
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

/**
 * Check if an API call should be allowed based on quota
 * @returns true if calls are allowed, false if quota exceeded
 */
export function shouldAllowApiCall(): boolean {
  const status = getQuotaStatus()
  return !status.isMonthlyQuotaExceeded
}

/**
 * Log a search metric for cache performance tracking
 * @param query - The search query
 * @param slug - The normalized slug
 * @param cacheHit - Whether the query was a cache hit
 * @param responseTimeMs - Response time in milliseconds
 */
export function logSearchMetric(
  query: string,
  slug: string,
  cacheHit: boolean,
  responseTimeMs: number
): void {
  const db = getDb()
  db.run(
    'INSERT INTO search_metrics (query, slug, cache_hit, response_time_ms) VALUES (?, ?, ?, ?)',
    [query, slug, cacheHit ? 1 : 0, responseTimeMs]
  )
}

/**
 * Get cache performance metrics for today
 */
export interface CacheMetrics {
  totalLookups: number
  cacheHits: number
  cacheMisses: number
  cacheHitRate: number
  averageResponseTimeMs: number
}

export function getCacheMetrics(): CacheMetrics {
  const db = getDb()
  const today = new Date().toISOString().split('T')[0]

  const cacheHits = db.get<{ count: number }>(
    'SELECT COUNT(*) as count FROM search_metrics WHERE cache_hit = 1 AND date(created_at) = ?',
    [today]
  )
  const cacheMisses = db.get<{ count: number }>(
    'SELECT COUNT(*) as count FROM search_metrics WHERE cache_hit = 0 AND date(created_at) = ?',
    [today]
  )
  const avgResponse = db.get<{ avg: number }>(
    'SELECT AVG(response_time_ms) as avg FROM search_metrics WHERE date(created_at) = ?',
    [today]
  )

  const hits = cacheHits?.count || 0
  const misses = cacheMisses?.count || 0
  const total = hits + misses
  const hitRate = total > 0 ? (hits / total) * 100 : 0

  return {
    totalLookups: total,
    cacheHits: hits,
    cacheMisses: misses,
    cacheHitRate: hitRate,
    averageResponseTimeMs: avgResponse?.avg || 0,
  }
}
