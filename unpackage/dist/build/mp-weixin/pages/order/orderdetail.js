(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/orderdetail"],{"1ecc":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={data:function(){return{imgRemote:getApp().globalData.imgRemote,time:1222,id:"",info:[],returnReason:[{reason:"不想买了"},{reason:"送达时间选错了"},{reason:"商品选多了/选错了/选漏了"},{reason:"地址错误"},{reason:"无理由"}],reason:"",orderIndex:"",addressInfo:"",totalPrice:0,feeInfo:{},freight:0,pay_type:"wxpay",showAllRefund:!0}},methods:{refundDetail:function(){e.navigateTo({})},nowPay:function(e){this.totalPrice=this.info.total_price,this.freight=this.totalPrice>this.feeInfo.over?0:this.feeInfo.freight,console.log(this.freight),this.$refs.select.open()},orderPay:function(){var t=this;e.login({provider:"weixin",success:function(n){var o={token:e.getStorageSync("userToken"),order_id:t.id,pay_type:t.pay_type,code:n.code};t.$get(t.$api.orderPay,o,(function(n){var o=n.data;1==o.code?null==o.data?(t.$Toast("支付成功"),t.getAddress(),t.getOrderDetail(t.id)):e.requestPayment({provider:"wxpay",timeStamp:o.data.timeStamp,nonceStr:o.data.nonceStr,package:o.data.package,signType:o.data.signType,paySign:o.data.paySign,success:function(e){t.$Toast("支付成功"),t.getAddress(),t.getOrderDetail(t.id)},fail:function(e){t.$Toast("支付取消")}}):t.$Toast(o.msg),t.$refs.select.close()}))}})},payWay:function(e){this.pay_type=e.detail.value},fixed:function(e){return Number(e).toFixed(2)},applyReturnMoney:function(t){e.navigateTo({url:"applyAfterSale?id="+this.id+"&returnIndex="+t})},selectReson:function(e){this.reason=e.detail},cancelOrder:function(t){var n=this;if(!this.reason)return this.$Toast("请选择退款原因");this.$showModal("确认取消订单?",(function(){var o={token:e.getStorageSync("userToken"),order_id:t,shenhe_remark:n.reason};n.$get(n.$api.orderCancel,o,(function(e){var o=e.data;1==o.code?(n.$Toast("取消订单成功"),getApp().globalData.orderIndex=n.orderIndex,n.getOrderDetail(t),n.$refs.popup.close()):n.$Toast(o.msg)}))}))},confirmReceipt:function(t){var n=this;this.$showModal("确认收货?",(function(){var o={token:e.getStorageSync("userToken"),order_id:t};n.$get(n.$api.orderReceipt,o,(function(e){var o=e.data;1==o.code?(n.$Toast("收货成功"),n.getOrderDetail(t),getApp().globalData.orderIndex=n.orderIndex):n.$Toast(o.msg)}))}))},getOrderDetail:function(t){var n=this;this.$get(this.$api.orderDetail,{token:e.getStorageSync("userToken"),order_id:t},(function(e){var t=e.data;1==t.code?(n.info=t.data,n.showAllRefund=!n.info.goods.some((function(e){return 1==e.is_refund||2==e.is_refund}))):n.$Toast(t.msg)}))},getAddress:function(){var t=this,n={token:e.getStorageSync("userToken")};this.$get(this.$api.userInfo,n,(function(e){var n=e.data;1==n.code&&(t.addressInfo=n.data)}))},getFreight:function(){var e=this;this.$get(this.$api.mainFreight,{},(function(t){var n=t.data;1==n.code&&(e.feeInfo=n.data)}))}},onLoad:function(e){this.id=e.id,this.orderIndex=e.index,this.getOrderDetail(e.id),this.getAddress(),this.getFreight()}};t.default=n}).call(this,n("543d")["default"])},"54fc":function(e,t,n){"use strict";n.r(t);var o=n("7f5e"),r=n("a28f");for(var a in r)"default"!==a&&function(e){n.d(t,e,(function(){return r[e]}))}(a);n("e03a");var i,s=n("f0c5"),d=Object(s["a"])(r["default"],o["b"],o["c"],!1,null,"508faba6",null,!1,o["a"],i);t["default"]=d.exports},"71e6":function(e,t,n){},"7f5e":function(e,t,n){"use strict";n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}));var o={uniPopup:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-popup/uni-popup")]).then(n.bind(null,"1f85"))}},r=function(){var e=this,t=e.$createElement,n=(e._self._c,/2|3|4|5|6/.test(e.info.order_status)),o=n?/2|3/.test(e.info.order_status):null,r=/3|4/.test(e.info.order_status),a=e.__map(e.info.goods,(function(t,n){var o=e.__get_orig(t),a=r?/0|3|4/.test(t.is_refund):null;return{$orig:o,g3:a}})),i=(Number(e.info.total_price)+Number(e.info.freight)).toFixed(2),s=e.$fomartDate(e.info.createtime),d=e.info.delivery_time?e.$fomartDate(e.info.delivery_time).substr(0,10):null,f=e.info.refund_time?e.$fomartDate(e.info.refund_time):null,u=/4|5/.test(e.info.order_status),c=/3|4/.test(e.info.order_status),l=e.fixed(e.addressInfo.money),g=parseFloat(e.totalPrice),p=parseFloat(e.freight);e._isMounted||(e.e0=function(t){return e.$refs.popup.open()},e.e1=function(t){return e.$refs.select.close()}),e.$mp.data=Object.assign({},{$root:{g0:n,g1:o,g2:r,l0:a,g4:i,m0:s,g5:d,m1:f,g6:u,g7:c,m2:l,m3:g,m4:p}})},a=[]},"7fe3":function(e,t,n){"use strict";(function(e){n("0450"),n("921b");o(n("66fd"));var t=o(n("54fc"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},a28f:function(e,t,n){"use strict";n.r(t);var o=n("1ecc"),r=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=r.a},e03a:function(e,t,n){"use strict";var o=n("71e6"),r=n.n(o);r.a}},[["7fe3","common/runtime","common/vendor"]]]);