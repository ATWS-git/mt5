export default [
    {
        path: '/dynamicList',
        name: '动态列表',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/dynamicManage/dynamicList.vue'),
    },
];
