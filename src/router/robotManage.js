export default [
    {
        path: '/robotList',
        name: '机器人列表',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/robotManage/robotList.vue'),
    },
];
