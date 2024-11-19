import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AboutPage.css';

const LocationMap = () => {
  const [location, setLocation] = useState({
    latitude: '',
    longitude: ''
  });

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('/api/about/location');
        setLocation(response.data);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };
    fetchLocation();
  }, []);

  if (!location.latitude || !location.longitude) {
    return <p>Loading location...</p>;
  }

  return (
    <section className="location-map">
      <h2>Our Location</h2>
      <div className="map-container">
        <iframe
          title="business-location"
          width="100%"
          height="400px"
          src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${location.latitude},${location.longitude}`}
          allowFullScreen
        ></iframe>
      </div>
    </section>
  );
};

export default LocationMap;
