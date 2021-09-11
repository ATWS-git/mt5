<template>
    <el-select
        v-model="userId"
        clearable
        filterable
        remote
        default-first-option
        placeholder="请输入昵称、ID"
        :remote-method="remoteMethod"
        :loading="loading"
        size="small"
    >
        <el-option
            v-for="item in userList"
            :key="item.userId"
            :label="`${item.nickname} (${item.userId})`"
            :value="item.userId"
        >
        </el-option>
    </el-select>
</template>

<script>
import _ from 'lodash';
export default {
    props: ['value'],
    data(props) {
        return {
            userId: props.value,
            userList: [],
            loading: false,
        };
    },
    watch: {
        value(val) {
            this.userId = val;
        },
        userId(val) {
            this.$emit('input', val);
        },
    },
    methods: {
        async remoteMethod(queryString) {
            this.loading = true;
            await this.$axios
                .get('/hqlive-user/api.admin/users/queryMembers', { keyword: queryString })
                .then((res) => (this.userList = res || []));
            this.loading = false;
        },
    },
};
</script>

<style lang="scss" scoped>
.el-select {
    width: 260px !important;
    > .el-select__tags {
        width: 100%;
    }
    /deep/ .el-input {
        width: 260px !important;
    }
}
</style>