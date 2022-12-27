const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    username: {
      type: String,
      required: true
    },
    slug: {
      type: String
    },
    caption: {
      type: String,
      required: true
    },
    desc: {
      type: String,
      required: true
    },
    postImage: {
      type: String,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema)
