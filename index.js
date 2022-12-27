const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const cors = require('cors')
const path = require('path')

const app = express()

const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const categoryRoute = require('./routes/category')
const initialData = require('./routes/initialdata')

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log('Mongo working?'))
  .catch(err => console.log(err))

app
  .use(cors())
  .use(express.json())
  .use('/api/auth', authRoute)
  .use('/api', initialData)
  .use('/api/users', userRoute)
  .use('/api/journals', postRoute)
  .use('/api/categories', categoryRoute)

app.listen('5000', () => {
  console.log('We running backend. Port: 5000')
})
