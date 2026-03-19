const { validationResult } = require('express-validator');
const {
  MAX_FOOTER_GALLERY_ITEMS,
  listFooterGalleryItems,
  createFooterGalleryItems,
  updateFooterGalleryItem,
  deleteFooterGalleryItem,
} = require('../models/footerGallery.model');
const { toPublicAssetUrl } = require('../utils/publicAssetUrl');

const normalizeUploadedAssets = (req) => {
  const uploaded = Array.isArray(req.uploadedFooterGalleryAssets)
    ? req.uploadedFooterGalleryAssets
    : [];

  return uploaded.map((asset) => ({
    image_url: asset.image_url,
    thumbnail_url: asset.thumbnail_url,
  }));
};

const normalizeFooterGalleryItemForResponse = (req, item) => ({
  ...item,
  image_url: toPublicAssetUrl(req, item.image_url),
  thumbnail_url: toPublicAssetUrl(req, item.thumbnail_url),
});

const listFooterGallery = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || MAX_FOOTER_GALLERY_ITEMS);
    const data = await listFooterGalleryItems({ page, pageSize, includeInactive: false });
    return res.status(200).json({
      ...data,
      items: data.items.map((item) => normalizeFooterGalleryItemForResponse(req, item)),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch footer gallery items.', error: error.message });
  }
};

const listFooterGalleryAdmin = async (req, res) => {
  try {
    const page = Number(req.query.page || 1);
    const pageSize = Number(req.query.pageSize || MAX_FOOTER_GALLERY_ITEMS);
    const data = await listFooterGalleryItems({ page, pageSize, includeInactive: true });
    return res.status(200).json({
      ...data,
      items: data.items.map((item) => normalizeFooterGalleryItemForResponse(req, item)),
    });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch footer gallery items.', error: error.message });
  }
};

const createFooterGallery = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation error.', errors: errors.array() });
  }

  const uploadedAssets = normalizeUploadedAssets(req);
  if (!uploadedAssets.length) {
    return res.status(400).json({ message: 'At least one footer gallery image is required.' });
  }

  try {
    const baseTitle = String(req.body.title || 'Footer Gallery Image').trim() || 'Footer Gallery Image';
    const baseSortOrder = Number(req.body.sort_order || 0);
    const items = uploadedAssets.map((asset, index) => ({
      title: uploadedAssets.length > 1 ? `${baseTitle} ${index + 1}` : baseTitle,
      image_url: asset.image_url,
      thumbnail_url: asset.thumbnail_url,
      status: req.body.status || 'active',
      sort_order: baseSortOrder + index,
      created_by: req.auth?.userId || null,
    }));

    const ids = await createFooterGalleryItems(items);
    return res.status(201).json({
      message: 'Footer gallery item(s) created successfully.',
      ids,
      created_count: ids.length,
      max_items: MAX_FOOTER_GALLERY_ITEMS,
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: error.status ? error.message : 'Unable to create footer gallery items.',
      error: error.status ? undefined : error.message,
    });
  }
};

const updateFooterGallery = async (req, res) => {
  const itemId = Number(req.params.id);
  if (!itemId) {
    return res.status(400).json({ message: 'Invalid footer gallery item id.' });
  }

  try {
    const uploadedAsset = req.uploadedFooterGalleryAsset
      ? {
          image_url: req.uploadedFooterGalleryAsset.image_url,
          thumbnail_url: req.uploadedFooterGalleryAsset.thumbnail_url,
        }
      : null;

    const updated = await updateFooterGalleryItem(itemId, {
      title: req.body.title,
      image_url: uploadedAsset?.image_url,
      thumbnail_url: uploadedAsset?.thumbnail_url,
      status: req.body.status,
      sort_order: req.body.sort_order,
    });

    if (!updated) {
      return res.status(404).json({ message: 'Footer gallery item not found.' });
    }

    return res.status(200).json({ message: 'Footer gallery item updated successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update footer gallery item.', error: error.message });
  }
};

const deleteFooterGallery = async (req, res) => {
  const itemId = Number(req.params.id);
  if (!itemId) {
    return res.status(400).json({ message: 'Invalid footer gallery item id.' });
  }

  try {
    const removed = await deleteFooterGalleryItem(itemId);
    if (!removed) {
      return res.status(404).json({ message: 'Footer gallery item not found.' });
    }

    return res.status(200).json({ message: 'Footer gallery item deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete footer gallery item.', error: error.message });
  }
};

module.exports = {
  listFooterGallery,
  listFooterGalleryAdmin,
  createFooterGallery,
  updateFooterGallery,
  deleteFooterGallery,
};
