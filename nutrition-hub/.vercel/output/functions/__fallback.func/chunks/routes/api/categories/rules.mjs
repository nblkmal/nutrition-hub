import { d as defineEventHandler, g as getDb, s as successResponse, e as createError } from '../../../nitro/nitro.mjs';
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

const rules = defineEventHandler(async (event) => {
  try {
    const db = getDb();
    return successResponse({
      categorized: 0,
      results: []
    });
  } catch (error) {
    console.error("Error in /api/categories/rules:", error);
    throw createError({
      statusCode: 500,
      message: "Internal server error",
      statusMessage: "INTERNAL_ERROR"
    });
  }
});

export { rules as default };
//# sourceMappingURL=rules.mjs.map
