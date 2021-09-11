<!--
	表格组件
	@Author: lmy
	@params
	tableData：array (表格数据)
	className：string (自定义表格class)
	maxHeight：string (表格最大高度)
	spanMethod：function (合并行或列的计算方法)
	rowKey：function (行数据的 Key)
	showSummary：boolean (是否在表尾显示合计行)
	unloadRowClick：boolean (点击行显示隐藏数据)
	summaryMethodFun：function (自定义合计方法)
	sortChange：表格排序
	@Date: 2021-05-17
-->
<template>
    <div :class="['TableMain', className]" ref="TableMain">
        <slot name="front"></slot>
        <el-table
            :data="tableData"
            border
            @sort-change="sortChange"
            :max-height="maxHeight"
            :span-method="spanMethod"
            :row-key="rowKey"
            @cell-click="cellClick"
            :tooltipPopperOptions="tooltipPopperOptions"
            :show-summary="showSummary"
            :summary-method="summaryMethod"
            @cell-tooltip-mouse-enter="cellTooltipMouseEnter"
            @cell-mouse-leave="cellMouseLeave"
            @selection-change="handleSelectionChange"
        >
            <slot></slot>
            <div slot="append">
                <slot name="append"></slot>
            </div>
        </el-table>
        <slot name="paging"></slot>
    </div>
</template>
<script>
import PopperJS from '@/utils/popper.min.js';
import { PopupManager } from 'element-ui/lib/utils/popup';
// 表格样式
export default {
    props: {
        tableData: {
            type: Array,
            default() {
                return [];
            },
        },
        // 自定义class名称
        className: {
            type: String,
            default: null,
        },
        maxHeight: {
            type: String,
            default: null,
        },
        spanMethod: {
            type: Function,
            default: () => {},
        },
        rowKey: {
            type: String,
            default: null,
        },
        // 是否显示合计
        showSummary: {
            type: Boolean,
            default: false,
        },
        tooltipPopperOptions: {
            type: Object,
            default: () => {
                return {};
            },
        },
        unloadRowClick: {
            type: Boolean,
            default: false,
        },
        // 自定义合计方法
        summaryMethodFun: {
            type: Function,
            default: () => {},
        },
    },
    components: {},
    watch: {},
    computed: {},
    created() {},
    mounted() {
        window.addEventListener('resize', this.destroyPopper);
        document.addEventListener('click', this.listenFun);
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.destroyPopper);
        document.removeEventListener('click', this.listenFun);
        this.destroyPopper();
    },
    data() {
        return {
            popperJS: null,
        };
    },
    methods: {
        listenFun(e) {
            if (
                !this.popperJS ||
                !this.popperJS.popper ||
                !this.popperJS.reference ||
                this.popperJS.popper.contains(e.target) ||
                this.popperJS.reference.contains(e.target)
            ) {
                return;
            }
            console.log(this.popperJS, e.target, 'click');
            this.destroyPopper();
        },
        cellClick(row, column, cell, event) {
            this.$emit('cell-click', row, column, cell, event);
            if (this.unloadRowClick) {
                if (cell.parentNode.classList.contains('unfold-click')) {
                    cell.parentNode.classList.remove('unfold-click');
                    return;
                }
                cell.parentNode.classList.add('unfold-click');
            }
        },
        handleSelectionChange(val) {
            this.$emit('selection-change', val);
        },
        // 创建popper
        createPopper(reference, popper, offsetWidth) {
            this.destroyPopper();
            this.popperJS = new PopperJS(reference, popper, {
                placement: 'left-start',
                modifiers: {
                    offset: {
                        offset: `0,${-offsetWidth}px`,
                    },
                },
                removeOnDestroy: true,
            });
        },
        //清空popper
        destroyPopper() {
            if (this.popperJS && this.popperJS.destroy) {
                this.popperJS.destroy();
                this.popperJS = null;
            }
        },
        // 鼠标移入
        cellTooltipMouseEnter(row, column, cell, event, cellChild) {
            if (this.unloadRowClick) return;
            // console.log('鼠标移入', row, column, cell, event, cellChild);
            const icondom = document.createElement('span'); // 展开按钮dom
            icondom.className = 'el-icon-arrow-down grid-down';
            icondom.onclick = () => {
                const t_boxdom = document.createElement('div'); // 展示box最外层div
                t_boxdom.className = 'tooltip-overflowbox';
                t_boxdom.style.zIndex = PopupManager.nextZIndex();

                const textdom = document.createElement('div'); // 展示文字div
                textdom.className = 'tooltip-overflowbox-text';
                textdom.innerText = cellChild.innerText;

                const closePdom = document.createElement('p'); // 关闭按钮i的外层p
                closePdom.className = 'tooltip-overflowbox-icon';
                closePdom.innerHTML = `<i class="el-icon-close"></i>`;
                closePdom.onclick = () => this.destroyPopper(); // 关闭按钮点击事件

                textdom.style.minWidth = `${cell.offsetWidth + 20}px`;
                textdom.style.maxWidth = `${cell.offsetWidth * 1.5}px`;
                textdom.style.minHeight = `${cell.offsetHeight}px`;
                t_boxdom.appendChild(textdom);
                t_boxdom.appendChild(closePdom);

                this.createPopper(cell, t_boxdom, cell.offsetWidth);
                document.body.appendChild(t_boxdom);
            };
            cell.classList.add('tooltip-hover');
            cell.appendChild(icondom);
            // console.log(event, cellChild.innerText, 8888888);
        },
        // 鼠标离开 --隐藏展开图标
        cellMouseLeave(row, column, cell, event) {
            if (!column.customTooltip) return;
            cell.classList.remove('tooltip-hover'); // 隐藏删除展开图标
            const icondoms = cell.getElementsByClassName('grid-down');
            if (icondoms && icondoms.length) {
                icondoms.forEach((icondom) => {
                    cell.removeChild(icondom);
                });
            }
            // console.log('鼠标离开', row, column, cell, event);
        },
        // 表格排序
        sortChange(column, prop, order) {
            this.$emit('sort-change', column, prop, order);
        },
        // 合计
        summaryMethod(param) {
            if (!this.showSummary) return;
            const sums = this.summaryMethodFun(param);
            return sums;
        },
    },
};
</script>
<style lang="scss" scoped>
.TableMain {
    position: relative;
    padding: 3px;
    /deep/.Paging {
        border: 1px solid #e2e4ea;
        border-top: none;
    }
    /deep/ .fontBold {
        font-weight: bold;
    }
}
</style>