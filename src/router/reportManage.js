export default [
    {
        path: '/reportManage',
        name: '举报审核',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/reportManage/reportManage.vue'),
    },
    {
        path: '/keyWord',
        name: '关键词库',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/reportManage/keyWord.vue'),
    },
];
