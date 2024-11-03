import React, { useState } from 'react';
import axios from 'axios';
import SectionWrapper from './SectionWrapper';
import './UpdateAbout.css';

const UpdateProductsOverview = () => {
  const [items, setItems] = useState([{ name: '', description: '', image: null }]);

  const handleChange = (index, e) => {
    const { name, value, files } = e.target;
    const updatedItems = [...items];
    if (name === 'image') {
      updatedItems[index][name] = files[0];
    } else {
      updatedItems[index][name] = value;
    }
    setItems(updatedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('items', JSON.stringify(items.map(({ name, description }) => ({ name, description }))));
  
      items.forEach((item) => {
        formData.append('items[]', item.image); // Append images using 'items[]' field name
      });
  
      await axios.post('/api/items', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Items updated successfully!');
    } catch (error) {
      console.error("Error updating items:", error);
    }
  };
  

  return (
    <SectionWrapper title="Update Products Overview">
      <form onSubmit={handleSubmit}>
        {items.map((item, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              value={item.name}
              onChange={(e) => handleChange(index, e)}
              placeholder="Item Name"
            />
            <input
              type="text"
              name="description"
              value={item.description}
              onChange={(e) => handleChange(index, e)}
              placeholder="Item Description"
            />
            <input
              type="file"
              name="image"
              onChange={(e) => handleChange(index, e)}
              accept="image/*"
            />
          </div>
        ))}
        <button type="submit">Update Items</button>
      </form>
    </SectionWrapper>
  );
};

export default UpdateProductsOverview;
