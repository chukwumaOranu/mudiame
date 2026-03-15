-- Seed default permission keys for dashboard/admin features.
-- SQL dialect: MySQL 8+

INSERT INTO app_permissions (permission_key, permission_name, description)
VALUES
  ('users.read', 'View Users', 'Can view user records.'),
  ('users.create', 'Create Users', 'Can create new users.'),
  ('users.update', 'Update Users', 'Can update user details and role.'),
  ('users.delete', 'Delete Users', 'Can delete users.'),
  ('permissions.read', 'View Permissions', 'Can view permission records.'),
  ('permissions.create', 'Create Permissions', 'Can create new permissions.'),
  ('permissions.update', 'Update Permissions', 'Can update permissions.'),
  ('permissions.delete', 'Delete Permissions', 'Can delete permissions.'),
  ('permissions.assign', 'Assign Permissions', 'Can assign permissions to users.'),
  ('blogs.create', 'Create Blogs', 'Can create blog posts.'),
  ('blogs.update', 'Update Blogs', 'Can update blog posts.'),
  ('blogs.delete', 'Delete Blogs', 'Can delete blog posts.'),
  ('categories.create', 'Create Categories', 'Can create categories.'),
  ('categories.update', 'Update Categories', 'Can update categories.'),
  ('categories.delete', 'Delete Categories', 'Can delete categories.')
ON DUPLICATE KEY UPDATE
  permission_name = VALUES(permission_name),
  description = VALUES(description);

INSERT INTO app_roles (role_key, role_name, description, is_system)
VALUES ('admin', 'Admin', 'System administrator role', 1)
ON DUPLICATE KEY UPDATE
  role_name = VALUES(role_name),
  description = VALUES(description),
  is_system = VALUES(is_system);

INSERT INTO app_role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM app_roles r
INNER JOIN app_permissions p
WHERE r.role_key = 'admin'
ON DUPLICATE KEY UPDATE role_id = role_id;
