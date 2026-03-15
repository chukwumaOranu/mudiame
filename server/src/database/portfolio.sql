-- Portfolio schema
-- Purpose: manage portfolio/gallery items displayed on the homepage and dashboard.
-- SQL dialect: MySQL 8+

CREATE TABLE IF NOT EXISTS portfolio_items (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  title VARCHAR(180) NOT NULL,
  slug VARCHAR(220) NOT NULL UNIQUE,
  description TEXT NULL,
  image_url TEXT NOT NULL,
  category VARCHAR(120) NOT NULL,
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  sort_order INT NOT NULL DEFAULT 0,
  is_featured TINYINT(1) NOT NULL DEFAULT 0,
  created_by BIGINT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_portfolio_items_category (category),
  KEY idx_portfolio_items_status_sort (status, sort_order, created_at),
  KEY idx_portfolio_items_created_by (created_by),
  CONSTRAINT fk_portfolio_items_created_by
    FOREIGN KEY (created_by) REFERENCES app_users(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
