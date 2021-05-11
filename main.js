import Vue from 'vue'
import App from './App'

import {
	dianji
} from './static/js/common.js';
import {api} from './static/js/api.js';
import {getRequests,getRequest} from './static/js/request.js';
Vue.prototype.$api = api;
Vue.prototype.$gets = getRequests;
Vue.prototype.$get= getRequest;
Vue.prototype.$doubleClick = dianji;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
