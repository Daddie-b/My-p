const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// POST request to update contact information
router.post('/update', async (req, res) => {
  try {
    // Update the contact information
    const contact = await Contact.findOneAndUpdate({}, req.body, { new: true, runValidators: true });
    if (!contact) {
      return res.status(404).json({ error: 'Contact information not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    console.error('Error updating contact info:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
