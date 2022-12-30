const User = require('../../models/User')
const Post = require('../../models/Post')
const bcrypt = require('bcrypt')

exports.getUser = async (req, res) => {
  try {
    const user = User.findById(req.params.id)
    const { password, ...creds } = user._doc
    return res.status(200).json(creds)
  } catch (err) {
    return res.status(500).json({ err: 'User not found' })
  }
}

exports.updateUser = async (req, res) => {
  User.findOne({ username: req.body.username }).exec(async (error, user) => {
    if (
      user &&
      req.body.username !== '' &&
      req.body.username === user.username
    ) {
      res.status(400).json({ message: 'Username already in use' })
    } else {
      if (req.body._id === req.params.id) {
        if (req.body.password) {
          const salt = await bcrypt.genSalt(12)
          req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        // const username = req.body.username
        User.findById(req.body._id).exec(async (error, user) => {
          try {
            const userCreds = await User.findByIdAndUpdate(
              req.params.id,
              {
                $set: {
                  username:
                    req.body.username === ''
                      ? user.username
                      : req.body.username,
                  email: req.body.email === '' ? user.email : req.body.email,
                  password:
                    req.body.password === ''
                      ? user.password
                      : req.body.password,
                  profilePicture: req.file?.path
                }
              },
              { new: true }
            )
            return res
              .status(200)
              .json({ userCreds, message: 'Account updated Succesfully' })
          } catch (err) {
            res.status(500).json(err)
          }
        })
      } else {
        return res.status(401).json({ message: 'Action not allowed' })
      }
    }
  })
}

exports.deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id)
  if (user._id == req.params.id) {
    try {
      try {
        await Post.deleteMany({ username: user.username })
        await User.findByIdAndDelete(req.params.id, {
          $set: req.body
        })
        return res.status(200).json('User Deleted')
      } catch (err) {
        return res.status(500).json(err)
      }
    } catch (error) {
      res.status(500).json({ error })
    }
  } else {
    res.status(400).json({ message: 'Action not allowed' })
  }
}
