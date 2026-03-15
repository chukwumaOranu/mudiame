const express = require('express');
const { body } = require('express-validator');
const {
  listPortfolio,
  listPortfolioAdmin,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require('../controllers/portfolio.controller');
const {
  uploadPortfolioImages,
  processPortfolioImage,
} = require('../middleware/portfolioImageUpload.middleware');
const { authMiddleware, requirePermission } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/items', listPortfolio);
router.get('/admin/items', authMiddleware, requirePermission('portfolio.read'), listPortfolioAdmin);

router.post(
  '/items',
  authMiddleware,
  requirePermission('portfolio.create'),
  uploadPortfolioImages,
  processPortfolioImage,
  [
    body('title').trim().notEmpty().withMessage('Title is required.'),
    body('category').trim().notEmpty().withMessage('Category is required.'),
    body('status').optional({ values: 'falsy' }).isIn(['active', 'inactive']).withMessage('Invalid status.'),
    body('sort_order').optional({ values: 'falsy' }).isInt().withMessage('sort_order must be an integer.'),
  ],
  createPortfolio
);

router.put(
  '/items/:id',
  authMiddleware,
  requirePermission('portfolio.update'),
  uploadPortfolioImages,
  processPortfolioImage,
  updatePortfolio
);

router.delete('/items/:id', authMiddleware, requirePermission('portfolio.delete'), deletePortfolio);

module.exports = router;
