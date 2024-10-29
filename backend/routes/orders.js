const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect } = require('../middleware/authMiddleware');

// POST /api/orders - Create a new order
router.post('/', protect, async (req, res) => {
  try {
    const { items, total, status, paymentMethod } = req.body;

    if (!items || !total) {
      return res.status(400).json({ error: "Items and total are required." });
    }

    const paidStatus = paymentMethod === 'debt' ? false : true;

    const newOrder = new Order({
      items,
      total,
      status: status || 'pending',
      paid: paidStatus,
      userId: req.user._id
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    console.error('Error creating order:', error.message);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// GET /api/orders - Fetch user orders
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
