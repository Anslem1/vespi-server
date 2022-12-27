const router = require('express').Router()
const {
  registerUser,
  loginUser,
  requireLogin,
  logoutUser
} = require('../controllers/Auth/Auth')

router.post('/register', registerUser)

router.post('/login', loginUser)

router.post('/logout', logoutUser)

module.exports = router
