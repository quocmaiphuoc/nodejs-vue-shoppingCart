const mongoose = require('../database')
const Schema  = mongoose.Schema

const UserSchema = new Schema({
    uid: String,
    name: String,
    email: String,
    password: String,
    user_avatar: String,
    phoneNumber: String,
    createdOn: String
})

module.exports = mongoose('user', UserSchema)