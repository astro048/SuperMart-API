const Product = require('../models/Product')

const getProducts = async (req, res) => {
  try {
    const data = await Product.find().sort({ createdAt: -1 })
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const getProduct = async (req, res) => {
  try {
    const data = await Product.findById(req.params.id)
    if (!data) return res.status(404).json({ message: 'Product not found' })
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

const createProduct = async (req, res) => {
  try {
    const productData = { ...req.body }
    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get('host')}`
      productData.image = `${baseUrl}/uploads/${req.file.filename}`
    }
    const data = await Product.create(productData)
    res.json(data)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const updateProduct = async (req, res) => {
  try {
    const productData = { ...req.body }
    if (req.file) {
      const baseUrl = `${req.protocol}://${req.get('host')}`
      productData.image = `${baseUrl}/uploads/${req.file.filename}`
    }
    const data = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true, runValidators: true }
    )
    if (!data) return res.status(404).json({ message: 'Product not found' })
    res.json(data)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }
}

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: 'Deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}