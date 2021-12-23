const mongoose = require('mongoose')
const adminSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String,
    created: Date,
    updated: Date,
    avatar: String
})
const Admin = mongoose.model('Admin', adminSchema)
module.exports = Admin;