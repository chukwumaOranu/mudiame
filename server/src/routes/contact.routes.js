const express = require('express');
const { contactValidation, sendContactMessage } = require('../controllers/contact.controller');

const router = express.Router();

router.post('/', contactValidation, sendContactMessage);

module.exports = router;
