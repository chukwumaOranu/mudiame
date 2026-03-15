const bcrypt = require('bcryptjs');
const { dbPool } = require('../../config/db.config');

const listUsers = async () => {
  const [rows] = await dbPool.query(
    `SELECT
      u.id,
      u.full_name,
      u.username,
      u.email,
      u.phone,
      u.status,
      u.is_email_verified,
      u.last_login_at,
      u.created_at,
      COALESCE(GROUP_CONCAT(DISTINCT r.role_key), '') AS role_keys,
      COALESCE(GROUP_CONCAT(DISTINCT p.permission_key), '') AS direct_permission_keys
     FROM app_users u
     LEFT JOIN app_user_roles ur ON ur.user_id = u.id
     LEFT JOIN app_roles r ON r.id = ur.role_id
     LEFT JOIN app_user_permissions up ON up.user_id = u.id
     LEFT JOIN app_permissions p ON p.id = up.permission_id
     GROUP BY u.id
     ORDER BY u.created_at DESC`
  );

  return rows.map((row) => ({
    id: row.id,
    full_name: row.full_name,
    username: row.username,
    email: row.email,
    phone: row.phone,
    status: row.status,
    is_email_verified: Boolean(row.is_email_verified),
    last_login_at: row.last_login_at,
    created_at: row.created_at,
    roles: row.role_keys ? row.role_keys.split(',').filter(Boolean) : [],
    direct_permissions: row.direct_permission_keys
      ? row.direct_permission_keys.split(',').filter(Boolean)
      : [],
  }));
};

const ensureRole = async (roleKey, connection) => {
  const conn = connection || dbPool;
  const normalized = String(roleKey || 'customer').trim().toLowerCase();

  await conn.execute(
    `INSERT INTO app_roles (role_key, role_name, description)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE role_name = VALUES(role_name)`,
    [normalized, normalized.charAt(0).toUpperCase() + normalized.slice(1), `${normalized} role`]
  );

  const [rows] = await conn.execute('SELECT id FROM app_roles WHERE role_key = ? LIMIT 1', [normalized]);
  return rows[0] || null;
};

const createUser = async ({ full_name, username, email, phone, password, role }) => {
  const connection = await dbPool.getConnection();
  try {
    await connection.beginTransaction();

    const password_hash = await bcrypt.hash(password, 10);
    const [insertResult] = await connection.execute(
      `INSERT INTO app_users (full_name, username, email, phone, password_hash, status)
       VALUES (?, ?, ?, ?, ?, 'active')`,
      [full_name, username, email, phone || null, password_hash]
    );

    const roleRow = await ensureRole(role || 'customer', connection);
    if (roleRow?.id) {
      await connection.execute(
        `INSERT INTO app_user_roles (user_id, role_id)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE assigned_at = CURRENT_TIMESTAMP`,
        [insertResult.insertId, roleRow.id]
      );
    }

    await connection.commit();
    return insertResult.insertId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const updateUser = async (userId, payload) => {
  const connection = await dbPool.getConnection();
  try {
    await connection.beginTransaction();

    const [existingRows] = await connection.execute('SELECT id FROM app_users WHERE id = ? LIMIT 1', [userId]);
    if (!existingRows.length) {
      await connection.rollback();
      return false;
    }

    const fields = [];
    const values = [];

    if (payload.full_name !== undefined) {
      fields.push('full_name = ?');
      values.push(payload.full_name);
    }
    if (payload.username !== undefined) {
      fields.push('username = ?');
      values.push(payload.username);
    }
    if (payload.email !== undefined) {
      fields.push('email = ?');
      values.push(payload.email);
    }
    if (payload.phone !== undefined) {
      fields.push('phone = ?');
      values.push(payload.phone || null);
    }
    if (payload.status !== undefined) {
      fields.push('status = ?');
      values.push(payload.status);
    }
    if (payload.password) {
      fields.push('password_hash = ?');
      values.push(await bcrypt.hash(payload.password, 10));
    }

    if (fields.length) {
      values.push(userId);
      await connection.execute(`UPDATE app_users SET ${fields.join(', ')} WHERE id = ?`, values);
    }

    if (payload.role !== undefined) {
      const roleRow = await ensureRole(payload.role || 'customer', connection);
      if (roleRow?.id) {
        await connection.execute('DELETE FROM app_user_roles WHERE user_id = ?', [userId]);
        await connection.execute(
          `INSERT INTO app_user_roles (user_id, role_id)
           VALUES (?, ?)`,
          [userId, roleRow.id]
        );
      }
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

const deleteUser = async (userId) => {
  const [result] = await dbPool.execute('DELETE FROM app_users WHERE id = ?', [userId]);
  return result.affectedRows > 0;
};

module.exports = {
  listUsers,
  createUser,
  updateUser,
  deleteUser,
};
