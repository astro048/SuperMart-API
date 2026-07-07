const express = require('express')
const router = express.Router()

const {
  getBills,
  getBill,
  createBill,
  updateBill,
  deleteBill
} = require('../controller/billController')

router.get('/', getBills)
router.get('/:id', getBill)
router.post('/', createBill)
router.put('/:id', updateBill)
router.delete('/:id', deleteBill)

module.exports = router