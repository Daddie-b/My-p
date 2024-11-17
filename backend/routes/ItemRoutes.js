// itemRoutes.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const Item = require('../models/Item'); // Ensure the path is correct

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

router.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});


// Change this line:
router.post('/items', upload.array('items[]'), async (req, res) => {

  try {
    if (!req.body || !req.files) {
      return res.status(400).json({ error: "Request data or files missing" });
    }

    const items = JSON.parse(req.body.items);
    const newItems = items.map((item, index) => ({
      name: item.name,
      description: item.description,
      imagePath: req.files[index]?.path || null,
    }));

    const savedItems = await Item.insertMany(newItems);
    res.status(201).json(savedItems);
  } catch (error) {
    console.error("Error creating items:", error);
    res.status(500).json({ error: 'Failed to create items' });
  }
  console.log("Request body:", req.body);
  console.log("Request files:", req.files);
});


module.exports = router;
