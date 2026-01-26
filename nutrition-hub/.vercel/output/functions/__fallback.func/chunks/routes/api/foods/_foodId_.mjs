import { d as defineEventHandler, g as getDb, a as getRouterParam, c as createApiError, E as ErrorCode, b as createNotFoundError, t as transformFood, f as logApiCall, l as logError } from '../../../nitro/nitro.mjs';
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

const _foodId_ = defineEventHandler(async (event) => {
  const startTime = Date.now();
  try {
    const db = getDb();
    const foodId = getRouterParam(event, "foodId");
    if (!foodId) {
      throw createApiError("foodId parameter is required", ErrorCode.INTERNAL_ERROR, 400);
    }
    const food = db.prepare(`
      SELECT * FROM foods WHERE id = ? OR slug = ?
    `).get(foodId, foodId);
    if (!food) {
      return createNotFoundError("Food", foodId, { returnResponse: true, event });
    }
    const transformedFood = transformFood(food);
    const duration = Date.now() - startTime;
    logApiCall("/api/foods/:foodId", duration);
    return {
      data: transformedFood,
      success: true
    };
  } catch (error) {
    logError(error instanceof Error ? error : new Error(String(error)), {
      route: "/api/foods/:foodId"
    });
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    throw createApiError("Internal server error", ErrorCode.INTERNAL_ERROR, 500);
  }
});

export { _foodId_ as default };
//# sourceMappingURL=_foodId_.mjs.map
