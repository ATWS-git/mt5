export default [
    {
        path: '/anchorList',
        name: '主播列表',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/anchorManage/anchorList.vue'),
    },
    {
        path: '/anchorApplication',
        name: '主播申请',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/anchorManage/anchorApplication.vue'),
    },
    {
        path: '/anchorEarnings',
        name: '主播收益',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/anchorManage/anchorEarnings.vue'),
    },
    {
        path: '/anchorLevel',
        name: '主播等级',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/anchorManage/anchorLevel.vue'),
    },
    {
        path: '/anchorPrivilege',
        name: '主播特权',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/anchorManage/anchorPrivilege.vue'),
    },
];
