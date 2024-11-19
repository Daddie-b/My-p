// frontend/src/components/UpdateTeamSection.js
import React, { useState } from 'react';
import axios from 'axios';
import SectionWrapper from './SectionWrapper';
import './UpdateAbout.css';

const UpdateTeamSection = () => {
  const [team, setTeam] = useState([{ name: '', role: '', photoUrl: '' }]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTeam = [...team];
    updatedTeam[index][name] = value;
    setTeam(updatedTeam);
  };

  const addNewMember = () => setTeam([...team, { name: '', role: '', photoUrl: '' }]);

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    const updatedTeam = [...team];
    updatedTeam[index].photoUrl = file;
    setTeam(updatedTeam);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    // Add items as a single JSON string
    formData.append('items', JSON.stringify(team));
  
    // Append images individually
    team.forEach((member, index) => {
      if (member.photoUrl instanceof File) {
        formData.append('images', member.photoUrl); // Each image goes under 'images'
      }
    });
  
    try {
      const response = await axios.put('/api/about/team', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('Team data updated successfully!');
    } catch (error) {
      console.error("Error updating team data:", error);
    }
  };
  

  return (
    <SectionWrapper title="Update Team Section">
      <form onSubmit={handleSubmit} className="team-form">
        {team.map((member, index) => (
          <div key={index} className="team-member">
            <input
              name="name"
              value={member.name}
              onChange={(e) => handleChange(index, e)}
              placeholder="Team Member Name"
              className="team-input"
            />
            <input
              name="role"
              value={member.role}
              onChange={(e) => handleChange(index, e)}
              placeholder="Role"
              className="team-input"
            />
            <input
              type="file"
              name="photoUrl"
              onChange={(e) => handleFileChange(index, e)}
              accept="image/*"
              className="team-input"
            />
          </div>
        ))}
        <button type="button" onClick={addNewMember} className="add-member-button">
          Add Team Member
        </button>
        <button type="submit" className="submit-button">Update Team</button>
      </form>
    </SectionWrapper>
  );
};

export default UpdateTeamSection;
