const express = require('express');
const { body } = require('express-validator');
const {
  listAdminUsers,
  createAdminUser,
  updateAdminUser,
  deleteAdminUser,
} = require('../controllers/adminUser.controller');
const { authMiddleware, requirePermission } = require('../middleware/auth.middleware');

const router = express.Router();

router.use(authMiddleware);

router.get('/', requirePermission('users.read'), listAdminUsers);

router.post(
  '/',
  requirePermission('users.create'),
  [
    body('full_name').trim().notEmpty().withMessage('Full name is required.'),
    body('username').trim().isLength({ min: 3, max: 60 }).withMessage('Username must be 3-60 chars.'),
    body('email').trim().isEmail().withMessage('Valid email is required.'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters.'),
    body('role').optional({ values: 'falsy' }).trim().isLength({ min: 3, max: 60 }),
  ],
  createAdminUser
);

router.put('/:id', requirePermission('users.update'), updateAdminUser);
router.delete('/:id', requirePermission('users.delete'), deleteAdminUser);

module.exports = router;
