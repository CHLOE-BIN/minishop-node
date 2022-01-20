// 广告图片接口
const express = require("express")
const router = express.Router()

// 引入User.js
const Ad = require("../../models/Ad");

// $route   POST /ads/add
// @desc    返回添加的广告
// @access  public
router.post("/add", (req, res) => {
    const newAd = {}
    if (req.body.adsType) newAd.adsType = req.body.adsType
    if (req.body.mainImage) newAd.mainImage = req.body.mainImage

    new Ad(newAd)
        .save()
        .then(ads => res.json(ads))
        .catch(err => console.log(err))
})

// $route   GET /ads
// @desc    返回广告
// @access  public
router.get("/", (req, res) => {
    Ad.find()
        .then(ads => {
            if (req.body.adsType) {
                Ad.find({ adsType: req.body.adsType })
                    .then(ads => {
                        if (ads.length != 0) {
                            res.json(ads)
                        } else {
                            return res.status(404).json("没有该种类的广告")
                        }
                    })
            } else {
                res.json(ads)
            }
        })
        .catch(err => console.log(err))
})


module.exports = router

// 1. 引入router
// 2. 设计接口: router.get("url")
// 3. export出去
// 4. 在server.js中引入users并使用: app.uss("/api/users", users)
// 5. 创建模型存储数据: 在models文件夹

// 获取token 需要jsonwebtoken插件 引入后使用jwt.sign("规则","加密名字","到期时间","箭头函数")
// 加密名字在 /config/keys.js 中写

// 验证token 需要passport和passport-jwt插件 在server.js中引入 并初始化 在passport.js中配置