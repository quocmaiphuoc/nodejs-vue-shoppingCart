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
    const newProduct = new Product()
    newProduct.productName = productName
    newProduct.productDescription=productDescription
    newProduct.productCategory=productCategory
    newProduct.productPrice=productPrice
    newProduct.productImage=productImage
    newProduct.productSeller=productSeller
    newProduct.productRating=productRating
    await newProduct.save()
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
        let product= await Product.find({productCategory})
    return product
    } catch (error) {
        throw product
    }
    
}

module.exports = {
    Product,
    insertProduct,
    getAllProduct,
    getBestProduct,
    getTopProduct,
    getProductCategories,
    getProductByCategories
}