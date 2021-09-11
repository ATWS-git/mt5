export default [
    {
        path: '/nationalFlag',
        name: '国旗管理',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/nationalFlagManage/nationalFlagList.vue'),
    },
];
