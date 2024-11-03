// backend/routes/teamRoutes.js
const express = require('express');
const Team = require('../models/Team');
const router = express.Router();

// GET route for retrieving team data
router.get('/', async (req, res) => {
  try {
    const teamData = await Team.findOne(); // Assuming there's only one team data document
    res.status(200).json(teamData);
  } catch (error) {
    console.error("Error fetching team data:", error);
    res.status(500).json({ error: 'Failed to fetch team data' });
  }
});

// PUT route for updating team data
router.put('/', async (req, res) => {
  try {
    const { members } = req.body; // Expecting members array
    const updatedTeam = await Team.findOneAndUpdate(
      {},
      { members },
      { new: true, upsert: true } // Create a new document if it doesn't exist
    );
    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error("Error updating team data:", error);
    res.status(500).json({ error: 'Failed to update team data' });
  }
});

module.exports = router;
