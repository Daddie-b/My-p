import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import './Testimonials.css';

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get('/api/about/testimonials');
        setTestimonials(response.data);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className="testimonials">
      <h2>What Our Clients Say</h2>
      <div className="testimonial-carousel">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="testimonial-item">
            <p>“{testimonial.message}”</p>
            <h4>- {testimonial.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
