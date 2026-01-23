// server/api/metrics/cache.get.ts
// Cache metrics endpoint for performance monitoring

import { getDb } from '../../utils/database'
import { getQuotaStatus, getCacheMetrics } from '../../utils/quota'

export default defineEventHandler(async () => {
  const db = getDb()

  const totalFoods = db.get<{ count: number }>('SELECT COUNT(*) as count FROM foods')
  const cachedFromApi = db.get<{ count: number }>(
    "SELECT COUNT(*) as count FROM foods WHERE data_source = 'calorieninjas'"
  )

  const quotaStatus = getQuotaStatus()
  const cacheMetrics = getCacheMetrics()

  return {
    data: {
      cache: {
        totalFoods: totalFoods?.count || 0,
        fromApi: cachedFromApi?.count || 0,
      },
      performance: {
        today: {
          cacheHits: cacheMetrics.cacheHits,
          cacheMisses: cacheMetrics.cacheMisses,
          totalLookups: cacheMetrics.totalLookups,
          cacheHitRate: `${cacheMetrics.cacheHitRate.toFixed(2)}%`,
          averageResponseTimeMs: Math.round(cacheMetrics.averageResponseTimeMs),
        },
      },
      quota: {
        dailyCalls: quotaStatus.dailyCalls,
        dailyLimit: quotaStatus.dailyLimit,
        dailyPercentage: `${(quotaStatus.dailyPercentage * 100).toFixed(1)}%`,
        monthlyCalls: quotaStatus.monthlyCalls,
        monthlyLimit: quotaStatus.monthlyLimit,
        monthlyPercentage: `${(quotaStatus.monthlyPercentage * 100).toFixed(1)}%`,
        isDailyWarning: quotaStatus.isDailyWarning,
        isMonthlyWarning: quotaStatus.isMonthlyWarning,
        isDailyQuotaExceeded: quotaStatus.isDailyQuotaExceeded,
        isMonthlyQuotaExceeded: quotaStatus.isMonthlyQuotaExceeded,
      },
    },
    success: true,
  }
})
