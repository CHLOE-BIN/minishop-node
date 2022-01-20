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

// 引入验证token所需的passport 在连接数据库后初始化并配置
const passport = require("passport")

// 引入users的api
const users = require("./routes/api/users")
// 引入products的api
const products = require("./routes/api/products")
// 引入ads的api
const ads = require("./routes/api/ads")

// 连接数据库: 从./config/keys.js中获取URI
const db = require("./config/keys").mongoURI
mongoose.connect(db)
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch(err => { console.log(err); })

// 初始化passport 并传入到passport.js中 实现代码分离
app.use(passport.initialize());
require("./config/passport")(passport)

// //设置路由, 使得在浏览器中可以访问
// app.get("/", (req, res) => {
//     res.send("Hello World!")
// })

// 使用routes: 当浏览器访问 /users的时候会使用上面引入的users的api
// url自动拼接为 http://localhost:5000/users/
app.use("/users", users)
// url自动拼接为 http://localhost:5000/products/
app.use("/products", products)
// url自动拼接为 http://localhost:5000/ads/
app.use("/ads", ads)

// 监听端口
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

