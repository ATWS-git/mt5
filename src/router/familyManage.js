export default [
    {
        path: '/memberManage',
        name: '成员管理',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/familyManage/memberManage.vue'),
    },
    {
        path: '/shareApplication',
        name: '分成申请',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/familyManage/shareApplication.vue'),
    },
    {
        path: '/familyList',
        name: '家族列表',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/familyManage/familyList.vue'),
    },
    {
        path: '/withdrawalApplication',
        name: '提现申请',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/familyManage/withdrawalApplication.vue'),
    },
    // {
    //     path: '/familyIncomeRecord',
    //     name: '家族收益记录',
    //     meta: {
    //         isMenu: true,
    //     },
    //     component: () => import('@/views/familyManage/incomeRecord.vue'),
    // },
    // {
    //     path: '/withdrawalRecord',
    //     name: '提现记录',
    //     meta: {
    //         isMenu: true,
    //     },
    //     component: () => import('@/views/familyManage/withdrawalRecord.vue'),
    // },
];
