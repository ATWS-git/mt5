import Vue from 'vue';
import api from './api/api';
import ElementUI from 'element-ui';
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import * as filters from './utils/filters';
import * as enums from './enums';
import validate from './utils/validate';
import configJs from './utils/configJs';

import Paging from './components/Paging.vue';
import TableMain from './components/TableMain.vue';
import DialogForm from './components/DialogForm.vue';
import UploadImgApi from './components/UploadImgApi.vue';
import UploadFile from './components/UploadFile.vue';
//import BackBtn from './components/BackBtn.vue';
import ElTable from './components/ElTable'; // 文字超出表格增加cell-tooltip-mouse-enter事件 表格增加tooltipPopperOptions参数可定义tooltip
import ElTableColumn from './components/ElTableColumn'; // 表格列增加customTooltip参数判断是否自定义tooltip
import ElMessage from './components/ElMessage'; // 增加isMouseEnterClose属性判断鼠标移入是否关闭 默认关闭
import ElDatePicker from './components/ElDatePicker'; // 时间
import ElLoading from './components/ElLoading'; // loading
import _ from 'lodash';
import UserSelect from './components/UserSelect.vue';

Vue.prototype.$axios = api;
Vue.prototype.validate = validate;
Vue.prototype.filters = filters;
Vue.prototype.configJs = configJs;

Object.keys(filters).forEach((key) => {
    Vue.filter(key, filters[key]);
});

ElementUI.Dialog.props.closeOnPressEscape = false;
ElementUI.Dialog.props.closeOnClickModal = false;
ElTable.props.emptyText = { default: '暂无内容', type: String };
ElTableColumn.props.resizable = false;
ElTableColumn.props.showOverflowTooltip = { default: true, type: Boolean };
ElementUI.Form.props.size = { default: 'small', type: String };
// ElementUI.DatePicker.props.clearable = { default: false, type: Boolean }
// ElementUI.DatePicker.props.unlinkPanels = { default: true, type: Boolean }

// console.log('ElementUI.DatePicker.props', ElementUI.DatePicker)
Vue.use(ElementUI);
Vue.component(CollapseTransition.name, CollapseTransition);
Vue.component('Paging', Paging);
Vue.component('TableMain', TableMain);
Vue.component('DialogForm', DialogForm);
Vue.component('UploadImgApi', UploadImgApi);
Vue.component('UploadFile', UploadFile);
//Vue.component('BackBtn', BackBtn);
Vue.component('ElTable', ElTable);
Vue.component('ElTableColumn', ElTableColumn);
Vue.component('ElMessage', ElMessage);
Vue.component('ElDatePicker', ElDatePicker);
Vue.component('Loading', ElLoading);
Vue.component('UserSelect', UserSelect);

Vue.prototype.$message = ElMessage;
Vue.use(ElLoading.directive);
Vue.prototype.$loading = ElLoading.service;
Vue.prototype._ = _;
Vue.prototype.$enum = enums;
