import { d as defineEventHandler, g as getDb, a as getRouterParam, c as createError } from '../../../nitro/nitro.mjs';
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
      throw createError({
        statusCode: 400,
        message: "foodId parameter is required",
        statusMessage: "VALIDATION_ERROR"
      });
    }
    throw createError({
      statusCode: 404,
      message: "Food not found",
      statusMessage: "FOOD_NOT_FOUND"
    });
  } catch (error) {
    console.error("Error in /api/foods/:foodId:", error);
    if (error && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    throw createError({
      statusCode: 500,
      message: "Internal server error",
      statusMessage: "INTERNAL_ERROR"
    });
  }
});

export { _foodId_ as default };
//# sourceMappingURL=_foodId_.mjs.map
