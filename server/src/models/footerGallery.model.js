const { dbPool } = require('../../config/db.config');

const MAX_FOOTER_GALLERY_ITEMS = 16;

const mapRow = (row) => ({
  id: row.id,
  title: row.title,
  image_url: row.image_url,
  thumbnail_url: row.thumbnail_url,
  status: row.status,
  sort_order: Number(row.sort_order || 0),
  created_by: row.created_by,
  created_at: row.created_at,
  updated_at: row.updated_at,
});

const listFooterGalleryItems = async ({ page = 1, pageSize = MAX_FOOTER_GALLERY_ITEMS, includeInactive = false }) => {
  const limit = Math.max(1, Math.min(MAX_FOOTER_GALLERY_ITEMS, Number(pageSize) || MAX_FOOTER_GALLERY_ITEMS));
  const offset = Math.max(0, (Number(page) - 1) * limit);

  const whereClause = includeInactive ? '' : "WHERE status = 'active'";

  const [countRows] = await dbPool.query(
    `SELECT COUNT(*) AS total
     FROM footer_gallery_items
     ${whereClause}`
  );

  const [rows] = await dbPool.query(
    `SELECT
      id,
      title,
      image_url,
      thumbnail_url,
      status,
      sort_order,
      created_by,
      created_at,
      updated_at
     FROM footer_gallery_items
     ${whereClause}
     ORDER BY sort_order ASC, created_at ASC
     LIMIT ? OFFSET ?`,
    [limit, offset]
  );

  return {
    items: rows.map(mapRow),
    pagination: {
      page: Number(page),
      pageSize: limit,
      total: Number(countRows[0]?.total || 0),
      totalPages: Math.max(1, Math.ceil(Number(countRows[0]?.total || 0) / limit)),
      maxItems: MAX_FOOTER_GALLERY_ITEMS,
    },
  };
};

const countFooterGalleryItems = async (connection = dbPool) => {
  const [rows] = await connection.query('SELECT COUNT(*) AS total FROM footer_gallery_items');
  return Number(rows[0]?.total || 0);
};

const createFooterGalleryItems = async (items = []) => {
  if (!items.length) {
    return [];
  }

  const connection = await dbPool.getConnection();

  try {
    await connection.beginTransaction();

    const existingCount = await countFooterGalleryItems(connection);
    if (existingCount + items.length > MAX_FOOTER_GALLERY_ITEMS) {
      const error = new Error(`Footer gallery supports a maximum of ${MAX_FOOTER_GALLERY_ITEMS} images.`);
      error.status = 400;
      throw error;
    }

    const insertedIds = [];

    for (const item of items) {
      const [result] = await connection.execute(
        `INSERT INTO footer_gallery_items
        (title, image_url, thumbnail_url, status, sort_order, created_by)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [
          item.title,
          item.image_url,
          item.thumbnail_url,
          item.status || 'active',
          Number(item.sort_order || 0),
          item.created_by || null,
        ]
      );

      insertedIds.push(result.insertId);
    }

    await connection.commit();
    return insertedIds;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const updateFooterGalleryItem = async (itemId, payload) => {
  const [existingRows] = await dbPool.execute(
    'SELECT id FROM footer_gallery_items WHERE id = ? LIMIT 1',
    [itemId]
  );

  if (!existingRows.length) {
    return false;
  }

  const fields = [];
  const values = [];

  if (payload.title !== undefined) {
    fields.push('title = ?');
    values.push(payload.title);
  }

  if (payload.image_url !== undefined) {
    fields.push('image_url = ?');
    values.push(payload.image_url);
  }

  if (payload.thumbnail_url !== undefined) {
    fields.push('thumbnail_url = ?');
    values.push(payload.thumbnail_url);
  }

  if (payload.status !== undefined) {
    fields.push('status = ?');
    values.push(payload.status);
  }

  if (payload.sort_order !== undefined) {
    fields.push('sort_order = ?');
    values.push(Number(payload.sort_order || 0));
  }

  if (!fields.length) {
    return true;
  }

  values.push(itemId);
  await dbPool.execute(`UPDATE footer_gallery_items SET ${fields.join(', ')} WHERE id = ?`, values);
  return true;
};

const deleteFooterGalleryItem = async (itemId) => {
  const [result] = await dbPool.execute('DELETE FROM footer_gallery_items WHERE id = ?', [itemId]);
  return result.affectedRows > 0;
};

module.exports = {
  MAX_FOOTER_GALLERY_ITEMS,
  listFooterGalleryItems,
  createFooterGalleryItems,
  updateFooterGalleryItem,
  deleteFooterGalleryItem,
};
