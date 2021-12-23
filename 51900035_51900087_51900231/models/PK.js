const mongoose = require('mongoose')
const pkSchema = mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String,
    created: Date,
    updated: Date,
    avatar: String
})
const PK = mongoose.model('PK', pkSchema)
module.exports = PK;