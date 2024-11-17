import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AboutPage.css'; // Make sure the CSS file is correctly referenced

const HeroSection = () => {
  const [bannerData, setBannerData] = useState(null);

  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/about/banner');
        setBannerData(response.data);
      } catch (error) {
        console.error('Error fetching banner data:', error);
      }
    };

    fetchBannerData();
  }, []);

  if (!bannerData) {
    return <p>Loading banner...</p>;
  }

  return (
    <section className="hero-section">
      <div className="hero-banner" style={{ backgroundImage: `url(${bannerData.imageUrl})` }}>
        <h1>{bannerData.businessName}</h1>
        <p>{bannerData.tagline}</p>
      </div>
    </section>
  );
};

export default HeroSection;
