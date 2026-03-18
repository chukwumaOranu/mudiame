const nodemailer = require('nodemailer');

let transporter;

const isEmailConfigured = () =>
  Boolean(process.env.SMTP_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS);

const getTransporter = () => {
  if (!isEmailConfigured()) {
    return null;
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: Number(process.env.SMTP_PORT || 465) === 465,
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 15000,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  return transporter;
};

const sendEmail = async ({ to, subject, html, text }) => {
  const mailer = getTransporter();
  if (!mailer) {
    return { sent: false, reason: 'missing-email-config' };
  }

  await mailer.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
    text,
  });

  return { sent: true };
};

module.exports = {
  isEmailConfigured,
  sendEmail,
};
