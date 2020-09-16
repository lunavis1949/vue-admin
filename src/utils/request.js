import axios from 'axios';

//创建axios 赋给变量service
const BASEURL = process.env.NODE_ENV === 'production' ? 'http://test123.com/api' : 'devapi';
const service = axios.create({
    // baseURL: 'http://test123.com/api',
    baseURL: BASEURL,   //http://192.168.0.105:8080/devapi/getSms  相当于 http://test123.com/api/getSms
    timeout: 15000,
    headers: {'Content-Type':'application/x-www-form-urlencoded'},
})

// console.log(process.env.VUE_APP_ACC)

// 添加请求拦截器
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //根据业务加入请求头数据
    // config.headers['token'] = getToekn();
    // config.headers['userName'] = getUserName();

    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    return response;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default service;