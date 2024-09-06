// src/components/ProductsList.js
import React from 'react';
import ProductCard from './ProductCard';
import './ProductsList.css';

const ProductsList = ({ products, onAddToCart, onBuyNow }) => {
  return (
    <div className="products-list">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      ))}
    </div>
  );
};

export default ProductsList;
