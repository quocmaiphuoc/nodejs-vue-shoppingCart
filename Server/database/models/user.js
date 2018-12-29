const {mongoose} = require('../database')
const bcrypt = require('bcrypt')
const {Schema} = mongoose
const jwt = require('jsonwebtoken')
const secretString = "secret string"

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    fullName: String,
    email: {type: String, match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, unique: true},
    isAdmin: Boolean,
    password: String,
    createdOn: String
})

const User = mongoose.model('user',UserSchema)

const insertUser = async(firstName, lastName, password, email, isAdmin)=>{
    try {
        const encrytedPassword = await bcrypt.hash(password,10)
        const newUser =new User()
        newUser.firstName = firstName
        newUser.lastName = lastName
        newUser.fullName = firstName + " " + lastName
        newUser.password = encrytedPassword
        newUser.email = email
        newUser.isAdmin = isAdmin
        newUser.createdOn = new Date().toLocaleString()
        await newUser.save()
    } catch (error) {
        throw error
    }
}

const getAllUser = async()=>{ 
    try {
        let user = await User.find({})
        return user
    } catch (error) {
        throw error
    }
}

const getDetailUser = async(userId)=>{
    try {
        let user = await User.findById(userId)
        return user
    } catch (error) {
        throw error
    }
}

const updateUser = async(id, firstName, lastName, password, email, isAdmin)=>{
    try {
        let user = await User.findById(id)
        if(!user){
            throw `ko tìm thấy user`
        }
        if(user.lastName != lastName || user.firstName != firstName){
            user.fullName = firstName + " " + lastName
        }
        user.firstName = firstName
        user.lastName = lastName
        user.password = password
        user.email = email
        user.isAdmin = isAdmin
        await user.save()
        return user
    } catch (error) {
        throw error
    }
}
const loginUser = async(email, password)=>{
    try {
        let foundUser = await User.findOne({email: email.trim()})
                            .exec()
        if(!foundUser) {
            throw "User không tồn tại"
        }
        let encryptedPassword = foundUser.password
        let checkPassword = await bcrypt.compare(password, encryptedPassword)
        if (checkPassword === true) {
            //Đăng nhập thành công
            let jsonObject = {
                id: foundUser._id
            }
            let tokenKey = await jwt.sign(jsonObject, 
                                secretString, {
                                    expiresIn: 86400 // Expire trong 24 giờ
                                })
            return tokenKey
        } else {
            throw `ko đúng`
        }
    } catch(error) {
        throw error
    }
}
//test token
const verifyJWT = async(tokenKey)=>{
    try {
        let decodeJson = await jwt.verify(tokenKey,secretString)
        if(Date.now()/1000 > decodeJson.exp){
            throw "Token het hạn"
        }
        let foundUser = await User.findById(decodeJson.id)
        if(!foundUser){
            throw "ko tìm thấy user"
        }
    } catch (error) {
        throw error
    }
}
module.exports = {
    User,
    updateUser,
    getAllUser,
    insertUser,
    getDetailUser,
    loginUser,
    verifyJWT
}