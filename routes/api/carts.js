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
            if (req.body.productId) newCart.productId = req.body.productId
            if (req.body.name) newCart.name = req.body.name
            if (req.body.price) newCart.price = req.body.price
            if (req.body.version) newCart.version = req.body.version
            if (req.body.color) newCart.color = req.body.color

            new Cart(newCart)
                .save()
                .then(cart => res.json(cart))
                .catch(err => console.log(err))
        })
})

// $route   GET /carts
// @desc    返回购物车的所有商品
// @access  public
router.post("/", (req, res) => {
    Cart.findOne({ userId })
        .then((cart) => {
            return res.json(cart)
        })
})

module.exports = router
