export default [
    {
        path: '/liveRoomCategory',
        name: '直播间分类',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/liveRoomManage/liveRoomCategory.vue'),
    },
    {
        path: '/liveRoomList',
        name: '直播间列表',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/liveRoomManage/liveRoomList.vue'),
    },
    {
        path: '/liveRecord',
        name: '直播记录',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/liveRoomManage/liveRecord.vue'),
    },
    {
        path: '/giftManage',
        name: '礼物管理',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/liveRoomManage/giftManage.vue'),
    },
    {
        path: '/giftType',
        name: '礼物分类',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/liveRoomManage/giftType.vue'),
    },
    {
        path: '/forcedOffLive',
        name: '强制关播',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/liveRoomManage/forcedOffLive.vue'),
    },
    {
        path: '/setTime',
        name: '计时收费',
        //code: '0000',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/liveRoomManage/setTime.vue'),
    },
    {
        path: '/quickMessage',
        name: '快捷消息',
        //code: '0000',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/liveRoomManage/quickMessage.vue'),
    },
    {
        path: '/liveRoomManage',
        name: 'PK连麦设置',
        //code: '0000',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/liveRoomManage/liveRoomManage.vue'),
    },
    {
        path: '/PKRecord',
        name: 'PK记录',
        //code: '0000',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/liveRoomManage/PKRecord.vue'),
    },
    {
        path: '/voiceRecord',
        name: '连麦记录',
        //code: '0000',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/liveRoomManage/voiceRecord.vue'),
    },
];
