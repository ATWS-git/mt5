export const initNav = () => {
    return [
        // {
        //     name: '系统设置',
        //     path: '/setting',
        //     meta: {
        //         icon: 'el-icon-setting',
        //     },
        // },
        {
            name: '管理员',
            path: '/admin',
            meta: {
                icon: 'el-icon-user',
            },
            children: [
                {
                    name: '管理员列表',
                    path: '/adminList',
                    meta: {
                        icon: '',
                    },
                },
                // {
                //     name: '日志',
                //     path: '/adminLogs',
                //     meta: {
                //         icon: '',
                //     },
                // },
            ],
        },
        {
            name: '角色管理',
            path: '/role',
            meta: {
                icon: 'el-icon-user',
            },
            children: [
                {
                    name: '角色列表',
                    path: '/roleList',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '菜单',
                    path: '/menus',
                    meta: {
                        icon: '',
                    },
                },
            ],
        },
        {
            name: '用户管理',
            path: '/user',
            meta: {
                icon: 'el-icon-user',
            },
            children: [
                {
                    name: '用户列表',
                    path: '/userList',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '冻结账号',
                    path: '/freezingAccount',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '用户等级',
                    path: '/userLevel',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '用户特权',
                    path: '/userPrivilege',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '分享统计',
                    path: '/shareStatistics',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '用户昵称审核',
                    path: '/userNickName',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '用户头像审核',
                    path: '/userAvatar',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '默认昵称',
                    path: '/defaultNickname',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '默认头像',
                    path: '/defaultAvatar',
                    meta: {
                        icon: '',
                    },
                },
            ],
        },
        {
            name: '群组管理',
            path: '/group',
            meta: {
                icon: 'el-icon-user',
            },
            children: [
                {
                    path: '/groupLevel',
                    name: '群组等级',
                    meta: {
                        icon: '',
                    },
                },
                {
                    path: '/groupList',
                    name: '群组列表',
                    meta: {
                        icon: '',
                    },
                },
            ],
        },
        {
            name: '贵族管理',
            path: '/noble',
            meta: {
                icon: 'el-icon-user',
            },
            children: [
                {
                    name: '贵族列表',
                    path: '/nobleList',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '贵族特权',
                    path: '/noblePrivilege',
                    meta: {
                        icon: '',
                    },
                },
            ],
        },
        {
            name: '主播管理',
            path: '/anchor',
            meta: {
                icon: 'el-icon-mic',
            },
            children: [
                {
                    name: '主播列表',
                    path: '/anchorList',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '主播申请',
                    path: '/anchorApplication',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '主播收益',
                    path: '/anchorEarnings',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '主播等级',
                    path: '/anchorLevel',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '主播特权',
                    path: '/anchorPrivilege',
                    meta: {
                        icon: '',
                    },
                },
            ],
        },
        // {
        //     name: '房管管理',
        //     path: '/housing',
        //     meta: {
        //         icon: 'el-icon-setting',
        //     },
        // },
        // {
        //     name: '机器人管理',
        //     path: '/robot',
        //     meta: {
        //         icon: 'el-icon-coordinate',
        //     },
        // },
        // {
        //     name: '客服管理',
        //     path: '/customerService',
        //     meta: {
        //         icon: 'el-icon-service',
        //     },
        // },
        {
            name: '直播间管理',
            path: '/live',
            meta: {
                icon: 'el-icon-video-play',
            },
            children: [
                {
                    name: '直播间分类',
                    path: '/liveRoomCategory',
                },
                {
                    name: '直播间列表',
                    path: '/liveRoomList',
                },
                {
                    name: '直播记录',
                    path: '/liveRecord',
                },
                {
                    name: '礼物管理',
                    path: '/giftManage',
                },
                {
                    name: '礼物分类',
                    path: '/giftType',
                },
                {
                    name: '强制关播',
                    path: '/forcedOffLive',
                },
                {
                    name: '计时收费',
                    path: '/setTime',
                },
                {
                    name: '快捷消息',
                    path: '/quickMessage',
                },
            ],
        },
        // {
        //     name: '活动管理',
        //     path: '/activity',
        //     meta: {
        //         icon: 'el-icon-date',
        //     },
        // },
        {
            name: '动态管理',
            path: '/dynamic',
            meta: {
                icon: 'el-icon-data-line',
            },
            children: [
                {
                    name: '动态管理',
                    path: '/dynamicList',
                },
            ],
        },
        {
            name: '物资管理',
            path: '/material',
            meta: {
                icon: 'el-icon-shopping-cart-full',
            },
            children: [
                {
                    name: '物资列表',
                    path: '/materialList',
                },
                {
                    name: '背包管理',
                    path: '/materialDetails',
                },
            ],
        },
        {
            name: '商城管理',
            path: '/mall',
            meta: {
                icon: 'el-icon-shopping-cart-full',
            },
            children: [
                {
                    name: '商品类目',
                    path: '/goodsCategories',
                },
                {
                    name: '商品列表',
                    path: '/goodsList',
                },
            ],
        },
        // {
        //     name: '礼物管理',
        //     path: '/gift',
        //     meta: {
        //         icon: 'el-icon-sold-out',
        //     },
        // },
        // {
        //     name: '守护管理',
        //     path: '/guard',
        //     meta: {
        //         icon: 'el-icon-shopping-bag-1',
        //     },
        // },
        // {
        //     name: '等级管理',
        //     path: '/grade',
        //     meta: {
        //         icon: 'el-icon-setting',
        //     },
        // },
        {
            name: '消息管理',
            path: '/news',
            meta: {
                icon: 'el-icon-bell',
            },
            children: [
                {
                    name: '推送管理',
                    path: '/pushManage',
                },
                {
                    name: '活动通知管理',
                    path: '/eventNotification',
                },
            ],
        },
        // {
        //     name: '财务管理',
        //     path: '/finance',
        //     meta: {
        //         icon: 'el-icon-setting',
        //     },
        // },
        {
            name: '举报管理',
            path: '/report',
            meta: {
                icon: 'el-icon-message',
            },
            children: [
                {
                    name: '举报审核',
                    path: '/reportManage',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '关键词库',
                    path: '/keyWord',
                    meta: {
                        icon: '',
                    },
                },
            ],
        },
        {
            name: '广告管理',
            path: '/advert',
            meta: {
                icon: 'el-icon-chat-round',
            },
            children: [
                {
                    name: '广告列表',
                    path: '/advertList',
                    meta: {
                        icon: '',
                    },
                },
            ],
        },
        // {
        //     name: '内容管理',
        //     path: '/content',
        //     meta: {
        //         icon: 'el-icon-edit-outline',
        //     },
        // },
        {
            name: '勋章管理',
            path: '/medal',
            meta: {
                icon: 'el-icon-user',
            },
            children: [
                {
                    name: '勋章列表',
                    path: '/medalList',
                    meta: {
                        icon: '',
                    },
                },
            ],
        },
        {
            name: '财务管理',
            path: '/finance',
            meta: {
                icon: 'el-icon-setting',
            },
            children: [
                {
                    name: '收益记录',
                    path: '/incomeRecord',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '钻石消费记录',
                    path: '/diamondRecord',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '兑换记录',
                    path: '/exchangeRecord',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '兑换比例设置',
                    path: '/exchangeRatio',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '红包记录',
                    path: '/redRecord',
                    meta: {
                        icon: '',
                    },
                },
            ],
        },
        {
            name: '守护管理',
            path: '/guard',
            meta: {
                icon: 'el-icon-user',
            },
            children: [
                {
                    name: '守护管理',
                    path: '/guardManage',
                    meta: {
                        icon: '',
                    },
                },
            ],
        },
        {
            name: '任务管理',
            path: '/taskManage',
            meta: {
                icon: 'el-icon-user',
            },
            children: [
                {
                    name: '任务管理',
                    path: '/task',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '签到管理',
                    path: '/signInManage',
                    meta: {
                        icon: '',
                    },
                },
            ],
        },
        {
            name: '家族管理',
            path: '/familyManage',
            meta: {
                icon: 'el-icon-setting',
            },
            children: [
                {
                    name: '成员管理',
                    path: '/memberManage',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '分成申请',
                    path: '/shareApplication',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '家族列表',
                    path: '/familyList',
                    meta: {
                        icon: '',
                    },
                },
                {
                    name: '提现申请',
                    path: '/withdrawalApplication',
                    meta: {
                        icon: '',
                    },
                },
            ],
        },
        {
            name: 'h5管理',
            path: '/h5',
            meta: {
                icon: 'el-icon-setting',
            },
            children: [
                {
                    name: 'h5分享统计',
                    path: '/h5/shareStatistics',
                    meta: {
                        icon: '',
                    },
                },
            ],
        },
        {
            name: '国旗管理',
            meta: {
                icon: 'el-icon-setting',
            },
            children: [
                {
                    name: '国旗管理',
                    path: '/nationalFlag',
                    meta: {
                        icon: '',
                    },
                },
            ],
        },
        {
            name: '配置管理',
            path: '/config',
            meta: {
                icon: 'el-icon-setting',
            },
            children: [
                {
                    name: '配置列表',
                    path: '/configList',
                    meta: {
                        icon: '',
                    },
                },
            ],
        },
        {
            name: '机器人管理',
            path: '/robot',
            meta: {
                icon: 'el-icon-setting',
            },
            children: [
                {
                    path: '/robotList',
                    name: '机器人列表',
                },
            ],
        },
    ];
};
