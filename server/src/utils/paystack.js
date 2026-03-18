const axios = require('axios');

const isPaystackConfigured = () => Boolean(process.env.PAYSTACK_SECRET_KEY);

const initializePaystackTransaction = async ({
  email,
  amountNgn,
  reference,
  callbackUrl,
  metadata,
}) => {
  if (!isPaystackConfigured()) {
    const error = new Error('Paystack is not configured.');
    error.status = 503;
    throw error;
  }

  const response = await axios.post(
    'https://api.paystack.co/transaction/initialize',
    {
      email,
      amount: Math.round(Number(amountNgn || 0) * 100),
      reference,
      callback_url: callbackUrl,
      metadata,
      currency: 'NGN',
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      timeout: 15000,
    }
  );

  return response.data?.data || null;
};

module.exports = {
  isPaystackConfigured,
  initializePaystackTransaction,
};
