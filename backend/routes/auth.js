const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure the path and case are correct
const router = express.Router();

// Register User
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    // Check if email already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // Create new user with default role 'user'
    user = new User({ username, email, password });
    await user.save();

    console.log('User role:', user.role);

    // Generate JWT with role included
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Adjust token expiry as needed
    });

    res.status(201).json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: 'Server error' });
  }
});

// Login User
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check for user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    console.log('User role:', user.role);

    // Generate JWT with role included
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Adjust token expiry as needed
    });

    res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (err) {
    console.error(err); // Log error for debugging
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
