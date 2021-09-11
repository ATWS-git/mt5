<template>
    <div class="pop-box">
        <div class="pop-body">
            <p v-for="(item, index) in dropdownArr" @click="commandClick(item)" :key="index" v-text="item"></p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['dropdownArr'],
    methods: {
        commandClick(item) {
            this.$emit('command-click', item);
        },
    },
};
</script>

<style lang="scss" scoped>
.pop-box {
    position: absolute;
    width: 160px;
    top: 40px;
    right: 0;
    z-index: 999;
    .pop-body {
        box-shadow: 0 2px 10px 0 rgba(34, 34, 34, 0.2);
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 2px;
        font-size: 14px;
        color: #414654;
        margin-top: 5px;
        p {
            cursor: pointer;
            padding: 0px 15px;
            line-height: initial;
            background: #ffffff;
            height: 40px;
            box-sizing: border-box;
            line-height: 40px;
            &:first-child {
                border-top-left-radius: 2px;
                border-top-right-radius: 2px;
            }
        }
        p:hover {
            background: #f6f7fb;
        }
    }
}
</style>
