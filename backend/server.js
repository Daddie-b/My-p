// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');



const app = express();

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Import Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/Product'); // Import the product routes

dotenv.config();

// Middleware
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL // Configure CORS to allow requests from the frontend URL
}));

// Routes Middleware
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/products', productRoutes); // Product routes

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected'))
.catch((err) => console.log('MongoDB connection error:', err));


// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
