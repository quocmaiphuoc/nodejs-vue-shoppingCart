const express = require('express')
const router = express.Router()

const {User,loginUser,verifyJWT} = require('../database/models/user')

router.route('/login').post(async(req,res)=>{
    let {email,password} = req.body
    try {
        let token = await loginUser(email,password)
        res.json({
            result: 'ok',
            message: 'Dang nhap thành công',
            token
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: 'Ko thành công'
        })
    }
})
router.route('/jwtTest').get(async(req,res)=>{
    let token = req.headers['x-access-token']
    try {
        await verifyJWT(token)
        res.json({
            result: 'ok',
            message: 'veryfi thành công'
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: 'lỗi'
        })
    }
})

module.exports = router
