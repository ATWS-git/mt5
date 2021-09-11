export default [
    {
        path: '/configList',
        name: '配置列表',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/configManage/configList.vue'),
    },
    {
        path: '/systemConfig',
        name: '系统参数',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/configManage/systemConfig.vue'),
    },
    {
        path: '/liveLine',
        name: '直播线路',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/configManage/liveLine.vue'),
    },
];
