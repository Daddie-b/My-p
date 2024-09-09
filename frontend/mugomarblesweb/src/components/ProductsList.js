import React from 'react';
import ProductCard from './ProductCard';
import './ProductsList.css';

const ProductsList = ({ products, onAddToCart, onBuyNow }) => {
  return (
    <div className="products-list">
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        products.map((product) => (
          <ProductCard
            key={product._id} // Use product._id here as the unique key
            product={product}
            onAddToCart={onAddToCart}
            onBuyNow={onBuyNow}
          />
        ))
      )}
    </div>
  );
};

export default ProductsList;
