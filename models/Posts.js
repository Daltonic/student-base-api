import mongoose from 'mongoose'

const PostSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Posts', PostSchema)
