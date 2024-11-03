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

// itemRoutes.js
router.post('/', upload.array('items[]'), async (req, res) => {
    try {
      if (!req.body || !req.files) {
        return res.status(400).json({ error: "Request data or files missing" });
      }
  
      const items = JSON.parse(req.body.items); // Parse items as JSON string
  
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
  });
  

module.exports = router;
