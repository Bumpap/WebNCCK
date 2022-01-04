const mongoose = require('mongoose')
const postSchema = mongoose.Schema({
    content: String,
    creator: String,
    email: String,
    avatar: String,
    created_at: Date,
    updated_at: Date
})

const Post = mongoose.model('Post', postSchema)
module.exports = Post