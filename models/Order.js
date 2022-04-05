/**
 * Order模型
 */
const mongoose = require("mongoose")
// 实例化schema
const Schema = mongoose.Schema

// 创建Schema
const OrderSchema = new Schema({
    orderId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    productList: {
        type: Array,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    is_pay: {
        type: Boolean,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Order = mongoose.model("orders", OrderSchema)