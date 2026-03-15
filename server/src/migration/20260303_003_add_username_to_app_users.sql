-- Add username to app_users for username/email login
-- SQL dialect: MySQL 8+

ALTER TABLE app_users
  ADD COLUMN username VARCHAR(60) NULL AFTER full_name,
  ADD UNIQUE KEY uq_app_users_username (username);

UPDATE app_users
SET username = CONCAT('user_', id)
WHERE username IS NULL OR username = '';

ALTER TABLE app_users
  MODIFY COLUMN username VARCHAR(60) NOT NULL;
