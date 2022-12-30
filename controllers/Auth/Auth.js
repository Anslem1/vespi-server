const User = require('../../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.registerUser = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(12)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword
    })

    if (await User.findOne({ username: req.body.username })) {
      return res.status(400).json({ message: 'Username already exists' })
    }

    newUser.save((error, user) => {
      error && res.status(400).json({ error })

      if (user) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '100d'
        })
        const { password, ...userCreds } = user._doc

        res.status(200).json({
          token,
          user: userCreds
        })
      }
    })
  } catch (err) {
    return res.status(500).json(err)
  }
}

exports.loginUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    const validated = await bcrypt.compare(req.body.password, user.password)
    if (user) {
      if (validated) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: '100d'
        })
        const { password, ...userCreds } = user._doc
        res.cookie('token', token, { expiresIn: '100d' })
        res.status(200).json({
          token,
          userCreds
        })
      } else {
        return res.status(400).json({ message: 'Wrong username or password' })
      }
    }
  } catch (err) {
    if (
      err == "TypeError: Cannot read properties of null (reading 'password')"
    ) {
      res.status(400).json({ message: 'We could not find that user' })
    } else {
      console.log({ err })
      return res.status(400).json({ err, message: 'from here' })
    }
  }
}

exports.logoutUser = (req, res) => {
  res.clearCookie('token')
  return res.status(200).json({ message: 'Successfully Logged out' })
}

exports.requireLogin = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  const user = jwt.verify(token, process.env.JWT_SECRET)
  req.userCreds = user
  next()
}
