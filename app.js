import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postsRoute from './routes/posts.js'
import 'dotenv/config'

const app = express()

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/posts', postsRoute)

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to node app')
})

// Connect to db
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log('Connected to db...')
  }
)

const db = mongoose.connection
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(3000, () => {
  console.log(`Server now listening at localhost:3000`)
})
