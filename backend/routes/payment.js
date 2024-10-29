const express = require('express');
const axios = require('axios');
const router = express.Router();

const DARAJA_API_URL = "https://sandbox.safaricom.co.ke";
const SHORTCODE = "174379"; // Replace with your shortcode
const PASSKEY = "YOUR_DARAJA_PASSKEY";
const CALLBACK_URL = "https://yourdomain.com/api/payment/callback"; // Replace with your callback URL
const CONSUMER_KEY = "YOUR_CONSUMER_KEY";
const CONSUMER_SECRET = "YOUR_CONSUMER_SECRET";

// Generate access token
const generateAccessToken = async () => {
  const response = await axios.get(`${DARAJA_API_URL}/oauth/v1/generate?grant_type=client_credentials`, {
    auth: {
      username: CONSUMER_KEY,
      password: CONSUMER_SECRET,
    },
  });
  return response.data.access_token;
};

// Handle payment request
router.post('/pay', async (req, res) => {
  const { phoneNumber, amount } = req.body;

  try {
    const accessToken = await generateAccessToken();

    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, -3);
    const password = Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString('base64');

    const response = await axios.post(
      `${DARAJA_API_URL}/mpesa/stkpush/v1/processrequest`,
      {
        BusinessShortCode: SHORTCODE,
        Password: password,
        Timestamp: timestamp,
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phoneNumber, // User's phone number
        PartyB: SHORTCODE,
        PhoneNumber: phoneNumber,
        CallBackURL: CALLBACK_URL,
        AccountReference: "OrderPayment",
        TransactionDesc: "Payment for order",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error) {
    console.error("Error initiating payment:", error);
    res.status(500).json({ error: "Failed to initiate payment" });
  }
});

module.exports = router;

