export default [
    {
        path: '/guardManage',
        name: '守护管理',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/guardManage/guardManage.vue'),
    },
];
