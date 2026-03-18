const express = require('express');
const { body } = require('express-validator');
const {
  listFooterGallery,
  listFooterGalleryAdmin,
  createFooterGallery,
  updateFooterGallery,
  deleteFooterGallery,
} = require('../controllers/footerGallery.controller');
const {
  uploadFooterGalleryImages,
  processFooterGalleryImages,
} = require('../middleware/footerGalleryUpload.middleware');
const { authMiddleware, requirePermission } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/items', listFooterGallery);
router.get('/admin/items', authMiddleware, requirePermission('footer-gallery.read'), listFooterGalleryAdmin);

router.post(
  '/items',
  authMiddleware,
  requirePermission('footer-gallery.create'),
  uploadFooterGalleryImages,
  processFooterGalleryImages,
  [
    body('title').optional({ values: 'falsy' }).trim(),
    body('status').optional({ values: 'falsy' }).isIn(['active', 'inactive']).withMessage('Invalid status.'),
    body('sort_order').optional({ values: 'falsy' }).isInt().withMessage('sort_order must be an integer.'),
  ],
  createFooterGallery
);

router.put(
  '/items/:id',
  authMiddleware,
  requirePermission('footer-gallery.update'),
  uploadFooterGalleryImages,
  processFooterGalleryImages,
  updateFooterGallery
);

router.delete('/items/:id', authMiddleware, requirePermission('footer-gallery.delete'), deleteFooterGallery);

module.exports = router;
