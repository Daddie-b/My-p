import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="my-orders-page">
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="orders-list">
          {orders.map((order) => {
            // Define status logic based on paid and delivered fields
            let status;
            if (order.paid && order.delivered) {
              status = 'Completed';
            } else {
              status = order.paid ? 'Paid' : 'Unpaid';
            }

            return (
              <li key={order._id}>
                {/* Order ID is hidden as requested */}
                <p>Total: KSh {order.total}</p>
                <p>Status: {status}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
