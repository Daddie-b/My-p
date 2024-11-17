import React, { useState } from 'react';
import axios from 'axios';
import SectionWrapper from './SectionWrapper';
import './UpdateAbout.css';

const UpdateBusinessOverview = () => {
  const [overviewData, setOverviewData] = useState({
    mission: '',
    vision: '',
    description: '',
    founderMessage: '',
  });
  const [founderImage, setFounderImage] = useState(null); // State for the image file

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOverviewData({ ...overviewData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFounderImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('mission', overviewData.mission);
    formData.append('vision', overviewData.vision);
    formData.append('description', overviewData.description);
    formData.append('founderMessage', overviewData.founderMessage);
    if (founderImage) formData.append('founderImage', founderImage); // Append the image file

    try {
      await axios.put('/api/about/overview', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set header for file upload
        },
      });
      alert('Overview data updated successfully!');
    } catch (error) {
      console.error("Error updating overview data:", error);
    }
  };

  return (
    <SectionWrapper title="Update Business Overview">
      <form onSubmit={handleSubmit}>
        <input name="mission" value={overviewData.mission} onChange={handleChange} placeholder="Mission" />
        <input name="vision" value={overviewData.vision} onChange={handleChange} placeholder="Vision" />
        <textarea name="description" value={overviewData.description} onChange={handleChange} placeholder="Description"></textarea>
        <textarea name="founderMessage" value={overviewData.founderMessage} onChange={handleChange} placeholder="Message from Founder"></textarea>
        <input type="file" onChange={handleImageChange} accept="image/*" /> {/* File input for the image */}
        <button type="submit">Update Overview</button>
      </form>
    </SectionWrapper>
  );
};

export default UpdateBusinessOverview;
