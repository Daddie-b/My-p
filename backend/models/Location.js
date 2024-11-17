// backend/models/Location.js
const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  latitude: {
    type: String,
    required: true,
  },
  longitude: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Location', LocationSchema);
