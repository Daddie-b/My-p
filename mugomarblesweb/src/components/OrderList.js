import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UnpaidOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/unpaid');
        setOrders(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div>
      <h1>Unpaid Orders</h1>
      {orders.map((order, index) => (
        <div key={index} style={{ marginBottom: '20px' }}>
          <h2>User: {order.user}</h2>
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Total Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.totalPrice.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p><strong>Total Amount:</strong> ${order.totalAmount.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default UnpaidOrders;
