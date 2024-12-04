import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PaymentButton from '../components/PaymentButton';
import './MyOrders.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState({ phoneNumber: '', amount: '' });

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

  const handlePayNow = (order) => {
    console.log('Pay Now clicked for order:', order);
    setSelectedOrder(order);
    setShowPaymentForm(true);
    console.log('showPaymentForm:', showPaymentForm); // Log state change
  };
  

  const handlePaymentSubmit = () => {
    const { phoneNumber, amount } = paymentDetails;
    const phoneRegex = /^254\d{9}$/; // Ensure correct phone number format
    if (!phoneRegex.test(phoneNumber)) {
      alert("Please enter a valid phone number in the format 254XXXXXXXXX.");
      return;
    }
    if (!amount || isNaN(amount) || amount <= 0) {
      alert("Please enter a valid payment amount.");
      return;
    }
  
    console.log("Payment details validated:", paymentDetails);
    setShowPaymentForm(false);
    setPaymentDetails({ phoneNumber: '', amount: '' });
    fetchOrders();
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
  //console.log("Order items:", order.items); // Log to inspect the items structure

  let status = order.paid && order.delivered ? 'Completed' : order.paid ? 'Paid' : 'Unpaid';

  return (
    <li key={order._id}>
      <h3>Order Summary</h3>
      <ul className="order-items">
        {order.items.map((item, index) => (
          <li key={index} className="order-item">
            <p><strong>Item Name:</strong> {item.name}</p>
            <p><strong>Quantity:</strong> {item.quantity}</p>
            <p><strong>Price per Unit:</strong> KSh {item.price}</p>
            <p><strong>Total Cost:</strong> KSh {item.price * item.quantity}</p>
          </li>
        ))}
      </ul>
      <p><strong>Total Order Cost:</strong> KSh {order.total}</p>
    

      {status === 'Unpaid' && (
        <button onClick={() => handlePayNow(order)} className="pay-now-button">Pay Now</button>
      )}
    </li>
  );
})}

        </ul>
        )}

{showPaymentForm && (
  <div className="payment-form-modal">
    <div className="modal-content">
      <h3>Enter Payment Details</h3>
      <label>
        Phone Number:
        <input
          type="text"
          value={paymentDetails.phoneNumber}
          onChange={(e) => setPaymentDetails({ ...paymentDetails, phoneNumber: e.target.value })}
        />
      </label>
      <label>
        Amount:
        <input
          type="number"
          value={paymentDetails.amount}
          onChange={(e) => setPaymentDetails({ ...paymentDetails, amount: e.target.value })}
        />
      </label>
      <button onClick={handlePaymentSubmit} className="submit-payment-button">Submit Payment</button>
      <button onClick={() => setShowPaymentForm(false)} className="cancel-payment-button">Cancel</button>
    </div>
  </div>
)}


    </div>
  );
};

export default MyOrders;
