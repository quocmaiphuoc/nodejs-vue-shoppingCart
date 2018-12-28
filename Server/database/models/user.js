const {mongoose} = require('../database')
const {Schema} = mongoose

const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    fullName: String,
    email: String,
    isAdmin: Boolean,
    password: String,
    createdOn: String
})

const User = mongoose.model('user',UserSchema)

const insertUser = async(firstName, lastName, password, email, isAdmin)=>{
    try {
        const newUser =new User()
        newUser.firstName = firstName
        newUser.lastName = lastName
        newUser.fullName = firstName + " " +lastName
        newUser.password = password
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
        user.firstName = firstName
        user.lastName = lastName
        user.fullName = firstName + " " + lastName
        user.password = password
        user.email = email
        user.isAdmin = isAdmin
        await user.save()
        return user
    } catch (error) {
        throw error
    }
}

module.exports = {
    User,
    updateUser,
    getAllUser,
    insertUser,
    getDetailUser
}