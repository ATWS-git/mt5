import Vue from 'vue';
import Vuex from 'vuex';
import { dynamicRoutes, realRouterData } from '@/router';
import axios from '@/api/api';
import loadingPlugin from './common/loadingPlugin';
import { initNav } from './config';

Vue.use(Vuex);

// const modulesFiles = require.context('./modules', true, /\.js$/);

// // you do not need `import app from './modules/app'`
// // it will auto require all vuex module from modules file
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//     // set './app.js' => 'app'
//     const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
//     const value = modulesFiles(modulePath);
//     modules[moduleName] = value.default;
//     return modules;
// }, {});

// 根据路由获取总菜单
const filterAsyncMenu = (routes) => {
    const res = [];
    routes.forEach((route) => {
        const tmp = { ...route };
        if (route.meta && route.meta.isMenu) {
            if (tmp.children) {
                tmp.children = filterAsyncMenu(tmp.children);
            }
            res.push(tmp);
        }
    });
    return res;
};

// 权限列表扁平化
const filterAsyncAuth = (routes, num = 0) => {
    const res = {};
    routes.forEach((route) => {
        const tmp = { ...route };
        if (tmp.childList) {
            Object.assign(res, filterAsyncAuth(tmp.childList, num + 1));
        }
        res[tmp.code] = tmp.name;
    });
    return res;
};

// 获取权限
const filterAsyncPermission = (routes, authAll, num = 0) => {
    const res = [];
    routes.forEach((route) => {
        const tmp = { ...route };
        if ((tmp.meta && tmp.meta.noAuth) || authAll[`${tmp.code}`]) {
            if (tmp.children) {
                tmp.children = filterAsyncPermission(tmp.children, authAll, num + 1);
            }
            res.push({ ...tmp, name: authAll[`${tmp.code}`] || tmp.name });
        }
    });
    return res;
};

export default new Vuex.Store({
    state: {
        menuList: [], //initNav(), //目前在调试，所以写死菜单表
        userInfo: {},
        siteConfig: {},
    },
    mutations: {
        setMenuList(state, obj) {
            // 更新菜单
            state.menuList = obj;
        },
        setSiteConfig(state, obj) {
            state.siteConfig = obj;
        },
        setUserInfo(state, info) {
            state.userInfo = info;
        },
    },
    actions: {
        async GetMenu({ commit }) {
            //获取当前用户可以看到的菜单和权限
            //从route中取出一些必要信息填充到已有的菜单和权限列表中
            //store中存储菜单和权限
            // 获取菜单
            const menuList = filterAsyncMenu(dynamicRoutes);
            let authList = await axios.get('/hqlive-admin-ops/api.admin/menus/queryUserMenu');
            if (authList) {
                authList = authList
                    .filter((m) => m.visible == 1)
                    .map((m) => {
                        const child = (m.children || []).filter((c) => c.visible == 1);
                        return {
                            name: m.name,
                            meta: {
                                icon: m.icon,
                            },
                            children: child
                                ? child.map((c) => {
                                      const menu = menuList.find((menu) => menu.path == c.path);
                                      return {
                                          path: c.path,
                                          name: c.name,
                                          meta: menu ? menu.meta : {},
                                      };
                                  })
                                : [],
                        };
                    });
                commit('setMenuList', authList);
            }
            // console.log(authList, 'authList'); // menuId: 16 menuName: "管理员" parentId: 0 rolePermissionsVOS: []	sort: 325
            // // 权限列表
            // const authAll = filterAsyncAuth(authList);
            // // 权限匹配
            // const permission = filterAsyncPermission(menuList, authAll);
            // console.log('permission', permission, authAll, menuList);
        },
        async getSiteConfig({ commit }) {
            const res = await axios.get('/hqlive-operate/api.admin/config/get', {
                platform: 4,
            });
            const data = res
                ? res.reduce((org, next) => {
                      org[next.confKey] = next.confValue;
                      return org;
                  }, {})
                : {};
            commit('setSiteConfig', data);
            return data;
        },
    },
    getters: {},
    modules: [],
    plugins: [loadingPlugin],
});
