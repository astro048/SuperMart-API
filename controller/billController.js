const Bill = require('../models/Bill')

// Get All Bills
const getBills = async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 })

    res.json(bills)
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

// Get Single Bill
const getBill = async (req, res) => {
  try {
    const bill = await Bill.findById(req.params.id)

    res.json(bill)
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

// Create Bill
const createBill = async (req, res) => {
  try {
    const bill = await Bill.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Bill Created Successfully',
      data: bill
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

// Update Bill
const updateBill = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    )

    res.json(bill)
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

// Delete Bill
const deleteBill = async (req, res) => {
  try {
    await Bill.findByIdAndDelete(req.params.id)

    res.json({
      success: true,
      message: 'Bill Deleted Successfully'
    })
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    })
  }
}

module.exports = {
  getBills,
  getBill,
  createBill,
  updateBill,
  deleteBill
}