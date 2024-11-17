import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AboutPage.css';

const BusinessOverview = () => {
  const [overviewData, setOverviewData] = useState({
    mission: '',
    vision: '',
    description: '',
    founderMessage: '',
    founderImage: ''
  });

  useEffect(() => {
    const fetchOverviewData = async () => {
      try {
        const response = await axios.get('/api/about/overview');
        setOverviewData(response.data);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      }
    };
    fetchOverviewData();
  }, []);

  return (
    <section className="business-overview">
      <div className="left-column">
        <h2>About Us</h2>
        <p>{overviewData.description}</p>
        <p><strong>Mission:</strong> {overviewData.mission}</p>
        <p><strong>Vision:</strong> {overviewData.vision}</p>
      </div>
      <div className="right-column">
        <div className="founder-section">
          <img 
            src={overviewData.founderImage ? `/uploads/${overviewData.founderImage}` : '/default-founder.png'} 
            alt="Founder" 
            className="founder-image"
          />
          <h3>Message from the Founder</h3>
          <p className="founder-message">{overviewData.founderMessage}</p>
        </div>
      </div>
    </section>
  );
};

export default BusinessOverview;
