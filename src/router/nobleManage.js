export default [
    {
        path: '/nobleList',
        name: '贵族列表',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/nobleManage/nobleList.vue'),
    },
    {
        path: '/noblePrivilege',
        name: '贵族特权',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/nobleManage/noblePrivilege.vue'),
    },
];
