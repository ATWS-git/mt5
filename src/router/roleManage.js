export default [
    {
        path: '/roleList',
        name: '角色列表',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/roleManage/roleList.vue'),
    },
    {
        path: '/menus',
        name: '菜单',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/roleManage/menus.vue'),
    },
];
