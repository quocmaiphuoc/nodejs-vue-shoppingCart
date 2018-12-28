const {mongoose} = require('../database')
const {Schema} = mongoose

const ProductSchema = new Schema({
    productName: {type:String},
    productDescription: {type:String},
    productCategory: {type:String},
    productPrice: {type:String},
    productImage: {type:String},
    productSeller: {type:String},
    productRating: {type:Number}
})

const Product = mongoose.model('product', ProductSchema)

const insertProduct = async(productName,productDescription,productCategory,productPrice,productImage,productSeller,productRating)=>{
    try {
        const newProduct = new Product()
        newProduct.productName = productName
        newProduct.productDescription=productDescription
        newProduct.productCategory=productCategory
        newProduct.productPrice=productPrice
        newProduct.productImage=productImage
        newProduct.productSeller=productSeller
        newProduct.productRating=productRating
        await newProduct.save()
    } catch (error) {
        throw error
    }
}

const getAllProduct = async()=>{
    try {
        let products = await Product.find({})
        return products
    } catch (error) {
        throw error
    }
}

const getBestProduct = async()=>{
    try {
        let products = await Product.find({isBestProduct: true}).limit(4)
        return products
    } catch (error) {
        throw error
    }
}

const getTopProduct = async()=>{
    try {
        let products = await Product.find({isTopProduct: true}).limit(4)
        return products
    } catch (error) {
        throw error
    }
}

const getProductCategories = async()=>{
    try {
        let products = await Product.aggregate([{$group:{_id:"$productCategory"}}])
        return products
    } catch (error) {
        throw error
    }
}

const getProductByCategories = async(productCategory)=>{
    try {
        let product= await Product.find({productCategory: productCategory})
    return product
    } catch (error) {
        throw product
    }
    
}

const getDetailProduct= async(prouducId)=>{
    try {
        let product = await Product.findById({_id : prouducId})
        return product
    } catch (error) {
        throw error
    }
}

const updateProduct = async(productId,productName,productDescription,productCategory,productPrice,productImage,productSeller,productRating)=>{
    try {
        let product = await Product.findById(productId)
        if(!product){
            throw `Ko tìm thấy product: ${product}`
        }
        product.productName = productName
        product.productDescription = productDescription
        product.productCategory = productCategory
        product.productPrice = productPrice
        product.productImage = productImage
        product.productSeller = productSeller
        product.productRating = productRating
        await product.save()
        return product
    } catch (error) {
        throw error
    }
}

const deleteProduct = async(productId)=>{
    try {
        let product = await Product.findById(productId)
        if(!product){
            throw `Ko tìm thấy product: ${product}`
        }
        await Product.deleteOne({_id : productId})
    } catch (error) {
        throw error
    }
}

module.exports = {
    Product,
    insertProduct,
    getAllProduct,
    getBestProduct,
    getTopProduct,
    getProductCategories,
    getProductByCategories,
    getDetailProduct,
    updateProduct,
    deleteProduct
}