const { dbPool } = require('../../config/db.config');

const slugify = (text) =>
  String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s.-]/g, '')
    .replace(/\s+/g, '.')
    .replace(/\.+/g, '.')
    .replace(/^\.|\.$/g, '');

const listPermissions = async () => {
  const [rows] = await dbPool.query(
    `SELECT p.id, p.permission_key, p.permission_name, p.description,
            COUNT(up.user_id) AS user_count
     FROM app_permissions p
     LEFT JOIN app_user_permissions up ON up.permission_id = p.id
     GROUP BY p.id
     ORDER BY p.permission_key ASC`
  );

  return rows.map((row) => ({
    id: row.id,
    permission_key: row.permission_key,
    permission_name: row.permission_name,
    description: row.description,
    user_count: Number(row.user_count || 0),
  }));
};

const createPermission = async ({ permission_key, permission_name, description }) => {
  const key = slugify(permission_key || permission_name);
  const [insertResult] = await dbPool.execute(
    `INSERT INTO app_permissions (permission_key, permission_name, description)
     VALUES (?, ?, ?)`,
    [key, permission_name, description || null]
  );

  return insertResult.insertId;
};

const updatePermission = async (permissionId, payload) => {
  const [existingRows] = await dbPool.execute('SELECT id, permission_name FROM app_permissions WHERE id = ? LIMIT 1', [permissionId]);
  if (!existingRows.length) {
    return false;
  }

  const fields = [];
  const values = [];

  if (payload.permission_name !== undefined) {
    fields.push('permission_name = ?');
    values.push(payload.permission_name);
  }

  if (payload.permission_key !== undefined || payload.permission_name !== undefined) {
    const key = slugify(payload.permission_key || payload.permission_name || existingRows[0].permission_name);
    fields.push('permission_key = ?');
    values.push(key);
  }

  if (payload.description !== undefined) {
    fields.push('description = ?');
    values.push(payload.description || null);
  }

  if (!fields.length) {
    return true;
  }

  values.push(permissionId);
  await dbPool.execute(`UPDATE app_permissions SET ${fields.join(', ')} WHERE id = ?`, values);
  return true;
};

const deletePermission = async (permissionId) => {
  const [result] = await dbPool.execute('DELETE FROM app_permissions WHERE id = ?', [permissionId]);
  return result.affectedRows > 0;
};

const assignPermissionsToUser = async (userId, permissionIds = [], grantedBy = null) => {
  const connection = await dbPool.getConnection();
  try {
    await connection.beginTransaction();

    await connection.execute('DELETE FROM app_user_permissions WHERE user_id = ?', [userId]);

    for (const permissionId of permissionIds) {
      await connection.execute(
        `INSERT INTO app_user_permissions (user_id, permission_id, granted_by)
         VALUES (?, ?, ?)`,
        [userId, Number(permissionId), grantedBy]
      );
    }

    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = {
  listPermissions,
  createPermission,
  updatePermission,
  deletePermission,
  assignPermissionsToUser,
};
