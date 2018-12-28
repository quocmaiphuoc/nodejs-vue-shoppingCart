const express = require('express')
const router = express.Router()

const { Product,
    insertProduct,
    getAllProduct,
    getBestProduct,
    getTopProduct, 
    getProductCategories,
    getProductByCategories,
    getDetailProduct,
    updateProduct,
    deleteProduct
 } = require('../database/models/product')

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
        res.json({
            result: 'failed',
            message: ` Không thể lấy được thông tin. Error: ${error}`
        })
    }
})

router.route('/product/productsByCategory').get(async(req,res)=>{
    try {
        let caterogy = req.query['caterogy']
        let products = await getProductByCategories(caterogy)
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
router.route('/product/:product_id').get(async(req,res)=>{
    try {
        let {product_id} = req.params
        let product = await getDetailProduct(product_id)
        res.json({
            result: 'ok',
            message: 'Lấy thông tin product thành công',
            data: product
        })
        } catch (error) {
            res.json({
                result: 'failed',
                message: ` Không thể lấy được thông tin. Error: ${error}`
            })
        }
}).put(async(req,res)=>{
    try {
        let {product_id} = req.params
        let {productName,productDescription,productCategory,productPrice,productImage,productSeller,productRating} = req.body
        let product = await updateProduct(product_id,productName,productDescription,productCategory,productPrice,productImage,productSeller,productRating)
        res.json({
            result: 'ok',
            message: 'Cập nhật thành công',
            data: product
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: ` Không thể lấy được thông tin. Error: ${error}`
        })
    }
}).delete(async(req,res)=>{
    try {
        let {id} = req.body
        await deleteProduct(id)
        res.json({
            result: 'ok',
            message: 'Xóa thành công'
        })
    } catch (error) {
        res.json({
            result: 'failed',
            message: ` Không thể lấy được thông tin. Error: ${error}`
        })
    }
})

module.exports = router