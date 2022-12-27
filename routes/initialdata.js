const { initialData } = require('../controllers/initialdata/iInitialdata');

const router = require('express').Router()


router.post('/initialdata', initialData)


module.exports = router
