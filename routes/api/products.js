// 商品管理接口
const express = require("express")
const router = express.Router()
// 引入User.js
const Product = require("../../models/Product");

// $route   POST /products/add
// @desc    返回添加的商品
// @access  public
router.post("/add", (req, res) => {
    const categoryId = req.body.categoryId
    const productId = req.body.productId
    Product.findOne({ productId })
        .then(product => {
            if (product) {
                return res.status(400).json({ email: "已有该商品" })
            } else {
                const newProduct = {}

                if (categoryId) newProduct.categoryId = categoryId
                if (productId) newProduct.productId = productId
                if (req.body.name) newProduct.name = req.body.name
                if (req.body.subtitle) newProduct.subtitle = req.body.subtitle
                if (req.body.mainImage) newProduct.mainImage = req.body.mainImage
                if (req.body.price) newProduct.price = req.body.price
                if (req.body.showImg) editProduct.showImg = req.body.showImg
                if (req.body.version) editProduct.version = req.body.version
                if (req.body.color) editProduct.color = req.body.color

                new Product(newProduct)
                    .save()
                    .then(product => res.json(product))
                    .catch(err => console.log(err))
            }
        })
})

// $route   GET /products
// @desc    返回所有商品
// @access  public
router.get("/", (req, res) => {
    Product.find()
        .then(product => {
            if (!product) {
                return res.status(404).json("没有商品")
            } else {
                // res.json(product)
                return res.status(200).json(product)
            }
        })
        .catch(err => console.log(err))
})

// $route   GET /products/:productId
// @desc    返回指定的商品
// @access  public
router.get("/:productId", (req, res) => {
    Product.findOne({ productId: req.params.productId })
        .then(product => {
            if (product) {
                return res.status(200).json(product)
            } else {
                return res.status(404).json("没有该商品")
            }
        })
        .catch(err => console.log(err))
})

// $route   POST /products/edit/:productId
// @desc    返回修改后的商品
// @access  public
router.post("/edit/:productId", (req, res) => {
    const editProduct = {}
    if (req.body.categoryId) editProduct.categoryId = req.body.categoryId
    if (req.body.productId) editProduct.productId = req.body.productId
    if (req.body.name) editProduct.name = req.body.name
    if (req.body.subtitle) editProduct.subtitle = req.body.subtitle
    if (req.body.mainImage) editProduct.mainImage = req.body.mainImage
    if (req.body.price) editProduct.price = req.body.price
    if (req.body.showImg) editProduct.showImg = req.body.showImg
    if (req.body.version) editProduct.version = req.body.version
    if (req.body.color) editProduct.color = req.body.color

    Product.findOneAndUpdate(
        { productId: req.params.productId },
        { $set: editProduct },
        { new: true })
        .then(product => {
            res.json(product)
        })
})

// $route   DELETE /products/delete/:productId
// @desc    返回删除后剩余的商品
// @access  public
router.delete("/delete/:productId", (req, res) => {
    Product.findOneAndRemove({ productId: req.params.productId })
        .then(() => {
            Product.find()
                .then(rest => {
                    res.json(rest)
                })
        })
        .catch(() => res.status(404).json("删除失败"))
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