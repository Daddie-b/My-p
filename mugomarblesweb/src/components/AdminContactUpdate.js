import React, { useState } from 'react';
import axios from 'axios';
import './AdminContactUpdate.css';

const AdminContactUpdate = () => {
  const [contactInfo, setContactInfo] = useState({
    businessName: '',
    address: '',
    phone: '',
    email: '',
    whatsapp: '',
    facebook: '',
    instagram: '',
    twitter: '',
    businessHours: '',
    image: null,
    testimonials: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  const handleImageChange = (e) => {
    setContactInfo({ ...contactInfo, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in contactInfo) {
      formData.append(key, contactInfo[key]);
    }
    try {
      await axios.post('https://my-p-backend.onrender.com/api/contact/update', formData);
      alert('Contact information updated successfully!');
      // Optionally, clear the form or fetch updated data
    } catch (error) {
      console.error('Error updating contact info:', error);
    }
  };

  return (
    <div className="contact-update">
      <h2>Update Contact Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Business Name:</label>
          <input
            type="text"
            name="businessName"
            value={contactInfo.businessName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={contactInfo.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={contactInfo.phone}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={contactInfo.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>WhatsApp Number:</label>
          <input
            type="text"
            name="whatsapp"
            value={contactInfo.whatsapp}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Facebook:</label>
          <input
            type="text"
            name="facebook"
            value={contactInfo.facebook}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Instagram:</label>
          <input
            type="text"
            name="instagram"
            value={contactInfo.instagram}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Twitter:</label>
          <input
            type="text"
            name="twitter"
            value={contactInfo.twitter}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Business Hours:</label>
          <input
            type="text"
            name="businessHours"
            value={contactInfo.businessHours}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Business Image:</label>
          <input type="file" onChange={handleImageChange} />
        </div>
        <div>
          <label>Testimonials/Reviews:</label>
          <textarea
            name="testimonials"
            value={contactInfo.testimonials}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
      <div className="whatsapp-link">
        <a
          href={`https://wa.me/${contactInfo.whatsapp || contactInfo.phone}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Contact Us on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default AdminContactUpdate;
