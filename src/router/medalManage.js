export default [
    {
        path: '/medalList',
        name: '勋章列表',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/medalManage/medalList.vue'),
    },
];
