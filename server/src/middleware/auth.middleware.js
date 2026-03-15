const jwt = require('jsonwebtoken');
const { dbPool } = require('../../config/db.config');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'change-this-in-env');
    req.auth = {
      userId: decoded.sub,
      username: decoded.username,
      email: decoded.email,
      roles: Array.isArray(decoded.roles) ? decoded.roles : [],
    };
    return next();
  } catch (_error) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

const requireRole = (allowedRoles = []) => (req, res, next) => {
  const userRoles = req.auth?.roles || [];
  const isAllowed = allowedRoles.some((role) => userRoles.includes(role));

  if (!isAllowed) {
    return res.status(403).json({ message: 'You are not allowed to access this resource.' });
  }

  return next();
};

const getUserEffectivePermissions = async (userId) => {
  const [rows] = await dbPool.execute(
    `SELECT DISTINCT p.permission_key
     FROM app_permissions p
     INNER JOIN app_user_permissions up ON up.permission_id = p.id
     WHERE up.user_id = ?
     UNION
     SELECT DISTINCT p.permission_key
     FROM app_permissions p
     INNER JOIN app_role_permissions rp ON rp.permission_id = p.id
     INNER JOIN app_user_roles ur ON ur.role_id = rp.role_id
     WHERE ur.user_id = ?`,
    [userId, userId]
  );

  return rows.map((row) => row.permission_key).filter(Boolean);
};

const requirePermission = (permissionKey) => async (req, res, next) => {
  const userRoles = req.auth?.roles || [];
  if (userRoles.includes('admin')) {
    return next();
  }

  try {
    const userId = Number(req.auth?.userId);
    if (!userId) {
      return res.status(401).json({ message: 'Authentication is required.' });
    }

    const permissionKeys = await getUserEffectivePermissions(userId);
    req.auth.permissions = permissionKeys;

    if (!permissionKeys.includes(permissionKey)) {
      return res.status(403).json({
        message: `Missing required permission: ${permissionKey}`,
      });
    }

    return next();
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to validate permissions.',
      error: error.message,
    });
  }
};

module.exports = {
  authMiddleware,
  requireRole,
  requirePermission,
};
