import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DeliveryOrdersTable.css";

const OrdersNeedDelivery = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Retrieve token from localStorage or wherever it is stored
        const token = localStorage.getItem('token'); // Adjust this based on how you store the token
  
        // If no token, throw an error
        if (!token) {
          throw new Error("No token found. Please log in again.");
        }
  
        // Send GET request with Authorization header
        const { data } = await axios.get("http://localhost:5000/api/orders/need-delivery", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        setOrders(data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || err.message || "Failed to fetch orders");
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);
  
  if (loading) return <p>Loading orders...</p>;
  if (error) return <p className="error-message">{error}</p>;
  

  return (
    <div className="orders-container">
      <h1>Orders Needing Delivery</h1>
      <table className="orders-table">
        <thead>
          <tr>
            <th>username</th>
            <th>Order Date</th>
            <th>Item Name</th>
            <th>Total Quantity</th>
            <th>Total Price (KSh)</th>
          </tr>
        </thead>
        <tbody>
  {orders.map((order, index) => (
    <React.Fragment key={index}>
      {order.items.map((item, itemIndex) => (
        <tr key={itemIndex}>
          {itemIndex === 0 && (
            <>
              <td rowSpan={order.items.length}>
                {order.userId?.username || 'Unknown User'}
              </td>
              <td rowSpan={order.items.length}>
                {new Date(order.createdAt).toLocaleDateString()}
              </td>
            </>
          )}
          <td>{item.name}</td>
          <td>{item.quantity}</td>
          <td>{item.totalPrice.toLocaleString()}</td>
        </tr>
      ))}
    </React.Fragment>
  ))}
</tbody>

      </table>
    </div>
  );
};

export default OrdersNeedDelivery;
