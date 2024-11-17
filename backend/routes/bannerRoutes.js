// routes/bannerRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Banner = require('../models/Banner');

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// GET route to retrieve the banner data
router.get('/banner', async (req, res) => {
    try {
      const bannerData = await Banner.findOne();
      console.log('Banner Data:', bannerData); // Log the data
      if (bannerData) {
        res.status(200).json(bannerData);
      } else {
        res.status(404).json({ message: 'Banner data not found' });
      }
    } catch (error) {
      console.error("Error retrieving banner data:", error);
      res.status(500).json({ error: 'Failed to retrieve banner data' });
    }
  });
  

// PUT route to update the banner data
router.put('/banner', upload.single('imageFile'), async (req, res) => {
  try {
    const { businessName, tagline } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const bannerData = await Banner.findOneAndUpdate(
      {},
      { businessName, tagline, imageUrl },
      { new: true, upsert: true }
    );

    res.status(200).json(bannerData);
  } catch (error) {
    console.error("Error updating banner data:", error);
    res.status(500).json({ error: 'Failed to update banner data' });
  }
});

module.exports = router;
