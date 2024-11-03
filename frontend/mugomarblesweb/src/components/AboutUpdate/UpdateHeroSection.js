import React, { useState,  } from 'react';
import axios from 'axios';
import SectionWrapper from './SectionWrapper';
import './UpdateAbout.css';

const UpdateHeroSection = () => {
  const [bannerData, setBannerData] = useState({
    businessName: '',
    tagline: '',
    imageUrl: ''
  });

   const handleChange = (e) => {
    const { name, value } = e.target;
    setBannerData({ ...bannerData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/about/banner', bannerData);
      alert('Banner updated successfully!');
    } catch (error) {
      console.error("Error updating banner data:", error);
    }
  };

  return (
    <SectionWrapper title="Hero Section">
    <form onSubmit={handleSubmit}>
      <input name="businessName" value={bannerData.businessName} onChange={handleChange} placeholder="Business Name" />
      <input name="tagline" value={bannerData.tagline} onChange={handleChange} placeholder="Tagline" />
      <input name="imageUrl" value={bannerData.imageUrl} onChange={handleChange} placeholder="Image URL" />
      <button type="submit">Update Banner</button>
    </form>
    </SectionWrapper>
  );
};

export default UpdateHeroSection;
