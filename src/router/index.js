import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

export const dynamicRoutes = [
    {
        path: '/',
        name: '首页',
        component: () => import('@/views/home'),
    },
];

// 去除black这一层 获取实际路由
const realRouter = (routes) => {
    const res = [];
    routes.forEach((route) => {
        const tmp = { ...route };
        if (tmp.noRouter) {
            if (tmp.children) {
                res.push(...realRouter(tmp.children));
                delete tmp.children;
            }
        } else {
            res.push(tmp);
        }
    });
    return res;
};

export const realRouterData = realRouter(dynamicRoutes);
const routes = [
    {
        path: '',
        // name: 'Layout',
        meta: {},
        component: (resolve) => require(['@/views/layout'], resolve),
        children: realRouterData,
    },
    {
        path: '/login',
        name: 'Login',
        meta: {},
        component: (resolve) => require(['@/views/login'], resolve),
    },
    {
        path: '*',
        redirect: '/',
    },
];

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch((err) => err);
};

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes,
});

export default router;
