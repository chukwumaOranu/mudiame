const { validationResult } = require('express-validator');
const {
  listPermissions,
  createPermission,
  updatePermission,
  deletePermission,
  assignPermissionsToUser,
  syncPermissionCatalog,
} = require('../models/permission.model');
const { permissionCatalog } = require('../utils/permissionCatalog');

const listAdminPermissions = async (_req, res) => {
  try {
    const items = await listPermissions();
    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch permissions.', error: error.message });
  }
};

const createAdminPermission = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation error.', errors: errors.array() });
  }

  try {
    const permissionId = await createPermission(req.body);
    return res.status(201).json({ message: 'Permission created successfully.', id: permissionId });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Permission key already exists.' });
    }
    return res.status(500).json({ message: 'Unable to create permission.', error: error.message });
  }
};

const updateAdminPermission = async (req, res) => {
  const permissionId = Number(req.params.id);
  if (!permissionId) {
    return res.status(400).json({ message: 'Invalid permission id.' });
  }

  try {
    const updated = await updatePermission(permissionId, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Permission not found.' });
    }

    return res.status(200).json({ message: 'Permission updated successfully.' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Permission key already exists.' });
    }
    return res.status(500).json({ message: 'Unable to update permission.', error: error.message });
  }
};

const deleteAdminPermission = async (req, res) => {
  const permissionId = Number(req.params.id);
  if (!permissionId) {
    return res.status(400).json({ message: 'Invalid permission id.' });
  }

  try {
    const removed = await deletePermission(permissionId);
    if (!removed) {
      return res.status(404).json({ message: 'Permission not found.' });
    }

    return res.status(200).json({ message: 'Permission deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete permission.', error: error.message });
  }
};

const assignAdminPermissionsToUser = async (req, res) => {
  const userId = Number(req.params.userId);
  if (!userId) {
    return res.status(400).json({ message: 'Invalid user id.' });
  }

  if (!Array.isArray(req.body.permission_ids)) {
    return res.status(400).json({ message: 'permission_ids must be an array.' });
  }

  try {
    await assignPermissionsToUser(userId, req.body.permission_ids, req.auth?.userId || null);
    return res.status(200).json({ message: 'User permissions updated successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to assign permissions.', error: error.message });
  }
};

const getPermissionCatalog = async (_req, res) => {
  return res.status(200).json({ items: permissionCatalog });
};

const syncAdminPermissionCatalog = async (_req, res) => {
  try {
    const result = await syncPermissionCatalog();
    return res.status(200).json({
      message: 'Permission catalog synced successfully.',
      ...result,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to sync permission catalog.', error: error.message });
  }
};

module.exports = {
  listAdminPermissions,
  createAdminPermission,
  updateAdminPermission,
  deleteAdminPermission,
  assignAdminPermissionsToUser,
  getPermissionCatalog,
  syncAdminPermissionCatalog,
};
