import Vue from 'vue'
import App from './App'
import doubleClick from'./static/js/request.js';
// #ifdef MP-WEIXIN
Vue.mixin(doubleClick)
// #endif


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
