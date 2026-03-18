const { body, validationResult } = require('express-validator');
const { sendEmail, isEmailConfigured } = require('../utils/email');

const contactValidation = [
  body('name').trim().notEmpty().withMessage('Name is required.'),
  body('email').trim().isEmail().withMessage('A valid email is required.'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be between 10 and 5000 characters.'),
];

const sendContactMessage = async (req, res) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).json({ message: 'Validation error.', errors: validation.array() });
  }

  if (!isEmailConfigured()) {
    return res.status(503).json({
      message: 'Email service is not configured right now.',
    });
  }

  const { name, email, message } = req.body;

  try {
    await sendEmail({
      to: process.env.EMAIL_USER,
      subject: `New contact message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${String(message).replace(/\n/g, '<br />')}</p>
      `,
    });

    return res.status(200).json({
      message: 'Your message has been sent successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to send your message right now.',
      error: error.message,
    });
  }
};

module.exports = {
  contactValidation,
  sendContactMessage,
};
