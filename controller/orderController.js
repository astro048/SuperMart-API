// controllers/orderController.js

const Order = require('../models/Order')
const User = require('../models/User')

// ===================================
// Generate Order ID
// ===================================
const generateOrderId = async () => {

  const lastOrder =
    await Order.findOne()
      .sort({ orderId: -1 })

  if (!lastOrder || !lastOrder.orderId) {
    return 1001
  }

  return lastOrder.orderId + 1
}

// ===================================
// Get All Orders
// ===================================
const getOrders = async (req, res) => {

  try {

    const orders =
      await Order.find()

    res.json(orders)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}

// ===================================
// Get Single Order
// ===================================
const getOrder = async (req, res) => {

  try {

    const order =
      await Order.findById(
        req.params.id
      )

    if (!order) {

      return res.status(404).json({
        message: 'Order not found'
      })

    }

    res.json(order)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}

// ===================================
// Create Order
// ===================================
const createOrder = async (req, res) => {

  try {

    const {
      userId,
      customerName,
      items,
      totalAmount,
      paymentMethod,
      status
    } = req.body

    // Generate Order ID
    const orderId =
      await generateOrderId()

    // Create Order
    const order =
      await Order.create({
        orderId,
        userId,
        customerName,
        items,
        totalAmount,
        paymentMethod,
        status
      })

    // Increase User Order Count
    await User.findOneAndUpdate(
      { userId: userId },
      {
        $inc: { orders: 1 }
      }
    )

    res.status(201).json({
      success: true,
      message:
        'Order created successfully',
      data: order
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })

  }
}

// ===================================
// Update Order
// ===================================
const updateOrder = async (req, res) => {

  try {

    const order =
      await Order.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      )

    if (!order) {

      return res.status(404).json({
        message: 'Order not found'
      })

    }

    res.json(order)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}

// ===================================
// Delete Order
// ===================================
const deleteOrder = async (req, res) => {

  try {

    const order =
      await Order.findByIdAndDelete(
        req.params.id
      )

    if (!order) {

      return res.status(404).json({
        message: 'Order not found'
      })

    }

    res.json({
      message:
        'Order deleted successfully'
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}

module.exports = {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder
}

