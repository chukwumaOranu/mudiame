const { dbPool } = require('../../config/db.config');

const getUserByIdentifier = async (identifier) => {
  const [rows] = await dbPool.execute(
    `SELECT u.id, u.full_name, u.username, u.email, u.phone, u.password_hash,
            u.status, u.is_email_verified, u.last_login_at,
            COALESCE(GROUP_CONCAT(DISTINCT r.role_key), '') AS role_keys
     FROM app_users u
     LEFT JOIN app_user_roles ur ON ur.user_id = u.id
     LEFT JOIN app_roles r ON r.id = ur.role_id
     WHERE u.username = ? OR u.email = ?
     GROUP BY
      u.id,
      u.full_name,
      u.username,
      u.email,
      u.phone,
      u.password_hash,
      u.status,
      u.is_email_verified,
      u.last_login_at
     LIMIT 1`,
    [identifier, identifier]
  );

  return rows[0] || null;
};

const getUserById = async (userId) => {
  const [rows] = await dbPool.execute(
    `SELECT u.id, u.full_name, u.username, u.email, u.phone,
            u.status, u.is_email_verified, u.last_login_at,
            COALESCE(GROUP_CONCAT(DISTINCT r.role_key), '') AS role_keys
     FROM app_users u
     LEFT JOIN app_user_roles ur ON ur.user_id = u.id
     LEFT JOIN app_roles r ON r.id = ur.role_id
     WHERE u.id = ?
     GROUP BY
      u.id,
      u.full_name,
      u.username,
      u.email,
      u.phone,
      u.status,
      u.is_email_verified,
      u.last_login_at
     LIMIT 1`,
    [userId]
  );

  return rows[0] || null;
};

const getUserByUsernameOrEmail = async (username, email) => {
  const [rows] = await dbPool.execute(
    `SELECT id, username, email
     FROM app_users
     WHERE username = ? OR email = ?
     LIMIT 1`,
    [username, email]
  );

  return rows[0] || null;
};

const ensureRole = async (roleKey, connection) => {
  const conn = connection || dbPool;
  const normalizedRoleKey = String(roleKey || 'customer').trim().toLowerCase();

  await conn.execute(
    `INSERT INTO app_roles (role_key, role_name, description)
     VALUES (?, ?, ?)
     ON DUPLICATE KEY UPDATE role_name = VALUES(role_name)`,
    [
      normalizedRoleKey,
      normalizedRoleKey.charAt(0).toUpperCase() + normalizedRoleKey.slice(1),
      `${normalizedRoleKey} role`,
    ]
  );

  const [rows] = await conn.execute(
    'SELECT id, role_key FROM app_roles WHERE role_key = ? LIMIT 1',
    [normalizedRoleKey]
  );

  return rows[0] || null;
};

const createUserWithRole = async ({
  fullName,
  username,
  email,
  phone,
  passwordHash,
  roleKey,
}) => {
  const connection = await dbPool.getConnection();
  try {
    await connection.beginTransaction();

    const [insertResult] = await connection.execute(
      `INSERT INTO app_users (full_name, username, email, phone, password_hash, status)
       VALUES (?, ?, ?, ?, ?, 'active')`,
      [fullName, username, email, phone || null, passwordHash]
    );

    const role = await ensureRole(roleKey || 'customer', connection);

    if (role?.id) {
      await connection.execute(
        `INSERT INTO app_user_roles (user_id, role_id)
         VALUES (?, ?)
         ON DUPLICATE KEY UPDATE assigned_at = CURRENT_TIMESTAMP`,
        [insertResult.insertId, role.id]
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

const updateLastLoginAt = async (userId) => {
  await dbPool.execute('UPDATE app_users SET last_login_at = NOW() WHERE id = ?', [userId]);
};

module.exports = {
  getUserByIdentifier,
  getUserById,
  getUserByUsernameOrEmail,
  createUserWithRole,
  updateLastLoginAt,
};
