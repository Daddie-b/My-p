// backend/models/Testimonials.js
const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: String, // Store the path of the uploaded image
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
}, {
  timestamps: true, // Automatically manage createdAt and updatedAt fields
});

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
