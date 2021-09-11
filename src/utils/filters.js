import moment from 'moment';
import _ from 'lodash';
import store from '@/store';
/**
 * timeFormat方法，生成对应格式的时间
 * @param {String} value [undefined或者时间戳]
 * @param {String} format [需要生成的时间格式]
 */

const timeFormat = (value, format) => {
    if (!value && value !== 0) {
        return '';
    }
    const date = new Date(value);
    let Y = date.getFullYear();
    let M = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    let D = `0${date.getDate()}`.slice(-2);
    let h = `0${date.getHours()}`.slice(-2);
    let m = `0${date.getMinutes()}`.slice(-2);
    let s = `0${date.getSeconds()}`.slice(-2);
    if (format === undefined) {
        return `${Y}-${M}-${D} ${h}:${m}:${s}`;
    } else if (format === 'yyyy-mm-dd') {
        return `${Y}-${M}-${D}`;
    } else if (format === 'yyyy/mm/dd') {
        return `${Y}/${M}/${D}`;
    } else if (format === 'yyyy-mm') {
        return `${Y}-${M}`;
    } else if (format === 'mm-dd') {
        return `${M}-${D}`;
    } else if (format === 'dd') {
        return `${D}`;
    } else if (format === 'yyyy') {
        return `${Y}`;
    } else if (format === 'hh:mm:ss') {
        return `${h}:${m}:${s}`;
    } else if (format === 'hh:mm') {
        return `${h}-${m}`;
    } else if (format === 'mm-dd hh:mm') {
        return `${M}-${D} ${h}:${m}`;
    } else {
        return '';
    }
};

/**
 * 将时间戳转成utc时间字符串
 * @param {string} value 时间戳
 * @param {string} format 格式化字符串
 * @returns
 */
const utcTimeFormat = (value, format) => {
    if (!value && value !== 0) return '';
    return timeFormat(value - 0 + new Date().getTimezoneOffset() * 60000, format);
};

/**
 * 将本地时间字符串转成时间戳
 * @param {string} value 本地时间字符串
 * @returns
 */
const toTimeStamp = (value = '') => {
    if (!value && value !== 0) return '';
    return moment(value, 'YYYY-MM-DD HH:mm:ss').valueOf();
};

/**
 * 本地时间字符串转换成utc时间字符串
 * @param {string} value 本地时间字符串
 * @returns
 */
const toTimeFormat = (value, format) => {
    if (!value && value !== 0) return '';
    return timeFormat(toTimeStamp(value), format);
};

/**
 * @param {date} 标准时间格式:Fri Nov 17 2017 09:26:23 GMT+0800 (中国标准时间)
 * @param {type} 类型
 */
const formatDate = (source, format) => {
    const o = {
        'M+': source.getMonth() + 1, // 月份
        'd+': source.getDate(), // 日
        'H+': source.getHours(), // 小时
        'm+': source.getMinutes(), // 分
        's+': source.getSeconds(), // 秒
        'q+': Math.floor((source.getMonth() + 3) / 3), // 季度
        'f+': source.getMilliseconds(), // 毫秒
    };
    const week = {
        0: '\u65e5',
        1: '\u4e00',
        2: '\u4e8c',
        3: '\u4e09',
        4: '\u56db',
        5: '\u4e94',
        6: '\u516d',
    };
    if (/(y+)/.test(format)) {
        format = format.replace(
            RegExp.$1,
            (source.getFullYear() + '').substr(4 - RegExp.$1.length)
        );
    }
    if (/(E+)/.test(format)) {
        format = format.replace(
            RegExp.$1,
            (RegExp.$1.length > 1 ? (RegExp.$1.length > 2 ? '\u661f\u671f' : '\u5468') : '') +
                week[source.getDay() + '']
        );
    }
    for (let k in o) {
        if (new RegExp('(' + k + ')').test(format)) {
            format = format.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
            );
        }
    }
    return format;
};

/**
 * 数字或字符串最大取多少位小数点长度
 * @param {String | Number} v 值
 * @param {Number} digit 小数点位数
 */
export const numToFixed = (v, digit = 3) => {
    const str = String(v);
    const idx = v !== null ? str.indexOf('.') : 0;
    return str.slice(0, idx !== -1 ? idx + (digit ? digit + 1 : 0) : str.length);
};

/**
 * @param {number}
 * @param {number }
 *   数字 转 num位逗号分开
 *   point 小数点位数
 */
const getSplitNum = (data, point) => {
    if ((!data && Number(data) !== 0) || isNaN(data)) {
        return 0;
    }
    let num = data;
    if (point) {
        num = Number(numToFixed(data, point)) + 0; // 直接截取，不进行四舍五入
    }
    // 小数点前/\d+(?=\.\d+)/
    return `${num}`.replace(/\B(?=(?:\d{3})+(?!\d))/g, '$&,');
};

// 获取当前日期的前后n天的日期
const getDateStr = (AddDayCount = 0, hhmmss = '00:00:00') => {
    const dd = new Date();
    dd.setDate(dd.getDate() + AddDayCount);
    const y = dd.getFullYear();
    const m = dd.getMonth() + 1;
    const d = dd.getDate();
    return Date.parse(new Date(`${y}-${m < 10 ? '0' + m : m}-${d} ${hhmmss}`));
};

// 时分秒转换秒
const getSecond = (time = '00:00:00') => {
    if (!time) return 0;
    const arr = time.split(':');
    const hour = arr[0];
    const min = arr[1];
    const sec = arr[2];
    return Number(hour * 3600) + Number(min * 60) + Number(sec);
};

/**
 * @name: 乘100
 * @test: test font
 * @msg:
 * @param {type} number || string
 * @return: string
 */

const accMul = (num) => {
    if (!num && num !== 0) return 0;
    num = Number(num);
    let m = 0,
        s1 = num.toString(),
        s2 = 100;
    try {
        m += s1.split('.')[1].length;
    } catch (e) {}
    return (Number(s1.replace('.', '')) * 100) / Math.pow(10, m);
};

/**
 * 值如果为null | undefined的话返回占位符字符串
 * @param {*} value
 * @param {String} str
 */
const emptySlot = (value, str = '-') => {
    return value !== null && value !== undefined ? value : str;
};

/**
 * @param {number} timestamp 时间戳
 *    将结束日期时间戳的时分秒修改为23:59:59秒
 */
const formatEndTime = (timestamp, hhmmss = '23:59:59') => {
    if (!timestamp) {
        return timestamp;
    }
    const day = timeFormat(timestamp, 'yyyy-mm-dd');
    return new Date(`${day} ${hhmmss}`).valueOf();
};

const paramsFormat = (params) => {
    return `?${Object.keys(params)
        .map((n) => `${n}=${params[n]}`)
        .join('&')}`;
};

const fullUrl = (url = '') => {
    if (!url) return '';
    //如果是数组则需要遍历
    if (_.isArray(url)) {
        return url.map((item) => fullUrl(item));
    }

    //检查一下是否包含http://或者https://, 如果存在则表明已经是全路径了
    if (url.match(/^\s*https?:\/\//)) {
        return url;
    }
    return `${store.state.siteConfig.IMAGE_HOST}/${url}`;
};
export {
    timeFormat,
    utcTimeFormat,
    toTimeStamp,
    toTimeFormat,
    formatDate,
    getSplitNum,
    getDateStr,
    getSecond,
    accMul,
    emptySlot,
    formatEndTime,
    paramsFormat,
    fullUrl,
};
