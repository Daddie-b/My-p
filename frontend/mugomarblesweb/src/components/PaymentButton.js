import React from 'react';
import { initiatePayment } from '../api/paymentService';

const PaymentButton = ({ phoneNumber, amount, onPaymentSuccess }) => {
  const handlePayment = async () => {
    try {
      const paymentData = { phoneNumber, amount }; // Include both fields
      console.log('Initiating payment with:', paymentData);
      await initiatePayment(paymentData);
      alert("Payment successful!");
      if (onPaymentSuccess) onPaymentSuccess();
    } catch (error) {
      console.error('Error making payment:', error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <button onClick={handlePayment} className="payment-button">
      Pay Now
    </button>
  );
};

export default PaymentButton;

