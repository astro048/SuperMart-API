const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
  {
    userId: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false, // Prevents password from being returned in queries
    },
    phone: {
      type: String,
      default: '',
    },
    orders: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['Active', 'Blocked', 'Pending'],
      default: 'Active',
    },
    avatarColor: {
      type: String,
      default: '#3498db',
    },
    role: {
      type: String,
      default: 'user',
    },
    joined: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('User', userSchema);