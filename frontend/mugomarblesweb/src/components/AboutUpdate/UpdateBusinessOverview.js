import React, { useState,  } from 'react';
import axios from 'axios';
import SectionWrapper from './SectionWrapper';
import './UpdateAbout.css';

const UpdateBusinessOverview = () => {
  const [overviewData, setOverviewData] = useState({
    mission: '',
    vision: '',
    description: '',
    founderMessage: '',
    founderImage: ''
  });

   const handleChange = (e) => {
    const { name, value } = e.target;
    setOverviewData({ ...overviewData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/about/overview', overviewData);
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
      <input name="founderImage" value={overviewData.founderImage} onChange={handleChange} placeholder="Founder Image URL" />
      <button type="submit">Update Overview</button>
    </form>
    </SectionWrapper>
  );
};

export default UpdateBusinessOverview;
