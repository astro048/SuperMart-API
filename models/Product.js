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

image: String,

description: String

},
{
timestamps: true
}
)

module.exports = mongoose.model('Product', productSchema)