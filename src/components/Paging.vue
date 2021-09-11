<!--
	分页组件
	@Author: lmy
	@params
	page：number (页码)
	size：number (显示条数)
	total：number (总条数)
	pageSizes：array (可选条数)
	disabled：boolean (默认 false 禁用)
	@function
	sizeChange：修改显示条数
	pageChange：修改页码
	@Date: 2021-05-17
-->
<template>
    <div :class="['Paging']">
        <el-pagination
            @size-change="sizeChange"
            @current-change="pageChange"
            :current-page="page"
            :page-sizes="pageSizes"
            :page-size="size"
            layout="total, sizes, prev, pager, next"
            :total="total"
            background
            :disabled="disabled"
        ></el-pagination>
    </div>
</template>
<script>
export default {
    watch: {
        total(val) {
            const maxPage = Math.ceil(this.total / this.size);
            if (this.page > maxPage && this.page > 1 && this.size) {
                this.$emit('update:page', maxPage);
                this.$emit('on-list');
            }
        },
    },
    methods: {
        sizeChange(size) {
            this.$emit('update:page', 1);
            this.$emit('update:size', size);
            this.$emit('on-list');
        },
        pageChange(page) {
            this.$emit('update:page', page);
            this.$emit('on-list');
            this.$emit('page-change', page);
        },
    },
    props: {
        page: {
            type: Number,
            default: 1,
        },
        size: {
            type: Number,
            default: 10,
        },
        total: {
            type: Number,
            default: 0,
        },
        pageSizes: {
            type: Array,
            default() {
                return [10, 20, 50, 100];
            },
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
<style lang="scss" scoped>
.Paging {
    padding: 3px;
    overflow: hidden;
    text-align: right;
}
</style>