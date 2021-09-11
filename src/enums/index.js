import _ from 'lodash';

//加载模块js，并导出
export * from './role'; //角色
export * from './logs'; //日志
export * from './advert'; //广告
export * from './anchor'; //主播
export * from './live'; //直播间
export * from './material'; //物资
export * from './goods'; //商品
export * from './report'; //举报
export * from './dynamic'; //动态
export * from './medal'; //勋章
export * from './push'; //推送
export * from './red'; //红包
export * from './user'; //用户
export * from './robot'; //机器人

/**
 * 平台
 */
export const platforms = {
    0: '全部',
    1: 'Android',
    2: 'IOS',
    3: 'H5',
    4: 'PC',
};

/**
 * 币种
 */
export const currencies = {
    1: '人民币',
    2: '钻石',
    3: '银币',
};

/**
 * 状态
 */
export const STATES = {
    ENABLED: 1,
    DISABLED: 0,
};
export const states = {
    1: '启用',
    0: '禁用',
};

/** */
export const reviewStatus = {
    0: '待审核',
    1: '审核通过',
    2: '审核不通过',
};

/**
 * 获取下拉框列表
 * @param {*} enums
 * @returns
 */
export function getEnumsArray(enums) {
    return _.toPairs(enums).map((item) => {
        return {
            value: item[0] - 0,
            label: item[1],
        };
    });
}
