(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/pay"],{"26ce":function(t,a,e){"use strict";(function(t){Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var n=i(e("4b89")),o=i(e("d07b"));function i(t){return t&&t.__esModule?t:{default:t}}var r=getApp().globalData,u=r.appid,c=r.appsecret,d=(r.imgRemote,r.navBar),s={data:function(){return{navBar:d,oid:"",payOrder:"",is_miniBind:t.getStorageSync("is_miniBind")}},methods:{leftClick:function(){t.navigateBack({delta:1})},payOrdera:function(){var a=this,e=a.oid,i="mini",r=Math.round((new Date).getTime()/1e3),d={appid:u,oid:e,type:i,timeStamp:r},s=n.default.hexMD5(o.default.objKeySort(d)+c),f={appid:u,oid:e,type:i,timeStamp:r,sign:s};o.default.postRequests("payOrder",f,(function(e){200==e.data.code?a.payOrder=e.data.data:406==e.data.code?t.showToast({title:"请先绑定微信",icon:"none"}):t.showToast({title:e.data.msg,icon:"none"})}))},querenchongzhi:function(){console.log("微信支付");var a=this;t.requestPayment({provider:"wxpay",orderInfo:a.payOrder.wxParams,timeStamp:a.payOrder.wxParams.timeStamp,nonceStr:a.payOrder.wxParams.nonceStr,package:a.payOrder.wxParams.package,signType:a.payOrder.wxParams.signType,paySign:a.payOrder.wxParams.paySign,success:function(a){o.default.Toast("充值成功"),setTimeout((function(){t.switchTab({url:"/pages/tabar/order"})}),1e3)},fail:function(t){console.log(t),o.default.Toast("充值失败")}})},goPay:function(){var a=this,e=a.oid,i=Math.round((new Date).getTime()/1e3),r={appid:u,id:e,timeStamp:i},d=n.default.hexMD5(o.default.objKeySort(r)+c),s={appid:u,id:e,timeStamp:i,sign:d};o.default.postRequests("balancePay",s,(function(a){200==a.data.code&&(t.showToast({title:"支付成功",duration:2e3,icon:"none"}),setTimeout((function(){t.switchTab({url:"/pages/tabar/index"})}),1e3)),400==a.data.code&&t.showToast({title:a.data.msg,duration:2e3,icon:"none"}),500==a.data.code&&t.showToast({title:"网络错误",duration:2e3,icon:"none"})}))}},onLoad:function(t){this.oid=t.oid},onShow:function(){this.payOrdera(),r.aData.show=!1}};a.default=s}).call(this,e("543d")["default"])},"3fc5":function(t,a,e){"use strict";(function(t){e("1995"),e("921b");n(e("66fd"));var a=n(e("eb3d"));function n(t){return t&&t.__esModule?t:{default:t}}t(a.default)}).call(this,e("543d")["createPage"])},"4fc1":function(t,a,e){"use strict";e.r(a);var n=e("26ce"),o=e.n(n);for(var i in n)"default"!==i&&function(t){e.d(a,t,(function(){return n[t]}))}(i);a["default"]=o.a},"4ff0":function(t,a,e){"use strict";var n={"uni-nav-bar":function(){return e.e("components/uni-nav-bar/uni-nav-bar").then(e.bind(null,"f858"))}},o=function(){var t=this,a=t.$createElement;t._self._c},i=[];e.d(a,"b",(function(){return o})),e.d(a,"c",(function(){return i})),e.d(a,"a",(function(){return n}))},c4c3:function(t,a,e){},c634:function(t,a,e){"use strict";var n=e("c4c3"),o=e.n(n);o.a},eb3d:function(t,a,e){"use strict";e.r(a);var n=e("4ff0"),o=e("4fc1");for(var i in o)"default"!==i&&function(t){e.d(a,t,(function(){return o[t]}))}(i);e("c634");var r,u=e("f0c5"),c=Object(u["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);a["default"]=c.exports}},[["3fc5","common/runtime","common/vendor"]]]);