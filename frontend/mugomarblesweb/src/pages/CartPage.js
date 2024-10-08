import React, { useState, useContext } from 'react';
import { useCart } from '../context/CartContext';
//import { AuthContext } from '../context/AuthContext'; // Import your AuthContext
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, setCartItems, updateCartItemQuantity, removeFromCart } = useCart();
  const { user } = useContext(AuthContext); // Access the user from AuthContext
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  // Handle item selection for ordering
  const handleSelectItem = (productId) => {
    setSelectedItems(prevSelected => 
      prevSelected.includes(productId)
        ? prevSelected.filter(id => id !== productId)
        : [...prevSelected, productId]
    );
  };

  // Calculate total cost of selected items
  const totalCost = cartItems
    .filter(item => selectedItems.includes(item._id))
    .reduce((total, item) => total + item.price * item.quantity, 0);

  const handleQuantityChange = (productId, newQuantity) => {
    updateCartItemQuantity(productId, newQuantity);
  };

  const handleCheckOut = async () => {
    const itemsToOrder = cartItems.filter(item => selectedItems.includes(item._id));
    const totalAmount = totalCost;
  
    if (itemsToOrder.length > 0) {
      try {
        const response = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            items: itemsToOrder, 
            totalAmount, 
            userId: user._id // Use user ID from AuthContext
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          navigate('/order', { state: { itemsToOrder, totalAmount, orderId: data.orderId } });
        } else {
          alert('Error placing the order');
        }
      } catch (error) {
        console.error('Error during checkout:', error);
      }
    } else {
      alert("Please select items to check out");
    }
  };
  
  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={item._id || index}> {/* Ensures unique key */}
                <div className="cart-item">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item._id)}
                    onChange={() => handleSelectItem(item._id)}
                  />
                  <img src={item.image} alt={item.name} className="cart-item-image" />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p>Price: KSh {item.price}</p>
                    <p>Total: KSh {item.price * item.quantity}</p> {/* Total per item */}
                    <div className="cart-item-quantity">
                      <label>Quantity: </label>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity || 1}  
                        onChange={(e) => handleQuantityChange(item._id, parseInt(e.target.value))}
                      />
                    </div>
                    <button onClick={() => removeFromCart(item._id)} className="delete-icon">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* Display total cost of selected items */}
          <div className="cart-total">
            <h2>Total Cost: KSh {totalCost}</h2>
            <button onClick={handleCheckOut} className="order-button">
              Check Out
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
