const express = require('express');
const { body } = require('express-validator');
const {
  listClassicBlogCategories,
  createClassicBlogCategory,
  updateClassicBlogCategory,
  deleteClassicBlogCategory,
} = require('../controllers/category.controller');
const { authMiddleware, requirePermission } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/', listClassicBlogCategories);

router.post(
  '/',
  authMiddleware,
  requirePermission('categories.create'),
  [
    body('name').trim().notEmpty().withMessage('Category name is required.'),
    body('slug').optional({ values: 'falsy' }).trim(),
    body('description').optional({ values: 'falsy' }).trim(),
    body('is_active').optional().isBoolean().withMessage('is_active must be true or false.'),
  ],
  createClassicBlogCategory
);

router.put('/:id', authMiddleware, requirePermission('categories.update'), updateClassicBlogCategory);
router.delete('/:id', authMiddleware, requirePermission('categories.delete'), deleteClassicBlogCategory);

module.exports = router;
