export default [
    {
        path: '/pushManage',
        name: '推送管理',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/messageManage/pushManage.vue'),
    },
    {
        path: '/eventNotification',
        name: '活动通知管理',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/messageManage/eventNotification.vue'),
    },
];
