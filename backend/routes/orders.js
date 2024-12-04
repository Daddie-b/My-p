// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/authMiddleware');

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

// GET /api/orders - Fetch orders for a user
router.get('/', protect, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate('items.productId', 'name price') // Populate product details (name, price) from the Product model
      .sort({ createdAt: -1 }); // Sort by latest orders

    if (!orders) {
      return res.status(404).json({ error: 'No orders found.' });
    }

    res.json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});


// GET /api/orders/unpaid - Fetch unpaid order details
router.get('/unpaid', async (req, res) => {
  console.log('Unpaid orders route hit');
  try {
    // Fetch orders where status is unpaid
    const unpaidOrders = await Order.find({ paid: false })
      .populate('userId', 'name') // Populate user name
      .populate('items.productId', 'name price'); // Populate product name

    if (!unpaidOrders.length) {
      return res.status(404).json({ error: 'No unpaid orders found.' });
    }

    // Process and structure the response
    const result = unpaidOrders.map(order => ({
      user: order.userId.name,
      items: order.items.reduce((acc, item) => {
        const existingItem = acc.find(i => i.name === item.productId.name);
        if (existingItem) {
          existingItem.quantity += item.quantity;
          existingItem.totalPrice += item.quantity * item.price;
        } else {
          acc.push({
            name: item.productId.name,
            quantity: item.quantity,
            totalPrice: item.quantity * item.price,
          });
        }
        return acc;
      }, []),
      totalAmount: order.total
    }));

    res.json(result);
  } catch (error) {
    console.error('Error fetching unpaid orders:', error.message);
    res.status(500).json({ error: 'Failed to fetch orders.' });
  }
});


// GET /api/orders/need-delivery - Fetch orders that need delivery
router.get('/need-delivery', protect, admin, async (req, res) => {
  try {
    // Fetch pending orders
    const pendingOrders = await Order.find({ status: 'pending' })
      .populate('userId', 'username') // Populate user details
      .populate('items.productId', 'name price') // Populate product details
      .sort({ createdAt: -1 }); // Sort orders by latest

    if (!pendingOrders || pendingOrders.length === 0) {
      return res.status(404).json({ error: 'No pending orders found.' });
    }

    // Structure response data
    const result = pendingOrders.map(order => ({
      user: order.userId.username,
      orderId: order._id,
      createdAt: order.createdAt,
      items: order.items.map(item => ({
        name: item.productId.name,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.quantity * item.price,
      })),
      totalAmount: order.total,
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching pending orders:', error.message);
    res.status(500).json({ error: 'Failed to fetch pending orders. Please try again later.' });
  }
});

module.exports = router;
