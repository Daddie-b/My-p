import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductsList from '../components/ProductsList';
import './ProductPage.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data); // Set the fetched products to state
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
