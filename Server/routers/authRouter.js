const express = require('express')
const router = express.Router()

const {User} = require('../database/models/user')

router.route('/login').get(async(req,res)=>{
    let {email,password} = req.body
    User.find({
        email: email,
        password: password
    },(err,user)=>{
        if(err){
            res.send(err)
        }

        if(user.lenght ===0){
            res.send(401).json({
                status: 401,
                message: 'Unknow'
            })
        }else {
            res.json(user)
        }
    })
})
module.exports = router
