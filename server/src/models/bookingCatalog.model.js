const { dbPool } = require('../../config/db.config');

const mapBookingCatalogItem = (row) => ({
  id: row.id,
  category: row.category,
  name: row.name,
  amount_ngn: Number(row.amount_ngn),
  is_active: Boolean(row.is_active),
  sort_order: Number(row.sort_order || 0),
  created_at: row.created_at,
  updated_at: row.updated_at,
});

const listBookingCatalogItems = async ({ activeOnly = false } = {}) => {
  const [rows] = await dbPool.query(
    `SELECT *
     FROM booking_catalog_products
     ${activeOnly ? 'WHERE is_active = 1' : ''}
     ORDER BY sort_order ASC, category ASC, name ASC`
  );

  return rows.map(mapBookingCatalogItem);
};

const findBookingCatalogItemByName = async (name) => {
  const [rows] = await dbPool.execute(
    `SELECT *
     FROM booking_catalog_products
     WHERE name = ?
     LIMIT 1`,
    [name]
  );

  return rows[0] ? mapBookingCatalogItem(rows[0]) : null;
};

const createBookingCatalogItem = async ({ category, name, amount_ngn, is_active = true, sort_order = 0 }) => {
  const [result] = await dbPool.execute(
    `INSERT INTO booking_catalog_products (category, name, amount_ngn, is_active, sort_order)
     VALUES (?, ?, ?, ?, ?)`,
    [category, name, amount_ngn, is_active ? 1 : 0, sort_order]
  );

  const [rows] = await dbPool.execute('SELECT * FROM booking_catalog_products WHERE id = ? LIMIT 1', [result.insertId]);
  return mapBookingCatalogItem(rows[0]);
};

const updateBookingCatalogItem = async (itemId, payload) => {
  const fields = [];
  const values = [];

  if (payload.category !== undefined) {
    fields.push('category = ?');
    values.push(payload.category);
  }
  if (payload.name !== undefined) {
    fields.push('name = ?');
    values.push(payload.name);
  }
  if (payload.amount_ngn !== undefined) {
    fields.push('amount_ngn = ?');
    values.push(payload.amount_ngn);
  }
  if (payload.is_active !== undefined) {
    fields.push('is_active = ?');
    values.push(payload.is_active ? 1 : 0);
  }
  if (payload.sort_order !== undefined) {
    fields.push('sort_order = ?');
    values.push(payload.sort_order);
  }

  if (!fields.length) {
    const [rows] = await dbPool.execute('SELECT * FROM booking_catalog_products WHERE id = ? LIMIT 1', [itemId]);
    return rows[0] ? mapBookingCatalogItem(rows[0]) : null;
  }

  values.push(itemId);
  const [result] = await dbPool.execute(
    `UPDATE booking_catalog_products
     SET ${fields.join(', ')}
     WHERE id = ?`,
    values
  );

  if (!result.affectedRows) {
    return null;
  }

  const [rows] = await dbPool.execute('SELECT * FROM booking_catalog_products WHERE id = ? LIMIT 1', [itemId]);
  return rows[0] ? mapBookingCatalogItem(rows[0]) : null;
};

module.exports = {
  listBookingCatalogItems,
  findBookingCatalogItemByName,
  createBookingCatalogItem,
  updateBookingCatalogItem,
};
