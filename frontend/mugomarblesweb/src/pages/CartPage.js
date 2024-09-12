import React from 'react';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { cartItems, updateCartItemQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    updateCartItemQuantity(productId, newQuantity);
  };

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <div className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Price: KSh {item.price}</p>
                  <div className="cart-item-quantity">
                    <label>Quantity: </label>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    />
                  </div>
                  <button onClick={() => removeFromCart(item.id)}>Remove</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CartPage;
