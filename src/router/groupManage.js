export default [
    {
        path: '/groupLevel',
        name: '群组等级',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/groupManage/groupLevel.vue'),
    },
    {
        path: '/groupList',
        name: '群组列表',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/groupManage/groupList.vue'),
    },
];
