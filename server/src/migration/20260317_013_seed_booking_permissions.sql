-- Seed booking permission keys and grant to admin role
-- SQL dialect: MySQL 8+

INSERT INTO app_permissions (permission_key, permission_name, description)
VALUES
  ('bookings.read', 'View Bookings', 'Can view booking records in dashboard.'),
  ('bookings.update', 'Update Bookings', 'Can update booking status and notes.'),
  ('bookings.delete', 'Delete Bookings', 'Can delete booking records.')
ON DUPLICATE KEY UPDATE
  permission_name = VALUES(permission_name),
  description = VALUES(description);

INSERT INTO app_role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM app_roles r
INNER JOIN app_permissions p ON p.permission_key IN (
  'bookings.read',
  'bookings.update',
  'bookings.delete'
)
WHERE r.role_key = 'admin'
ON DUPLICATE KEY UPDATE role_id = role_id;
