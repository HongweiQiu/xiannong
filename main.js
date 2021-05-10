import Vue from 'vue'
import App from './App'

import {
	dianji
} from './static/js/common.js'
Vue.prototype.$doubleClick = dianji;
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
