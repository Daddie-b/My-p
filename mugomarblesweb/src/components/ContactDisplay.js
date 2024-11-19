import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ContactDisplay.css';

const ContactDisplay = () => {
  const [contactInfo, setContactInfo] = useState(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      try {
        const response = await axios.get('https://my-p-backend.onrender.com/api/contact');
        //console.log('Fetched contact info:', response.data);
        setContactInfo(response.data);
      } catch (error) {
        console.error('Error fetching contact info:', error);
      }
    };
    fetchContactInfo();
  }, []);
  

  if (!contactInfo) {
    return <p>Loading contact information...</p>;
  }

  return (
    <div className="contact-info">
      <h2>{contactInfo.businessName}</h2>
      <p>Address: {contactInfo.address}</p>
      <p>Phone: {contactInfo.phone}</p>
      <p>Email: {contactInfo.email}</p>
      <p>Business Hours: {contactInfo.businessHours}</p>
      <p>Testimonials: {contactInfo.testimonials}</p>

      <div className="social-media-links">
        <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href={contactInfo.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
      </div>

      {contactInfo.image && (
        <div className="business-image">
          <img src={`http://localhost:5000${contactInfo.image}`} alt="Business" />
        </div>
      )}

      <div className="whatsapp-link">
        <a href={`https://wa.me/${contactInfo.whatsapp || contactInfo.phone}`} target="_blank" rel="noopener noreferrer">
          Contact Us on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ContactDisplay;
