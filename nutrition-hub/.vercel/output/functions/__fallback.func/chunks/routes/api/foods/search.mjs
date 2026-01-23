import { d as defineEventHandler, g as getDb, s as successResponse, l as logError, c as createApiError, E as ErrorCode } from '../../../nitro/nitro.mjs';
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

const search = defineEventHandler(async (event) => {
  try {
    const db = getDb();
    return successResponse({
      data: [],
      meta: { total: 0, query: "", source: "database" }
    });
  } catch (error) {
    logError(error instanceof Error ? error : new Error(String(error)), { route: "/api/foods/search" });
    throw createApiError("Internal server error", ErrorCode.INTERNAL_ERROR, 500);
  }
});

export { search as default };
//# sourceMappingURL=search.mjs.map
