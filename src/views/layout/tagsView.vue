<template>
    <div class="tagViews">
        <span @click="setNavLeft" class="cur left-tabs">
            <i style="font-size: 16px; line-height: 40px" class="el-icon-d-arrow-left"></i>
        </span>
        <el-tabs
            :value="editableTabsValue"
            type="card"
            closable
            @tab-remove="removeTab"
            @tab-click="tabClick"
        >
            <el-tab-pane
                v-for="(item, index) in tagList"
                :index="index"
                :key="item.path"
                :label="item.name"
                :name="item.path"
            >
                <!-- <template v-if="item.name === '首页'" style="display: inline-block;" slot="label">
                    <i class="iconfont iconzhuye-shouyebeifen"></i>
                </template> -->
            </el-tab-pane>
        </el-tabs>
        <span
            @click="setNavRight"
            class="cur right-tabs"
            style="right: 40px; border-left: 1px solid #e4e7ed"
        >
            <i style="font-size: 16px; line-height: 40px" class="el-icon-d-arrow-right"></i>
        </span>
        <span style="border-left: 1px solid #e4e7ed" class="cur right-tabs">
            <el-dropdown @command="handleCommand">
                <span>
                    <i style="font-size: 16px; line-height: 40px" class="el-icon-arrow-down"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="当前">关闭当前标签页</el-dropdown-item>
                    <el-dropdown-item command="其他">关闭其他标签页</el-dropdown-item>
                    <el-dropdown-item command="全部">关闭全部标签页</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </span>
    </div>
</template>
<script>
export default {
    mounted() {},
    watch: {},
    data() {
        return {};
    },
    computed: {
        tagList() {
            return [
                {
                    name: '首页',
                    path: '/',
                },
                ...this.editableTabs,
            ];
        },
        editableTabsValue() {
            return this.$route.query.activePath || this.realPath;
        },
    },
    methods: {
        tabClick(tab, event) {
            if (tab.name === this.realPath) return;

            // let [{ children }] = this.$router.options.routes;

            // for (let i in children) {
            //     if (children[i].path === tab.name) {
            //         children[i].meta.keepAlive = true;
            //     }
            // }

            this.$router.push(tab.name);
        },
        removeTab(tab) {
            //this.$destroy();
            console.log(this);
            const path = tab;
            for (let i = 0; i < this.editableTabs.length; i += 1) {
                const item = this.editableTabs[i];
                if (item.path === path) {
                    if (path === this.editableTabsValue) {
                        let nextTab = this.editableTabs[i + 1] || this.editableTabs[i - 1];
                        if (nextTab) {
                            this.$router.push(nextTab.path);
                        } else {
                            this.$router.push('/');
                        }
                    }
                    console.log(item);
                    //this.$emit('clearCache');
                    this.$delete(this.editableTabs, i);
                }
            }
        },
        handleCommand(command) {
            switch (command) {
                case '当前':
                    this.removeTab(this.editableTabsValue);
                    break;
                case '其他':
                    for (let i = 0; i < this.editableTabs.length; i += 1) {
                        const item = this.editableTabs[i];
                        if (item.path === this.editableTabsValue) {
                            this.$emit('update:editableTabs', [item]);
                        }
                    }
                    break;
                case '全部':
                    this.$router.push('/');
                    this.$emit('update:editableTabs', []);
                    break;
                default:
                    break;
            }
        },
        setNavLeft() {
            if (document.getElementsByClassName('el-tabs__nav-prev').length === 0) return;
            let nav_prev = document.getElementsByClassName('el-tabs__nav-prev')[0];
            nav_prev.click();
        },
        setNavRight() {
            if (document.getElementsByClassName('el-tabs__nav-next').length === 0) return;
            let nav_next = document.getElementsByClassName('el-tabs__nav-next')[0];
            nav_next.click();
        },
    },
    watch: {},
    props: {
        editableTabs: {
            type: Array,
            default() {
                return [];
            },
        },
        realPath: String,
    },
};
</script>
<style lang="scss" scoped>
.tagViews {
    z-index: 10;
    background: #fff;
    position: relative;
    height: 40px;
    overflow: hidden;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.1);
    .left-tabs {
        position: absolute;
        width: 40px;
        z-index: 9;
        height: 40px;
        line-height: 40px;
        background: #fff;
        text-align: center;
        i {
            color: #656b7b;
        }
    }
    .right-tabs {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 9;
        height: 40px;
        line-height: 40px;
        width: 40px;
        background: #fff;
        text-align: center;
        i {
            color: #656b7b;
        }
    }
    .left-tabs:hover {
        background: #f2f4fa;
    }
    .right-tabs:hover {
        background: #f2f4fa;
    }
}
</style>
<style lang="scss">
.tagViews .el-tabs {
    height: 40px;
    line-height: 40px;
    padding: 0px 80px 0 40px !important;
}
.tagViews {
    .el-tabs--card > .el-tabs__header {
        margin: 0;
        border-bottom: 0;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-closable:hover {
        padding-left: 15px !important;
        padding-right: 15px !important;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-closable {
        padding-left: 15px !important;
        padding-right: 15px !important;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item:first-child > span {
        display: none !important;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-closable:first-child {
        padding-right: 15px !important;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
        padding-right: 15px !important;
        color: #111626;
        background: #f2f4fa;
        border-top: 2px solid #1890ff;
        box-sizing: border-box;
    }
    .el-tabs__item .el-icon-close {
        font-size: 14px !important;
        overflow: inherit !important;
        position: relative;
        width: 16px !important;
        height: 16px !important;
        line-height: 16px !important;
        color: #858b9c;
        top: 0px !important;
        &:hover {
            color: #fff;
            background-color: #f82525;
        }
        &:before {
            transform: scale(1);
            position: absolute;
            left: 1px;
            top: 0;
        }
    }

    .el-tabs--border-card > .el-tabs__content {
        display: none;
    }
    .el-tabs__nav-scroll {
        background: #fff;
    }
    .el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
        background: #f6f6f6;
    }
    .el-tabs__item {
        padding: 0 15px;
        color: #656b7b;
        height: 40px;
        line-height: 40px;
        box-sizing: border-box;
        border-top: 2px solid white;
        border-bottom: 0 !important;
        display: inline-flex;
        align-items: center;
        vertical-align: top;
        min-width: 40px;
        justify-content: center;
        &:hover {
        }
    }
    .el-tabs__item.is-active {
        background: #f6f6f6;
        color: #000;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
        border-bottom: none;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-closable:hover {
        // background: #f6f6f6;
        // border-top: 2px solid #f6f6f6;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__nav {
        border-radius: 0;
        border-top: none;
        height: 40px;
    }

    .el-tabs__nav-prev {
        width: 40px;
        z-index: -1;
        opacity: 0;
    }
    .el-tabs__nav-next {
        width: 40px;
        z-index: -1;
        opacity: 0;
    }
    .el-tabs__nav-wrap.is-scrollable {
        padding: 0;
    }
}
</style>
