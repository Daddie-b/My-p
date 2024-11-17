// routes/Product.js
const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware'); // Ensure upload middleware is correctly imported
const router = express.Router();

// Add a new product (Any authenticated user)
router.post('/', protect, upload.single('image'), async (req, res) => {
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

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    console.log('Products fetched from the database:', products); // Log the fetched products
    res.status(200).json(products);
  } catch (err) {
    console.error('Error fetching products:', err); // Log any errors
    res.status(500).json({ message: 'Error fetching products' });
  }
});


router.delete('/:id', protect, admin, async (req, res) => {
  const { id } = req.params;

  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete product' });
  }
});

module.exports = router;
