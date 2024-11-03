import React, { useState,  } from 'react';
import axios from 'axios';
import SectionWrapper from './SectionWrapper';
import './UpdateAbout.css';

const UpdateTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index][name] = value;
    setTestimonials(updatedTestimonials);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/about/testimonials', testimonials);
      alert('Testimonials updated successfully!');
    } catch (error) {
      console.error("Error updating testimonials:", error);
    }
  };

  return (
    <SectionWrapper title="Update Testimonials">
    <form onSubmit={handleSubmit}>
      {testimonials.map((testimonial, index) => (
        <input key={index} name="content" value={testimonial.content} onChange={(e) => handleChange(index, e)} placeholder="Testimonial" />
      ))}
      <button type="submit">Update Testimonials</button>
    </form>
    </SectionWrapper>
  );
};

export default UpdateTestimonials;
