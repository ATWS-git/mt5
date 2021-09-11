export default [
    {
        path: '/userList',
        name: '用户列表',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/userManage/userList.vue'),
    },
    {
        path: '/freezingAccount',
        name: '冻结用户列表',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/userManage/freezingAccount.vue'),
    },
    {
        path: '/userLevel',
        name: '用户等级',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/userManage/userLevel.vue'),
    },
    {
        path: '/userPrivilege',
        name: '用户特权',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/userManage/userPrivilege.vue'),
    },
    {
        path: '/shareStatistics',
        name: '分享统计',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/userManage/shareStatistics.vue'),
    },
    {
        path: '/userNickName',
        name: '用户昵称审核',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/userManage/userNickName.vue'),
    },
    {
        path: '/userAvatar',
        name: '用户头像审核',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/userManage/userAvatar.vue'),
    },
    {
        path: '/defaultNickname',
        name: '默认昵称',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/userManage/defaultNickname.vue'),
    },
    {
        path: '/defaultAvatar',
        name: '默认头像',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/userManage/defaultAvatar.vue'),
    },
];
