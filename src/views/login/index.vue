<template>
    <div class="Login">
        <div class="Login-body">
            <!-- <div class="Login-left">
                <p class="Login-left-title">
                    <span>平台管理系统</span>
                </p>
                <p class="Login-left-banner">
                    <img src="../../assets/image/login/banner.png" />
                </p>
            </div>-->
            <div class="Login-right">
                <div :class="`el-message el-message--${errorMsgType} err-text`" v-if="errorMsg">
                    <i :class="`el-message__icon el-icon-${errorMsgType}`"></i>
                    <p class="el-message__content">{{ errorMsg }}</p>
                </div>
                <p class="Login-right-title">
                    <img src="../../assets/image/imgIcon.png" alt />
                    花千直播
                </p>
                <p class="Login-right-account">账号登录</p>
                <div class="Login-right-form">
                    <div
                        :class="`Login-right-form-inputdiv ${
                            focusActive === 'account' ? 'is_active' : ''
                        } ${errorActive === 'account' ? 'iserror_active' : ''}`"
                    >
                        <p class="inputdiv-icon">
                            <i class="icon icon-login-user"></i>
                        </p>
                        <el-input
                            type="username"
                            v-model.trim="account"
                            class="inputdiv-input"
                            placeholder="请输入账号"
                            @keyup.enter.native="nextFocus(0)"
                            ref="account"
                            @focus="onfocus('account')"
                            @blur="focusActive = null"
                        ></el-input>
                        <p v-show="vail1" class="info-tips">账号不能为空</p>
                    </div>
                    <div
                        :class="`Login-right-form-inputdiv ${
                            focusActive === 'password' ? 'is_active' : ''
                        } ${errorActive === 'password' ? 'iserror_active' : ''}`"
                    >
                        <p class="inputdiv-icon">
                            <i class="icon icon-login-pwd"></i>
                        </p>
                        <el-input
                            type="password"
                            v-model.trim="password"
                            class="inputdiv-input"
                            placeholder="请输入密码"
                            @keyup.enter.native="nextFocus(1)"
                            ref="password"
                            @focus="onfocus('password')"
                            @blur="focusActive = null"
                        ></el-input>
                        <p v-show="vail2" class="info-tips">密码不能为空</p>
                    </div>
                    <div
                        :class="`Login-right-form-inputdiv ${
                            focusActive === 'captcha' ? 'is_active' : ''
                        } ${errorActive === 'captcha' ? 'iserror_active' : ''}`"
                    >
                        <p class="inputdiv-icon">
                            <i class="icon icon-login-cap"></i>
                        </p>
                        <el-input
                            type="text"
                            class="inputdiv-input"
                            v-model.trim="captcha"
                            placeholder="请输入验证码"
                            @keyup.enter.native="nextFocus(-1)"
                            ref="captcha"
                            @focus="onfocus('captcha')"
                            @blur="focusActive = null"
                            maxlength="12"
                        ></el-input>
                        <p @click="changeImage" class="inputdiv-captchaImg">
                            <img :src="codeSrc" />
                        </p>
                        <p v-show="vail3" class="info-tips">验证码不能为空</p>
                    </div>
                    <el-button
                        @click="login"
                        :loading="loginBtnLoading"
                        type="primary"
                        class="Login-right-form-btn"
                    >登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { encryption } from '@/utils';
export default {
    components: {},
    data() {
        return {
            account: '',
            password: '',
            captcha: '',
            errorMsg: '',
            errorMsgType: 'error', // 提示类型
            timer: null,
            codeSrc: null,
            loginBtnLoading: false,
            focusActive: null, // 当前焦点
            errorActive: null, // 当前错误  ---暂时不加
            vail1: false,
            vail2: false,
            vail3: false,
            uuid: null,
        };
    },
    computed: {},
    created() {
        this.changeImage();
    },
    mounted() {},
    methods: {
        nextFocus(index) {
            const type = ['account', 'password', 'captcha']; //
            let isNull = false;
            for (let i = 0; i < type.length; i++) {
                const n = (index + i + 1) % 3;
                if (!this[type[n]] && !isNull) {
                    this.$refs[type[n]].focus();
                    isNull = true;
                    break;
                }
            }
            if (!isNull) this.login();
        },
        onfocus(type) {
            if (type === 'account') this.vail1 = false;
            if (type === 'password') this.vail2 = false;
            if (type === 'captcha') this.vail3 = false;
            this.focusActive = type;
        },
        changeImage() {
            this.$axios.get('/hqlive-auth/oauth/captcha').then((res) => {
                this.codeSrc = res.img;
                this.uuid = res.uuid;
            });
            //this.codeSrc = this.$axios.baseURL + '/hqlive-auth/oauth/captcha?' + Number(new Date());
        },
        submit() {
            this.loginBtnLoading = true;
            const formData = new FormData();
            formData.append('username', this.account);
            formData.append('password', encryption(this.password));
            formData.append('grant_type', 'imageCode'); //password
            formData.append('imageCode', this.captcha);
            formData.append('uuid', this.uuid);

            this.$axios
                .post('/hqlive-auth/oauth/token', formData, { handleErrorFlag: false })
                .then((res) => {
                    this.$message({
                        message: '登录成功',
                        type: 'success',
                    });
                    res.access_token = res.token;
                    this.configJs.setStorage('access_token', res.access_token);
                    this.$store.commit('setUserInfo', {});
                    this.configJs.removeStorage('user_info');
                    this.configJs.setStorage('user_info', JSON.stringify(res.messages));
                    this.$store.dispatch('GetMenu');
                    if (
                        this.$route.query.redirect &&
                        this.$route.query.redirect.indexOf('/login') == -1
                    ) {
                        this.$router.push(this.$route.query.redirect);
                    } else {
                        this.$router.push('/');
                    }

                    this.loginBtnLoading = false;
                })
                .catch((err) => {
                    if (err.code !== 11801) {
                        this.changeImage();
                    }
                    const errStr = err.msg || '';
                    let errMsg = errStr.slice(errStr.indexOf(':') + 1);
                    if (err.code < 0) {
                        errMsg = '';
                    }
                    this.$message.error(errMsg);
                    // if (errMsg) {
                    //     this.getErrorMsg(errMsg);
                    // }
                    this.loginBtnLoading = false;
                });
        },
        login() {
            if (this.account === '') {
                //this.getErrorMsg('请输入账号');
                this.vail1 = true;
                //return;
            }
            if (this.password === '') {
                // this.getErrorMsg('请输入密码');
                this.vail2 = true;
                //return;
            }
            if (this.captcha === '') {
                //this.getErrorMsg('请输入验证码');
                this.vail3 = true;
                //return;
            }
            if (this.vail1 || this.vail2 || this.vail3) return;

            this.submit();
        },
        getErrorMsg(msg) {
            this.errorMsg = msg;
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.errorMsg = '';
            }, 1200);
        },
    },
};
</script>
<style lang="scss" scoped>
.Login {
    height: 100%;
    background: #ffffff;
    overflow: hidden;
    position: relative;
    .Login-body {
        height: 560px;
        width: 1080px;
        margin: auto;
        padding: 40px;
        box-sizing: border-box;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        //display: flex;
        .Login-left {
            width: 50%;
            &-title {
                font-size: 27px;
                color: #001529;
                font-weight: bold;
                img {
                    margin-right: 10px;
                }
            }
            &-banner {
                width: 440px;
                margin: 44px 0 0 60px;
            }
        }
        .Login-right {
            width: 410px;
            padding: 20px;
            margin: auto;
            border: 1px solid #eee;
            border-radius: 10px;
            .err-text {
                position: absolute;
                left: 50%;
                top: 10px;
                transform: translateX(-50%);
                transition: opacity 0.3s, transform 0.4s, top 0.4s;
            }
            &-title {
                letter-spacing: 1px;
                font-size: 30px;
                color: #687a97;
                text-align: center;
                font-weight: bold;
                margin-bottom: 40px;
                height: 98px;
                line-height: 98px;
            }
            &-account {
                margin: 10px 0;
                color: #c367fd;
                font-weight: 600;
            }
            &-form {
                &-inputdiv {
                    height: 44px;
                    background: #ffffff;
                    border: 1px solid #ebedf3;
                    border-radius: 3px;
                    display: flex;
                    margin-bottom: 20px;
                    transition: 0.2s;
                    box-sizing: border-box;
                    //overflow: hidden;
                    position: relative;
                    &:hover {
                        border: 1px solid #bbdaff;
                        .inputdiv-icon {
                            background: rgba(29, 133, 255, 0.1);
                            border-right: 1px solid #bbdaff;
                        }
                    }
                    &.is_active {
                        border: 1px solid #c367fd;
                        .inputdiv-icon {
                            background: #c367fd;
                            border-right: 1px solid #c367fd;
                        }
                        .inputdiv-input {
                            /deep/ .el-input__inner {
                                background: #f3f9ff;
                            }
                        }
                        .inputdiv-captchaImg {
                            background: #f3f9ff;
                        }
                    }
                    &.iserror_active {
                        border: 1px solid #f82525;
                        .inputdiv-icon {
                            background: #fef4f4;
                            border-right: 1px solid #f82525;
                        }
                        .inputdiv-input {
                            /deep/ .el-input__inner {
                                background: #fef4f4;
                            }
                        }
                        .inputdiv-captchaImg {
                            background: #fef4f4;
                        }
                    }
                    .inputdiv-icon {
                        height: 100%;
                        width: 44px;
                        box-sizing: border-box;
                        transition: 0.2s;
                        flex-shrink: 0;
                        background: #f9fafe;
                        border-right: 1px solid #ebedf3;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .inputdiv-input {
                        height: 100%;
                        transition: 0.2s;
                        /deep/ .el-input__inner {
                            height: 100%;
                            transition: 0.2s;
                            border-radius: 0px;
                            border: none;
                            padding-left: 14px;
                            padding-right: 14px;
                            color: #111626;
                            &:focus {
                                box-shadow: none;
                            }
                        }
                    }
                    .inputdiv-captchaImg {
                        height: 100%;
                        // width: 80px;
                        flex-shrink: 0;
                        padding-right: 7px;
                        cursor: pointer;
                        display: flex;
                        align-items: center;
                        img {
                            width: 80px;
                            height: 30px;
                        }
                    }
                }
                &-btn {
                    width: 100%;
                    margin-top: 30px;
                    height: 44px;
                    background-image: linear-gradient(90deg, #c367fd 0%, #c367fd 100%);
                    box-shadow: 0 6px 12px 0 rgba(29, 133, 255, 0.2);
                    border-radius: 4px;
                    border: none;
                }
            }
        }
    }
}
.info-tips {
    position: absolute;
    bottom: -18px;
    font-size: 12px;
    color: red;
}
</style>