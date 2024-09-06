const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Product Schema
const productSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    trim: true,
  },
  image: {
    type: String,
    required: true,  
  },
}, { timestamps: true }); // Add createdAt and updatedAt timestamps

// Create Product Model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;
