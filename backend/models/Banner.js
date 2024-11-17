// models/Banner.js
const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
  businessName: {
    type: String,
    required: true,
  },
  tagline: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String, // Path to the uploaded image
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Banner', bannerSchema);
