<!--
	富文本编辑组件
	@Author: lmy
	@params
	content：string (富文本编辑内容)
	ueditorHeight：number (编辑框高度)
	ready：function (初始化)
	@Date: 2021-05-17
-->
<template>
    <div>
        <vueUeditorwarp
            :config="ueConfig"
            :value="content"
            @ready="ready"
            @beforeInit="beforeInit"
        ></vueUeditorwarp>
        <input
            accept="image/*"
            id="ueImgInput"
            ref="ueImgInput"
            style="display: none"
            type="file"
        />
    </div>
</template>
<script>
import vueUeditorwarp from 'vue-ueditor-wrap';

export default {
    components: {
        vueUeditorwarp,
    },
    computed: {
        ueConfig() {
            return {
                toolbars: [
                    [
                        'fullscreen',
                        'source',
                        '|',
                        'undo',
                        'redo',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        'fontborder',
                        'strikethrough',
                        'superscript',
                        'subscript',
                        'removeformat',
                        'formatmatch',
                        'autotypeset',
                        'blockquote',
                        'pasteplain',
                        '|',
                        'forecolor',
                        'backcolor',
                        'insertorderedlist',
                        'insertunorderedlist',
                        'selectall',
                        'cleardoc',
                        '|',
                        'rowspacingtop',
                        'rowspacingbottom',
                        'lineheight',
                        '|',
                        'customstyle',
                        'paragraph',
                        'fontfamily',
                        'fontsize',
                        '|',
                        'directionalityltr',
                        'directionalityrtl',
                        'indent',
                        '|',
                        'justifyleft',
                        'justifycenter',
                        'justifyright',
                        'justifyjustify',
                        '|',
                        'touppercase',
                        'tolowercase',
                        '|',
                        'link',
                        'unlink',
                        '|',
                        'custombtn',
                        '|',
                        'horizontal',
                        'date',
                        'time',
                        'spechars',
                        'wordimage',
                        '|',
                        'inserttable',
                        'deletetable',
                        '|',
                        'preview',
                    ],
                ],
                // // 初始容器高度
                initialFrameHeight: this.ueditorHeight,
                // // 初始容器宽度
                initialFrameWidth: '100%',
                autoHeightEnabled: false,
                enableAutoSave: false,
                elementPathEnable: false,
                zIndex: 1000,
                UEDITOR_HOME_URL: '/ueditor/',
            };
        },
    },
    props: {
        ueditorHeight: {
            type: Number,
            default: 700,
        },
        content: {
            type: String,
            default: '',
        },
    },
    created() {},
    data() {
        return {
            ueditor: '',
        };
    },
    methods: {
        ready(ueditor) {
            ueditor.commands['custombtn'] = {
                execCommand: () => {
                    const input = document.getElementById('ueImgInput');
                    input.value = '';
                    input.click();
                    input.onchange = (e) => {
                        const formData = new FormData();
                        formData.append('files', e.target.files[0]);
                        console.log('111111111');
                        this.$axios
                            .post('/hqlive-storage/upload/images', formData, {
                                handleErrorFlag: false,
                            })
                            .then((res) => {
                                console.log(res);
                                const dataUrl = res[0].fullUrl;
                                ueditor.execCommand('inserthtml', `<img src='${dataUrl}'/>`);
                            })
                            .catch((err) => {});
                        // const reader = new FileReader();
                        // reader.readAsDataURL(e.target.files[0]);
                        // reader.onload = ev => {
                        //     const dataUrl = ev.target.result;
                        //     console.log(e.target.files, dataUrl);
                        //     ueditor.execCommand(
                        //         'inserthtml',
                        //         `<img src='${dataUrl}'/>`
                        //     );
                        // };
                    };
                },
                queryCommandState: () => {},
            };
            console.log('ueditor', ueditor);
            this.ueditor = ueditor;
        },
        beforeInit(editorId) {},
        // 获取值
        getContent() {
            this.$emit('update:content', this.ueditor.getContent());
            // return this.ueditor.getContent()
        },
    },
};
</script>
<style lang="scss">
.edui-editor {
    overflow: hidden !important;
    border-radius: 0px !important;
    border: 1px solid #e2e4ea !important;
    .edui-editor-bottomContainer td {
        border-top: 1px solid #e2e4ea !important;
    }
}
</style>