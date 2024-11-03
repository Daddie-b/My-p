// UpdateAbout.js
import React from 'react';
import './UpdateAbout.css'; 
import UpdateBusinessOverview from './UpdateBusinessOverview';
import UpdateHeroSection from './UpdateHeroSection';
import UpdateJourneyTimeline from './UpdateJourneyTimeline';
import UpdateLocationMap from './UpdateLocationMap';
import UpdateProductsOverview from './UpdateProductsOverview';
import UpdateTeamSection from './UpdateTeamSection';
import UpdateTestimonials from './UpdateTestimonials';


const About = () => {
  return (
    <div className="About-updates">
      <h1 className="text-center">Admin Updates</h1>
      <UpdateBusinessOverview />
      <UpdateHeroSection />
      <UpdateJourneyTimeline />
      <UpdateLocationMap />
      <UpdateProductsOverview />
      <UpdateTeamSection />
      <UpdateTestimonials />
    </div>
  );
};

export default About;
