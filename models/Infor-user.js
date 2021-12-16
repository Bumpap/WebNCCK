const mongoose = require('mongoose')
const infouserSchema = mongoose.Schema({
    authId: String,
    name: String,
    email: String,
    phone: String,
    school: String,
    street: String,
    city: String,
    state: String,
    zipcode: String
})
const InforUser = mongoose.model('Infor-user', infouserSchema)
module.exports = InforUser
