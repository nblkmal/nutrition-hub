import { d as defineEventHandler, h as getQuery, v as validateSearchQuery, i as getFoodWithCache, f as logApiCall, l as logError, c as createApiError, E as ErrorCode } from '../../../nitro/nitro.mjs';
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

const search_get = defineEventHandler(async (event) => {
  const startTime = Date.now();
  try {
    const query = getQuery(event);
    const searchQuery2 = query.q;
    const validation = validateSearchQuery(searchQuery2 || "");
    if (!validation.isValid) {
      return {
        data: null,
        success: false,
        error: {
          message: validation.errors.join("; "),
          code: "VALIDATION_ERROR",
          statusCode: 400
        }
      };
    }
    const food = await getFoodWithCache(validation.normalizedQuery);
    const duration = Date.now() - startTime;
    logApiCall("/api/foods/search", duration);
    if (food === null) {
      return {
        data: null,
        success: false,
        error: {
          message: "Search temporarily unavailable. Please try again later.",
          code: "API_QUOTA_EXCEEDED",
          statusCode: 503
        }
      };
    }
    return {
      data: food,
      success: true
    };
  } catch (error) {
    const duration = Date.now() - startTime;
    logApiCall("/api/foods/search", duration);
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    logError(error instanceof Error ? error : new Error(String(error)), {
      route: "/api/foods/search",
      query: searchQuery
    });
    throw createApiError("Internal server error", ErrorCode.INTERNAL_ERROR, 500);
  }
});

export { search_get as default };
//# sourceMappingURL=search.get.mjs.map
