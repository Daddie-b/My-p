exports.initiatePayment = async (req, res) => {
  const { phoneNumber, amount } = req.body;

  if (!phoneNumber || !amount) {
    return res.status(400).json({ message: 'Phone number and amount are required.' });
  }

  try {
    const response = await makePayment(phoneNumber, amount);
    res.status(200).json({ message: 'Payment initiated successfully', response });
  } catch (error) {
    console.error('Payment initiation error:', error.message);
    res.status(500).json({ message: 'Payment failed', error: error.message });
  }
};
