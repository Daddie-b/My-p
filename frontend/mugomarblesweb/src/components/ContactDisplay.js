import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ContactDisplay.css';

const ContactDisplay = () => {
  const [contactInfo, setContactInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchContactInfo = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/contact');
      setContactInfo(response.data);
    } catch (error) {
      console.error('Error fetching contact info:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContactInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!contactInfo) {
    return <div>No contact information available.</div>;
  }

  return (
    <div className="contact-display">
      <h2>Contact Information</h2>
      <p><strong>Business Name:</strong> {contactInfo.businessName}</p>
      <p><strong>Address:</strong> {contactInfo.address}</p>
      <p><strong>Phone:</strong> {contactInfo.phone}</p>
      <p><strong>Email:</strong> {contactInfo.email}</p>
      <p><strong>WhatsApp:</strong> {contactInfo.whatsapp}</p>
      <p><strong>Facebook:</strong> {contactInfo.facebook}</p>
      <p><strong>Instagram:</strong> {contactInfo.instagram}</p>
      <p><strong>Twitter:</strong> {contactInfo.twitter}</p>
      <p><strong>Business Hours:</strong> {contactInfo.businessHours}</p>
      <p><strong>Testimonials:</strong> {contactInfo.testimonials}</p>
      {contactInfo.image && (
        <img src={URL.createObjectURL(contactInfo.image)} alt="Business" />
      )}
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

export default ContactDisplay;
