const mongoose = require('mongoose')

const productSchema = mongoose.Schema(
{
productId: {
type: Number,
unique: true
},

name: {
  type: String,
  required: true
},

brand: String,

category: {
  type: String,
  required: true
},

sellingPrice: {
  type: Number,
  required: true
},

originalPrice: Number,

stockQuantity: {
  type: Number,
  default: 0
},

tagline: String,

image: {
  type: String,
  default: '',
  get: function(image) {
    if (!image) return '';
    if (image.startsWith('http')) return image;
    // Uses VITE_API_URL or environment BASE_URL if set, else uses render production URL
    const baseUrl = process.env.BASE_URL || 'https://supermart-api-2.onrender.com';
    return `${baseUrl}${image.startsWith('/') ? '' : '/'}${image}`;
  }
},

description: String

},
{
  timestamps: true,
  toJSON: { getters: true },
  toObject: { getters: true }
}
)

module.exports = mongoose.model('Product', productSchema)