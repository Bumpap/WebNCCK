const mongoose = require('mongoose')
const postSchema = mongoose.postSchema({
    content: String,
    creator: String,
    created_at: Date,
    updated_at: Date
})

const Post = mongoose.model('Post',postSchema)
module.exports = Post