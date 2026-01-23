import { d as defineEventHandler, g as getDb, s as successResponse, l as logError, c as createApiError, E as ErrorCode } from '../../nitro/nitro.mjs';
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
    logError(error instanceof Error ? error : new Error(String(error)), { route: "/api/foods" });
    throw createApiError("Internal server error", ErrorCode.INTERNAL_ERROR, 500);
  }
});

export { index as default };
//# sourceMappingURL=index2.mjs.map
