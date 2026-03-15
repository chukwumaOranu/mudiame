const express = require('express');
const { body } = require('express-validator');
const {
  uploadFeaturedImage,
  processFeaturedImage,
} = require('../middleware/blogImageUpload.middleware');
const {
  listClassicBlogPosts,
  getClassicBlogPost,
  createClassicBlogPost,
  updateClassicBlogPost,
  deleteClassicBlogPost,
} = require('../controllers/classicBlog.controller');
const { authMiddleware, requirePermission } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/posts', listClassicBlogPosts);
router.get('/posts/:slug', getClassicBlogPost);

router.post(
  '/posts',
  authMiddleware,
  requirePermission('blogs.create'),
  uploadFeaturedImage,
  processFeaturedImage,
  [
    body('title').trim().notEmpty().withMessage('Title is required.'),
    body('status')
      .optional({ values: 'falsy' })
      .isIn(['draft', 'published', 'archived'])
      .withMessage('Invalid status value.'),
  ],
  createClassicBlogPost
);

router.put(
  '/posts/:id',
  authMiddleware,
  requirePermission('blogs.update'),
  uploadFeaturedImage,
  processFeaturedImage,
  updateClassicBlogPost
);
router.delete('/posts/:id', authMiddleware, requirePermission('blogs.delete'), deleteClassicBlogPost);

module.exports = router;
