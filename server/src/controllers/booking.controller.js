const { body, validationResult } = require('express-validator');
const {
  createBookingRequest,
  getBookingById,
  getBookingByReference,
  updateBookingPayment,
  listBookingRequests,
  updateBookingStatus,
} = require('../models/booking.model');
const {
  listBookingCatalogItems,
  findBookingCatalogItemByName,
  createBookingCatalogItem,
  updateBookingCatalogItem,
} = require('../models/bookingCatalog.model');
const { sendEmail, isEmailConfigured } = require('../utils/email');
const {
  initializePaystackTransaction,
  isPaystackConfigured,
  verifyPaystackTransaction,
  isValidPaystackSignature,
} = require('../utils/paystack');

const bookingValidation = [
  body('customer_name').trim().notEmpty().withMessage('Customer name is required.'),
  body('customer_phone').trim().notEmpty().withMessage('Phone number is required.'),
  body('customer_email').trim().isEmail().withMessage('Valid email is required.'),
  body('product_category').trim().notEmpty().withMessage('Product category is required.'),
  body('product_name').trim().notEmpty().withMessage('Product name is required.'),
  body('consultant_preference').optional({ values: 'falsy' }).trim(),
  body('preferred_date').trim().isISO8601().withMessage('Preferred date is required.'),
  body('start_time').trim().notEmpty().withMessage('Start time is required.'),
  body('finish_time').trim().notEmpty().withMessage('Finish time is required.'),
  body('selected_slot').optional({ values: 'falsy' }).trim(),
  body('payment_method')
    .isIn(['pay_on_pickup', 'card_payment'])
    .withMessage('Invalid payment method.'),
  body('customer_note').optional({ values: 'falsy' }).trim(),
];
const bookingCatalogValidation = [
  body('category').trim().notEmpty().withMessage('Category is required.'),
  body('name').trim().notEmpty().withMessage('Product name is required.'),
  body('amount_ngn').isFloat({ min: 0 }).withMessage('Amount must be a valid number.'),
  body('is_active').optional().isBoolean().withMessage('Invalid active flag.'),
  body('sort_order').optional().isInt().withMessage('Sort order must be a whole number.'),
];

const convertDisplayTimeToSqlTime = (value) => {
  if (!value) {
    return null;
  }

  const normalized = String(value).trim();
  const twentyFourHourMatch = normalized.match(/^(\d{2}):(\d{2})(?::(\d{2}))?$/);
  if (twentyFourHourMatch) {
    const [, hoursText, minutesText, secondsText = '00'] = twentyFourHourMatch;
    return `${hoursText}:${minutesText}:${secondsText}`;
  }

  if (/^\d{2}:\d{2}:\d{2}$/.test(normalized)) {
    return normalized;
  }

  const twelveHourMatch = normalized.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/i);
  if (!twelveHourMatch) {
    return null;
  }

  const [, hoursText, minutesText = '00', meridiemText] = twelveHourMatch;
  let hours = Number(hoursText) % 12;
  if (meridiemText.toLowerCase() === 'pm') {
    hours += 12;
  }

  return `${String(hours).padStart(2, '0')}:${minutesText}:00`;
};

const normalizeSelectedSlot = (preferredDate, selectedSlot) => {
  if (!selectedSlot) {
    return null;
  }

  const normalized = String(selectedSlot).trim();
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(normalized)) {
    return normalized;
  }

  const extractedTime = normalized.match(/(\d{1,2}(?::\d{2})?\s*(?:am|pm))/i);
  const sqlTime = convertDisplayTimeToSqlTime(extractedTime ? extractedTime[1] : normalized);
  if (!sqlTime || !preferredDate) {
    return null;
  }

  return `${preferredDate} ${sqlTime}`;
};

const sendBookingCreatedEmails = async (booking) => {
  if (!isEmailConfigured()) {
    return;
  }

  const customerSubject = `Booking received: ${booking.booking_reference}`;
  const customerText = `Hello ${booking.customer_name}, your booking ${booking.booking_reference} has been received for ${booking.product_name} on ${booking.preferred_date}.`;

  await sendEmail({
    to: booking.customer_email,
    subject: customerSubject,
    text: customerText,
    html: `<p>Hello ${booking.customer_name},</p><p>Your booking <strong>${booking.booking_reference}</strong> has been received for <strong>${booking.product_name}</strong> on <strong>${booking.preferred_date}</strong>.</p>`,
  });

  if (process.env.EMAIL_USER) {
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: `New booking: ${booking.booking_reference}`,
      text: `${booking.customer_name} created a booking for ${booking.product_name}.`,
      html: `<p><strong>${booking.customer_name}</strong> created a booking for <strong>${booking.product_name}</strong>.</p>`,
    });
  }
};

