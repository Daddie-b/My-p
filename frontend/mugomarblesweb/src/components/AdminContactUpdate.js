// AdminContactUpdate.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminContactUpdate = () => {
  const [contact, setContact] = useState({ address: '', phone: '', email: '' });

  useEffect(() => {
    const fetchContactInfo = async () => {
      const { data } = await axios.get('/api/contact');
      setContact(data);
    };
    fetchContactInfo();
  }, []);

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/contact', contact);
      alert('Contact information updated successfully!');
    } catch (error) {
      alert('Failed to update contact information.');
    }
  };

  return (
    <div>
      <h2>Update Contact Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={contact.address} onChange={handleChange} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={contact.phone} onChange={handleChange} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" value={contact.email} onChange={handleChange} />
        </div>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default AdminContactUpdate;
