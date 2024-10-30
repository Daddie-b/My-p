// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect } = require('../middleware/authMiddleware');

// POST /api/orders - Create a new order
router.post('/', protect, async (req, res) => {
  try {
    const { items, total, status, paymentMethod } = req.body;

    if (!items || !total) {
      return res.status(400).json({ error: "Items and total are required." });
    }

    const paidStatus = paymentMethod === 'debt' ? false : true;

    // Enrich items with product name and price if they are not provided directly
    const enrichedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) throw new Error('Product not found');
        
        return {
          productId: item.productId,
          name: item.name || product.name, // Use provided name or fetch from Product model
          quantity: item.quantity,
          price: item.price || product.price // Use provided price or fetch from Product model
        };
      })
    );

    const newOrder = new Order({
      items: enrichedItems,
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

// GET /api/orders - Fetch user orders with optional status filter
router.get('/', protect, async (req, res) => {
  const { status } = req.query;

  try {
    let orderQuery = Order.find({ userId: req.user._id });

    if (status) {
      orderQuery = orderQuery.where('status').equals(status);
    }

    const orders = await orderQuery; // Directly fetch without populating
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error.message);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;
