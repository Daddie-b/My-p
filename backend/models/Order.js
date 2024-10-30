// models/Order.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      name: { type: String, required: true }, // Product name added directly to order items
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  total: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'cancelled', 'in progress', 'completed'], 
    default: 'pending' 
  },
  paid: { type: Boolean, default: false }, // Field to track payment status
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
