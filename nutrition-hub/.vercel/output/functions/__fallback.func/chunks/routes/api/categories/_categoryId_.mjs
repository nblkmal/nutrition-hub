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

const _categoryId_ = defineEventHandler(async (event) => {
  try {
    const db = getDb();
    const categoryId = getRouterParam(event, "categoryId");
    if (!categoryId) {
      throw createError({
        statusCode: 400,
        message: "categoryId parameter is required",
        statusMessage: "VALIDATION_ERROR"
      });
    }
    throw createError({
      statusCode: 404,
      message: "Category not found",
      statusMessage: "CATEGORY_NOT_FOUND"
    });
  } catch (error) {
    console.error("Error in /api/categories/:categoryId:", error);
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

export { _categoryId_ as default };
//# sourceMappingURL=_categoryId_.mjs.map
