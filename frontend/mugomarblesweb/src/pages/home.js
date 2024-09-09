import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductsList from '../components/ProductsList';
import './ProductPage.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    fetchProducts();
  }, []);
  
  
  
  
  const handleAddToCart = (product) => {
    console.log(`Added ${product.name} to cart!`);
    // Logic for adding to cart
  };

  const handleBuyNow = (product) => {
    console.log(`Buying ${product.name} now!`);
    // Logic for immediate purchase
  };

  return (
    <div className="product-page">
      <h1>Our Products</h1>
      <ProductsList
        products={products}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
};

export default ProductPage;
