import React, { useState } from 'react';
import { initiatePayment } from '../api/paymentService'; // Adjusted import path

const PaymentForm = ({ orderId, onPaymentSuccess }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            if (!phoneNumber || !amount) {
                setError('Please provide both phone number and amount.');
                return;
            }
            const paymentData = { phoneNumber, amount, orderId };
            const result = await initiatePayment(paymentData);
            setSuccess('Payment initiated successfully!');
            onPaymentSuccess(); // Refresh the orders after payment
        } catch (err) {
            setError('Failed to initiate payment. Please try again.');
            console.error('Payment Error:', err);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: 'auto' }}>
            <div>
                <label>Phone Number:</label>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="254712345678"
                    required
                />
            </div>
            <div>
                <label>Amount:</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    required
                />
            </div>
            <button type="submit">Make Payment</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </form>
    );
};

export default PaymentForm;
