<template>
    <transition name="el-loading-fade" @after-leave="handleAfterLeave">
        <div
            v-show="visible"
            class="el-loading-mask"
            :style="{ backgroundColor: background || '' }"
            :class="[customClass, { 'is-fullscreen': fullscreen }]"
        >
            <div class="el-loading-spinner">
                <template v-if="!spinner">
                    <div class="loading-anim">
                        <div class="border out"></div>
                        <div class="border in"></div>
                        <div class="border mid">
                            <i class="el-icon-loading"></i>
                        </div>
                    </div>
                </template>
                <i v-else :class="spinner"></i>
                <p v-if="text" class="el-loading-text">{{ text }}</p>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    data() {
        return {
            text: null,
            spinner: null,
            background: null,
            fullscreen: true,
            visible: false,
            customClass: '',
            loading: true,
        };
    },

    methods: {
        handleAfterLeave() {
            this.$emit('after-leave');
        },
        setText(text) {
            this.text = text;
        },
    },
};
</script>
<style lang="scss" scoped>
.loading-anim {
    position: relative;
    width: 60px;
    height: 60px;
    margin: auto;
}
.loading-anim .border {
    position: absolute;
    border-radius: 50%;
    border: 3px solid #409eff;
    box-sizing: border-box;
}
.loading-anim .out {
    //border-color: #e5b627;
    top: 0%;
    left: 0%;
    width: 100%;
    height: 100%;
    border-color: transparent;
    border-right-color: transparent;
    animation: spin 2s linear reverse infinite;
}
.loading-anim .in {
    top: 10%;
    left: 10%;
    width: 80%;
    height: 80%;
    border-color: transparent;
    //border-top-color: transparent;
    border-bottom-color: transparent;
    animation: spin 2s linear infinite;
}
.loading-anim .mid {
    border: none;
    font-size: 40px;
    img {
        width: 100%;
    }
}

@keyframes spin {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
