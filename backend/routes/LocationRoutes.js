// backend/routes/aboutRoutes.js
const express = require('express');
const Location = require('../models/Location');
const router = express.Router();

// Route to update location data
router.put('/location', async (req, res) => {
  const { latitude, longitude } = req.body;
  
  try {
    let location = await Location.findOne();
    
    if (location) {
      // Update existing location
      location.latitude = latitude;
      location.longitude = longitude;
      await location.save();
    } else {
      // Create new location if it doesn't exist
      location = new Location({ latitude, longitude });
      await location.save();
    }
    
    res.status(200).json({ message: 'Location updated successfully!' });
  } catch (error) {
    console.error('Error updating location data:', error);
    res.status(500).json({ error: 'Failed to update location' });
  }
});

module.exports = router;
