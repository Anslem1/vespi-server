const router = require('express').Router()
const { getUser, updateUser, deleteUser } = require('../controllers/Users/User')
const { upload } = require('../Middlewares/middleware')

//TO SEARCH/GET/READ A USER BY ID
router.get('/:id', getUser)

// TO UPDATE USERS CREDENTIALS
router.put('/:id', upload.single('profilePicture'), updateUser)

// To DELETE  A USER
router.delete('/:id', deleteUser)

module.exports = router
