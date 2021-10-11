import express from 'express'
import Post from '../models/Posts.js'

const route = express.Router()

// Get a all posts
route.get('/', async (req, res) => {
  const posts = await Post.find()

  try {
    res.status(200).json(posts)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

// Get a single post
route.get('/:id', async (req, res) => {
  const post = await Post.findById(req.params.id)

  try {
    res.status(200).json(post)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

// Submit a post
route.post('/', async (req, res) => {
  const post = new Post({
    name: req.body.name,
    gender: req.body.gender,
    age: req.body.age,
  })

  try {
    const savedPost = await post.save()
    res.status(201).json(savedPost)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

// Delete a post
route.delete('/:id', async (req, res) => {
  const post = await Post.deleteOne({ _id: req.params.id })
  try {
    res.status(200).json(post)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

// Updates a single post
route.patch('/:id', async (req, res) => {
  const post = await Post.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age,
      },
    }
  )

  try {
    res.status(200).json(post)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

// Get a single post
route.get('/search/:keyword', async (req, res) => {
  const post = await Post.find({ name: { $regex: req.params.keyword } })

  try {
    res.status(200).json(post)
  } catch (error) {
    res.status(400).json({ message: error })
  }
})

export default route
