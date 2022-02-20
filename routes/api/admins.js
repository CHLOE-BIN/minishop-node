// 管理员登录和注册接口
const express = require("express")
const router = express.Router()
// 密码加密
const bcrypt = require("bcrypt")
// 获取token
const jwt = require('jsonwebtoken');
const keys = require("../../config/keys")

// 引入Admin.js
const Admin = require("../../models/Admin");

// $route   POST /admins/register
// @desc    返回用户注册的json数据
// @access  public
router.post("/register", (req, res) => {
    // console.log(req.body);
    // 查询邮箱是否存在: 若不存在则创建新用户
    Admin.findOne({ email: req.body.email })
        .then((admin) => {
            if (admin) {
                return res.status(400).json("邮箱已注册")
            } else {
                const newAdmin = new Admin({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email
                })

                // 密码加密
                bcrypt.genSalt(10, function (err, salt) {
                    bcrypt.hash(newAdmin.password, salt, (err, hash) => {
                        if (err) throw err
                        // 将hash值赋给密码进行加密
                        newAdmin.password = hash
                        // 存储数据
                        newAdmin.save()
                            .then(admin => res.json(admin))
                            .catch(err => console.log(err))
                    });
                });
            }
        })
})

// $route   POST /admins/login
// @desc    返回用户登录的token jwt passport
// @access  public
router.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    Admin.findOne({ username })
        .then(admin => {
            if (!admin) {
                return res.status(400).json("用户不存在")
            }
            // 检验密码是否正确
            bcrypt.compare(password, admin.password)
                .then(isMatch => {
                    if (isMatch) {
                        const rule = { id: admin.id, username: admin.username }
                        jwt.sign(rule, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
                            if (err) throw err
                            res.json({
                                success: true,
                                token: "Bearer " + token,
                                username,
                            })
                        })
                        // res.json({ msg: "success" })
                    } else {
                        return res.status(400).json("密码错误")
                    }
                })
        })
})


module.exports = router