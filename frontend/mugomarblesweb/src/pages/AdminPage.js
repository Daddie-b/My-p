import React, { useState } from 'react';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductLIST';
import './AdminPage.css';

const AdminPage = () => {
  const [products, setProducts] = useState([]);

  const handleProductAdded = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  

  return (
    <div className="admin-page">
      <h1>Admin Dashboard</h1>
      <ProductForm onProductAdded={handleProductAdded} />
      <ProductList products={products} />
    </div>
  );
};

export default AdminPage;
