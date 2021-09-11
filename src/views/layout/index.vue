<template>
    <div class="mt5-content">
        <a-layout class="Launcher">
            <div class="ConfirmModal"></div>
            <a-layout-header class="Launcher-header">
                <a-row>
                    <a-col :span="18" class="Launcher-header-nav">
                        <div class="logo">
                            <a href="http://www.charlesforex.com" target="_blank"
                                ><img
                                    src="https://v4-common.zhcoke.com/default/4/1bb73cd3-bb65-4a07-9da7-003d0e76af92.png"
                                    alt="Charles Schwab Corporation"
                            /></a>
                        </div>
                        <a-menu v-model="current" mode="horizontal" class="Launcher-menu-header">
                            <a-menu-item key="1"> 首页 </a-menu-item>
                            <a-menu-item key="2"> 资金 </a-menu-item>
                            <a-menu-item key="3"> 交易 </a-menu-item>
                            <a-menu-item key="4"> 推广 </a-menu-item>
                            <a-menu-item key="5"> 下载 </a-menu-item>
                        </a-menu>
                    </a-col>
                    <a-col :span="6">
                        <div class="Launcher-shortcuts navigation">
                            <a-menu class="LANG Client" v-model="current" mode="horizontal">
                                <a-sub-menu>
                                    <span slot="title" class="submenu-title-wrapper">
                                        <div class="i18nSelector">
                                            <i
                                                class="
                                                    anticon anticon-language
                                                    i18nSelector-item-text
                                                "
                                            ></i>
                                        </div>
                                    </span>
                                    <a-menu-item-group class="LANG Client" title="Item 1">
                                        <a-menu-item key="setting:1"> Option 1 </a-menu-item>
                                        <a-menu-item key="setting:2"> Option 2 </a-menu-item>
                                    </a-menu-item-group>
                                </a-sub-menu>
                                <a-menu-item class="NOTICE" key="5">
                                    <div class="Badge">
                                        <a href="/notification/message/all">
                                            <a-icon style="margin-left: 8px" type="news" />
                                        </a>
                                    </div>
                                </a-menu-item>
                                <a-sub-menu class="ACCOUNT Client">
                                    <span slot="title" class="submenu-title-wrapper">
                                        <a href="/setting/universal/personal"
                                            ><span
                                                ><img
                                                    class="Avatar Avatar-small"
                                                    src="https://v4-common.fincdn.com/crmv4/1602869672093.png"
                                                    style="margin-bottom: 0.2rem" /></span
                                        ></a>
                                    </span>
                                    <a-menu-item-group title="Item 1">
                                        <a-menu-item key="setting:1"> Option 1 </a-menu-item>
                                        <a-menu-item key="setting:2"> Option 2 </a-menu-item>
                                    </a-menu-item-group>
                                </a-sub-menu>
                            </a-menu>
                        </div>
                    </a-col>
                </a-row>
            </a-layout-header>
        </a-layout>
    </div>
</template>
<script>
export default {
    props: {},
    components: {},
    watch: {},
    computed: {},
    created() {},
    mounted() {},
    data() {
        return {
            current: ['1'],
        };
    },
    methods: {},
};
</script>
<style lang="scss" scoped>
.mt5-content {
    width: 100%;
    height: 100%;
    min-width: 1366px;
}
</style>
