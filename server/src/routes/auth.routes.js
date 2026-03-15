const express = require('express');
const { body } = require('express-validator');
const { login, logout, me, register } = require('../controllers/auth.controller');
const { authMiddleware } = require('../middleware/auth.middleware');

const router = express.Router();

router.post(
  '/register',
  [
    body('full_name').trim().notEmpty().withMessage('Full name is required.'),
    body('username')
      .trim()
      .isLength({ min: 3, max: 60 })
      .withMessage('Username must be between 3 and 60 characters.'),
    body('email').trim().isEmail().withMessage('Valid email is required.'),
    body('phone').optional({ values: 'falsy' }).trim().isLength({ min: 7, max: 30 }),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters.'),
    body('role').optional({ values: 'falsy' }).trim().isLength({ min: 3, max: 60 }),
  ],
  register
);

router.post(
  '/login',
  [
    body('identifier').trim().notEmpty().withMessage('Username or email is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
  ],
  login
);

router.get('/me', authMiddleware, me);
router.post('/logout', authMiddleware, logout);

module.exports = router;
