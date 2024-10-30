// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  businessName: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  whatsapp: { type: String, required: true },
  facebook: { type: String },
  instagram: { type: String },
  twitter: { type: String },
  businessHours: { type: String },
  image: { type: String }, // Store the path or URL to the image
  testimonials: { type: String }
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
