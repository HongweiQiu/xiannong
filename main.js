import Vue from 'vue'
import App from './App'

import {
	dianji
} from './static/js/common.js';
import {api} from './static/js/api.js';
import {get,post,Toast,needLogin} from './static/js/request.js';
Vue.prototype.$api = api;
Vue.prototype.$get= get;
Vue.prototype.$post= post;
Vue.prototype.$Toast= Toast;
Vue.prototype.$needLogin= needLogin;
Vue.prototype.$doubleClick = dianji;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
