import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AboutPage.css';

const JourneyTimeline = () => {
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await axios.get('/api/about/journey');
        setMilestones(response.data);
      } catch (error) {
        console.error("Error fetching milestones:", error);
      }
    };
    fetchMilestones();
  }, []);

  return (
    <section className="journey-timeline">
      <h2>Our Journey</h2>
      <div className="timeline">
        {milestones.map((milestone, index) => (
          <div key={index} className="milestone">
            <h3>{milestone.year}</h3>
            <p>{milestone.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default JourneyTimeline;