const sendBookingCompletedEmail = async (booking) => {
  if (!isEmailConfigured()) {
    return;
  }

  await sendEmail({
    to: booking.customer_email,
    subject: `Booking completed: ${booking.booking_reference}`,
    text: `Hello ${booking.customer_name}, your booking ${booking.booking_reference} has been marked as completed.`,
    html: `<p>Hello ${booking.customer_name},</p><p>Your booking <strong>${booking.booking_reference}</strong> has been marked as completed. Thank you for choosing Mudiame Lush.</p>`,
  });
};

const getBookingPaymentStateFromPaystack = (paystackData) => {
  const status = String(paystackData?.status || '').toLowerCase();

  if (status === 'success') {
    return 'paid';
  }

  if (['failed', 'abandoned', 'reversed'].includes(status)) {
    return 'failed';
  }

  return 'pending';
};

const syncBookingWithPaystackData = async (booking, paystackData, changedBy = 'paystack') => {
  if (!booking) {
    return null;
  }

  const paymentStatus = getBookingPaymentStateFromPaystack(paystackData);
  await updateBookingPayment(booking.id, {
    payment_status: paymentStatus,
    payment_reference: paystackData?.reference || booking.payment_reference || booking.booking_reference,
    payment_authorization_url: booking.payment_authorization_url,
  });

  if (
    paymentStatus === 'paid' &&
    booking.status === 'pending'
  ) {
    await updateBookingStatus({
      bookingId: booking.id,
      status: 'confirmed',
      changedBy,
      changeNote: 'Payment verified via Paystack',
    });
  }

  return getBookingById(booking.id);
};

const listPublicBookingOptions = async (_req, res) => {
  try {
    const items = await listBookingCatalogItems({ activeOnly: true });
    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch booking options.', error: error.message });
  }
};

const listAdminBookingCatalog = async (_req, res) => {
  try {
    const items = await listBookingCatalogItems();
    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch booking catalog.', error: error.message });
  }
};

const createAdminBookingCatalog = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation error.', errors: errors.array() });
  }
  try {
    const item = await createBookingCatalogItem({
      category: req.body.category,
      name: req.body.name,
      amount_ngn: Number(req.body.amount_ngn),
      is_active: req.body.is_active !== undefined ? Boolean(req.body.is_active) : true,
      sort_order: req.body.sort_order !== undefined ? Number(req.body.sort_order) : 0,
    });
    return res.status(201).json({ message: 'Booking product created successfully.', item });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to create booking product.', error: error.message });
  }
};

const updateAdminBookingCatalog = async (req, res) => {
  const bookingCatalogId = Number(req.params.id);
  if (!bookingCatalogId) {
    return res.status(400).json({ message: 'Invalid booking product id.' });
  }
  try {
    const item = await updateBookingCatalogItem(bookingCatalogId, {
      category: req.body.category,
      name: req.body.name,
      amount_ngn: req.body.amount_ngn !== undefined ? Number(req.body.amount_ngn) : undefined,
      is_active: req.body.is_active !== undefined ? Boolean(req.body.is_active) : undefined,
      sort_order: req.body.sort_order !== undefined ? Number(req.body.sort_order) : undefined,
    });
    if (!item) {
      return res.status(404).json({ message: 'Booking product not found.' });
    }
    return res.status(200).json({ message: 'Booking product updated successfully.', item });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update booking product.', error: error.message });
  }
};

