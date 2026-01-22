// server/utils/response.ts
// Standard API response format utilities

export function successResponse<T>(data: T, meta?: Record<string, unknown>) {
  const response: { data: T; success: true; meta?: Record<string, unknown> } = {
    data,
    success: true,
  }
  if (meta) {
    response.meta = meta
  }
  return response
}

export function errorResponse(message: string, code: string, statusCode: number) {
  return {
    error: {
      message,
      code,
      statusCode,
    },
    success: false,
  }
}
