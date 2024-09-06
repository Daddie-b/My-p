// src/components/ProductCard.js
import React from 'react';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, onBuyNow }) => {
  const { name, price, rating, image } = product;

  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-image" />
      <h3 className="product-name">{name}</h3>
      <p className="product-price">Price: KSh {price}</p>
      <p className="product-rating">Rating: {rating} / 5</p>
      <div className="product-actions">
        <button onClick={() => onAddToCart(product)}>Add to Cart</button>
        <button onClick={() => onBuyNow(product)}>Buy Now</button>
      </div>
    </div>
  );
};

export default ProductCard;
