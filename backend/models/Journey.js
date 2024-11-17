// backend/models/Journey.js
const mongoose = require('mongoose');

const MilestoneSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
});

const JourneySchema = new mongoose.Schema({
  milestones: [MilestoneSchema], // Array of milestones
});

module.exports = mongoose.model('Journey', JourneySchema);
