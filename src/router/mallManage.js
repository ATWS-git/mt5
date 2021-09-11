export default [
    {
        path: '/goodsCategories',
        name: '商品类目',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/mallManage/goodsCategories.vue'),
    },
    {
        path: '/goodsList',
        name: '商品列表',
        meta: {
            isMenu: true,
        },
        component: () => import('@/views/mallManage/goodsList.vue'),
    },
];
