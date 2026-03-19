const { dbPool } = require('../../config/db.config');

const slugify = (text) =>
  String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const ensureUniqueCategorySlug = async (baseSlug, excludeCategoryId = null) => {
  const root = baseSlug || `category-${Date.now()}`;
  let candidate = root;
  let suffix = 1;

  while (true) {
    const params = [candidate];
    let query = 'SELECT id FROM classic_blog_categories WHERE slug = ?';
    if (excludeCategoryId) {
      query += ' AND id <> ?';
      params.push(excludeCategoryId);
    }
    query += ' LIMIT 1';

    const [rows] = await dbPool.execute(query, params);
    if (!rows.length) {
      return candidate;
    }

    suffix += 1;
    candidate = `${root}-${suffix}`;
  }
};

const listCategories = async () => {
  const [rows] = await dbPool.query(
    `SELECT
      c.id,
      c.name,
      c.slug,
      c.description,
      c.is_active,
      c.created_at,
      c.updated_at,
      COUNT(pc.post_id) AS post_count
     FROM classic_blog_categories c
     LEFT JOIN classic_blog_post_categories pc ON pc.category_id = c.id
     GROUP BY
      c.id,
      c.name,
      c.slug,
      c.description,
      c.is_active,
      c.created_at,
      c.updated_at
     ORDER BY c.name ASC`
  );

  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    is_active: Boolean(row.is_active),
    created_at: row.created_at,
    updated_at: row.updated_at,
    post_count: Number(row.post_count || 0),
  }));
};

const createCategory = async ({ name, slug, description, is_active }) => {
  const normalizedName = String(name || '').trim();
  const normalizedSlug = await ensureUniqueCategorySlug(slugify(slug || normalizedName));

  const [insertResult] = await dbPool.execute(
    `INSERT INTO classic_blog_categories (name, slug, description, is_active)
     VALUES (?, ?, ?, ?)`,
    [normalizedName, normalizedSlug, description || null, is_active === false ? 0 : 1]
  );

  return insertResult.insertId;
};

const updateCategory = async (categoryId, payload) => {
  const [existingRows] = await dbPool.execute(
    'SELECT id, name FROM classic_blog_categories WHERE id = ? LIMIT 1',
    [categoryId]
  );
  if (!existingRows.length) {
    return false;
  }

  const fields = [];
  const values = [];

  if (payload.name !== undefined) {
    fields.push('name = ?');
    values.push(String(payload.name).trim());
  }

  if (payload.slug !== undefined || payload.name !== undefined) {
    const baseSlug = slugify(payload.slug || payload.name || existingRows[0].name);
    const uniqueSlug = await ensureUniqueCategorySlug(baseSlug, categoryId);
    fields.push('slug = ?');
    values.push(uniqueSlug);
  }

  if (payload.description !== undefined) {
    fields.push('description = ?');
    values.push(payload.description || null);
  }

  if (payload.is_active !== undefined) {
    fields.push('is_active = ?');
    values.push(payload.is_active ? 1 : 0);
  }

  if (!fields.length) {
    return true;
  }

  values.push(categoryId);
  await dbPool.execute(
    `UPDATE classic_blog_categories SET ${fields.join(', ')} WHERE id = ?`,
    values
  );

  return true;
};

const deleteCategory = async (categoryId) => {
  const [usageRows] = await dbPool.execute(
    'SELECT COUNT(*) AS total FROM classic_blog_post_categories WHERE category_id = ?',
    [categoryId]
  );

  const usageCount = Number(usageRows[0]?.total || 0);
  if (usageCount > 0) {
    return { deleted: false, reason: 'in_use' };
  }

  const [result] = await dbPool.execute(
    'DELETE FROM classic_blog_categories WHERE id = ?',
    [categoryId]
  );

  return { deleted: result.affectedRows > 0, reason: null };
};

const getCategoryById = async (categoryId) => {
  const [rows] = await dbPool.execute(
    `SELECT id, name, slug, description, is_active, created_at, updated_at
     FROM classic_blog_categories
     WHERE id = ?
     LIMIT 1`,
    [categoryId]
  );

  if (!rows.length) {
    return null;
  }

  const row = rows[0];
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    is_active: Boolean(row.is_active),
    created_at: row.created_at,
    updated_at: row.updated_at,
  };
};

module.exports = {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryById,
};
