import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TeamSection = () => {
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await axios.get('/api/about/team'); // Fetch all team members
        console.log("Fetched team data:", response.data);
        console.log("Fetched team data:", JSON.stringify(response.data, null, 2));


        if (Array.isArray(response.data)) {
          setTeam(response.data);
        } else {
          console.error("Unexpected data format. Expected an array.");
          setTeam([]);
        }
      } catch (err) {
        console.error("Error fetching team data:", err);
        setError("Failed to load team data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, []);

  return (
    <section className="team-section">
      <h2>Meet Our Team</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="team-grid">
          {team.map((member) => (
            <div key={member._id} className="team-member">
              <img 
                src={member.photoUrl ? `/${member.photoUrl.replace(/\\/g, '/')}` : '/images/default-founder.png'} 
                alt={member.name || "Team member"} 
              />
              <h4>{member.name || "Unnamed Member"}</h4>
              <p>{member.role || "Role not specified"}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
  
};

export default TeamSection;
