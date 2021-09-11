import axios from 'axios';
import Message from '../components/ElMessage';
import router from '../router';
import store from '../store';
import requestHandle from './requestHandle';
import configJs from '../utils/configJs';
import Qs from 'qs';
let baseURL = '';
let callURL = '';
if (process.env.NODE_ENV == 'development') {
    baseURL = '/ops';
    //callURL = `${location.origin}/call`;
} else if (process.env.NODE_ENV == 'production') {
    baseURL = '/hqlive';
    //callURL = `${location.origin}/call`;
}
export { baseURL };
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 15000;


const { requestBefore, requestAfter } = requestHandle(axios);

const handleError = (err) => {
    if (axios.isCancel(err)) {
        return;
    }
    let status = err.status || err.code;
    const errMsg = err.msg || '未知错误';
    Message.closeAll();
    switch (status) {
        // 1101: token无效或已过期
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 1101:
        case 1102:
            configJs.removeStorage('access_token');
            configJs.removeStorage('user_info');
            store.commit('setUserInfo', {});
            Message({
                message: '登录过期，请重新登录',
                type: 'warning',
                duration: 1000,
            });
            if (router.currentRoute.path != '/login') {
                router.replace({
                    path: '/login',
                    query: {
                        redirect: router.currentRoute.fullPath,
                    },
                });
            }
            break;
        case 301:
            Message({
                message: '资源(网页等)被永久转移到其它URL',
                type: 'error',
            });
            break;
        case 404:
            Message({
                message: '请求的资源(网页等)不存在',
                type: 'error',
            });
            break;
        case 500:
            Message({
                message: '内部服务器错误',
                type: 'error',
            });
            break;
        case -1:
            Message({
                message: '未知系统异常',
                type: 'error',
            });
            break;
        case -2:
            Message({
                message: '内部系统异常',
                type: 'error',
            });
            break;
        case -3:
            Message({
                message: 'JSON解析错误',
                type: 'error',
            });
            break;
        case -5:
            Message({
                message: 'HTTP应答网络错误',
                type: 'error',
            });
            break;
        case -6:
            Message({
                message: 'HTTP请求网络错误',
                type: 'error',
            });
            break;
        case -7:
            Message({
                message: 'HTTP返回失败结果',
                type: 'error',
            });
            break;
        case -8:
            Message({
                message: 'HTTP请求不支持',
                type: 'error',
            });
            break;
        case -9:
            Message({
                message: 'HTTP连接超时',
                type: 'error',
            });
            break;
        case -10:
            Message({
                message: 'HTTP写入超时',
                type: 'error',
            });
            break;
        case -11:
            Message({
                message: 'HTTP读取超时',
                type: 'error',
            });
            break;
        case -12:
            Message({
                message: 'HTTP URL地址错误',
                type: 'error',
            });
            break;
        case -13:
            Message({
                message: 'HTTP IO异常',
                type: 'error',
            });
            break;
        case 202:
            Message({
                message: errMsg || '操作失败',
                type: 'error',
            });
            break;

        // 其他错误，直接抛出错误提示
        default:
            if (errMsg === '请求超时' || status < 0) {
            } else {
                Message({
                    message: errMsg,
                    type: 'error',
                });
            }
    }
};

//请求拦截器
// axios.interceptors.request.use(
//     (config) => {
//         //获取token
//         let token = configJs.getStorage('access_token');
//         if (token && config.url != '/hqlive-auth/oauth/token') {
//             config.headers.Authorization = 'bearer ' + token;
//         } else {
//             config.headers.Authorization = 'Basic Y2xpZW50OjEyMzQ1Ng=='; // admin 123456
//         }
//         config.headers.Pragma = 'no-cache';
//         config.headers['Cache-Control'] = 'no-cache';
//         config.headers['device'] = 1;
//         return requestBefore(config);
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// 响应拦截器
axios.interceptors.response.use(
    (response) => {
        requestAfter(response.config);
        // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
        // 否则的话抛出错误
        if (response.status === 200) {
            if (response.data.code === 200) {
                return Promise.resolve(response);
            } else {
                return Promise.reject(response.data);
            }
        } else {
            return Promise.reject(response);
        }
    },
    (error) => {
        if (error.response && error.response.status) {
            return Promise.reject(error);
        } else {
            if (
                error.code === 'ECONNABORTED' &&
                error.message &&
                error.message.indexOf('timeout') !== -1
            ) {
                error.msg = '请求超时';
            } else {
                error.msg = '服务器错误';
            }
            return Promise.reject(error);
        }
    }
);

export default {
    /**
     * get方法，对应get请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     * @param {Object} options [?其它配置参数]
     */
    get: function (url, params, options = {}) {
        const { handleErrorFlag = true } = options;
        return new Promise((resolve, reject) => {
            axios
                .get(url, {
                    params: params,
                })
                .then((res) => {
                    resolve(res.data.data);
                })
                .catch((err) => {
                    handleErrorFlag && handleError(err);
                    if (!axios.isCancel(err)) {
                        reject(err);
                    }
                });
        });
    },
    gets: function (url, params, options = {}) {
        const { handleErrorFlag = true } = options;
        return new Promise((resolve, reject) => {
            axios
                .get(url, {
                    params: params,
                })
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    handleErrorFlag && handleError(err);
                    if (!axios.isCancel(err)) {
                        reject(err);
                    }
                });
        });
    },
    /**
     * post方法，对应post请求
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     * @param {Object} options [?其它配置参数]
     */
    post: function (url, params, options = {}) {
        const { handleErrorFlag = true } = options;
        return new Promise((resolve, reject) => {
            axios
                .post(url, params)
                .then((res) => {
                    resolve(res.data.data);
                })
                .catch((err) => {
                    handleErrorFlag && handleError(err);
                    if (!axios.isCancel(err)) {
                        reject(err);
                    }
                });
        });
    },
    posts: function (url, params, options = {}) {
        const { handleErrorFlag = true } = options;
        return new Promise((resolve, reject) => {
            axios
                .post(url, params)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    handleErrorFlag && handleError(err);
                    if (!axios.isCancel(err)) {
                        reject(err);
                    }
                });
        });
    },
    /**
     * upload方法，上传文件
     * @param {String} url [请求的url地址]
     * @param {Object} params [请求时携带的参数]
     * @param {Object} options [?其它配置参数]
     */
    upload: function (url, params, options = {}) {
        const { handleErrorFlag = true } = options;
        return new Promise((resolve, reject) => {
            axios
                .post(url, params, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((res) => {
                    resolve(res.data.data);
                })
                .catch((err) => {
                    handleErrorFlag && handleError(err);
                    if (!axios.isCancel(err)) {
                        reject(err);
                    }
                });
        });
    },
    request({ url, method = 'get', data, ...args }, options = {}) {
        const { handleErrorFlag = true } = options;
        return new Promise((resolve, reject) => {
            axios({
                url,
                method,
                data,
                ...args,
            })
                .then((res) => {
                    resolve(res.data.data);
                })
                .catch((err) => {
                    handleErrorFlag && handleError(err);
                    if (!axios.isCancel(err)) {
                        reject(err);
                    }
                });
        });
    },
    baseURL: axios.defaults.baseURL,
    callURL: callURL,
};
