-- Register and login schema
-- Purpose: support account creation, authentication sessions, and recovery flows.
-- SQL dialect: MySQL 8+

CREATE TABLE IF NOT EXISTS app_users (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  full_name VARCHAR(120) NOT NULL,
  username VARCHAR(60) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(30) NULL,
  password_hash VARCHAR(255) NOT NULL,
  status ENUM('active', 'inactive', 'suspended') NOT NULL DEFAULT 'active',
  is_email_verified TINYINT(1) NOT NULL DEFAULT 0,
  last_login_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_app_users_username (username),
  UNIQUE KEY uq_app_users_email (email),
  UNIQUE KEY uq_app_users_phone (phone),
  KEY idx_app_users_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS app_user_sessions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  refresh_token_hash VARCHAR(255) NOT NULL,
  device_name VARCHAR(120) NULL,
  ip_address VARCHAR(45) NULL,
  user_agent TEXT NULL,
  expires_at DATETIME NOT NULL,
  revoked_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_app_user_sessions_refresh_token_hash (refresh_token_hash),
  KEY idx_app_user_sessions_user_id (user_id),
  KEY idx_app_user_sessions_expires_at (expires_at),
  CONSTRAINT fk_app_user_sessions_user
    FOREIGN KEY (user_id) REFERENCES app_users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS app_email_verification_tokens (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  token_hash VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  verified_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_app_email_verification_tokens_token_hash (token_hash),
  KEY idx_app_email_verification_tokens_user_id (user_id),
  KEY idx_app_email_verification_tokens_expires_at (expires_at),
  CONSTRAINT fk_app_email_verification_tokens_user
    FOREIGN KEY (user_id) REFERENCES app_users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS app_password_reset_tokens (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  user_id BIGINT UNSIGNED NOT NULL,
  token_hash VARCHAR(255) NOT NULL,
  expires_at DATETIME NOT NULL,
  used_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_app_password_reset_tokens_token_hash (token_hash),
  KEY idx_app_password_reset_tokens_user_id (user_id),
  KEY idx_app_password_reset_tokens_expires_at (expires_at),
  CONSTRAINT fk_app_password_reset_tokens_user
    FOREIGN KEY (user_id) REFERENCES app_users(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS app_roles (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  role_key VARCHAR(60) NOT NULL,
  role_name VARCHAR(100) NOT NULL,
  description TEXT NULL,
  is_system TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_app_roles_role_key (role_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS app_permissions (
  id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  permission_key VARCHAR(100) NOT NULL,
  permission_name VARCHAR(120) NOT NULL,
  description TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_app_permissions_permission_key (permission_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS app_role_permissions (
  role_id BIGINT UNSIGNED NOT NULL,
  permission_id BIGINT UNSIGNED NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (role_id, permission_id),
  KEY idx_app_role_permissions_permission_id (permission_id),
  CONSTRAINT fk_app_role_permissions_role
    FOREIGN KEY (role_id) REFERENCES app_roles(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_app_role_permissions_permission
    FOREIGN KEY (permission_id) REFERENCES app_permissions(id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS app_user_roles (
  user_id BIGINT UNSIGNED NOT NULL,
  role_id BIGINT UNSIGNED NOT NULL,
  assigned_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  assigned_by BIGINT UNSIGNED NULL,
  PRIMARY KEY (user_id, role_id),
  KEY idx_app_user_roles_role_id (role_id),
  KEY idx_app_user_roles_assigned_by (assigned_by),
  CONSTRAINT fk_app_user_roles_user
    FOREIGN KEY (user_id) REFERENCES app_users(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_app_user_roles_role
    FOREIGN KEY (role_id) REFERENCES app_roles(id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_app_user_roles_assigned_by
    FOREIGN KEY (assigned_by) REFERENCES app_users(id)
    ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
