import localforage from 'localforage';
import appendQuery from 'append-query';

function isCacheableMethod(config) {
    return ~['GET', 'HEAD'].indexOf((config.method || '').toUpperCase());
}

function getUUIDByAxiosConfig(config) {
    let url = config.url || '';
    if (config.params) {
        url = appendQuery(url, config.params);
    }
    return url;
}

function getCacheByAxiosConfig(config) {
    return new Promise((resolve, reject) => {
        localforage.getItem(getUUIDByAxiosConfig(config)).then((value) => {
            if (value) {
                try {
                    const result = JSON.parse(value);
                    resolve(result);
                } catch (e) {
                    resolve('');
                }
            } else {
                resolve(value);
            }
        });
    });
}

export async function requestInterceptor(config) {
    if (isCacheableMethod(config)) {
        const lastCachedResult = await getCacheByAxiosConfig(config);
        if (lastCachedResult) {
            config.headers = {
                ...config.headers,
                'If-None-Match': lastCachedResult.etag,
            };
        }
    }
    return config;
}

export function responseInterceptor(response) {
    if (isCacheableMethod(response.config)) {
        const responseETAG = getHeaderCaseInsensitive('etag', response.headers);
        if (responseETAG) {
            localforage.setItem(
                getUUIDByAxiosConfig(response.config),
                JSON.stringify({
                    time: Date.now(),
                    etag: responseETAG,
                    data: response.data,
                })
            );
        }
    }
    return response;
}

export async function responseErrorInterceptor(error) {
    if (error.response && error.response.status === 304) {
        const getCachedResult = await getCacheByAxiosConfig(error.response.config);
        if (!getCachedResult) {
            return Promise.reject(error);
        }
        const newResponse = error.response;
        newResponse.status = 200;
        newResponse.data = getCachedResult.data;
        return Promise.resolve(newResponse);
    }
    return Promise.reject(error);
}

export async function clearCache() {
    await localforage.clear();
}

export function useCache(instance) {
    instance.interceptors.request.use(requestInterceptor);
    instance.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
    return instance;
}

const byLowerCase = (toFind) => (value) => toLowerCase(value) === toFind;
const toLowerCase = (value) => value.toLowerCase();
const getKeys = (headers) => Object.keys(headers);

const getHeaderCaseInsensitive = (headerName, headers = {}) =>
    headers[getKeys(headers).find(byLowerCase(headerName))];
