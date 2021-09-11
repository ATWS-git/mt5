<!--
	弹框组件
	@Author: lmy
	@params
	dialogWidth：string (可选 默认640px  宽度)
	title：string (标题)
	visible：boolean (显示状态 true显示 false关闭)
	footShow：boolean (可选 默认true 弹框页脚 true显示 false关闭)
	dialogLoading：boolean (可选 默认false 按钮加载状态 true启用 false取消)
	appendToBody：boolean (可选 默认false 是否将弹框添加到body上 true是 false否)
	maxHeight：boolean (可选 默认false 是否有最大高度限制)
	top：string (可选 默认15vh 距离顶部高度)
	showClose：boolean (可选 默认true 是否显示右上角x关闭)
	confirmBtnText：string (可选 默认保存)
	@function
	closeDialog：右上角关闭
	dialogClose：取消
	dialogConfirm：确定
	@Date: 2021-05-17
-->
<template>
    <div>
        <el-dialog
            v-if="!dialogVisible && dialogDrag ? false : true"
            :append-to-body="appendToBody"
            :title="title"
            :visible.sync="dialogVisible"
            :width="dialogWidth"
            ref="dialog"
            @close="closeDialog"
            @opened="openedDialog"
            :top="top"
            :custom-class="maxHeight ? 'maxHeight' : 'DialogForm'"
            :before-close="beforeClose"
            :style="{ overflow: dialogDrag ? 'hidden' : 'auto' }"
            :modal="!dialogDrag"
            :show-close="showClose"
            :close-on-click-modal="false"
        >
            <slot></slot>
            <div class="dialog-footer" slot="footer" v-if="footShow">
                <el-button @click="dialogClose" size="small" :disabled="dialogLoading"
                    >取 消</el-button
                >
                <el-button
                    @click="dialogConfirm"
                    type="primary"
                    size="small"
                    :loading="dialogLoading"
                    >{{ confirmBtnText }}</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    watch: {
        visible(val) {
            this.dialogVisible = val;
            this.$dialog = document.querySelector('.el-dialog__body');
            if (this.$dialog && !val && !this.appendToBody) {
                this.$dialog.scrollTop = 0;
            }
            if (this.dialogVisible) {
                this.$refs['dialog'].$el.children[0].style.top = 0;
                this.$refs['dialog'].$el.children[0].style.left = 0;
            }
        },
    },
    data() {
        return {
            $dialog: '',
            dialogVisible: false,
        };
    },
    props: {
        dialogDrag: Boolean,
        dialogWidth: {
            type: [String],
            default: '640px',
        },
        title: {
            type: [String],
            default: '',
        },
        visible: {
            type: Boolean,
            default: false,
        },
        footShow: {
            type: [Boolean],
            default: true,
        },
        dialogLoading: {
            type: [Boolean],
            default: false,
        },
        appendToBody: {
            type: [Boolean],
            default: false,
        },
        maxHeight: {
            // 是否有最大高度限制
            type: [Boolean],
            default: false,
        },
        top: {
            // 距离顶部高度
            type: String,
            default: '15vh',
        },
        showClose: {
            // 是否显示关闭
            type: [Boolean],
            default: true,
        },
        confirmBtnText: {
            type: [String],
            default: '保 存',
        },
    },
    methods: {
        closeDialog() {
            this.$emit('update:visible', false);
            this.$emit('dialog-close');
        },
        dialogConfirm() {
            this.$emit('dialog-confirm');
        },
        dialogClose() {
            this.$emit('update:visible', false);
            this.$emit('dialog-close');
        },
        openedDialog() {
            this.$emit('dialog-opened');
        },
        beforeClose(done) {
            if (this.dialogLoading) return;
            done();
        },
    },
};
</script>
<style lang="scss">
// .DialogForm,
// .maxHeight {
//     // .dialog-footer {
//     //     text-align: right;
//     // }
// }
// .maxHeight {
//     // .el-dialog__body {
//     //     max-height: 70%;
//     //     max-height: 70vh;
//     //     overflow: auto;
//     // }
// }
</style>
