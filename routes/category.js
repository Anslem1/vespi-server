const router = require('express').Router()
const {
  createCategory,
  getCategory
} = require('../controllers/Category/Category')

// CREATE A CATEGORY
router.post('/', createCategory)


//GET A CATEGORY
router.get('/', getCategory)

module.exports = router
