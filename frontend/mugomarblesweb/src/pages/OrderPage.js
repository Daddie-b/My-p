import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

import './OrderPage.css';

const OrderPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  const { itemsToOrder } = state || {};
  const totalAmount = itemsToOrder
    ? itemsToOrder.reduce((total, item) => total + item.price * item.quantity, 0)
    : 0;

  useEffect(() => {
    if (!itemsToOrder) {
      alert("No order details found. Redirecting to cart.");
      navigate('/cart');
    }
  }, [itemsToOrder, navigate]);

  const handlePayNowClick = () => {
    setShowPaymentOptions(true);
  };

  const handleMpesaPayment = async () => {
    const phoneNumber = prompt("Enter your phone number in the format 2547XXXXXXXX:");
    try {
      const response = await fetch('/api/payment/pay', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ phoneNumber, amount: totalAmount }),
      });

      if (response.ok) {
        alert("Payment initiated! Please complete the payment on your phone.");
        navigate('/my-orders');
      } else {
        alert("Failed to initiate payment. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("An error occurred during payment.");
    }
  };

  const handleDebtPayment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/orders`,
        {
          items: itemsToOrder.map(item => ({
            productId: item.productId,
            name: item.name, // Ensure you include the product name
            price: item.price,
            quantity: item.quantity
          })),
          total: totalAmount, // Use `totalAmount` here to specify the total cost
          paymentMethod: 'debt',
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Order placed with Debt. Status set to unpaid.");
      navigate('/my-orders');
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
      alert("An error occurred while placing the order.");
    }
  };
  
  
  

  return (
    <div className="order-page">
      <h1>Your Order</h1>

      {itemsToOrder && itemsToOrder.length > 0 ? (
        <ul>
          {itemsToOrder.map((item) => (
            <li key={item.productId}>
              <h3>{item.name}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price per unit: KSh {item.price}</p>
              <p>Total: KSh {item.price * item.quantity}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in the order</p>
      )}

      <div className="total-amount">
        <h2>Total Cost: KSh {totalAmount}</h2>
      </div>

      {showPaymentOptions ? (
        <div className="payment-options" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px', // Space between buttons
          marginTop: '20px' // Space above the buttons
      }}>
          <button 
              onClick={handleMpesaPayment} 
              className="payment-button mpesa-button" 
              style={{
                  backgroundColor: '#1EBEA5', // Mpesa button color
                  color: '#FFFFFF', // Text color
                  padding: '10px 20px', // Vertical and horizontal padding
                  border: 'none', // Remove default border
                  borderRadius: '5px', // Rounded corners
                  cursor: 'pointer', // Pointer cursor on hover
                  fontSize: '16px', // Font size
                  transition: 'background-color 0.3s ease' // Smooth transition
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#16A58D'} // Darker shade on hover
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#1EBEA5'} // Original color
          >
              Mpesa
          </button>
          <button 
              onClick={handleDebtPayment} 
              className="payment-button debt-button" 
              style={{
                  backgroundColor: '#FF5733', // Debt button color
                  color: '#FFFFFF', // Text color
                  padding: '10px 20px', // Vertical and horizontal padding
                  border: 'none', // Remove default border
                  borderRadius: '5px', // Rounded corners
                  cursor: 'pointer', // Pointer cursor on hover
                  fontSize: '16px', // Font size
                  transition: 'background-color 0.3s ease' // Smooth transition
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#E04F28'} // Darker shade on hover
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#FF5733'} // Original color
          >
              Debt
          </button>
      </div>
      
      ) : (
        <button onClick={handlePayNowClick} className="pay-now-button">
          Pay Now
        </button>
      )}
    </div>
  );
};

export default OrderPage;
