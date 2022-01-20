// 用户登录和注册接口
const express = require("express")
const router = express.Router()
// 密码加密
const bcrypt = require("bcrypt")
// 获取token
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys")
// 验证token
const passport = require("passport")

// 引入User.js
const User = require("../../models/User");

// $route   GET /users/test
// @desc    返回请求的json数据 用于测试
// @access  public
router.get("/test", (req, res) => {
    res.json({ msg: "login works" })
})


// $route   POST /users/register
// @desc    返回用户注册的json数据
// @access  public
router.post("/register", (req, res) => {
    // console.log(req.body);
    // 查询邮箱是否存在: 若不存在则创建新用户
    User.findOne({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(400).json({ email: "邮箱已注册" })
            } else {
                const newUser = new User({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email
                })

                // 密码加密
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err
                        // 将hash值赋给密码进行加密
                        newUser.password = hash
                        // 存储数据
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    });
                });
            }
        })
})

// $route   POST /users/login
// @desc    返回用户登录的token jwt passport
// @access  public
router.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    User.findOne({ username })
        .then(user => {
            if (!user) {
                return res.status(404).json({ msg: "用户不存在" })
            }

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        const rule = { id: user.id, username: user.username }
                        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            if (err) throw err
                            res.json({
                                success: true,
                                token: "Bearer " + token
                            })
                        })
                        // res.json({ msg: "success" })
                    } else {
                        return res.status(400).json({ msg: "密码错误" })
                    }
                })
        })
})

// $route   GET /users/current
// @desc    返回 current user
// @access  private
router.get("/current", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user.id,
        username: req.user.username
    })
})

module.exports = router

// 1. 引入router
// 2. 设计接口: router.get("url")
// 3. export出去
// 4. 在server.js中引入users并使用: app.uss("/api/users", users)
// 5. 创建模型存储数据: 在models文件夹

// post 需要插件body-parser 在server.js中引入 使用body-parser中间件
// 密码加密 需要插件bcrypt

// 获取token 需要jsonwebtoken插件 引入后使用jwt.sign("规则","加密名字","到期时间","箭头函数")
// 加密名字在 /config/keys.js 中写

// 验证token 需要passport和passport-jwt插件 在server.js中引入 并初始化 在passport.js中配置