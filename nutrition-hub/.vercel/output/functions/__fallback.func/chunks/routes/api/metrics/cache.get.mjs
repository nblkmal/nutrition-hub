import { d as defineEventHandler, g as getDb, j as getQuotaStatus, k as getCacheMetrics } from '../../../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'better-sqlite3';
import 'fs';
import 'path';
import '@iconify/utils';
import 'consola';

const cache_get = defineEventHandler(async () => {
  const db = getDb();
  const totalFoods = db.get("SELECT COUNT(*) as count FROM foods");
  const cachedFromApi = db.get(
    "SELECT COUNT(*) as count FROM foods WHERE data_source = 'calorieninjas'"
  );
  const quotaStatus = getQuotaStatus();
  const cacheMetrics = getCacheMetrics();
  return {
    data: {
      cache: {
        totalFoods: (totalFoods == null ? void 0 : totalFoods.count) || 0,
        fromApi: (cachedFromApi == null ? void 0 : cachedFromApi.count) || 0
      },
      performance: {
        today: {
          cacheHits: cacheMetrics.cacheHits,
          cacheMisses: cacheMetrics.cacheMisses,
          totalLookups: cacheMetrics.totalLookups,
          cacheHitRate: `${cacheMetrics.cacheHitRate.toFixed(2)}%`,
          averageResponseTimeMs: Math.round(cacheMetrics.averageResponseTimeMs)
        }
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
        isMonthlyQuotaExceeded: quotaStatus.isMonthlyQuotaExceeded
      }
    },
    success: true
  };
});

export { cache_get as default };
//# sourceMappingURL=cache.get.mjs.map
