export default [
    {
        path: '/incomeRecord',
        name: '收益记录',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/anchorManage/anchorEarnings.vue'),
    },
    {
        path: '/diamondRecord',
        name: '钻石消费记录',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/financeManage/diamondRecord.vue'),
    },
    {
        path: '/exchangeRecord',
        name: '兑换记录',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/financeManage/exchangeRecord.vue'),
    },
    {
        path: '/exchangeRatio',
        name: '兑换比例设置',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/financeManage/exchangeRatio.vue'),
    },
    {
        path: '/redRecord',
        name: '红包记录',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/financeManage/redRecord.vue'),
    },
    {
        path: '/currencyOperationRecord',
        name: '货币操作记录',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/financeManage/currencyOperationRecord.vue'),
    },
];
