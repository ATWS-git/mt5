export default [
    {
        path: '/adminList',
        name: '管理员列表',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/adminManage/adminList.vue'),
    },
    {
        path: '/adminLogs',
        name: '日志',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/adminManage/adminLogs.vue'),
    },
];
