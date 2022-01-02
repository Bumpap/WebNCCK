const mongoose = require('mongoose')
const commentSchema = mongoose.Schema({
    content: String,
    creator: String,
    avatar: String,
    created_at: Date,
    updated_at: Date
})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment