import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Footer.css';

const Footer = () => {
  const [footerInfo, setFooterInfo] = useState({
    businessName: '',
    address: '',
    phone: '',
    email: '',
    facebook: '',
    instagram: '',
    twitter: ''
  });

  useEffect(() => {
    const fetchFooterInfo = async () => {
      try {
        const response = await axios.get('/api/about/footer-info');
        setFooterInfo(response.data);
      } catch (error) {
        console.error('Error fetching footer information:', error);
      }
    };
    fetchFooterInfo();
  }, []);

  return (
    <footer className="footer">
      <div className="footer-content">
        <h2>{footerInfo.businessName}</h2>
        <p>{footerInfo.address}</p>
        <p>Phone: {footerInfo.phone}</p>
        <p>Email: <a href={`mailto:${footerInfo.email}`}>{footerInfo.email}</a></p>

        <div className="footer-socials">
          <a href={footerInfo.facebook} target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href={footerInfo.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          <a href={footerInfo.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
        </div>

        <div className="footer-links">
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
          <a href="/products">Products</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} {footerInfo.businessName}. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
