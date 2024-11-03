import React from 'react';
import HeroSection from './HeroSection';
import BusinessOverview from './BusinessOverview';
import JourneyTimeline from './JourneyTimeline';
import TeamSection from './TeamSection';
import ProductsOverview from './ProductsOverview';
import Testimonials from './Testimonials';
import LocationMap from './LocationMap';
import Footer from './Footer';

const AboutPage = () => {
  return (
    <div>
      <HeroSection />
      <BusinessOverview />
      <JourneyTimeline />
      <TeamSection />
      <ProductsOverview />
      <Testimonials />
      <LocationMap />
      <Footer />
    </div>
  );
};

export default AboutPage;
