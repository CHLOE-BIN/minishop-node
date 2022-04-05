/**
 * Cart模型
 */
const mongoose = require("mongoose")
// 实例化schema
const Schema = mongoose.Schema

// 创建Schema
const CartSchema = new Schema({
    cartId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mainImg: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    version: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    num: {
        type: Number,
        required: true
    },
    selected: {
        type: Boolean,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Cart = mongoose.model("carts", CartSchema)