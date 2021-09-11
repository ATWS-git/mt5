import _ from 'lodash';
import configJs from '@/utils/configJs';
// import Cookies from "js-cookie"
const Cookies = {};

const baseConfig = {
    state: {},
    actions: {
        async setCookieUserInfo({ commit }, { payload }) {
            const token_info = (await Cookies.get('token_info'))
                ? JSON.parse(Cookies.get('token_info'))
                : {};
            const newpayload = Object.assign({}, payload);
            if (newpayload.phone) {
                newpayload.phone = newpayload.phone.replace(/^(.{3}).{4}(.{4})$/, '$1****$2');
            }
            const data = JSON.parse(JSON.stringify({ ...token_info, ...(newpayload || {}) }));
            await configJs.setStorage('access_token', data.token);
            await configJs.setStorage('user_info', JSON.stringify(data));

            let hostname = window.location.hostname.split('.');
            if (hostname.length === 4) {
                hostname.shift();
            }
            await Cookies.set('token_info', JSON.stringify(data), {
                expires: 7,
                domain: hostname.join('.'),
            });
            await commit({
                type: 'set',
                payload: {
                    user: data || {},
                },
            });
            return data;
        },
        async clearnUserInfo({ commit }) {
            let hostname = window.location.hostname.split('.');
            if (hostname.length === 4) {
                hostname.shift();
            }
            await Cookies.remove('token_info', {
                expires: 7,
                domain: hostname.join('.'),
            });
            await configJs.removeStorage('access_token');
            await configJs.removeStorage('user_info');
            await commit({
                type: 'set',
                payload: {
                    user: {},
                },
            });
        },
    },
    mutations: {
        set(state, { payload }) {
            if (!payload || !payload instanceof Object) {
                throw new Error('error arguments: mutations payload need a type Object');
            }
            Object.keys(payload).forEach((keys) => {
                state[keys] = _.cloneDeep(payload[keys]);
            });
        },
    },
};

export default function moduleBase(obj = {}) {
    const o = _.cloneDeep(obj);
    Object.keys(baseConfig).map((_) => {
        o[_] = { ...baseConfig[_], ...o[_] };
    });
    return o;
}
