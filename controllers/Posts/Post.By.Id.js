const Post = require('../../models/Post.js')

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .select(
        '_id username slug caption desc postImage category createdAt updatedAt'
      )
      .populate({ path: 'category', select: '_id name' })
      .exec()
    return res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err)
  }
}

exports.upDatePostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body
          },
          { new: true }
        )
        return res.status(200).json(updatedPost)
      } catch (err) {
        return res.status(500).json(err)
      }
    } else {
      return res.status(401).json('Action not allowed')
    }
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.deletePostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.username === req.body.username) {
      try {
        await post.delete()
        return res.status(200).json('Post has been successfully deleted')
      } catch (err) {
        return res.status(500).json(err)
      }
    } else {
      return res.status(401).json('Action not allowed')
    }
  } catch (err) {
    return res.status(500).json(err)
  }
}
