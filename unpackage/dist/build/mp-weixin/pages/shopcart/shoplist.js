(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shopcart/shoplist"],{"27b2":function(t,e,n){},"4ac2":function(t,e,n){"use strict";var r=n("27b2"),a=n.n(r);a.a},"662e":function(t,e,n){"use strict";var r;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return r}));var a=function(){var t=this,e=t.$createElement,n=(t._self._c,t.__map(t.shop,(function(e,n){var r=t.__get_orig(e),a=t.fixed(e.sku.market_price*e.buy_num);return{$orig:r,m0:a}}))),r=t.fixed(t.totalPrice),a=t.fixed(t.freight?t.freight:0),o=t.fixed(t.totalPrice+parseFloat(t.freight)),i=t.fixed(t.addressInfo.money),c=parseFloat(t.freight),s=t.fixed(t.totalPrice+parseFloat(t.freight));t.$mp.data=Object.assign({},{$root:{l0:n,m1:r,m2:a,m3:o,m4:i,m5:c,m6:s}})},o=[]},ce4a:function(t,e,n){"use strict";(function(t){n("0c84"),n("921b");r(n("66fd"));var e=r(n("f256"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},dc93:function(t,e,n){"use strict";n.r(e);var r=n("e4dd"),a=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);e["default"]=a.a},e4dd:function(t,e,n){"use strict";(function(t){function r(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=a(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,s=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return c=t.done,t},e:function(t){s=!0,i=t},f:function(){try{c||null==n.return||n.return()}finally{if(s)throw i}}}}function a(t,e){if(t){if("string"===typeof t)return o(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?o(t,e):void 0}}function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var c=function(){n.e("components/gpp-datePicker/gpp-datePicker").then(function(){return resolve(n("9130"))}.bind(null,n)).catch(n.oe)},s=getApp().globalData,u=s.imgRemote,f={components:{gppDatePicker:c},data:function(){var t;return t={startDate:"2021-05-15",endDate:"2022-09-09",pickerDate:"2021-05-16",visible:!1,addressInfo:{},imgRemote:u,shop:[],totalPrice:""},i(t,"visible",!1),i(t,"feeInfo",""),i(t,"freight",""),i(t,"showSwitch",!1),i(t,"pay_type","wxpay"),i(t,"remark",""),t},methods:{getTomorrow:function(){function t(t){return t<10?"0"+t:t}var e=new Date,n=e.getFullYear(),r=e.getMonth()+parseInt(1),a=e.getDate()+parseInt(1);this.startDate="".concat(n,"-").concat(t(r),"-").concat(t(a)),this.pickerDate="".concat(n,"-").concat(t(r),"-").concat(t(a)),this.endDate="".concat(n+2,"-12-31")},confirmDate:function(t){this.pickerDate=t.dateValue},payWay:function(t){this.pay_type=t.detail.value},confirmPay:function(){var e,n=this,a="",o=r(this.shop);try{for(o.s();!(e=o.n()).done;){var i=e.value;1==i.checked&&(a+=i.id+",")}}catch(y){o.e(y)}finally{o.f()}var c=a.substring(0,a.length-1),s=this.addressInfo,u=s.province,f=s.city,d=s.area,l=s.address,h=s.shou_name,p=s.shou_phone,g=s.tax_name,m=s.tax_num;if(!u)return this.$Toast("请先填写收货地址");if(!h&&!p)return this.$Toast("请先填写收货人和收货人电话");if(this.showSwitch){if(!g&&!m)return this.$Toast("发票信息不能为空")}else g="",m="";var v={token:t.getStorageSync("userToken"),province:u,city:f,area:d,address:l,shou_name:h,shou_phone:p,tax_name:g,tax_num:m,cart_ids:c,freight:this.freight,pay_type:this.pay_type,total:this.totalPrice,remark:this.remark,delivery_time:this.pickerDate};this.$get(this.$api.orderAdd_order,v,(function(e){var r=e.data;1==r.code?(n.$Toast("提交订单成功"),setTimeout((function(){t.reLaunch({url:"./paySuccess",success:function(){getApp().globalData.isReload=!0}})}),1e3)):n.$Toast(r.msg)}))},pay:function(){var t=this;t.$showModal("确认提交订单?",(function(){t.confirmPay()}))},switchChange:function(t){this.showSwitch=t.target.value},fixed:function(t){return 0==t?"0.00":parseFloat(t).toFixed(2)},modifyAddress:function(){t.navigateTo({url:"./delivery"})},getFreight:function(){var t=this;this.$get(this.$api.mainFreight,{},(function(e){var n=e.data;1==n.code&&(t.feeInfo=n.data,t.freight=t.totalPrice>n.data.over?0:n.data.freight)}))},getAddress:function(){var e=this,n={token:t.getStorageSync("userToken")};this.$get(this.$api.userInfo,n,(function(t){var n=t.data;1==n.code&&(e.addressInfo=n.data)}))}},onShow:function(){this.getAddress()},onLoad:function(e){this.getTomorrow(),this.shop=t.getStorageSync("selectGoods");var n,a=0,o=r(this.shop);try{for(o.s();!(n=o.n()).done;){var i=n.value;a+=i.buy_num*i.sku.market_price}}catch(c){o.e(c)}finally{o.f()}this.totalPrice=a,this.getFreight()}};e.default=f}).call(this,n("543d")["default"])},f256:function(t,e,n){"use strict";n.r(e);var r=n("662e"),a=n("dc93");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("4ac2");var i,c=n("f0c5"),s=Object(c["a"])(a["default"],r["b"],r["c"],!1,null,"42f5b8a6",null,!1,r["a"],i);e["default"]=s.exports}},[["ce4a","common/runtime","common/vendor"]]]);