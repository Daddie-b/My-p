// src/pages/ProductPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductsList from '../components/ProductsList';
import { useCart } from '../context/CartContext';
import './ProductPage.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

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

  const handleAddToCart = (product, quantity) => {
    addToCart({ ...product, quantity });
    console.log(`Added ${quantity} ${product.name}(s) to cart!`);
  };
  

  return (
    <div className="product-page">
      <h1>Our Products</h1>
      <ProductsList
        products={products}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ProductPage;
