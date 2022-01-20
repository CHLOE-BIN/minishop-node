/**
 * Ad模型
 */
const mongoose = require("mongoose")
// 实例化schema
const Schema = mongoose.Schema

// 创建Schema
const AdSchema = new Schema({
    adsType: {
        // 广告类型: 1轮播图 2小图广告 3横幅 4侧边栏
        type: Number,
        required: true
    },
    mainImage: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = Ad = mongoose.model("ads", AdSchema)