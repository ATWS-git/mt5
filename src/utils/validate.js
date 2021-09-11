import _ from 'lodash';

// const validateDomain = (rule, value, callback) => {
//     const reg = /[\u4E00-\u9FA5]/g;
//     if (!value) {
//         return callback(new Error('请输入域名'));
//     } else if (reg.test(value)) {
//         return callback(new Error('域名不能包含中文'));
//     } else {
//         callback();
//     }
// };

const validatePass6 = (rule, value, callback, oldPw, options) => {
    const reg = /^[0-9A-Za-z]{6,16}$/;
    if (!value) {
        return callback(new Error('请输入密码'));
    } else if (!reg.test(value)) {
        return callback(new Error('请输入6-16位数字或字母'));
    } else if (oldPw && oldPw === value) {
        return callback(new Error('新密码不能与旧密码相同'));
    } else {
        callback();
    }
};

const validatePass = (rule, value, callback, oldPw, options) => {
    const reg = /^(?=.*?[a-zA-Z])(?=.*?[0-9])[0-9a-zA-Z\w]{8,16}$/;
    if (!value) {
        return callback(new Error('请输入密码'));
    } else if (!reg.test(value)) {
        return callback(new Error('请输入8-16位数字+字母'));
    } else if (oldPw && oldPw === value) {
        return callback(new Error('新密码不能与旧密码相同'));
    } else {
        callback();
    }
};

// // 验证密码再次输入
// const validateConfirmPassword = (rule, value, callback, password) => {
//     console.log(rule, value, callback, password);
//     //确认密码验证
//     if (value === '') {
//         return callback(new Error('请再次输入密码'));
//     } else if (value !== password) {
//         return callback(new Error('两次密码输入不一致'));
//     } else {
//         callback();
//     }
// };

// // 验证日期
// const validateConfirmDateRange = (rule, value, callback, beginTime, endTime) => {
//     //确认密码验证
//     if (!beginTime && !endTime) {
//         return callback(new Error('请选择日期'));
//     } else if (!beginTime && endTime) {
//         return callback(new Error('请选择开始日期'));
//     } else if (beginTime && !endTime) {
//         return callback(new Error('请选择结束日期'));
//     } else if (beginTime > endTime) {
//         return callback(new Error('开始日期不能大于结束日期'));
//     } else {
//         callback();
//     }
// };

// /**
//  * 密码格式验证 + 二次验证 格式: 6-16位数字或字母
//  * @param {*} prePasswd 首次输入的密码
//  * @param {*} rule
//  * @param {*} value
//  * @param {*} callback
//  * @param {*} {min: 6, max: 16}
//  */
// export function passwordValidator(rule, value, callback, ...args) {
//     const { prePasswd, min = 6, max = 16 } = args[args.length - 1];
//     try {
//         const desc = `${min}-${max}位字母或数字`;
//         if (!value) {
//             return callback(`请${prePasswd ? '再次' : ''}输入${desc}密码`);
//         }
//         if (prePasswd && value !== prePasswd) {
//             return callback('两次密码输入不一致');
//         }
//         const reg = `/^[0-9A-Za-z]{${min},${max}}$/g`;
//         if (!eval(reg).test(value)) {
//             return callback(`密码格式应为${desc}`);
//         }
//     } catch (err) {
//         return callback(err);
//     }
//     callback();
// }

// /**
//  * 验证账号 格式: 4-16位数字或字母
//  * @param {*} rule
//  * @param {*} value
//  * @param {*} callback
//  * @param {*} {min: 4, max: 16, callBackFunc: 执行最后的回调, showMessage: 是否显示错误提示信息}
//  */
// export function accountValidator(rule, value, callback, ...args) {
//     const { min = 4, max = 16, showMessage = true, callBackFunc } = args[args.length - 1];
//     try {
//         if (showMessage) {
//             const desc = `${min}-${max}位字母或数字`;
//             if (!value) {
//                 return callback(`请输入${desc}`);
//             }
//             const reg = `/^[0-9A-Za-z]{${min},${max}}$/g`;
//             if (!eval(reg).test(value)) {
//                 return callback(`格式应为${desc}`);
//             }
//         }
//         if (callBackFunc) {
//             const { field } = rule;
//             if (value) {
//                 const newVal = value.replace(/[^0-9A-Za-z]/g, '');
//                 callBackFunc(field, newVal);
//             }
//         }
//     } catch (err) {
//         return callback(err);
//     }
//     callback();
// }

