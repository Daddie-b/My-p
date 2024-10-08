const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const { protect, admin } = require('../middleware/authMiddleware');

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

// PUT /api/orders/:orderId/status - Update order status (Admin only)
router.put('/:orderId/status', protect, admin, async (req, res) => {
  const { status } = req.body;
  const { orderId } = req.params;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    order.status = status;
    await order.save();

    res.json({ message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
