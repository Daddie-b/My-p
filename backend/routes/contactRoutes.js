const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const multer = require('multer');
const path = require('path');

// Configure multer for image upload
const storage = multer.diskStorage({
  destination: './uploads/', // Folder for storing uploaded images
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});
const upload = multer({ storage });

// Update contact information, including image
router.post('/update', upload.single('image'), async (req, res) => {
  try {
    const contactData = { ...req.body };
    if (req.file) {
      contactData.image = `/uploads/${req.file.filename}`; // Save image path
    }
    const contact = await Contact.findOneAndUpdate({}, contactData, { new: true, upsert: true });
    res.status(200).json(contact);
  } catch (error) {
    console.error('Error updating contact info:', error.message);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// Fetch contact information
router.get('/', async (req, res) => {
  try {
    const contact = await Contact.findOne({});
    if (!contact) {
      return res.status(404).json({ error: 'Contact information not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error('Error fetching contact info:', error.message);
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
