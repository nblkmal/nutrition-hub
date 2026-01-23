-- server/database/migrations/004_add_api_usage_and_metrics.sql
-- Migration: Add API usage logs and search metrics tables
-- Story: 2.3 CalorieNinjas API Integration with Caching

-- API usage logs for tracking CalorieNinjas API calls
CREATE TABLE IF NOT EXISTS api_usage_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  api_endpoint TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_api_usage_logs_date ON api_usage_logs(date(created_at));
CREATE INDEX IF NOT EXISTS idx_api_usage_logs_month ON api_usage_logs(created_at);

-- Search metrics for tracking cache performance
CREATE TABLE IF NOT EXISTS search_metrics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  query TEXT NOT NULL,
  slug TEXT NOT NULL,
  cache_hit BOOLEAN NOT NULL,
  response_time_ms INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_search_metrics_date ON search_metrics(date(created_at));
CREATE INDEX IF NOT EXISTS idx_search_metrics_slug ON search_metrics(slug);
