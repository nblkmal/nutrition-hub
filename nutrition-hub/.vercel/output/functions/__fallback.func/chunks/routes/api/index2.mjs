import { d as defineEventHandler, g as getDb, s as successResponse, c as createError } from '../../nitro/nitro.mjs';
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

const index = defineEventHandler(async (event) => {
  try {
    const db = getDb();
    return successResponse([], { total: 0, page: 1, limit: 20 });
  } catch (error) {
    console.error("Error in /api/foods:", error);
    throw createError({
      statusCode: 500,
      message: "Internal server error",
      statusMessage: "INTERNAL_ERROR"
    });
  }
});

export { index as default };
//# sourceMappingURL=index2.mjs.map
