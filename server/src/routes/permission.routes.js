const express = require('express');
const { body } = require('express-validator');
const {
  listAdminPermissions,
  createAdminPermission,
  updateAdminPermission,
  deleteAdminPermission,
  assignAdminPermissionsToUser,
} = require('../controllers/permission.controller');
const { authMiddleware, requirePermission } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', requirePermission('permissions.read'), listAdminPermissions);

router.post(
  '/',
  requirePermission('permissions.create'),
  [
    body('permission_name').trim().notEmpty().withMessage('Permission name is required.'),
    body('permission_key').optional({ values: 'falsy' }).trim(),
    body('description').optional({ values: 'falsy' }).trim(),
  ],
  createAdminPermission
);

router.put('/:id', requirePermission('permissions.update'), updateAdminPermission);
router.delete('/:id', requirePermission('permissions.delete'), deleteAdminPermission);
router.put('/assign/:userId', requirePermission('permissions.assign'), assignAdminPermissionsToUser);

module.exports = router;
