// UpdateTeamSection.js
import React, { useState,  } from 'react';
import axios from 'axios';
import SectionWrapper from './SectionWrapper';
import './UpdateAbout.css';

const UpdateTeamSection = () => {
  const [team, setTeam] = useState([]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTeam = [...team];
    updatedTeam[index][name] = value;
    setTeam(updatedTeam);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/about/team', team);
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
              name="photoUrl"
              value={member.photoUrl}
              onChange={(e) => handleChange(index, e)}
              placeholder="Photo URL"
              className="team-input"
            />
          </div>
        ))}
        <button type="submit" className="submit-button">Update Team</button>
      </form>
    </SectionWrapper>
  );
};

export default UpdateTeamSection;
