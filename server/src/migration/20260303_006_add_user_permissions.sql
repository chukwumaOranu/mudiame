-- Add direct user-permission assignments for admin permission management
-- SQL dialect: MySQL 8+

CREATE TABLE IF NOT EXISTS app_user_permissions (
  user_id BIGINT UNSIGNED NOT NULL,
  permission_id BIGINT UNSIGNED NOT NULL,
  granted_by BIGINT UNSIGNED NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user_id, permission_id),
  KEY idx_app_user_permissions_permission_id (permission_id),
  KEY idx_app_user_permissions_granted_by (granted_by),
  CONSTRAINT fk_app_user_permissions_user
    FOREIGN KEY (user_id) REFERENCES app_users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_app_user_permissions_permission
    FOREIGN KEY (permission_id) REFERENCES app_permissions(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_app_user_permissions_granted_by
    FOREIGN KEY (granted_by) REFERENCES app_users(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
