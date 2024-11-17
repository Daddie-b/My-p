const express = require('express');
const TeamMember = require('../models/Team');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// GET route to fetch all team members
// Route to fetch all team members
router.get('/', async (req, res) => {
  try {
    const teamMembers = await TeamMember.find(); // Retrieve all team member documents
    res.status(200).json(teamMembers);
  } catch (error) {
    console.error("Error fetching team members:", error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
});
// backend/routes/ItemRoutes.js
router.post('/items', async (req, res) => {
  try {
    const items = req.body.items;

    // Parse items if it's in string format
    const parsedItems = Array.isArray(items)
      ? items.map(item => JSON.parse(item))
      : JSON.parse(items);

    // Assuming parsedItems is now an array of objects
    console.log("Parsed items:", parsedItems);

    // Perform your database operations with parsedItems
    // For example, save to the database or further processing

    res.status(201).json({ message: 'Items created successfully!' });
  } catch (error) {
    console.error("Error creating items:", error);
    res.status(500).json({ error: 'Failed to create items' });
  }
});


module.exports = router;
