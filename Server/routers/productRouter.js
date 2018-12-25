const express = require('express')
const router = express.Router()

const { Product,
    insertProduct,
    getAllProduct,
    getBestProduct,
    getTopProduct, 
    getProductCategories,
    getProductByCategories } = require('../database/models/product')

router.route('/products').post(async(req,res)=>{
    let {productName,productDescription,productCategory,productPrice,productImage,productSeller,productRating} = req.body
    try {
        let newProduct = await insertProduct(productName,productDescription,productCategory,productPrice,productImage,productSeller,productRating)
        res.json({
            result: 'ok',
            message: 'Thêm mới thành công',
            data: newProduct
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: `Không thể thêm mới Product. Lỗi: ${error}`
        })
    }
    
}).get(async(req,res)=>{
    try {
        let products = await getAllProduct()
        res.json({
            result: 'ok',
            message: 'Query thành công',
            data: products
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: ` Không thể lấy được thông tin. Error: ${error}`
        })
    }
    
})

router.route('/best/prodcut/').get(async(req,res)=>{
    try {
        let products = await getBestProduct()
        res.json({
            result: 'ok',
            message: 'Query best thành công',
            data: products
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: ` Không thể lấy được thông tin. Error: ${error}`
        })
    }
    
})

router.route('/best/prodcut/').get(async(req,res)=>{
    try {
        let products = await getTopProduct()
        res.json({
            result: 'ok',
            message: 'Query best thành công',
            data: products
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: ` Không thể lấy được thông tin. Error: ${error}`
        })
    }
    
})

router.route('/product/productCategories').get(async(req,res)=>{
    try {
        let products = await getProductCategories()
        res.json({
            result: 'ok',
            message: 'Query thành công',
            data: products
        })
    } catch (error) {
        throw error
    }
})

module.exports = router