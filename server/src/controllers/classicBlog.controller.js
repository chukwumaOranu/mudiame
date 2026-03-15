const { validationResult } = require('express-validator');
const {
  createPost,
  updatePost,
  deletePost,
  listPosts,
  getPostBySlug,
} = require('../models/classicBlog.model');

const parseJsonSafely = (value, fallback) => {
  if (value === undefined || value === null || value === '') {
    return fallback;
  }
  if (typeof value !== 'string') {
    return value;
  }
  try {
    return JSON.parse(value);
  } catch (_error) {
    return fallback;
  }
};

const toMysqlDateTime = (value) => {
  if (value === undefined) {
    return undefined;
  }
  if (value === null || value === '') {
    return null;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');
  const hours = String(parsed.getHours()).padStart(2, '0');
  const minutes = String(parsed.getMinutes()).padStart(2, '0');
  const seconds = String(parsed.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const normalizeCreatePayload = (req) => {
  const categoriesFromJson = parseJsonSafely(req.body.categories, null);
  const categories =
    Array.isArray(categoriesFromJson)
      ? categoriesFromJson
      : String(req.body.categories || '')
          .split(',')
          .map((name) => name.trim())
          .filter(Boolean)
          .map((name) => ({ name }));

  const authorFromJson = parseJsonSafely(req.body.author, null);
  const author =
    authorFromJson && typeof authorFromJson === 'object'
      ? authorFromJson
      : {
          display_name: 'Mudiame Team',
        };

  const featuredImageUrl = req.uploadedFeaturedImageUrl
    ? `${req.protocol}://${req.get('host')}${req.uploadedFeaturedImageUrl}`
    : req.body.featured_image_url || null;

  return {
    title: req.body.title,
    slug: req.body.slug,
    excerpt: req.body.excerpt,
    content: req.body.content,
    featured_image_url: featuredImageUrl,
    published_at: toMysqlDateTime(req.body.published_at || null),
    status: req.body.status || 'draft',
    author,
    categories,
  };
};

const normalizeUpdatePayload = (req) => {
  const payload = {
    title: req.body.title,
    slug: req.body.slug,
    excerpt: req.body.excerpt,
    content: req.body.content,
    published_at: toMysqlDateTime(req.body.published_at),
    status: req.body.status,
  };

  if (req.body.categories !== undefined) {
    const categoriesFromJson = parseJsonSafely(req.body.categories, null);
    payload.categories = Array.isArray(categoriesFromJson)
      ? categoriesFromJson
      : String(req.body.categories || '')
          .split(',')
          .map((name) => name.trim())
          .filter(Boolean)
          .map((name) => ({ name }));
  }

  if (req.uploadedFeaturedImageUrl) {
    payload.featured_image_url = `${req.protocol}://${req.get('host')}${req.uploadedFeaturedImageUrl}`;
  } else if (req.body.featured_image_url !== undefined) {
    payload.featured_image_url = req.body.featured_image_url;
  }

  return payload;
};

const listClassicBlogPosts = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 6);
    const status = String(req.query.status || 'published');
    const includeDraft = req.query.includeDraft === 'true';

    const data = await listPosts({ page, pageSize, status, includeDraft });
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch posts.', error: error.message });
  }
};

const getClassicBlogPost = async (req, res) => {
  try {
    const post = await getPostBySlug(req.params.slug);
    if (!post) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    return res.status(200).json({ item: post });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch post.', error: error.message });
  }
};

const createClassicBlogPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation error.', errors: errors.array() });
  }

  try {
    const postId = await createPost(normalizeCreatePayload(req));
    return res.status(201).json({ message: 'Post created successfully.', id: postId });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to create post.', error: error.message });
  }
};

const updateClassicBlogPost = async (req, res) => {
  try {
    const postId = Number(req.params.id);
    if (!postId) {
      return res.status(400).json({ message: 'Invalid post id.' });
    }

    const updated = await updatePost(postId, normalizeUpdatePayload(req));
    if (!updated) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    return res.status(200).json({ message: 'Post updated successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update post.', error: error.message });
  }
};

const deleteClassicBlogPost = async (req, res) => {
  try {
    const postId = Number(req.params.id);
    if (!postId) {
      return res.status(400).json({ message: 'Invalid post id.' });
    }

    const removed = await deletePost(postId);
    if (!removed) {
      return res.status(404).json({ message: 'Post not found.' });
    }

    return res.status(200).json({ message: 'Post deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete post.', error: error.message });
  }
};

module.exports = {
  listClassicBlogPosts,
  getClassicBlogPost,
  createClassicBlogPost,
  updateClassicBlogPost,
  deleteClassicBlogPost,
};
