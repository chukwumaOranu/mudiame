-- Enhance categories and tighten relations for classic blog
-- SQL dialect: MySQL 8+

-- Add description if missing
SET @col_description_exists := (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'classic_blog_categories'
    AND COLUMN_NAME = 'description'
);
SET @sql_add_description := IF(
  @col_description_exists = 0,
  'ALTER TABLE classic_blog_categories ADD COLUMN description TEXT NULL AFTER slug',
  'SELECT 1'
);
PREPARE stmt_add_description FROM @sql_add_description;
EXECUTE stmt_add_description;
DEALLOCATE PREPARE stmt_add_description;

-- Add is_active if missing
SET @col_is_active_exists := (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'classic_blog_categories'
    AND COLUMN_NAME = 'is_active'
);
SET @sql_add_is_active := IF(
  @col_is_active_exists = 0,
  'ALTER TABLE classic_blog_categories ADD COLUMN is_active TINYINT(1) NOT NULL DEFAULT 1 AFTER description',
  'SELECT 1'
);
PREPARE stmt_add_is_active FROM @sql_add_is_active;
EXECUTE stmt_add_is_active;
DEALLOCATE PREPARE stmt_add_is_active;

-- Add updated_at if missing
SET @col_updated_at_exists := (
  SELECT COUNT(*)
  FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE()
    AND TABLE_NAME = 'classic_blog_categories'
    AND COLUMN_NAME = 'updated_at'
);
SET @sql_add_updated_at := IF(
  @col_updated_at_exists = 0,
  'ALTER TABLE classic_blog_categories ADD COLUMN updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP AFTER created_at',
  'SELECT 1'
);
PREPARE stmt_add_updated_at FROM @sql_add_updated_at;
EXECUTE stmt_add_updated_at;
DEALLOCATE PREPARE stmt_add_updated_at;

-- Change category FK delete behavior to RESTRICT so categories in use cannot be removed silently.
SET @fk_exists := (
  SELECT COUNT(*)
  FROM information_schema.REFERENTIAL_CONSTRAINTS
  WHERE CONSTRAINT_SCHEMA = DATABASE()
    AND TABLE_NAME = 'classic_blog_post_categories'
    AND CONSTRAINT_NAME = 'fk_classic_blog_post_categories_category'
);

SET @sql_drop_fk := IF(
  @fk_exists > 0,
  'ALTER TABLE classic_blog_post_categories DROP FOREIGN KEY fk_classic_blog_post_categories_category',
  'SELECT 1'
);
PREPARE stmt_drop_fk FROM @sql_drop_fk;
EXECUTE stmt_drop_fk;
DEALLOCATE PREPARE stmt_drop_fk;

SET @sql_add_fk := 'ALTER TABLE classic_blog_post_categories\n  ADD CONSTRAINT fk_classic_blog_post_categories_category\n  FOREIGN KEY (category_id) REFERENCES classic_blog_categories(id)\n  ON DELETE RESTRICT ON UPDATE CASCADE';
PREPARE stmt_add_fk FROM @sql_add_fk;
EXECUTE stmt_add_fk;
DEALLOCATE PREPARE stmt_add_fk;
