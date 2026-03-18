-- Seed footer gallery permission keys and grant to admin role
-- SQL dialect: MySQL 8+

INSERT INTO app_permissions (permission_key, permission_name, description)
VALUES
  ('footer-gallery.read', 'View Footer Gallery', 'Can view footer gallery records in dashboard.'),
  ('footer-gallery.create', 'Create Footer Gallery', 'Can create footer gallery items.'),
  ('footer-gallery.update', 'Update Footer Gallery', 'Can update footer gallery items.'),
  ('footer-gallery.delete', 'Delete Footer Gallery', 'Can delete footer gallery items.')
ON DUPLICATE KEY UPDATE
  permission_name = VALUES(permission_name),
  description = VALUES(description);

INSERT INTO app_role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM app_roles r
INNER JOIN app_permissions p ON p.permission_key IN (
  'footer-gallery.read',
  'footer-gallery.create',
  'footer-gallery.update',
  'footer-gallery.delete'
)
WHERE r.role_key = 'admin'
ON DUPLICATE KEY UPDATE role_id = role_id;
