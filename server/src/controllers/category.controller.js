const { validationResult } = require('express-validator');
const {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
} = require('../models/category.model');

const listClassicBlogCategories = async (_req, res) => {
  try {
    const items = await listCategories();
    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch categories.', error: error.message });
  }
};

const createClassicBlogCategory = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation error.', errors: errors.array() });
  }

  try {
    const categoryId = await createCategory(req.body);
    const item = await getCategoryById(categoryId);
    return res.status(201).json({ message: 'Category created successfully.', item });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Category name or slug already exists.' });
    }
    return res.status(500).json({ message: 'Unable to create category.', error: error.message });
  }
};

const updateClassicBlogCategory = async (req, res) => {
  const categoryId = Number(req.params.id);
  if (!categoryId) {
    return res.status(400).json({ message: 'Invalid category id.' });
  }

  try {
    const updated = await updateCategory(categoryId, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    const item = await getCategoryById(categoryId);
    return res.status(200).json({ message: 'Category updated successfully.', item });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ message: 'Category name or slug already exists.' });
    }
    return res.status(500).json({ message: 'Unable to update category.', error: error.message });
  }
};

const deleteClassicBlogCategory = async (req, res) => {
  const categoryId = Number(req.params.id);
  if (!categoryId) {
    return res.status(400).json({ message: 'Invalid category id.' });
  }

  try {
    const result = await deleteCategory(categoryId);
    if (!result.deleted && result.reason === 'in_use') {
      return res.status(409).json({ message: 'Category is assigned to blog posts and cannot be deleted.' });
    }
    if (!result.deleted) {
      return res.status(404).json({ message: 'Category not found.' });
    }

    return res.status(200).json({ message: 'Category deleted successfully.' });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to delete category.', error: error.message });
  }
};

module.exports = {
  listClassicBlogCategories,
  createClassicBlogCategory,
  updateClassicBlogCategory,
  deleteClassicBlogCategory,
};
