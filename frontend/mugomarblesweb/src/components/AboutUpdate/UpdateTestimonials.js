import React, { useState } from 'react';
import axios from 'axios';
import SectionWrapper from './SectionWrapper';
import './UpdateAbout.css';

const UpdateTestimonials = () => {
  const [testimonials, setTestimonials] = useState([{ name: '', content: '', image: null, rating: 0 }]);

  const handleChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index][name] = value;
    setTestimonials(updatedTestimonials);
  };

  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    const updatedTestimonials = [...testimonials];
    updatedTestimonials[index].image = file; // Store the file object
    setTestimonials(updatedTestimonials);
  };

  const addNewTestimonial = () => {
    setTestimonials([...testimonials, { name: '', content: '', image: null, rating: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
  
    testimonials.forEach((testimonial, index) => {
      formData.append(`testimonials[${index}].name`, testimonial.name);
      formData.append(`testimonials[${index}].content`, testimonial.content);
      if (testimonial.image) {
        formData.append(`testimonials[${index}].image`, testimonial.image); // Append only if exists
      }
      formData.append(`testimonials[${index}].rating`, testimonial.rating);
    });
  
    try {
      await axios.put('https://my-p-backend.onrender.com/api/about/testimonials', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Testimonials updated successfully!');
    } catch (error) {
      if (error.response) {
        // The request was made, and the server responded with a status code
        // that falls out of the range of 2xx
        console.error("Error updating testimonials:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("Error: No response received from server:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error in setting up request:", error.message);
      }
    }
    };
    
  

  return (
    <SectionWrapper title="Update Testimonials">
      <form onSubmit={handleSubmit}>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-input-group">
            <input
              name="name"
              value={testimonial.name}
              onChange={(e) => handleChange(index, e)}
              placeholder="Name"
              className="testimonial-input"
            />
            <textarea
              name="content"
              value={testimonial.content}
              onChange={(e) => handleChange(index, e)}
              placeholder="Testimonial Content"
              className="testimonial-textarea"
            />
            <input
              type="file"
              name="image"
              onChange={(e) => handleFileChange(index, e)}
              accept="image/*"
              className="testimonial-input"
            />
            <input
              type="number"
              name="rating"
              value={testimonial.rating}
              onChange={(e) => handleChange(index, e)}
              placeholder="Rating (0-5)"
              min="0"
              max="5"
              className="testimonial-input"
            />
          </div>
        ))}
        <button type="button" onClick={addNewTestimonial} className="add-testimonial-button">
          Add Testimonial
        </button>
        <button type="submit">Update Testimonials</button>
      </form>
    </SectionWrapper>
  );
};

export default UpdateTestimonials;
