// 订单管理接口
const express = require("express")
const router = express.Router()
// 引入User.js
const Cart = require("../../models/Cart");

// $route   POST /carts/add
// @desc    返回新增到购物车的商品
// @access  public
router.post("/add", (req, res) => {
    const userId = req.body.userId
    Cart.findOne({ userId })
        .then(() => {
            const newCart = {}

            if (userId) newCart.userId = userId
            if (req.body.cartId) newCart.cartId = req.body.cartId
            if (req.body.productId) newCart.productId = req.body.productId
            if (req.body.name) newCart.name = req.body.name
            if (req.body.mainImg) newCart.mainImg = req.body.mainImg
            if (req.body.price) newCart.price = req.body.price
            if (req.body.version) newCart.version = req.body.version
            if (req.body.color) newCart.color = req.body.color
            if (req.body.num) newCart.num = req.body.num
            newCart.selected = false

            new Cart(newCart)
                .save()
                .then(cart => res.json(cart))
                .catch(err => console.log(err))
        })
})

// $route   POST /carts/edit
// @desc    返回修改了数量的购物车商品
// @access  public
router.post("/edit", (req, res) => {
    Cart.findOneAndUpdate(
        { cartId: req.body.cartId },
        { $set: {num: req.body.num, selected: true} },
        { new: true })
        .then(cart => {
            res.json(cart)
        })
})

// $route   GET /carts
// @desc    返回当前用户购物车的所有商品
// @access  public
router.get("/", (req, res) => {
    Cart.find({ userId: req.query.userId })
        .then(cart => {
            if (!cart) {
                return res.status(404).json("没有商品")
            } else {
                return res.status(200).json(cart)
            }
        })
        .catch(err => console.log(err))
})

// $route   DELETE /carts/delete
// @desc    返回删除后剩余的商品
// @access  public
router.delete("/delete", (req, res) => {
    Cart.findOneAndRemove({ cartId: req.query.cartId })
        .then(rest => {
            res.json(rest)
        })
        .catch(() => res.status(404).json("删除失败"))
})

module.exports = router
