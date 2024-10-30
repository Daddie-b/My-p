// routes/contactRoutes.js
const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const { protect, admin } = require('../middleware/authMiddleware'); // Ensure only admin can update

router.get('/', async (req, res) => {
  console.log('Received GET request for contact info');
  try {
      const contactInfo = await Contact.findOne();
      res.json(contactInfo);
  } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: 'Server error' });
  }
});


// PUT /api/contact - Update contact info for admin
router.put('/', protect, admin, async (req, res) => {
  try {
    const { address, phone, email } = req.body;
    let contactInfo = await Contact.findOne();

    if (contactInfo) {
      // Update existing contact information
      contactInfo.address = address;
      contactInfo.phone = phone;
      contactInfo.email = email;
    } else {
      // Create new contact info if not exists
      contactInfo = new Contact({ address, phone, email });
    }
    await contactInfo.save();
    res.json(contactInfo);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

