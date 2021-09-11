<!--
	上穿图片组件
	@Author: lmy
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
        <draggable v-model="myFileList" @change="sort" :disabled="disabled">
            <ul
                v-for="(file, index) in myFileList"
                :key="index"
                class="el-upload-list el-upload-list--picture-card"
            >
                <li class="el-upload-list__item">
                    <img
                        class="el-upload-list__item-thumbnail"
                        :src="filters.fullUrl(file[apiToUrl])"
                        alt=""
                    />
                    <span class="el-upload-list__item-actions" v-if="!disabled">
                        <span class="el-upload-list__item-delete" @click="onRemove(file)">
                            <i class="el-icon-delete"></i>
                        </span>
                    </span>
                </li>
            </ul>
        </draggable>
        <el-upload
            ref="uploader"
            v-bind="config"
            :action="actionUrl"
            :multiple="limit > 1"
            :limit="limit"
            :file-list="myFileList"
            :disabled="disabled || finished"
            :show-file-list="false"
        >
            <div slot="default" class="browser" :class="{ hidden: disabled || finished }"></div>
            <!-- <div slot="file" slot-scope="{ file }">
                <img class="el-upload-list__item-thumbnail" :src="domain + file[apiToUrl]" alt="" />
                <span class="el-upload-list__item-actions">
                    <span class="el-upload-list__item-delete" @click="onRemove(file)">
                        <i class="el-icon-delete"></i>
                    </span>
                </span>
            </div> -->
        </el-upload>
        <p class="form_tip" v-if="!disabled">
            <slot name="tip"></slot>
        </p>
    </div>
</template>
<script>
import draggable from 'vuedraggable';

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
            default: '/hqlive-storage/upload/images',
        },
        //文件大小限制
        fileMaxSize: {
            type: Number,
            default: 28,
        },
        //初始文件列表
        fileList: {
            type: [String, Array],
        },
        // 最大允许上传个数
        limit: {
            type: Number,
            default: 1,
        },
        // 是否禁用操作--适用于查看页
        disabled: {
            type: [Boolean],
            default: false,
        },
    },
    components: {
        draggable,
    },
    data(props) {
        return {
            config: {
                accept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                name: 'files',
                'list-type': 'picture-card',
                'http-request': this.request,
                'auto-upload': true,
                'before-upload': this.beforeUpload,
            },
            myFileList: [],
            uploadFiles: [],
            timer: null,
            finished: false,
        };
    },
    watch: {
        fileList: {
            immediate: true,
            handler(fileList) {
                //这里兼容多文件上传和单文件上传的入参区别
                if (!this._.isArray(fileList)) {
                    fileList = fileList ? [fileList] : [];
                }
                //如果长度不一样或者内容有变化
                if (
                    this.myFileList.length !== fileList.length ||
                    !fileList.every((file) => this.myFileList.find((f) => f[this.apiToUrl] == file))
                ) {
                    this.myFileList = fileList.map((item) => {
                        return {
                            [this.apiToUrl]: item,
                        };
                    });
                }
                this.finished = this.myFileList.length >= this.limit;
            },
        },
    },
    computed: {},
    methods: {
        updateFileList(fileList = []) {
            //多文件上传则更新成数组，单文件上传就直接返回字符串
            if (this.limit > 1) {
                this.$emit(
                    'update:fileList',
                    this.myFileList.length > 0
                        ? this.myFileList.map((item) => item[this.apiToUrl])
                        : []
                );
            } else {
                this.$emit(
                    'update:fileList',
                    this.myFileList.length > 0
                        ? this.myFileList.map((item) => item[this.apiToUrl])[0]
                        : null
                );
            }
        },
        onSuccess(res) {
            //改变数据，会自动更新视图
            this.myFileList = [...this.myFileList, ...res];

            //这里更新数据
            this.updateFileList(this.myFileList);
        },
        // 移除
        onRemove(file) {
            //视觉上这个删除比较美观
            // this.$refs.uploader.handleRemove(file);
            //这里更新数据
            this.myFileList = this.myFileList.filter(
                (item) => !Object.keys(item).every((p) => item[p] == file[p])
            );
            this.updateFileList(this.myFileList);
        },
        handleRemove(file) {
            this.$refs.uploader.handleRemove(file);
        },
        sort() {
            this.updateFileList(this.myFileList);
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
            if (this.config.accept && this.config.accept.indexOf(file.type) === -1) {
                this.$message.error('请上传正确格式的图片');
                return false;
            }
        },
        request({ file }) {
            //先删掉文件，等上传成功后再加上
            this.handleRemove(file);

            //如果是单文件则跳过等待，加快速度
            if (this.limit > 1) {
                //一次上传多个文件时，这个文件列表是在很短的时间内发过来的
                if (this.timer) {
                    clearTimeout(this.timer);
                }
                this.uploadFiles = [...this.uploadFiles, file];
                this.timer = setTimeout(() => {
                    this.upload(this.uploadFiles);
                    this.uploadFiles = [];
                    this.timer = null;
                }, 100);
            } else {
                //目前单文件上传也用多文件上传接口
                this.upload([file]);
            }

            return false;
        },
        upload(files) {
            //发送请求
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append(this.config.name, files[i]);
            }
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
<style lang="scss">
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
            background-position: -250px -210px;
            background-image: url('../assets/image/system-icon.png');
            cursor: pointer;
            &:hover {
                background-position: -330px -210px;
            }
            &.hidden {
                display: none;
                cursor: none;
            }
        }
    }
    .el-upload-list__item {
        transition: none;
    }
    .form_tip {
        clear: both;
        display: block;
        padding-top: 8px;
    }
}
</style>
