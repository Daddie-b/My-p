const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // Import multer middleware
const router = express.Router();

// Get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new product (Admin only)
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  const { name, price, description } = req.body;
  const imagePath = req.file ? `/uploads/${req.file.filename}` : null; // Save image path if uploaded

  try {
    const newProduct = new Product({
      image: imagePath,
      name,
      price,
      description,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
