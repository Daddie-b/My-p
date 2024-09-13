import React from 'react';
import { useCart } from '../context/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart } = useCart();

  // Calculate total cost of all items in the cart
  const totalCost = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleQuantityChange = (productId, newQuantity) => {
    updateCartItemQuantity(productId, newQuantity);
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.id}>
                <div className="cart-item">
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
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                      />
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="delete-icon">
                      <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {/* Display total cost at the bottom */}
          <div className="cart-total">
            <h2>Total Cost: KSh {totalCost}</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
