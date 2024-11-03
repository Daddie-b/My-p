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

  const addNewMember = () => {
    setTeam([...team, { name: '', role: '', photoUrl: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    
    team.forEach(member => {
      formData.append('members', JSON.stringify(member)); // Append each member
    });
  
    try {
      await axios.put('/api/team', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type for file upload
        },
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
              name="image"
              onChange={(e) => handleChange(index, e)}
              accept="image/*"
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
