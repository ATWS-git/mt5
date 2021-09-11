export default [
    {
        path: '/liveLine',
        name: '直播线路',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/liveConfig/liveLine.vue'),
    },
];
