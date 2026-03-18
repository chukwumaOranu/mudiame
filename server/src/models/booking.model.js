const { dbPool } = require('../../config/db.config');

const generateBookingReference = () =>
  `MBK-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 900 + 100)}`;

const mapBooking = (row) => ({
  id: row.id,
  booking_reference: row.booking_reference,
  customer_name: row.customer_name,
  customer_phone: row.customer_phone,
  customer_email: row.customer_email,
  product_category: row.product_category,
  product_name: row.product_name,
  consultant_preference: row.consultant_preference,
  preferred_date: row.preferred_date,
  start_time: row.start_time,
  finish_time: row.finish_time,
  selected_slot: row.selected_slot,
  payment_method: row.payment_method,
  payment_status: row.payment_status,
  payment_reference: row.payment_reference,
  payment_authorization_url: row.payment_authorization_url,
  amount_ngn: row.amount_ngn !== null ? Number(row.amount_ngn) : null,
  customer_note: row.customer_note,
  status: row.status,
  completed_at: row.completed_at,
  created_at: row.created_at,
  updated_at: row.updated_at,
});

const createBookingRequest = async (payload) => {
  const booking_reference = generateBookingReference();

  const [result] = await dbPool.execute(
    `INSERT INTO booking_requests (
      booking_reference,
      customer_name,
      customer_phone,
      customer_email,
      product_category,
      product_name,
      consultant_preference,
      preferred_date,
      start_time,
      finish_time,
      selected_slot,
      payment_method,
      payment_status,
      payment_reference,
      payment_authorization_url,
      amount_ngn,
      customer_note,
      status
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      booking_reference,
      payload.customer_name,
      payload.customer_phone,
      payload.customer_email,
      payload.product_category,
      payload.product_name,
      payload.consultant_preference || 'Any consultant',
      payload.preferred_date,
      payload.start_time,
      payload.finish_time,
      payload.selected_slot || null,
      payload.payment_method,
      payload.payment_status || 'pending',
      payload.payment_reference || null,
      payload.payment_authorization_url || null,
      payload.amount_ngn || null,
      payload.customer_note || null,
      payload.status || 'pending',
    ]
  );

  await dbPool.execute(
    `INSERT INTO booking_status_history (booking_id, from_status, to_status, changed_by, change_note)
     VALUES (?, ?, ?, ?, ?)`,
    [result.insertId, null, payload.status || 'pending', 'system', 'Booking created']
  );

  return { id: result.insertId, booking_reference };
};

const getBookingById = async (bookingId) => {
  const [rows] = await dbPool.execute(
    'SELECT * FROM booking_requests WHERE id = ? LIMIT 1',
    [bookingId]
  );

  return rows[0] ? mapBooking(rows[0]) : null;
};

const updateBookingPayment = async (bookingId, payload) => {
  await dbPool.execute(
    `UPDATE booking_requests
     SET payment_status = ?, payment_reference = ?, payment_authorization_url = ?
     WHERE id = ?`,
    [
      payload.payment_status || 'pending',
      payload.payment_reference || null,
      payload.payment_authorization_url || null,
      bookingId,
    ]
  );
};

const listBookingRequests = async () => {
  const [rows] = await dbPool.query(
    `SELECT *
     FROM booking_requests
     ORDER BY created_at DESC`
  );

  return rows.map(mapBooking);
};

const updateBookingStatus = async ({ bookingId, status, changedBy, changeNote }) => {
  const connection = await dbPool.getConnection();

  try {
    await connection.beginTransaction();

    const [existingRows] = await connection.execute(
      'SELECT id, status FROM booking_requests WHERE id = ? LIMIT 1',
      [bookingId]
    );

    if (!existingRows.length) {
      await connection.rollback();
      return null;
    }

    await connection.execute(
      `UPDATE booking_requests
       SET status = ?, completed_at = CASE WHEN ? = 'completed' THEN NOW() ELSE completed_at END
       WHERE id = ?`,
      [status, status, bookingId]
    );

    await connection.execute(
      `INSERT INTO booking_status_history (booking_id, from_status, to_status, changed_by, change_note)
       VALUES (?, ?, ?, ?, ?)`,
      [bookingId, existingRows[0].status, status, changedBy || null, changeNote || null]
    );

    await connection.commit();
    return existingRows[0].status;
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

module.exports = {
  createBookingRequest,
  getBookingById,
  updateBookingPayment,
  listBookingRequests,
  updateBookingStatus,
};
