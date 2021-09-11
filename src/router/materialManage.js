export default [
    {
        path: '/materialList',
        name: '物资列表',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/materialManage/materialList.vue'),
    },
    {
        path: '/materialDetails',
        name: '背包管理',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/materialManage/materialDetails.vue'),
    },
];
