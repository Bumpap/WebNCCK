const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
  authId: String,
  name: String,
  email: String,
  password: String,
  role: String,
  avatar: String,
  lop: String,
  khoa: String,
  created: Date,
  updated: Date
})
const User = mongoose.model('User', userSchema)

module.exports = User
