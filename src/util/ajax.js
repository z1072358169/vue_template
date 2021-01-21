/**
 * axios全局配置
 * TODO: 拦截器全局配置，根据实际情况修改
 */
import axios from 'axios';
import {
    Message
} from 'element-ui';
import Auth from '@/util/auth';
import store from '../store';


// 超时设置
const service = axios.create({
    // 请求超时时间
    timeout: 5000,
});

// baseURL
service.defaults.baseURL = store.state.axioxurl;

// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为token
service.interceptors.request.use(
    (config) => {
        if (config.token === false) {
            return config;
        } else {
            if (Auth.isLogin()) {
                config.headers.token = `Bearer${store.state.token}`;
                return config;
            } else {
                store.dispatch('logout').then(() => {
                    window.location.href = "#/login"
                })
            }
        }
    },
    (err) => {
        return Promise.reject(err);
    }
);

// http response 拦截器
// 针对响应代码确认跳转到对应页面
service.interceptors.response.use(
    (response) => {
        return Promise.resolve(response.data);
    },
    (error) => {
        if (axios.isCancel(error)) {
            return Promise.reject("Ajax Abort: 该请求在axios拦截器中被中断")
        } else if (error.response) {
            Message({
                showClose: true,
                message: `服务器错误！错误代码：${error.response.status}`,
                type: 'error',
                duration: 2000
            })
            return Promise.reject(error.response.data)
        } else {
            Message({
                showClose: true,
                message: '无法连接到服务器，请检查网络！',
                type: 'error',
                duration: 2000
            })
            return Promise.reject(error)
        }
    }
);

export default service;