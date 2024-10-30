import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error("Token not found");

      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data);
      setFilteredOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const filterOrders = () => {
      if (activeFilter === 'All') {
        setFilteredOrders(orders);
      } else {
        const filtered = orders.filter(order => {
          if (activeFilter === 'Unpaid') {
            return !order.paid;
          } else if (activeFilter === 'Paid') {
            return order.paid && !order.delivered;
          } else if (activeFilter === 'Completed') {
            return order.paid && order.delivered;
          }
          return true;
        });
        setFilteredOrders(filtered);
      }
    };
    filterOrders();
  }, [activeFilter, orders]);

  const handlePayment = async (orderId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/orders/payment`,
        { orderId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Payment successful!");
      fetchOrders();
    } catch (error) {
      console.error('Error making payment:', error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="my-orders-page">
      <h1>My Orders</h1>
      <nav className="order-filter-nav">
        <ul className="nav-list">
          <li>
            <button onClick={() => setActiveFilter('All')} className={activeFilter === 'All' ? 'active' : ''}>All</button>
          </li>
          <li>
            <button onClick={() => setActiveFilter('Unpaid')} className={activeFilter === 'Unpaid' ? 'active' : ''}>Unpaid</button>
          </li>
          <li>
            <button onClick={() => setActiveFilter('Paid')} className={activeFilter === 'Paid' ? 'active' : ''}>Paid</button>
          </li>
          <li>
            <button onClick={() => setActiveFilter('Completed')} className={activeFilter === 'Completed' ? 'active' : ''}>Completed</button>
          </li>
        </ul>
      </nav>

      {filteredOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul className="orders-list">
          {filteredOrders.map((order) => {
            let status = order.paid && order.delivered ? 'Completed' : order.paid ? 'Paid' : 'Unpaid';

            return (
              <li key={order._id}>
                <h3>Order Summary</h3>
                <ul className="order-items">
                  {order.items.map((item, index) => (
                    <li key={index} className="order-item">
                      <p>Item Name: {item.productId.name}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Total Cost: KSh {item.productId.price * item.quantity}</p>
                    </li>
                  ))}
                </ul>
                <p><strong>Total Order Cost:</strong> KSh {order.total}</p>
                <p><strong>Status:</strong> {status}</p>

                {status === 'Unpaid' && (
                  <button onClick={() => handlePayment(order._id)} className="payment-button">
                    Pay Now
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MyOrders;
