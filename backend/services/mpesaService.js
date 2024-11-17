const axios = require('axios');
const btoa = require('btoa');

const getAccessToken = async () => {
  const auth = btoa(`${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`);
  try {
    const response = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials', {
      headers: { Authorization: `Basic ${auth}` }
    });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw new Error('Failed to get access token');
  }
};

const makePayment = async (phoneNumber, amount) => {
  const accessToken = await getAccessToken();
  const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
  const password = btoa(`${process.env.TILL_NUMBER}${process.env.PASSKEY}${timestamp}`);

  console.log('Requesting M-Pesa payment with:', {
    BusinessShortCode: process.env.TILL_NUMBER,
    Password: password,
    Timestamp: timestamp,
    PhoneNumber: phoneNumber,
    Amount: amount,
  });
  
  try {
    const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
      BusinessShortCode: process.env.TILL_NUMBER,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerBuyGoodsOnline',
      Amount: amount,
      PartyA: phoneNumber,
      PartyB: process.env.TILL_NUMBER,
      PhoneNumber: phoneNumber,
      CallBackURL: `${process.env.BACKEND_URL}/api/payments/callback`,
      AccountReference: 'OrderPayment',
      TransactionDesc: 'Payment for Order'
    }, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
  
    console.log('M-Pesa Response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error making payment:', error.response?.data || error.message);
    throw new Error('Payment request failed');
  }
  
  
};


module.exports = { makePayment };
