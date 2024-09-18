import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = ({ onProductDeleted }) => {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Ensure token is correctly set
          },
        });
        setProducts(response.data); // Assuming response.data is an array of products
      } catch (error) {
        console.error('Failed to fetch products', error);
        alert('Error fetching products. Please try again later.');
      }
    };

    fetchProducts();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const handleDelete = async (productId) => {
    const token = localStorage.getItem('token');
  
    try {
      await axios.delete(`/api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure token is sent in the correct format
        },
      });
      setProducts(products.filter(product => product._id !== productId));
      alert('Product deleted successfully');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Unauthorized. Please log in again.');
      } else {
        alert('Failed to delete the product. Please try again.');
      }
      console.error('Failed to delete the product', error);
    }
  };
  

  return (
    <ul className="product-list">
      {products.map((product) => (
        <li key={product._id} className="product-item">
          {product.name}
          <button onClick={() => handleDelete(product._id)} className="delete-button">
            🗑️ {/* Delete icon */}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
