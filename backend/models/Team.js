// backend/models/Team.js
const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  photoUrl: { type: String, required: true },
});

const teamSchema = new mongoose.Schema({
  members: [teamMemberSchema],
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
