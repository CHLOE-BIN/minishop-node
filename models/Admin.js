/**
 * Admin模型
 */
const mongoose = require("mongoose")
// 实例化schema
const Schema = mongoose.Schema

// 创建Schema
const AdminSchema = new Schema({
    email: {
        type: String,
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    password2: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Admin = mongoose.model("admins", AdminSchema)