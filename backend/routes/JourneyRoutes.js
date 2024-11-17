// backend/routes/journeyRoutes.js
const express = require('express');
const Journey = require('../models/Journey');
const router = express.Router();

// Route to get journey milestones
router.get('/journey', async (req, res) => {
  try {
    const journey = await Journey.findOne();
    const milestones = journey ? journey.milestones : [];
    res.status(200).json({ milestones });
  } catch (error) {
    console.error('Error fetching milestones:', error);
    res.status(500).json({ error: 'Failed to fetch milestones' });
  }
});

// Route to update journey milestones
router.put('/journey', async (req, res) => {
  const milestones = req.body; // Array of milestones

  try {
    let journey = await Journey.findOne();

    if (journey) {
      // Update existing milestones
      journey.milestones = milestones;
      await journey.save();
    } else {
      // Create new journey if it doesn't exist
      journey = new Journey({ milestones });
      await journey.save();
    }

    res.status(200).json({ message: 'Journey milestones updated successfully!' });
  } catch (error) {
    console.error('Error updating milestones:', error);
    res.status(500).json({ error: 'Failed to update milestones' });
  }
});

module.exports = router;
