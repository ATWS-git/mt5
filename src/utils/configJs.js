// 随机数
let randomToken = '';

// 存储随机数
const setRandomToken = (val) => {
    randomToken = val;
};

// 获取随机数
const getRandomToken = () => {
    return randomToken;
};

const Storager = window.localStorage;

const setStorage = (token_name, val) => {
    Storager.setItem(`${getRandomToken()}_${token_name}`, val);
};

const getStorage = (token_name) => {
    return Storager.getItem(`${getRandomToken()}_${token_name}`);
};

const removeStorage = (token_name) => {
    return Storager.removeItem(`${getRandomToken()}_${token_name}`);
};

const clearStorage = () => {
    Storager.clear();
};

export default {
    setRandomToken,
    getRandomToken,
    setStorage,
    getStorage,
    removeStorage,
    clearStorage,
};
