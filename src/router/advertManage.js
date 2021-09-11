export default [
    {
        path: '/advertList',
        name: '广告列表',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/advertManage/advertList.vue'),
    },
];
