const { validationResult } = require('express-validator');
const {
  listPortfolioItems,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} = require('../models/portfolio.model');
const { toPublicAssetUrl } = require('../utils/publicAssetUrl');

const normalizeImageUrls = (req) => {
  const uploaded = Array.isArray(req.uploadedPortfolioImageUrls)
    ? req.uploadedPortfolioImageUrls
    : [];

  if (uploaded.length) {
    return uploaded;
  }

  if (req.body.image_url) {
    return [req.body.image_url];
  }

  return [];
};

const normalizePortfolioItemForResponse = (req, item) => ({
  ...item,
  image_url: toPublicAssetUrl(req, item.image_url),
});

const listPortfolio = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 24);
    const status = String(req.query.status || 'active');
    const category = req.query.category ? String(req.query.category) : null;

    const data = await listPortfolioItems({ page, pageSize, status, includeInactive: false, category });
    return res.status(200).json({
      ...data,
      items: data.items.map((item) => normalizePortfolioItemForResponse(req, item)),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch portfolio items.', error: error.message });
  }
};

const listPortfolioAdmin = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || 100);
    const category = req.query.category ? String(req.query.category) : null;
    const status = String(req.query.status || 'active');

    const data = await listPortfolioItems({
      page,
      pageSize,
      status,
      includeInactive: true,
      category,
    });
    return res.status(200).json({
      ...data,
      items: data.items.map((item) => normalizePortfolioItemForResponse(req, item)),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch portfolio items.', error: error.message });
  }
};

const createPortfolio = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation error.', errors: errors.array() });
  }

  const imageUrls = normalizeImageUrls(req);
  if (!imageUrls.length) {
    return res.status(400).json({ message: 'Portfolio image is required.' });
  }

  try {
    const ids = [];
    for (const [index, imageUrl] of imageUrls.entries()) {
      const suffix = imageUrls.length > 1 ? ` ${index + 1}` : '';
      const itemId = await createPortfolioItem({
        title: `${req.body.title}${suffix}`,
        slug: req.body.slug ? `${req.body.slug}${suffix ? `-${index + 1}` : ''}` : undefined,
        description: req.body.description,
        image_url: imageUrl,
        category: req.body.category,
        status: req.body.status || 'active',
        sort_order: Number(req.body.sort_order || 0) + index,
        is_featured:
          String(req.body.is_featured || '').toLowerCase() === 'true' || req.body.is_featured === true,
        created_by: req.auth?.userId || null,
      });
      ids.push(itemId);
    }

    return res
      .status(201)
      .json({ message: 'Portfolio item(s) created successfully.', ids, created_count: ids.length });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to create portfolio item.', error: error.message });
  }
};

const updatePortfolio = async (req, res) => {
  const itemId = Number(req.params.id);
  if (!itemId) {
    return res.status(400).json({ message: 'Invalid portfolio item id.' });
  }

  try {
    const imageUrl = req.uploadedPortfolioImageUrl
      ? req.uploadedPortfolioImageUrl
      : req.body.image_url;

    const updated = await updatePortfolioItem(itemId, {
      title: req.body.title,
      slug: req.body.slug,
      description: req.body.description,
      image_url: imageUrl,
      category: req.body.category,
      status: req.body.status,
      sort_order: req.body.sort_order,
      is_featured:
        req.body.is_featured !== undefined
          ? String(req.body.is_featured).toLowerCase() === 'true' || req.body.is_featured === true
          : undefined,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Portfolio item not found.' });
    }

    return res.status(200).json({ message: 'Portfolio item updated successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update portfolio item.', error: error.message });
  }
};

const deletePortfolio = async (req, res) => {
  const itemId = Number(req.params.id);
  if (!itemId) {
    return res.status(400).json({ message: 'Invalid portfolio item id.' });
  }

  try {
    const removed = await deletePortfolioItem(itemId);
    if (!removed) {
      return res.status(404).json({ message: 'Portfolio item not found.' });
    }

    return res.status(200).json({ message: 'Portfolio item deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete portfolio item.', error: error.message });
  }
};

module.exports = {
  listPortfolio,
  listPortfolioAdmin,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
};
