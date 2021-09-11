export default [
    {
        path: '/h5/shareStatistics',
        name: 'h5分享统计',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/h5Manage/shareStatistics.vue'),
    },
    {
        path: '/h5/staticPages',
        name: 'h5页面管理',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/h5Manage/staticPages.vue'),
    },
];
