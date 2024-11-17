import React, { useState } from 'react';
import axios from 'axios';
import SectionWrapper from './SectionWrapper';
import './UpdateAbout.css';

const UpdateJourneyTimeline = () => {
  const [milestones, setMilestones] = useState([{ description: '' }]);

  const handleChange = (index, e) => {
    const { value } = e.target;
    const updatedMilestones = [...milestones];
    updatedMilestones[index].description = value;
    setMilestones(updatedMilestones);
  };

  const handleAddMilestone = () => {
    setMilestones([...milestones, { description: '' }]);
  };

  const handleRemoveMilestone = (index) => {
    const updatedMilestones = milestones.filter((_, i) => i !== index);
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
          <div key={index}>
            <input
              value={milestone.description}
              onChange={(e) => handleChange(index, e)}
              placeholder={`Milestone ${index + 1}`}
            />
            <button type="button" onClick={() => handleRemoveMilestone(index)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={handleAddMilestone}>Add Milestone</button>
        <button type="submit">Update Journey</button>
      </form>
    </SectionWrapper>
  );
};

export default UpdateJourneyTimeline;
