const express = require('express')
const router = express.Router()

const { User,
    updateUser,
    getAllUser,
    insertUser,
    getDetailUser
 } = require('../database/models/user')

 router.route('/user').get(async(req,res)=>{
     try {
         let user = await getAllUser()
         res.json({
             result: 'ok',
             message: 'get thành công',
             data: user
         })
     } catch (error) {
         res.json({
             result: 'failed',
             message: `Lỗi ${error}`
         })
     }
 }).post(async(req,res)=>{
    try {
        let {firstName, lastName, password, email, isAdmin} = req.body
        
        let user = await insertUser(firstName, lastName, password, email, isAdmin)
        res.json({
            result: 'ok',
            message: 'get thành công',
            data: user
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Lỗi ${error}`
        })
    }
 })

 router.route('/user/:user_id').get(async(req,res)=>{
     try {
         let {user_id} = req.params
         let user = await getDetailUser(user_id)
         res.json({
             result: 'ok',
             message: 'get thành công',
             data: user
         })
     } catch (error) {
        res.json({
            result: 'failed',
            message: `Lỗi ${error}`
        })
     }
 }).put(async(req,res)=>{
    try {
        let {user_id} = req.params
        let {firstName, lastName, password, email, isAdmin } = req.body
        let user = await updateUser(user_id, firstName, lastName, password, email, isAdmin)
        res.json({
            result: 'ok',
            message: 'get thành công',
            data: user
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Lỗi ${error}`
        })
    }
 })

 module.exports = router