// models/Order.js

const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
{
  // Custom Order ID
  orderId: {
    type: Number,
    unique: true
  },

  // Custom User ID (101, 102...)
  userId: {
    type: Number,
    required: true
  },

  customerName: {
    type: String,
    required: true
  },

  items: [
    {
      productId: Number,
      name: String,
      qty: Number,
      price: Number
    }
  ],

  totalAmount: {
    type: Number,
    required: true
  },

  paymentMethod: {
    type: String,
    default: 'Cash'
  },

  status: {
    type: String,
    default: 'Pending'
  }
},
{
  timestamps: true
})

module.exports =
  mongoose.model(
    'Order',
    orderSchema
  )

