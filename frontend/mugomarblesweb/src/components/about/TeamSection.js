import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TeamSection.css';

const TeamSection = () => {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get('/api/about/team');
        setTeam(response.data);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };
    fetchTeamData();
  }, []);

  return (
    <section className="team-section">
      <h2>Meet Our Team</h2>
      <div className="team-grid">
        {team.map((member, index) => (
          <div key={index} className="team-member">
            <img src={member.image} alt={member.name} />
            <h4>{member.name}</h4>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
