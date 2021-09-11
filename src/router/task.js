export default [
    {
        path: '/task',
        name: '任务管理',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/taskManage/task.vue'),
    },
    {
        path: '/signInManage',
        name: '签到管理',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/taskManage/signInManage.vue'),
    },
];
