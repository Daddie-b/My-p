import React, { useState, useRef } from 'react';
import axios from 'axios';
import './ProductForm.css';

const ProductForm = ({ onProductAdded }) => {
  const [productData, setProductData] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [preview, setPreview] = useState(null);

  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProductData({
      ...productData,
      image: file,
    });
    setPreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setProductData({
      ...productData,
      image: null,
    });
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('price', productData.price);
    formData.append('description', productData.description);
    if (productData.image) {
      formData.append('image', productData.image);
    }
  
    try {
      const response = await axios.post('/api/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Ensure token is correctly set
        },
      });
      setLoading(false);
      setProductData({ name: '', price: '', description: '', image: null });
      setPreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      onProductAdded(response.data);
    } catch (error) {
      setLoading(false);
      setError('Failed to add product. Please try again.');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="product-form">
      {error && <p className="error">{error}</p>}
      <div>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={productData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Description:</label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleChange}
        />  
      </div>
      <div>
        <label>Image:</label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          ref={fileInputRef}
          required={!preview}
        />
        {preview && (
          <>
            <img src={preview} alt="Preview" className="image-preview" />
            <button type="button" className="remove-image-button" onClick={handleRemoveImage}>
              Remove Image
            </button>
          </>
        )}
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm;
