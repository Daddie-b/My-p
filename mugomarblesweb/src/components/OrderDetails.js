// src/components/OrderDetails.js
import React from 'react';
import './OrderDetails.css'; // Create CSS file for styling

const OrderDetails = ({ cartItems, totalAmount }) => {
  return (
    <div className="order-details">
      <ul>
        {cartItems && cartItems.length > 0 ? (
          cartItems.map(item => (
            <li key={item._id}>
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>Price: KSh {item.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: KSh {item.price * item.quantity}</p>
              </div>
            </li>
          ))
        ) : (
          <p>No items in your order</p>
        )}
      </ul>
      <h2>Total Amount: KSh {totalAmount}</h2>
    </div>
  );
};

export default OrderDetails;
