import React, { useState } from 'react';
import axios from 'axios';
import SectionWrapper from './SectionWrapper';
import './UpdateAbout.css';

const UpdateHeroSection = () => {
  const [bannerData, setBannerData] = useState({
    businessName: '',
    tagline: '',
    imageFile: null // Change from imageUrl to imageFile for file upload
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === 'file') {
      setBannerData({ ...bannerData, imageFile: files[0] }); // Store the file
    } else {
      setBannerData({ ...bannerData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('businessName', bannerData.businessName);
    formData.append('tagline', bannerData.tagline);
    if (bannerData.imageFile) {
      formData.append('imageFile', bannerData.imageFile); // Append the image file
    }

    try {
      await axios.put('http://localhost:5000/api/about/banner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file uploads
        },
      });
      alert('Banner updated successfully!');
    } catch (error) {
      console.error("Error updating banner data:", error);
    }
  };

  return (
    <SectionWrapper title="Hero Section">
      <form onSubmit={handleSubmit}>
        <input
          name="businessName"
          value={bannerData.businessName}
          onChange={handleChange}
          placeholder="Business Name"
        />
        <input
          name="tagline"
          value={bannerData.tagline}
          onChange={handleChange}
          placeholder="Tagline"
        />
        <input
          type="file" // Change type to file for image upload
          onChange={handleChange}
          placeholder="Upload Image"
        />
        <button type="submit">Update Banner</button>
      </form>
    </SectionWrapper>
  );
};

export default UpdateHeroSection;
