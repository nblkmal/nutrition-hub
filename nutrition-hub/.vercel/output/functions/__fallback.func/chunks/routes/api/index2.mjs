import { d as defineEventHandler, g as getDb, h as getQuery, t as transformFood, f as logApiCall, s as successResponse, l as logError, c as createApiError, E as ErrorCode } from '../../nitro/nitro.mjs';
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
  const startTime = Date.now();
  try {
    const db = getDb();
    const query = getQuery(event);
    const searchQuery = query.q;
    const rawPage = query.page;
    const rawPageSize = query.pageSize || query.limit;
    const parsedPage = parseInt(rawPage || "");
    const page = isNaN(parsedPage) || parsedPage < 1 ? 1 : Math.max(1, parsedPage);
    const parsedPageSize = parseInt(rawPageSize || "");
    const pageSize = isNaN(parsedPageSize) || parsedPageSize < 1 ? 20 : Math.min(Math.max(1, parsedPageSize), 100);
    const offset = (page - 1) * pageSize;
    let totalRecords;
    if (searchQuery) {
      const searchPattern = (searchQuery + "%").toLowerCase();
      const countResult = db.prepare(`
        SELECT COUNT(*) as count FROM foods
        WHERE LOWER(name) LIKE ?
      `).get(searchPattern);
      totalRecords = countResult.count;
    } else {
      const countResult = db.prepare("SELECT COUNT(*) as count FROM foods").get();
      totalRecords = countResult.count;
    }
    const totalPages = Math.ceil(totalRecords / pageSize);
    const hasNextPage = page < totalPages;
    const hasPrevPage = page > 1;
    let foods;
    if (searchQuery) {
      const searchPattern = (searchQuery + "%").toLowerCase();
      foods = db.prepare(`
        SELECT * FROM foods
        WHERE LOWER(name) LIKE ?
        ORDER BY
          CASE WHEN LOWER(name) = LOWER(?) THEN 0 ELSE 1 END,
          name ASC
        LIMIT ? OFFSET ?
      `).all(searchPattern, searchQuery, pageSize, offset);
    } else {
      foods = db.prepare("SELECT * FROM foods LIMIT ? OFFSET ?").all(pageSize, offset);
    }
    const transformedFoods = foods.map(transformFood);
    const duration = Date.now() - startTime;
    logApiCall("/api/foods", duration);
    return successResponse(transformedFoods, {
      total: totalRecords,
      limit: pageSize,
      page,
      pageSize,
      totalPages,
      hasNextPage,
      hasPrevPage
    });
  } catch (error) {
    logError(error instanceof Error ? error : new Error(String(error)), { route: "/api/foods" });
    throw createApiError("Internal server error", ErrorCode.INTERNAL_ERROR, 500);
  }
});

export { index as default };
//# sourceMappingURL=index2.mjs.map
