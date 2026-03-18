const express = require('express');
const {
  bookingValidation,
  bookingCatalogValidation,
  listPublicBookingOptions,
  listAdminBookingCatalog,
  createAdminBookingCatalog,
  updateAdminBookingCatalog,
  createPublicBooking,
  listAdminBookings,
  updateAdminBookingStatus,
} = require('../controllers/booking.controller');
const { authMiddleware, requirePermission } = require('../middleware/auth.middleware');

const router = express.Router();

router.get('/options', listPublicBookingOptions);
router.post('/', bookingValidation, createPublicBooking);
router.get('/admin/catalog', authMiddleware, requirePermission('bookings.read'), listAdminBookingCatalog);
router.post('/admin/catalog', authMiddleware, requirePermission('bookings.update'), bookingCatalogValidation, createAdminBookingCatalog);
router.put('/admin/catalog/:id', authMiddleware, requirePermission('bookings.update'), updateAdminBookingCatalog);
router.get('/admin', authMiddleware, requirePermission('bookings.read'), listAdminBookings);
router.put('/admin/:id/status', authMiddleware, requirePermission('bookings.update'), updateAdminBookingStatus);

module.exports = router;
