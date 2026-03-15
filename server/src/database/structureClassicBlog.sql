-- Blog Classic page schema
-- Purpose: support classic blog listing cards and pagination.
-- SQL dialect: MySQL 8+

CREATE TABLE IF NOT EXISTS classic_blog_authors (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  display_name VARCHAR(120) NOT NULL,
  slug VARCHAR(150) NOT NULL UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS classic_blog_posts (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  author_id BIGINT UNSIGNED NOT NULL,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) NOT NULL UNIQUE,
  excerpt TEXT,
  content LONGTEXT,
  featured_image_url TEXT,
  published_at DATETIME NULL,
  status ENUM('draft', 'published', 'archived') NOT NULL DEFAULT 'draft',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  KEY idx_classic_blog_posts_author (author_id),
  KEY idx_classic_blog_posts_status_published (status, published_at),
  CONSTRAINT fk_classic_blog_posts_author
    FOREIGN KEY (author_id) REFERENCES classic_blog_authors(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS classic_blog_post_metrics (
  post_id BIGINT UNSIGNED NOT NULL,
  comment_count INT UNSIGNED NOT NULL DEFAULT 0,
  view_count INT UNSIGNED NOT NULL DEFAULT 0,
  share_count INT UNSIGNED NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (post_id),
  CONSTRAINT fk_classic_blog_post_metrics_post
    FOREIGN KEY (post_id) REFERENCES classic_blog_posts(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS classic_blog_categories (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  name VARCHAR(120) NOT NULL UNIQUE,
  slug VARCHAR(150) NOT NULL UNIQUE,
  description TEXT,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS classic_blog_post_categories (
  post_id BIGINT UNSIGNED NOT NULL,
  category_id BIGINT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (post_id, category_id),
  KEY idx_classic_blog_post_categories_category (category_id),
  CONSTRAINT fk_classic_blog_post_categories_post
    FOREIGN KEY (post_id) REFERENCES classic_blog_posts(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_classic_blog_post_categories_category
    FOREIGN KEY (category_id) REFERENCES classic_blog_categories(id)
    ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Optional helper view for list endpoints:
-- SELECT p.id, p.title, p.slug, p.excerpt, p.featured_image_url, p.published_at,
--        a.display_name AS author_name, m.comment_count, m.view_count
-- FROM classic_blog_posts p
-- JOIN classic_blog_authors a ON a.id = p.author_id
-- LEFT JOIN classic_blog_post_metrics m ON m.post_id = p.id
-- WHERE p.status = 'published'
-- ORDER BY p.published_at DESC
-- LIMIT 10 OFFSET 0;
