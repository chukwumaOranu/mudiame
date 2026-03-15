const { dbPool } = require('../../config/db.config');

const slugify = (text) =>
  String(text || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

const ensureUniqueSlug = async (baseSlug, excludeId = null, connection = null) => {
  const conn = connection || dbPool;
  const root = baseSlug || `portfolio-${Date.now()}`;
  let candidate = root;
  let suffix = 1;

  while (true) {
    const params = [candidate];
    let query = 'SELECT id FROM portfolio_items WHERE slug = ?';
    if (excludeId) {
      query += ' AND id <> ?';
      params.push(excludeId);
    }
    query += ' LIMIT 1';

    const [rows] = await conn.execute(query, params);
    if (!rows.length) {
      return candidate;
    }

    suffix += 1;
    candidate = `${root}-${suffix}`;
  }
};

const mapRow = (row) => ({
  id: row.id,
  title: row.title,
  slug: row.slug,
  description: row.description,
  image_url: row.image_url,
  category: row.category,
  status: row.status,
  sort_order: Number(row.sort_order || 0),
  is_featured: Boolean(row.is_featured),
  created_by: row.created_by,
  created_at: row.created_at,
  updated_at: row.updated_at,
});

const listPortfolioItems = async ({ page = 1, pageSize = 24, status = 'active', includeInactive = false, category = null }) => {
  const limit = Math.max(1, Math.min(100, Number(pageSize) || 24));
  const offset = Math.max(0, (Number(page) - 1) * limit);

  const conditions = [];
  const params = [];

  if (!includeInactive) {
    conditions.push('status = ?');
    params.push(status || 'active');
  }

  if (category) {
    conditions.push('category = ?');
    params.push(category);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const [countRows] = await dbPool.query(
    `SELECT COUNT(*) AS total
     FROM portfolio_items
     ${whereClause}`,
    params
  );

  const [rows] = await dbPool.query(
    `SELECT
      id,
      title,
      slug,
      description,
      image_url,
      category,
      status,
      sort_order,
      is_featured,
      created_by,
      created_at,
      updated_at
     FROM portfolio_items
     ${whereClause}
     ORDER BY sort_order ASC, created_at DESC
     LIMIT ? OFFSET ?`,
    [...params, limit, offset]
  );

  const [categoryRows] = await dbPool.query(
    `SELECT DISTINCT category
     FROM portfolio_items
     ${includeInactive ? '' : "WHERE status = 'active'"}
     ORDER BY category ASC`
  );

  return {
    items: rows.map(mapRow),
    categories: categoryRows.map((row) => row.category).filter(Boolean),
    pagination: {
      page: Number(page),
      pageSize: limit,
      total: Number(countRows[0]?.total || 0),
      totalPages: Math.max(1, Math.ceil(Number(countRows[0]?.total || 0) / limit)),
    },
  };
};

const createPortfolioItem = async ({
  title,
  slug,
  description,
  image_url,
  category,
  status,
  sort_order,
  is_featured,
  created_by,
}) => {
  const connection = await dbPool.getConnection();
  try {
    await connection.beginTransaction();

    const uniqueSlug = await ensureUniqueSlug(slugify(slug || title), null, connection);

    const [result] = await connection.execute(
      `INSERT INTO portfolio_items
      (title, slug, description, image_url, category, status, sort_order, is_featured, created_by)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        title,
        uniqueSlug,
        description || null,
        image_url,
        category,
        status || 'active',
        Number(sort_order || 0),
        is_featured ? 1 : 0,
        created_by || null,
      ]
    );

    await connection.commit();
    return result.insertId;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const updatePortfolioItem = async (itemId, payload) => {
  const connection = await dbPool.getConnection();
  try {
    await connection.beginTransaction();

    const [existingRows] = await connection.execute(
      'SELECT id, title FROM portfolio_items WHERE id = ? LIMIT 1',
      [itemId]
    );

    if (!existingRows.length) {
      await connection.rollback();
      return false;
    }

    const fields = [];
    const values = [];

    if (payload.title !== undefined) {
      fields.push('title = ?');
      values.push(payload.title);
    }

    if (payload.slug !== undefined || payload.title !== undefined) {
      const baseSlug = payload.slug || payload.title || existingRows[0].title;
      const uniqueSlug = await ensureUniqueSlug(slugify(baseSlug), itemId, connection);
      fields.push('slug = ?');
      values.push(uniqueSlug);
    }

    if (payload.description !== undefined) {
      fields.push('description = ?');
      values.push(payload.description || null);
    }

    if (payload.image_url !== undefined) {
      fields.push('image_url = ?');
      values.push(payload.image_url);
    }

    if (payload.category !== undefined) {
      fields.push('category = ?');
      values.push(payload.category);
    }

    if (payload.status !== undefined) {
      fields.push('status = ?');
      values.push(payload.status);
    }

    if (payload.sort_order !== undefined) {
      fields.push('sort_order = ?');
      values.push(Number(payload.sort_order || 0));
    }

    if (payload.is_featured !== undefined) {
      fields.push('is_featured = ?');
      values.push(payload.is_featured ? 1 : 0);
    }

    if (!fields.length) {
      await connection.commit();
      return true;
    }

    values.push(itemId);
    await connection.execute(`UPDATE portfolio_items SET ${fields.join(', ')} WHERE id = ?`, values);

    await connection.commit();
    return true;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const deletePortfolioItem = async (itemId) => {
  const [result] = await dbPool.execute('DELETE FROM portfolio_items WHERE id = ?', [itemId]);
  return result.affectedRows > 0;
};

module.exports = {
  listPortfolioItems,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
};
