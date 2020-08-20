import Vue from 'vue'
import App from './App'
import share from'./static/js/mixin_share.js';
// #ifdef MP-WEIXIN
Vue.mixin(share)
// #endif


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
