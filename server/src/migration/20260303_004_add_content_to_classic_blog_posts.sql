-- Extend classic_blog_posts for full blog detail rendering
-- SQL dialect: MySQL 8+

ALTER TABLE classic_blog_posts
  ADD COLUMN content LONGTEXT NULL AFTER excerpt;
