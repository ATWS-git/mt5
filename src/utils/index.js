import moment, { now } from 'moment';
import md5 from 'md5';

/**
 * @param {number}
 * @param {number }
 *   随机数 包括 m,n
 */
export const randomNum = (min, max) => {
    const num = Math.round(Math.random() * (max - min) + min);
    return num;
};

/**
 * @param {number}
 * @param {number }
 *   可重复随机数  包括 m,n
 *   返回len长度数组
 *   isRepeat为1可重复 为0不可重复
 */
export const randomArr = (len = 10, min = 0, max = 10, isRepeat = 1) => {
    const hash = [];
    while (hash.length < len) {
        const num = randomNum(min, max);
        if (isRepeat === 0) {
            if (hash.indexOf(num) === -1) {
                hash.push(num);
            }
        } else {
            hash.push(num);
        }
    }
    return hash;
};

// 计算数组和值
export const sum = (arr) => {
    return arr.reduce((prev, curr, idx, arr) => {
        return prev + curr;
    });
};

// 乘100
export const accMul = (num) => {
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

export const accAdd = (num1, num2) => {
    var r1, r2, m;
    try {
        r1 = num1.toString().split('.')[1].length;
    } catch (e) {
        r1 = 0;
    }
    try {
        r2 = num2.toString().split('.')[1].length;
    } catch (e) {
        r2 = 0;
    }
    m = Math.pow(10, Math.max(r1, r2));
    let val = Math.round(num1 * m + num2 * m) / m;
    return val;
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
 * 加法运算, 避免小数精度损失
 * @param {*} num1
 * @param {*} num2
 */
export const numAdd = (a, b) => {
    const num1 = a || 0;
    const num2 = b || 0;
    let num1Len;
    let num2Len;
    try {
        num1Len = (num1.toString().split('.')[1] || '').length;
        num2Len = (num2.toString().split('.')[1] || '').length;
    } catch (err) {}
    const m = Math.pow(10, Math.max(num1Len, num2Len));
    const n = num1Len >= num2Len ? num1Len : num2Len;
    return Number((Math.round(num1 * m + num2 * m) / m).toFixed(n));
};
/**
 * 减法运算, 避免小数精度损失
 * @param {*} num1
 * @param {*} num2
 */
export const numSubtract = (a, b) => {
    const num1 = a || 0;
    const num2 = b || 0;
    let num1Len;
    let num2Len;
    try {
        num1Len = (num1.toString().split('.')[1] || '').length;
        num2Len = (num2.toString().split('.')[1] || '').length;
    } catch (err) {}
    const m = Math.pow(10, Math.max(num1Len, num2Len));
    const n = num1Len >= num2Len ? num1Len : num2Len;
    return Number((Math.round(num1 * m - num2 * m) / m).toFixed(n));
};
/**
 * 乘法运算, 避免小数精度损失
 * @param {*} num1
 * @param {*} num2
 */
export const numMulti = (a, b) => {
    const num1 = a || 0;
    const num2 = b || 0;
    let baseNum = 0;
    try {
        const num1Len = (num1.toString().split('.')[1] || '').length;
        const num2Len = (num2.toString().split('.')[1] || '').length;
        baseNum = num1Len + num2Len;
    } catch (err) {}
    return (
        (Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', ''))) /
        Math.pow(10, baseNum)
    );
};

/**
 * 如果当前时间没到早上7点的话就算是昨天
 * @param {string} todayFormatStr 时间格式化字符串
 * @returns {Time}
 */
export const pageTimeInit = (todayFormatStr = 'YYYY-MM-DD 07:00:00') => {
    const isTodayFlag = moment().isBefore(moment(moment().format(todayFormatStr)));
    let date = [
        moment(moment().format(moment.HTML5_FMT.DATE)),
        moment(moment().format(moment.HTML5_FMT.DATE)),
    ];
    if (isTodayFlag) {
        date = [
            moment(moment().format(moment.HTML5_FMT.DATE)).subtract(1, 'days'),
            moment(moment().format(moment.HTML5_FMT.DATE)).subtract(1, 'days'),
        ];
    }
    return date;
};

/**
 * @param {number}
 * @param {number }
 *   随机数
 */
export const randNum = (m, n) => {
    const num = Math.floor(Math.random() * (m - n) + n);
    return num;
};

/**
 * @param {number}
 * @param {number }
 *   随机生成一个字母
 */
export const codeAt = (arr) => {
    let val = String.fromCharCode(Math.floor(Math.random() * 26) + 'a'.charCodeAt(0));
    if (arr && arr.length > 0) {
        while (arr.includes(val)) {
            val = String.fromCharCode(Math.floor(Math.random() * 26) + 'a'.charCodeAt(0));
        }
    }
    return val;
};

// 将域名截取为两部分 协议+域名
export const repUrl = (url) => {
    let urlType = 'http://';
    let urlBase = url || '';
    if (urlBase.indexOf('https://') > -1) {
        urlType = 'https://';
    }
    urlBase = urlBase.replace(urlType, '');
    return {
        url: urlBase,
        urlType,
    };
};

/**
 * timeFormat方法，生成对应格式的时间
 * @param {String} value [undefined或者时间戳]
 * @param {String} format [需要生成的时间格式]
 */
export const timeFormat = (value, format) => {
    let date = 0;
    if (value) {
        date = new Date(value);
    } else {
        date = new Date();
    }
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
    } else if (format === 'yyyy-mm') {
        return `${Y}-${M}`;
    } else if (format === 'mm-dd') {
        return `${M}-${D}`;
    } else if (format === 'yyyy') {
        return `${Y}`;
    } else if (format === 'hh:mm') {
        return `${h}-${m}`;
    } else {
        return '';
    }
};

//计算时间类型 1.今日 2.昨日 3.本周 4.上周 5.本月 6.上月 7.指定范围查询
export const timeType = ([startTime, endTime]) => {
    let type1 = setTimeRange(1);
    let type2 = setTimeRange(2);
    let type3 = setTimeRange(3);
    let type4 = setTimeRange(4);
    let type5 = setTimeRange(5);
    let type6 = setTimeRange(6);
    if (
        startTime >= type1[0] &&
        type1[1] >= startTime &&
        endTime >= type1[0] &&
        type1[1] >= endTime
    ) {
        return 1;
    }

    if (
        startTime >= type2[0] &&
        type2[1] >= startTime &&
        endTime >= type2[0] &&
        type2[1] >= endTime
    ) {
        return 2;
    }

    if (
        startTime >= type3[0] &&
        type3[1] >= startTime &&
        endTime >= type3[0] &&
        type3[1] >= endTime
    ) {
        return 3;
    }

    if (
        startTime >= type4[0] &&
        type4[1] >= startTime &&
        endTime >= type4[0] &&
        type4[1] >= endTime
    ) {
        return 4;
    }

    if (
        startTime >= type5[0] &&
        type5[1] >= startTime &&
        endTime >= type5[0] &&
        type5[1] >= endTime
    ) {
        return 5;
    }

    if (
        startTime >= type6[0] &&
        type6[1] >= startTime &&
        endTime >= type6[0] &&
        type6[1] >= endTime
    ) {
        return 6;
    }

    return 7;
};

export const setTimeRange = (v) => {
    var fmt = 'YYYY-MM-DD HH:mm';
    var now = new Date(Number(new Date()) - 25200000);
    var end = new Date(Number(new Date()) - 25200000);
    if (v == 0) {
    } else if (v == 1) {
    } else if (v == 2) {
        //昨日
        now.setDate(now.getDate() - 1);
        end.setDate(end.getDate() - 1);
    } else if (v == 3) {
        //本周
        var nowDayOfWeek = now.getDay(); //今天本周的第几天
        if (nowDayOfWeek == 0) {
            nowDayOfWeek = 6; //周日
        } else {
            nowDayOfWeek = nowDayOfWeek - 1;
        }
        now.setDate(now.getDate() - nowDayOfWeek);
        end.setDate(now.getDate() + 6);
    } else if (v == 4) {
        //上周
        var nowDayOfWeek = now.getDay(); //今天本周的第几天
        if (nowDayOfWeek == 0) {
            nowDayOfWeek = 6; //周日
        } else {
            nowDayOfWeek = nowDayOfWeek - 1;
        }

        now.setDate(now.getDate() - nowDayOfWeek - 7);
        end.setDate(now.getDate() + 6);
    } else if (v == 5) {
        //本月
        now.setDate(1);

        var nextMonth = end.getMonth() + 1;
        var nextMonthFirstDay = new Date(end.getFullYear(), nextMonth, 1);
        var oneDay = 1000 * 60 * 60 * 24;
        end = new Date(nextMonthFirstDay - oneDay);
    } else if (v == 6) {
        //上月
        var nextMonth = now.getMonth() - 1;
        now.setMonth(nextMonth);
        now.setDate(1);

        nextMonth = nextMonth + 1;
        var nextMonthFirstDay = new Date(end.getFullYear(), nextMonth, 1);
        var oneDay = 1000 * 60 * 60 * 24;
        end = new Date(nextMonthFirstDay - oneDay);
    }

    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    now.setMilliseconds(0);
    end.setHours(23);
    end.setMinutes(59);
    end.setSeconds(59);
    end.setMilliseconds(999);
    return [Number(now), Number(end)];
};

export function numberSliceHandler(v = '', decimal = 0) {
    if (isNaN(v) && v === null) return v;
    let str = String(v);
    const reg = `/^(\\-?\\d*)(\\.?\\d{${decimal}}).*$/`;
    return +str.replace(eval(reg), '$1$2');
}

export function encryption(str, def) {
    return str ? md5(md5(str) + 'hqsj.com') : def;
}
