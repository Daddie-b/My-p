import React from 'react';
import './ProductCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product, onAddToCart, onBuyNow }) => {
  const { name, price, description, image } = product;

  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-price">Price: KSh {price}</p>
      <p className="product-description">{description}</p>
      <div className="product-actions">
        <button onClick={() => onAddToCart(product)} className="icon-button">
          <FontAwesomeIcon icon={faShoppingCart} />
        </button>
        <button onClick={() => onBuyNow(product)} className="icon-button">
          <FontAwesomeIcon icon={faMoneyBillWave} />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
