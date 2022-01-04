const mongoose = require('mongoose')
const notifiSchema = mongoose.Schema({
    content: String,
    creator: String,
    email: String,
    avatar: String,
    created_at: Date,
    updated_at: Date
})

const Notifi = mongoose.model('Notifi', notifiSchema)
module.exports = Notifi