// /**
//  * 验证用户名称 格式: ${min}-${max}位数字,字母或中文
//  * @param {*} rule
//  * @param {*} value
//  * @param {*} callback
//  * @param {*} {min: 0, max: 100}
//  */
// export function nameValidator(rule, value, callback, ...args) {
//     const { min = 0, max = 100 } = args[args.length - 1];
//     try {
//         const reg = `/^[0-9A-Za-z\u4e00-\u9fa5]{${min},${max}}$/g`;
//         if (!eval(reg).test(value)) {
//             return callback(`格式应为${min}-${max}位数字,字母或中文`);
//         }
//     } catch (err) {
//         return callback(err);
//     }
//     callback();
// }

// /**
//  * 表格筛选验证 格式: 数字
//  * @param {*} rule
//  * @param {*} value
//  * @param {*} callback
//  * @param {*} {min, max, callBackFunc: 执行最后的回调, showMessage: 是否显示错误提示信息}
//  */
// export function numberFiltersValidator(rule, value, callback, ...args) {
//     const { min, max, showMessage = true, callBackFunc } = args[args.length - 1];
//     try {
//         if (showMessage) {
//         }
//         if (callBackFunc) {
//             const { field } = rule;
//             if (value) {
//                 const newVal = String(value).replace(/[^0-9]/g, '');
//                 callBackFunc(field, newVal);
//             }
//         }
//     } catch (err) {
//         return callback(err);
//     }
//     callback();
// }

// /**
//  * 表格筛选验证 格式: IP
//  * @param {*} rule
//  * @param {*} value
//  * @param {*} callback
//  * @param {*} {min, max, callBackFunc: 执行最后的回调, showMessage: 是否显示错误提示信息}
//  */
// export function ipValidator(rule, value, callback, ...args) {
//     const { min, max, showMessage = true, callBackFunc } = args[args.length - 1];
//     try {
//         if (showMessage) {
//         }
//         if (callBackFunc) {
//             const { field } = rule;
//             if (value) {
//                 const newVal = value.replace(/[^0-9\.]/g, '');
//                 callBackFunc(field, newVal);
//             }
//         }
//     } catch (err) {
//         return callback(err);
//     }
//     callback();
// }

// /**
//  * 验证账号 格式: 4-10位数字+字母
//  * @param {*} rule
//  * @param {*} value
//  * @param {*} callback
//  * @param {*}
//  */
// const validateUsername = (rule, value, callback) => {
//     if (!value) {
//         callback(new Error('请输入账号'));
//     }
//     if (!validAccountName(value)) {
//         callback(new Error('账号为4-10位字母+数字'));
//     } else {
//         callback();
//     }
// };

// function validAccountName(str) {
//     return /^(?=.*?[a-zA-Z])(?=.*?[0-9])[0-9a-zA-Z\w]{4,10}$/.test(str);
// }

/**
 * 验证数字 格式: min-max
 * @param {*} rule
 * @param {*} value
 * @param {*} callback
 * @param {*}
 */
const validateInteger = ({ min, max }, value, callback) => {
    if (!value) {
        callback();
    }
    //判断是否为数字
    if (!/^[\-]?\d+$/.test(value)) {
        callback(new Error(`请输入整数`));
    }
    //判断是否在范围内
    if (min !== undefined && max !== undefined && !_.inRange(value - 0, min, max)) {
        callback(new Error(`请输入在范围${min}-${max}内的整数`));
    } else if (min !== undefined && max == undefined && value - 0 < min) {
        callback(new Error(`请输入大于等于${min}的整数`));
    }
    callback();
};

export default {
    // validateDomain,
    validatePass,
    validatePass6,
    // validateConfirmPassword,
    // validateConfirmDateRange,
    // validateUsername,
    validateInteger,
};
