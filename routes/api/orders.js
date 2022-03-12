// 订单管理接口
const express = require("express")
const router = express.Router()
// 引入User.js
const Order = require("../../models/Order");

// $route   POST /orders/add
// @desc    返回添加的订单
// @access  public
router.post("/add", (req, res) => {
    const orderId = req.body.orderId
    Order.findOne({ orderId })
        .then(order => {
            if (order) {
                return res.status(400).json({ email: "已有该订单" })
            } else {
                const newOrder = {}

                if (orderId) newOrder.orderId = orderId
                if (req.body.userId) newOrder.userId = req.body.userId
                if (req.body.productList) newOrder.productList = req.body.productList
                if (req.body.name) newOrder.name = req.body.name
                if (req.body.phone) newOrder.phone = req.body.phone
                if (req.body.address) newOrder.address = req.body.address
                if (req.body.price) newOrder.price = req.body.price

                new Order(newOrder)
                    .save()
                    .then(order => res.json(order))
                    .catch(err => console.log(err))
            }
        })
})

// $route   GET /orders
// @desc    返回用户的所有订单
// @access  public
router.get("/", (req, res) => {
    return res.json("123")
})

module.exports = router
