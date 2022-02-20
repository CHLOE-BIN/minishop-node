import axios from 'axios'
// import router from './router'
import { Message, Loading } from 'element-ui'

// 代理跨域
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 80000

// Loading动画
let loading
function startLoading() {
    loading = Loading.service({
        lock: true,
        text: "拼命加载中...",
        background: "rgba(0,0,0,0.7)"
    });
}
function endLoading() {
    loading.close()
}

// 接口请求拦截
axios.interceptors.request.use(config => {
    // 加载loading动画
    startLoading()
    // 登陆后每次调用后端接口都要在请求头加上token
    if (sessionStorage.getItem("token")) {
        config.headers.Authorization = sessionStorage.getItem("token")
    }
    return config
}, error => {
    return Promise.reject(error)
});

// 接口响应拦截
axios.interceptors.response.use(response => {
    // 关闭加载动画
    endLoading()
    // 通过response.data得到响应的数据
    // res对象包含了状态码status、数据data、错误信息msg（参考接口规范）
    console.log(response);
    return response.data
}, error => {
    // 关闭加载动画
    endLoading()
    console.log(error.response);
    switch (error.response.status) {
        case 400:
            Message({
                message: error.response.data,
                type: "error",
                duration: 1000
            })
            break;
        default:
            break;
    }
    return Promise.reject(error.response)
})

export default axios