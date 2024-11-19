import React from 'react';
import HeroSection from './HeroSection';
import BusinessOverview from './BusinessOverview';
import JourneyTimeline from './JourneyTimeline';
import TeamSection from './TeamSection';
import ItemsOverview from './ItemsOverview';
//import Testimonials from './Testimonials';
//import LocationMap from './LocationMap';
//import Footer from './Footer';

const AboutPage = () => {
  return (
    <div>
      <HeroSection />
      <ItemsOverview />
      <BusinessOverview/>
      <JourneyTimeline />
      <TeamSection />
      

    </div>
  );
};

export default AboutPage;
