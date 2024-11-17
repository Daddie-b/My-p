// backend/models/BusinessOverview.js
const mongoose = require('mongoose');

const BusinessOverviewSchema = new mongoose.Schema({
  mission: {
    type: String,
    required: true,
  },
  vision: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  founderMessage: {
    type: String,
    required: true,
  },
  founderImage: {
    type: String, // Store filename instead of URL
    required: false,
  },
});

module.exports = mongoose.model('BusinessOverview', BusinessOverviewSchema);
