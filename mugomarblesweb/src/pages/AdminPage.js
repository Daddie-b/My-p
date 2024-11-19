// AdminPage.js
import React, { useState } from 'react'; // Ensure useState is imported here
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductLIST';
import AdminContactUpdate from '../components/AdminContactUpdate';
import About from '../components/AboutUpdate/UpdateAbout';
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
      <AdminContactUpdate />
      <About />
    </div>
  );
};

export default AdminPage;
