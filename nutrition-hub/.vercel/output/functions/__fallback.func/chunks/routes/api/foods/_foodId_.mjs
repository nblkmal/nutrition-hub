import { d as defineEventHandler, g as getDb, a as getRouterParam, c as createApiError, E as ErrorCode, b as createNotFoundError, l as logError } from '../../../nitro/nitro.mjs';
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
  try {
    const db = getDb();
    const foodId = getRouterParam(event, "foodId");
    if (!foodId) {
      throw createApiError("foodId parameter is required", ErrorCode.INTERNAL_ERROR, 400);
    }
    throw createNotFoundError("Food", foodId);
  } catch (error) {
    logError(error instanceof Error ? error : new Error(String(error)), { route: "/api/foods/:foodId" });
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    throw createApiError("Internal server error", ErrorCode.INTERNAL_ERROR, 500);
  }
});

export { _foodId_ as default };
//# sourceMappingURL=_foodId_.mjs.map