const createPublicBooking = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: 'Validation error.', errors: errors.array() });
  }

  try {
    const startTime = convertDisplayTimeToSqlTime(req.body.start_time);
    const finishTime = convertDisplayTimeToSqlTime(req.body.finish_time);
    if (!startTime || !finishTime) {
      return res.status(400).json({ message: 'Start time and finish time must be valid times.' });
    }

    const normalizedSelectedSlot = normalizeSelectedSlot(req.body.preferred_date, req.body.selected_slot);
    const catalogItem = await findBookingCatalogItemByName(req.body.product_name);
    const amount_ngn = catalogItem ? catalogItem.amount_ngn : null;
    const created = await createBookingRequest({
      ...req.body,
      start_time: startTime,
      finish_time: finishTime,
      selected_slot: normalizedSelectedSlot,
      amount_ngn,
      payment_status: req.body.payment_method === 'card_payment' ? 'pending' : 'unpaid',
      status: 'pending',
    });

    let paystack = null;

    if (req.body.payment_method === 'card_payment') {
      if (!isPaystackConfigured()) {
        return res.status(503).json({
          message: 'Card payment is not available right now. Please use pay after service.',
        });
      }

      paystack = await initializePaystackTransaction({
        email: req.body.customer_email,
        amountNgn: amount_ngn || 0,
        reference: created.booking_reference,
        callbackUrl: `${process.env.CLIENT_URL || 'http://localhost:5173'}/booking?reference=${created.booking_reference}&payment=callback`,
        metadata: {
          booking_reference: created.booking_reference,
          customer_name: req.body.customer_name,
          product_name: req.body.product_name,
        },
      });

      await updateBookingPayment(created.id, {
        payment_status: 'initiated',
        payment_reference: paystack?.reference || created.booking_reference,
        payment_authorization_url: paystack?.authorization_url || null,
      });
    }

    const booking = await getBookingById(created.id);
    await sendBookingCreatedEmails(booking);

    return res.status(201).json({
      message: 'Booking created successfully.',
      booking,
      payment: paystack
        ? {
            required: true,
            authorization_url: paystack.authorization_url,
            access_code: paystack.access_code,
            reference: paystack.reference,
          }
        : {
            required: false,
          },
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: 'Unable to create booking.',
      error: error.message,
    });
  }
};

const verifyPublicBookingPayment = async (req, res) => {
  const reference = String(req.params.reference || req.query.reference || '').trim();
  if (!reference) {
    return res.status(400).json({ message: 'Payment reference is required.' });
  }

  try {
    const booking = await getBookingByReference(reference);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found for this payment reference.' });
    }

    const paystackData = await verifyPaystackTransaction(reference);
    const updatedBooking = await syncBookingWithPaystackData(booking, paystackData, 'callback');

    return res.status(200).json({
      message:
        updatedBooking?.payment_status === 'paid'
          ? 'Payment verified successfully.'
          : 'Payment is not yet successful.',
      booking: updatedBooking,
      payment: {
        status: updatedBooking?.payment_status || 'pending',
        reference: paystackData?.reference || reference,
        gateway_status: paystackData?.status || null,
      },
    });
  } catch (error) {
    return res.status(error.status || 500).json({
      message: 'Unable to verify payment right now.',
      error: error.message,
    });
  }
};

const handlePaystackWebhook = async (req, res) => {
  const signature = req.headers['x-paystack-signature'];
  const rawPayload = req.rawBody || '';

  if (!isValidPaystackSignature(rawPayload, signature)) {
    return res.status(401).json({ message: 'Invalid Paystack signature.' });
  }

  const event = req.body;
  const reference = event?.data?.reference;

  if (!reference) {
    return res.status(200).json({ received: true });
  }

  try {
    const booking = await getBookingByReference(reference);
    if (!booking) {
      return res.status(200).json({ received: true });
    }

    if (event.event === 'charge.success') {
      const paystackData = await verifyPaystackTransaction(reference);
      await syncBookingWithPaystackData(booking, paystackData, 'webhook');
    } else if (event.event === 'charge.failed') {
      await updateBookingPayment(booking.id, {
        payment_status: 'failed',
        payment_reference: reference,
        payment_authorization_url: booking.payment_authorization_url,
      });
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to process Paystack webhook.', error: error.message });
  }
};

const listAdminBookings = async (_req, res) => {
  try {
    const items = await listBookingRequests();
    return res.status(200).json({ items });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to fetch bookings.', error: error.message });
  }
};

const updateAdminBookingStatus = async (req, res) => {
  const bookingId = Number(req.params.id);
  if (!bookingId) {
    return res.status(400).json({ message: 'Invalid booking id.' });
  }

  const status = String(req.body.status || '');
  if (!['pending', 'confirmed', 'completed', 'cancelled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid booking status.' });
  }

  try {
    const previousStatus = await updateBookingStatus({
      bookingId,
      status,
      changedBy: req.auth?.username || 'admin',
      changeNote: req.body.change_note || null,
    });

    if (!previousStatus) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    const booking = await getBookingById(bookingId);
    if (status === 'completed' && previousStatus !== 'completed') {
      await sendBookingCompletedEmail(booking);
    }

    return res.status(200).json({ message: 'Booking status updated successfully.', booking });
  } catch (error) {
    return res.status(500).json({ message: 'Unable to update booking status.', error: error.message });
  }
};

module.exports = {
  bookingValidation,
  bookingCatalogValidation,
  listPublicBookingOptions,
  listAdminBookingCatalog,
  createAdminBookingCatalog,
  updateAdminBookingCatalog,
  createPublicBooking,
  verifyPublicBookingPayment,
  handlePaystackWebhook,
  listAdminBookings,
  updateAdminBookingStatus,
};
