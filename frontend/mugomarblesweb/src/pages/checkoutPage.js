import React from 'react';
import PaymentButton from '../components/PaymentButton';

const CheckoutPage = () => {
  const phoneNumber = '254712345678'; // Replace with user's phone number
  const amount = 1000; // Replace with the total order amount

  return (
    <div>
      <h1>Checkout</h1>
      <PaymentButton phoneNumber={phoneNumber} amount={amount} />
    </div>
  );
};

export default CheckoutPage;
