// 引入express框架, 返回一个方法
const express = require("express")
// 通过express方法创建网站服务器, 即实例化express
const app = express();

// 引入mongoose
const mongoose = require("mongoose")

// 引入POST所需的body-parser 使用body-parser中间件
const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 引入users的api
const users = require("./routes/api/users")

// 连接数据库: 从./config/keys.js中获取URI
const db = require("./config/keys").mongoURI
mongoose.connect(db)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(err => { console.log(err); })

//设置路由, 使得在浏览器中可以访问
app.get("/", (req, res) => {
    res.send("Hello World!")
})

// 使用routes: 当浏览器访问 /api/users的时候会使用上面引入的users的api
app.use("/api/users", users)

// 监听端口
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

