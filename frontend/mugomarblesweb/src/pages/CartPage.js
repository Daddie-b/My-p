import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart } = useCart();
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

  const handlePlaceOrder = () => {
    const itemsToOrder = cartItems.filter(item => selectedItems.includes(item._id));
    const totalAmount = totalCost; // Total cost of selected items
  
    if (itemsToOrder.length > 0) {
      navigate('/order', {
        state: {
          cartItems: itemsToOrder,
          totalAmount: totalAmount
        }
      });
    } else {
      alert("Please select items to order");
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
            <button onClick={handlePlaceOrder} className="order-button">
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
