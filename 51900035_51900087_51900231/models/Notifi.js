const mongoose = require('mongoose')
const notifiSchema = mongoose.Schema({
    content: String,
    creator: String,
    created_at: Date,
    updated_at: Date
})

const Notifi = mongoose.model('Notifi', notifiSchema)
module.exports = Notifi