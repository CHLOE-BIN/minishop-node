// 订单管理接口
const express = require("express")
const router = express.Router()
// 引入User.js
const Order = require("../../models/Order");

// $route   POST /orders/add
// @desc    返回添加的订单
// @access  public
router.post("/add", (req, res) => {
    const newOrder = {}
        if (req.body.orderId) newOrder.orderId = req.body.orderId
        if (req.body.userId) newOrder.userId = req.body.userId
        if (req.body.productList) newOrder.productList = req.body.productList
        if (req.body.name) newOrder.name = req.body.name
        if (req.body.phone) newOrder.phone = req.body.phone
        if (req.body.address) newOrder.address = req.body.address
        if (req.body.price) newOrder.price = req.body.price
        newOrder.is_pay = false

        new Order(newOrder)
            .save()
            .then(order => res.json(order))
            .catch(err => console.log(err))
})

// $route   GET /orders
// @desc    返回用户的所有订单
// @access  public
router.get("/", (req, res) => {
    Order.find({ userId: req.query.userId })
        .then(order => {
            return res.json(order)
        })
})

// $route   GET /orders/pay
// @desc    返回当前用户需要支付的订单信息
// @access  public
router.get("/pay", (req, res) => {
    Order.findOne({ orderId: req.query.orderId })
        .then(order => {
            if (!order) {
                return res.status(404).json("没有该订单")
            } else {
                return res.status(200).json(order)
            }
        })
        .catch(err => console.log(err))
})

// $route   GET /orders/list
// @desc    返回已经支付的订单
// @access  public
router.get("/list", (req, res) => {
    Order.findOne({ orderId: req.query.orderId })
        .then(order => {
            if (!order) {
                return res.status(404).json("没有该订单")
            } else {
                Order.findOneAndUpdate(
                    { orderId: req.query.orderId },
                    { $set: {is_pay: true} },
                    { new: true })
                    .then(order => {
                        res.json(order)
                    })
            }
        })
        .catch(err => console.log(err))
})

// $route   DELETE /products/delete/:productId
// @desc    返回取消后剩余的订单
// @access  public
router.delete("/delete", (req, res) => {
    Order.findOneAndRemove({ orderId: req.query.orderId })
        .then(() => {
            Order.find()
                .then(rest => {
                    res.json(rest)
                })
        })
        .catch(() => res.status(404).json("删除失败"))
})


module.exports = router
