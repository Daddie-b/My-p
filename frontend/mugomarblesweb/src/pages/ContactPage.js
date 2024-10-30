// ContactPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactPage = () => {
  const [contact, setContact] = useState(null);

  useEffect(() => {
    const fetchContactInfo = async () => {
      const { data } = await axios.get('/api/contact');
      setContact(data);
    };
    fetchContactInfo();
  }, []);

  if (!contact) {
    return <p>Loading contact information...</p>;
  }

  return (
    <div>
      <h1>Contact Us</h1>
      <p><strong>Address:</strong> {contact.address}</p>
      <p><strong>Phone:</strong> {contact.phone}</p>
      <p><strong>Email:</strong> {contact.email}</p>
    </div>
  );
};

export default ContactPage;
