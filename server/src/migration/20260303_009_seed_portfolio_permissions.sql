-- Seed portfolio permission keys and grant to admin role
-- SQL dialect: MySQL 8+

INSERT INTO app_permissions (permission_key, permission_name, description)
VALUES
  ('portfolio.read', 'View Portfolio', 'Can view portfolio records in dashboard.'),
  ('portfolio.create', 'Create Portfolio', 'Can create portfolio items.'),
  ('portfolio.update', 'Update Portfolio', 'Can update portfolio items.'),
  ('portfolio.delete', 'Delete Portfolio', 'Can delete portfolio items.')
ON DUPLICATE KEY UPDATE
  permission_name = VALUES(permission_name),
  description = VALUES(description);

INSERT INTO app_role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM app_roles r
INNER JOIN app_permissions p ON p.permission_key IN (
  'portfolio.read',
  'portfolio.create',
  'portfolio.update',
  'portfolio.delete'
)
WHERE r.role_key = 'admin'
ON DUPLICATE KEY UPDATE role_id = role_id;
