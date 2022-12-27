const router = require('express').Router()
const { createPost, getAllPost } = require('../controllers/Posts/Posts')
const {
  getPostById,
  upDatePostById,
  deletePostById
} = require('../controllers/Posts/Post.By.Id')
const { upload, requireSignin } = require('../Middlewares/middleware')

// TO CREATE A JOURNAL
router.post('/create',
  requireSignin,
  upload.single('postImage'), createPost)
//GET ALL THE JOURNAL
router.get('/get', getAllPost)

//TO GET A JOURNAL BY ID

router.get('/get/:id', getPostById)

// TO UPDATE A JOURNAL BY ID

router.put('/update/:id', upDatePostById)

// To DELETE A POST BY ID

router.delete('/delete/:id', deletePostById)

module.exports = router
