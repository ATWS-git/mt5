export const pending = [];

const requestHandle = (axios) => {
    let CancelToken = axios.CancelToken;
    let cancelPending = (config) => {
        for (let i = pending.length - 1; i >= 0; i--) {
            if (!!config) {
                if (pending[i].u === config.url) {
                    pending[i].f();
                    pending.splice(i, 1);
                }
            } else {
                pending[i].f();
                pending.splice(i, 1);
            }
        }
    };

    const requestBefore = (config) => {
        try {
            cancelPending(config);
            config.cancelToken = new CancelToken((c) => {
                if (config.cancelToken) {
                    if (typeof config.cancelToken === 'function') {
                        config.cancelToken(c);
                    }
                } else {
                    pending.push({
                        u: config.url,
                        f: c,
                    });
                }
            });
        } catch (err) {}
        return config;
    };

    const requestAfter = (config) => {
        try {
            cancelPending(config);
        } catch (err) {}
    };
    return { requestBefore, requestAfter };
};

export default requestHandle;
