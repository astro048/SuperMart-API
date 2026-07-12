const express = require('express')
const router = express.Router()

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controller/productController')

const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })

router.get('/', getProducts)
router.get('/:id', getProduct)
router.post('/', upload.single('image'), createProduct)
router.put('/:id', upload.single('image'), updateProduct)
router.delete('/:id', deleteProduct)

module.exports = router


