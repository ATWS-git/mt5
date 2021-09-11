<!--
	页面头部组件
	@Author: lmy
	@params
	title：string
	@Date: 2021-05-17
-->
<template>
    <div class="subTitle">
        <div class="left">{{ title }}</div>
        <div class="right">
            <slot></slot>
        </div>
    </div>
</template>
<script>
// 小标题
export default {
    components: {},
    watch: {},
    computed: {},
    created() {},
    mounted() {},
    data() {
        return {};
    },
    methods: {},
    props: {
        title: null,
    },
};
</script>
<style lang="scss" scoped>
.subTitle {
    height: 40px;
    font-size: 16px;
    color: #111626;
    display: flex;
    font-weight: bold;
    padding: 0 10px;
    line-height: 40px;
    box-sizing: border-box;
    border-bottom: 1px solid #f2f4fa;
}
</style>