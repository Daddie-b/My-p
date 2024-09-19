const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');


// POST /api/orders - Create a new order
router.post('/', protect, async (req, res) => {
  try {
    const { items, total, status } = req.body;

    // Create new order
    const newOrder = new Order({
      items,
      total,
      status: status || 'pending', // default to 'pending' if status not provided
      userId: req.user._id // Assuming user is authenticated
    });

    // Save the order to the database
    const savedOrder = await newOrder.save();

    // Return the saved order as a response
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

module.exports = router;
