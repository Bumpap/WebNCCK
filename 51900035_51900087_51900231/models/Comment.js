const mongoose = require('mongoose')
const commentSchema = mongoose.Schema({
    post_id: String,
    comment: String,
    creator: String,
    create_: Date,
    update_: Date
})

const Comment = mongoose.model('Comment', commentSchema)
module.exports = Comment