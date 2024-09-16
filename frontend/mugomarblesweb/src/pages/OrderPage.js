// src/pages/OrderPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import './OrderPage.css';

const OrderPage = () => {
  const location = useLocation();
  const { cartItems } = location.state || [];

  return (
    <div className="order-page">
      <h1>Your Order</h1>
      {cartItems.length === 0 ? (
        <p>No items in the order</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div className="order-item">
                  <img src={item.image} alt={item.name} className="order-item-image" />
                  <div className="order-item-details">
                    <h3>{item.name}</h3>
                    <p>Price: KSh {item.price}</p>
                    <p>Total: KSh {item.price * item.quantity}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="order-total">
            <h2>Total Cost: KSh {cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderPage;
