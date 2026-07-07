const express = require('express')
const router = express.Router()

const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} = require('../controller/userController')

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/', getUsers)
router.get('/:id', getUser)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router