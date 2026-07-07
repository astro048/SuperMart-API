const mongoose = require('mongoose')

const BillItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },
    price: {
      type: Number,
      required: true,
      min: 0
    },
    vat: {
      type: Number,
      default: 18
    }
  },
  {
    _id: false
  }
)

const BillSchema = new mongoose.Schema(
  {
    billNumber: {
      type: String,
      required: true,
      unique: true
    },

    date: {
      type: String,
      required: true
    },

    time: {
      type: String,
      required: true
    },

    shopName: String,
    shopAddress: String,
    shopPhone: String,
    shopVat: String,

    tableNumber: String,
    cashier: String,

    customerName: String,
    customerPhone: String,

    items: {
      type: [BillItemSchema],
      default: []
    },

    subtotal: {
      type: Number,
      default: 0
    },

    vatPercentage: {
      type: Number,
      default: 18
    },

    vatAmount: {
      type: Number,
      default: 0
    },

    total: {
      type: Number,
      default: 0
    },

    cash: {
      type: Number,
      default: 0
    },

    change: {
      type: Number,
      default: 0
    },

    notes: String
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Bill', BillSchema)