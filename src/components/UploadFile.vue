<!--
	上穿图片组件
	@Author: calwin
	@params
	actionUrl：string (上传地址)
	fileMaxSize：number (上传大小)
	fileList：array (图片地址)
	limit：number (最大允许上传个数)
	disabled：boolean (是否禁用操作--适用于查看页)
	@Date: 2021-05-17
-->
<template>
    <div class="UploadImgMain">
        <el-upload
            ref="uploader"
            v-bind="config"
            :action="actionUrl"
            :file-list="myFileList"
            :disabled="disabled || myFileList.length > 0"
        >
            <div
                slot="default"
                class="browser"
                :class="{ hidden: disabled || myFileList.length > 0 }"
            ></div>
            <div slot="file" slot-scope="{ file }">
                <div class="el-upload-list__item-thumbnail">
                    <i class="el-icon-document"></i>
                </div>
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-delete" @click="onRemove(file)">
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div>
        </el-upload>
        <p class="form_tip" v-if="!disabled">
            <slot name="tip"></slot>
        </p>
    </div>
</template>
<script>
export default {
    props: {
        // 图片来源对应的上传接口返回的属性
        apiToUrl: {
            type: String,
            default: 'resourceUrl',
        },
        //请求地址
        actionUrl: {
            type: String,
            default: '/hqlive-storage/upload/giftImage',
        },
        //文件大小限制
        fileMaxSize: {
            type: Number,
            default: 28,
        },
        //初始文件
        file: {
            type: String,
        },
        // 是否禁用操作--适用于查看页
        disabled: {
            type: [Boolean],
            default: false,
        },
    },
    data(props) {
        return {
            config: {
                accept: '*',
                name: 'file',
                'list-type': 'picture-card',
                'http-request': this.request,
                'auto-upload': true,
                'before-upload': this.beforeUpload,
                'on-exceed': this.onExceed,
            },
            myFileList: [],
            uploadFiles: [],
        };
    },
    watch: {
        file: {
            immediate: true,
            handler(file) {
                if (!file) {
                    this.myFileList = [];
                } else {
                    if (
                        !(
                            this.myFileList &&
                            this.myFileList[0] &&
                            this.myFileList[0][this.apiToUrl] == file
                        )
                    ) {
                        this.myFileList = [
                            {
                                [this.apiToUrl]: file,
                            },
                        ];
                    }
                }
            },
        },
    },
    methods: {
        updateFileList() {
            this.$emit(
                'update:file',
                this.myFileList.length > 0 ? this.myFileList[0][this.apiToUrl] : ''
            );
        },
        onSuccess(res) {
            //改变数据，会自动更新视图
            this.myFileList = [...this.myFileList, res];
            //这里更新数据
            this.updateFileList();
        },
        onError(err) {
            this.$message.error('图片上传失败！');
        },
        onExceed() {
            this.$message.error('已超出最大上传数量，请删减后重试！');
        },
        beforeUpload(file) {
            const isLtM = file.size / 1024 / 1024 < this.fileMaxSize;
            if (!isLtM) {
                this.$message.error(`上传图片大小不能超过 ${this.fileMaxSize}M!`);
                return false;
            }
            // if (this.config.accept && this.config.accept.indexOf(file.type) === -1) {
            //     this.$message.error('请上传正确格式的图片');
            //     return false;
            // }
            return true;
        },
        onRemove(file) {
            this.myFileList = this.myFileList.filter(
                (item) => !Object.keys(item).every((p) => item[p] == file[p])
            );
            this.updateFileList();
        },
        handleRemove(file) {
            this.$refs.uploader.handleRemove(file);
        },
        request({ file }) {
            //先删掉文件，等上传成功后再加上
            this.handleRemove(file);
            this.upload(file);
            return false;
        },
        upload(file) {
            //发送请求
            const formData = new FormData();
            formData.append(this.config.name, file);
            return this.$axios
                .post(this.actionUrl, formData, {
                    handleErrorFlag: false,
                })
                .then((res) => {
                    this.onSuccess(res);
                })
                .catch((err) => {
                    this.onError(err);
                });
        },
    },
};
</script>
<style lang="scss" scoped>
.UploadImgMain {
    .el-upload {
        width: auto;
        height: auto;
        border: none;
        border-radius: 0px;
        background-color: #fff;
        cursor: none;
        float: left;
        .browser {
            width: 64px;
            height: 64px;
            background-repeat: no-repeat;
            background-position: -410px -290px;
            background-image: url('../assets/image/system-icon.png');
            cursor: pointer;
            &:hover {
                // background-position: -410px -320px;
            }
            &.hidden {
                display: none;
                cursor: none;
            }
        }
    }
    .el-upload-list__item {
        transition: none;
        > div {
            height: 100%;
            .el-upload-list__item-thumbnail {
                display: flex;
                justify-content: center;
                align-items: center;
                i {
                    font-size: 50px;
                }
            }
        }
    }
    .form_tip {
        clear: both;
        display: block;
        padding-top: 8px;
    }
}
</style>
