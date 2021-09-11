import Vue from 'vue';
import App from './app.vue';
import router from './router';
import store from './store';
import './assets/css/common.scss';
import './assets/css/client-iconfont191011.css';
import './assets/css/mt5common.scss';
import './assets/css/control.css';
import 'ant-design-vue/dist/antd.css';
import Antd from 'ant-design-vue';
import * as directives from '@/directives';
import './directives.js';
import api from './api/api';
console.log(Antd)
Vue.use(Antd);
Vue.prototype.$axios = api;
Object.keys(directives).forEach((key) => {
    Vue.directive(key, directives[key]);
});
Vue.config.productionTip = false;

router.beforeEach(async (to, from, next) => {
    // if (to.name !== 'Login') {
    //     const user_info = configJs.getStorage('user_info');
    //     if (configJs.getStorage('access_token') && user_info) {
    //         try {
    //             if (!store.state.siteConfig || JSON.stringify(store.state.siteConfig) === '{}') {
    //                 await store.dispatch('getSiteConfig');
    //             }
    //             if (!store.state.userInfo || JSON.stringify(store.state.userInfo) === '{}') {
    //                 await store.commit('setUserInfo', JSON.parse(user_info));
    //             }
    //             if (!store.state.menuList || JSON.stringify(store.state.menuList) === '[]') {
    //                 await store.dispatch('GetMenu');
    //             }
    //             next();
    //         } catch (error) {
    //             console.log('error', error);
    //             next({ path: '/login', query: { redirect: to.fullPath } });
    //         }
    //     } else {
    //         next({ path: '/login', query: { redirect: to.fullPath } });
    //     }
    // } else {
    //     next();
    // }
    next();
});

new Vue({
    data: {
        Bus: new Vue(),
    },
    router,
    store,
    render: (h) => h(App),
}).$mount('#app');
//     .then((config) => {
//         if (config && config.icon) document.querySelector('link[rel="icon"]').href = config.icon;
//         if (process.env.NODE_ENV !== 'development' && config.refreshExit) {
//             configJs.clearStorage();
//         }
//         newVue();
//     })
//     .catch((error) => {
//         newVue();
//     });

// const newVue = () => {
//     new Vue({
//         data: {
//             Bus: new Vue(),
//         },
//         router,
//         store,
//         render: (h) => h(App),
//     }).$mount('#app');
// };
