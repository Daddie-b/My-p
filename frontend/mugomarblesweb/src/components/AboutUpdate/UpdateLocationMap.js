import React, { useState,  } from 'react';
import axios from 'axios';
import SectionWrapper from './SectionWrapper';
import './UpdateAbout.css';

const UpdateLocationMap = () => {
  const [location, setLocation] = useState({ latitude: '', longitude: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocation({ ...location, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/about/location', location);
      alert('Location updated successfully!');
    } catch (error) {
      console.error("Error updating location data:", error);
    }
  };

  return (
    <SectionWrapper title=" Update Location Map">
    <form onSubmit={handleSubmit}>
      <input name="latitude" value={location.latitude} onChange={handleChange} placeholder="Latitude" />
      <input name="longitude" value={location.longitude} onChange={handleChange} placeholder="Longitude" />
      <button type="submit">Update Location</button>
    </form>
    </SectionWrapper>
  );
};

export default UpdateLocationMap;
