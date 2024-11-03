import React, { useState,  } from 'react';
import axios from 'axios';
import SectionWrapper from './SectionWrapper';
import './UpdateAbout.css';

const UpdateJourneyTimeline = () => {
  const [milestones, setMilestones] = useState([]);

  const handleChange = (index, e) => {
    const { value } = e.target;
    const updatedMilestones = [...milestones];
    updatedMilestones[index].description = value;
    setMilestones(updatedMilestones);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/about/journey', milestones);
      alert('Journey milestones updated successfully!');
    } catch (error) {
      console.error("Error updating milestones:", error);
    }
  };

  return (
    <SectionWrapper title="Update Journey Timeline">
    <form onSubmit={handleSubmit}>
      {milestones.map((milestone, index) => (
        <input key={index} value={milestone.description} onChange={(e) => handleChange(index, e)} placeholder={`Milestone ${index + 1}`} />
      ))}
      <button type="submit">Update Journey</button>
    </form>
    </SectionWrapper>
  );
};

export default UpdateJourneyTimeline;
