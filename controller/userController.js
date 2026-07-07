const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// ===================================
// Generate JWT Token
// ===================================
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d'
    }
  )
}

// ===================================
// Generate Custom User ID
// ===================================
const generateUserId = async () => {
  const lastUser = await User.findOne()
    .sort({ userId: -1 })

  if (!lastUser || !lastUser.userId) {
    return 101
  }

  return lastUser.userId + 1
}

// ===================================
// Register User
// ===================================
const registerUser = async (req, res) => {
  try {

    const {
      name,
      email,
      password,
      phone
    } = req.body

    // Check Existing User
    const userExists =
      await User.findOne({ email })

    if (userExists) {
      return res.status(400).json({
        message: 'User already exists'
      })
    }

    // Generate User ID
    const userId =
      await generateUserId()

    // Hash Password
    const salt =
      await bcrypt.genSalt(10)

    const hashedPassword =
      await bcrypt.hash(password, salt)

    // Create User
    const user =
      await User.create({
        userId,
        name,
        email,
        password: hashedPassword,
        phone,
        orders: 0,
        status: 'Active'
      })

    // Response
    res.status(201).json({
      _id: user._id,
      userId: user.userId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      orders: user.orders,
      status: user.status,
      avatarColor: user.avatarColor,
      role: user.role,
      joined: user.joined,
      token: generateToken(user._id)
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}

// ===================================
// Login User
// ===================================
const loginUser = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body

    // Find User
    const user =
      await User.findOne({ email })

    // Check Password
    if (
      user &&
      (
        await bcrypt.compare(
          password,
          user.password
        )
      )
    ) {

      res.json({
        _id: user._id,
        userId: user.userId,
        name: user.name,
        email: user.email,
        phone: user.phone,
        orders: user.orders,
        status: user.status,
        avatarColor:
          user.avatarColor,
        role: user.role,
        joined: user.joined,

        token:
          generateToken(user._id)
      })

    } else {

      res.status(401).json({
        message:
          'Invalid credentials'
      })

    }

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}

// ===================================
// Get All Users
// ===================================
const getUsers = async (req, res) => {

  try {

    const users =
      await User.find()

    res.json(users)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}

// ===================================
// Get Single User
// ===================================
const getUser = async (req, res) => {

  try {

    const user =
      await User.findById(
        req.params.id
      )

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    res.json(user)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}

// ===================================
// Create User (Admin)
// ===================================
const createUser = async (req, res) => {

  try {

    const userId =
      await generateUserId()

    // Hash Password
    let hashedPassword = ''

    if (req.body.password) {

      const salt =
        await bcrypt.genSalt(10)

      hashedPassword =
        await bcrypt.hash(
          req.body.password,
          salt
        )
    }

    const user =
      await User.create({
        ...req.body,
        userId,
        password: hashedPassword
      })

    res.status(201).json(user)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}

// ===================================
// Update User
// ===================================
const updateUser = async (req, res) => {

  try {

    const updatedData = {
      ...req.body
    }

    // Re-hash Password
    if (req.body.password) {

      const salt =
        await bcrypt.genSalt(10)

      updatedData.password =
        await bcrypt.hash(
          req.body.password,
          salt
        )
    }

    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        updatedData,
        { new: true }
      )

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    res.json(user)

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}

// ===================================
// Delete User
// ===================================
const deleteUser = async (req, res) => {

  try {

    const user =
      await User.findByIdAndDelete(
        req.params.id
      )

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      })
    }

    res.json({
      message: 'User deleted successfully'
    })

  } catch (error) {

    res.status(500).json({
      message: error.message
    })

  }
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
}

