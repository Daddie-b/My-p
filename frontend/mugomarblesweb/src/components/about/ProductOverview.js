import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AboutPage.css';

const ProductsOverview = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/about/products');
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="products-overview">
      <h2>Our Products & Services</h2>
      <div className="products-grid">
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <img src={product.image} alt={product.name} />
            <h4>{product.name}</h4>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsOverview;
