// src/components/NavBar.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '../context/CartContext';
import './NavBar.css';

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { cartItems } = useCart(); // Get cart items from context

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MugoMarbles</Link>
      </div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li className="cart-icon">
          <Link to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span>Cart ({cartItems.length})</span> {/* Display number of items */}
          </Link>
        </li>
        {isLoggedIn ? (
          <li className="profile-menu">
            <Link to="/profile">Profile</Link>
            <ul className="dropdown">
              <li><Link to="/profile">My Profile</Link></li>
              <li><Link to="/my-orders">My Orders</Link></li>
              <li><Link to="/favorites">Favorites</Link></li>
              <li onClick={() => {
                localStorage.removeItem('token');
                setIsLoggedIn(false);
              }}>Logout</li>
            </ul>
          </li>
        ) : (
          <>
            <li><Link to="/login">Sign Up</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
