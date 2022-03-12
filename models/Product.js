/**
 * Product模型
 */
const mongoose = require("mongoose")
// 实例化schema
const Schema = mongoose.Schema

// 创建Schema
const ProductSchema = new Schema({
    categoryId: {
        // 商品种类: 1手机 2电视 3笔记本 4耳机 5穿戴
        type: Number,
        required: true
    },
    productId: {
        type: Number,
    },
    name: {
        type: String,
    },
    subtitle: {
        type: String,
    },
    mainImage: {
        type: String
    },
    price: {
        type: Number
    },
    showImg: {
        type: Array
    },
    version: {
        type: Array
    },
    color: {
        type: Array
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Product = mongoose.model("products", ProductSchema)