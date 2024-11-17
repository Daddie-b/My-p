// backend/routes/overviewRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const BusinessOverview = require('../models/BusinessOverview');

const router = express.Router();

// Configure multer for file storage in uploads directory
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp for unique filenames
  },
});

const upload = multer({ storage });

// Route to update or create the business overview with image upload
router.put('/overview', upload.single('founderImage'), async (req, res) => {
  const { mission, vision, description, founderMessage } = req.body;
  const founderImage = req.file ? req.file.filename : null; // Save only the filename

  try {
    let overview = await BusinessOverview.findOne();

    if (overview) {
      // Update existing overview data
      overview.mission = mission;
      overview.vision = vision;
      overview.description = description;
      overview.founderMessage = founderMessage;
      if (founderImage) overview.founderImage = founderImage; // Update image if provided
      await overview.save();
    } else {
      // Create new overview data if it doesn't exist
      overview = new BusinessOverview({
        mission,
        vision,
        description,
        founderMessage,
        founderImage,
      });
      await overview.save();
    }

    res.status(200).json({ message: 'Business overview updated successfully!' });
  } catch (error) {
    console.error('Error updating business overview:', error);
    res.status(500).json({ error: 'Failed to update business overview' });
  }
});

// Add GET route to fetch business overview
router.get('/overview', async (req, res) => {
    try {
      const overview = await BusinessOverview.findOne();
      res.status(200).json(overview);
    } catch (error) {
      console.error('Error fetching business overview:', error);
      res.status(500).json({ error: 'Failed to fetch business overview' });
    }
  });
  
  router.get('/journey', async (req, res) => {
    try {
      const milestones = await BusinessOverview.findOne().select('milestones'); // Adjust 'milestones' if it’s nested differently
      res.status(200).json(milestones);
    } catch (error) {
      console.error('Error fetching milestones:', error);
      res.status(500).json({ error: 'Failed to fetch milestones' });
    }
  });

module.exports = router;
