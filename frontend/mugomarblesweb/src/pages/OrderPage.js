import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OrderDetails from '../components/OrderDetails'; // Ensure this component is defined
import './OrderPage.css';

const OrderPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // Destructure itemsToOrder and totalAmount from the state
  const { itemsToOrder, totalAmount } = state || {};

  // Handle missing data case (if user manually goes to the order page without proper state)
  useEffect(() => {
    if (!itemsToOrder || !totalAmount) {
      alert("No order details found. Redirecting to cart.");
      navigate('/cart');
    }
  }, [itemsToOrder, totalAmount, navigate]);

  const [status, setStatus] = useState('in progress');

  // Fetch status if necessary (simulated example)
  useEffect(() => {
    // Fetch updated status from server if needed
    const fetchOrderStatus = async () => {
      try {
        const response = await fetch('/api/orders/status', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setStatus(data.status); // Update status if available
        }
      } catch (error) {
        console.error('Error fetching order status:', error);
      }
    };

    fetchOrderStatus();
  }, []);

  return (
    <div className="order-page">
      <h1>Your Order</h1>

      {/* Navbar for tracking status */}
      <nav className="order-status-nav">
        <button className={status === 'in progress' ? 'active' : ''}>In Progress</button>
        <button className={status === 'completed' ? 'active' : ''}>Completed</button>
        <button className={status === 'cancelled' ? 'active' : ''}>Cancelled</button>
      </nav>

      {/* Order details */}
      {itemsToOrder && totalAmount ? (
        <OrderDetails cartItems={itemsToOrder} totalAmount={totalAmount} />
      ) : (
        <p>No items in the order</p>
      )}

      {/* Conditionally show payment button if order is still in progress */}
      {status === 'in progress' && (
        <button className="pay-now-button">
          Pay Now
        </button>
      )}
    </div>
  );
};

export default OrderPage;
