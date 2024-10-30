// models/Contact.js
const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Contact', contactSchema);
