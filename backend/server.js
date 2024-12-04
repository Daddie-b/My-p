// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config(); // Load environment variables from .env file

const app = express();

// Middleware

app.use(cors({
  origin: process.env.FRONTEND_URL // Configure CORS to allow requests from the frontend URL
}));


app.use(express.json()); // Parse JSON request bodies

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Import Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/Product'); // Import the product routes
const orderRoutes = require('./routes/orders'); // Import the order routes
const contactRoutes = require('./routes/contactRoutes');
const itemRoutes = require('./routes/ItemRoutes');
const teamRoutes = require('./routes/teamRoutes');
const testimonialRoutes = require('./routes/testimonialsRoutes');
const LocationRoutes = require('./routes/LocationRoutes'); 
const journeyRoutes = require('./routes/JourneyRoutes');
const overviewRoutes = require('./routes/OverviewRoutes'); 
const bannerRoutes = require('./routes/bannerRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// Routes Middleware
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/products', productRoutes); // Product routes
app.use('/api/orders', orderRoutes); // Order routes
app.use('/api/Contact', contactRoutes);
app.use('/api/about', itemRoutes);
app.use('/api/about/team', teamRoutes);
app.use('/api/about/testimonials', testimonialRoutes);
app.use('/api/about', LocationRoutes); 
app.use('/api/about', journeyRoutes);
app.use('/api/about', overviewRoutes); 
app.use('/api/about', bannerRoutes);
app.use('/api/orders', paymentRoutes);


app.delete('/api/products/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Delete the product from the database
    await Product.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
