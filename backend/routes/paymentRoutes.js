const express = require('express');
const { initiatePayment } = require('../controllers/paymentController'); // Ensure this file exists
const router = express.Router();

// Define the POST /payment route
router.post('/payment', (req, res) => {
    const { phoneNumber, amount } = req.body;
    if (!phoneNumber || !amount) {
        return res.status(400).json({ error: 'Phone number and amount are required' });
    }
    // Payment processing logic here
    res.status(200).json({ message: 'Payment initiated successfully' });
});

module.exports = router;
