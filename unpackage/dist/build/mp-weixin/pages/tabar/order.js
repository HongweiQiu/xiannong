(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabar/order"],{"307d":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(a("46b2")),o=n(a("1a92"));function n(t){return t&&t.__esModule?t:{default:t}}var d=getApp().globalData,s=d.appid,r=d.appsecret,c=d.imgRemote,l=d.navBar,u={data:function(){return{imgRemote:c,load:!0,navBar:l,tabList:[{name:"全部"},{name:"待付款"},{name:"待发货"},{name:"待收货"},{name:"已完成"}],activeTab:1,lineShow:!1,isActive:"全部",orderTitle:"全部订单",type:1,search_default:!0,is_look:"",count:0,orderList:[],orderInfo:"",page:1,map:!1}},methods:{receiveOrder:function(e,a){var n=this,d=e;t.showModal({title:"提示",content:"是否确认收货？",success:function(e){if(e.confirm){var c=d,l=Math.round((new Date).getTime()/1e3),u={appid:s,id:c,timeStamp:l},f=i.default.hexMD5(o.default.objKeySort(u)+r),h={appid:s,timeStamp:l,id:c,sign:f};o.default.getRequests("receiveOrder",h,(function(e){200==e.data.code?(t.showToast({title:"确认收货成功",icon:"none"}),n.orderList.splice(a,1),n.orderList.length<=0&&n.orderLista()):t.showToast({title:e.data.msg,icon:"none"})}))}else e.cancel}})},play:function(e){var a=this;if(this.count++,1==this.count){setTimeout((function(){a.count=0}),1e3);var i=e;t.navigateTo({url:"/pages/order/pay?oid="+i})}},orderDetailPage:function(e,a){var i=this;this.count++,1==this.count&&(setTimeout((function(){i.count=0}),1e3),"orderDetail"==e?t.navigateTo({url:"/pages/order/orderdetail?orderItem="+a.id}):"user"==e&&(o.default.Toast("还未绑定微信,请去我的页面绑定微信"),t.navigateTo({url:"/pages/tabar/user"})))},cancelOrder:function(e,a){var n=this,d=e;t.showModal({title:"提示",content:"是否取消订单？",success:function(e){if(e.confirm){var c=d,l=Math.round((new Date).getTime()/1e3),u={appid:s,id:c,timeStamp:l},f=i.default.hexMD5(o.default.objKeySort(u)+r),h={appid:s,timeStamp:l,id:c,sign:f};o.default.getRequests("cancelOrder",h,(function(e){console.log(e),200==e.data.code?(t.showToast({title:"取消订单成功",icon:"none"}),n.orderList.splice(a,1),n.orderList.length<=0&&n.orderLista()):101==e.data.code?t.showToast({title:"订单已审核，不能取消",icon:"none"}):t.showToast({title:e.data.msg,icon:"none"})}))}else e.cancel}})},ckwl:function(e){t.showModal({title:"提示",content:"该商品由商家亲自配送 请你耐心等待！",confirmColor:"#57B127",success:function(t){t.confirm?console.log("用户点击确定"):t.cancel&&console.log("用户点击取消")}})},bd_decrypt:function(t,e){var a=3e3*Math.PI/180,i=t-.0065,o=e-.006,n=Math.sqrt(i*i+o*o)-2e-5*Math.sin(o*a),d=Math.atan2(o,i)-3e-6*Math.cos(i*a),s=n*Math.cos(d),r=n*Math.sin(d);return{lng:s,lat:r}},oneMoreTime:function(e){var a=e;t.showModal({title:"提示",content:"是否再来一单？",success:function(e){if(e.confirm){var n=a,d=Math.round((new Date).getTime()/1e3),c={appid:s,id:n,timeStamp:d},l=i.default.hexMD5(o.default.objKeySort(c)+r),u={appid:s,timeStamp:d,id:n,sign:l};o.default.getRequests("oneMoreTime",u,(function(e){console.log(e),200==e.data.code?(o.default.Toast("再来一单成功"),setTimeout((function(){t.switchTab({url:"/pages/tabar/shopcart"})}),1e3)):102==e.data.code?(o.default.Toast("有下架商品"),setTimeout((function(){t.switchTab({url:"/pages/tabar/shopcart"})}),1e3)):o.default.Toast(e.data.msg)}))}else e.cancel}})},childInfo:function(){var t=this;t.childList=[{zid:"",nickname:"当前账号"}];var e=Math.round((new Date).getTime()/1e3),a={appid:s,timeStamp:e},n=i.default.hexMD5(o.default.objKeySort(a)+r),d={appid:s,timeStamp:e,sign:n};o.default.getRequests("childInfo",d,(function(e){if(200==e.data.code)for(var a=e.data.data,i=0;i<a.length;i++)t.childList.push(a[i])}))},orderListb:function(){var t=this;t.orderList=[],t.search_default=!0;var e=t.page,a=t.type;if("全部"!=t.isActive)var n=t.isActive+1;else n="";var d=10,c=Math.round((new Date).getTime()/1e3),l={appid:s,page:e,timeStamp:c,type:a},u=i.default.hexMD5(o.default.objKeySort(l)+r),f={appid:s,page:e,timeStamp:c,num:d,sign:u,type:a,status:n};o.default.getRequests("orderList",f,(function(e){200==e.data.code&&(e.data.data.list.length>0?(t.load=!(e.data.data.list.length<=9),t.search_default=!1,t.is_look=e.data.data.is_look,t.orderInfo=e.data.data,t.orderList=e.data.data.list):(t.search_default=!1,t.load="空"))}))},orderLista:function(){var t=this;t.orderList=[],t.search_default=!0,t.load=!0;var e=t.childzid;if("全部"!=t.isActive)var a=t.isActive+1;else a="";var n=1,d=t.type,c=10,l=Math.round((new Date).getTime()/1e3),u={appid:s,page:n,timeStamp:l,type:d},f=i.default.hexMD5(o.default.objKeySort(u)+r),h={appid:s,page:n,timeStamp:l,num:c,sign:f,type:d,select_zid:e,status:a};o.default.getRequests("orderList",h,(function(e){200==e.data.code&&(e.data.data.list.length>0?(e.data.data.list.length<=9?t.load=!1:t.load=!0,t.search_default=!0,t.is_look=e.data.data.is_look,t.orderInfo=e.data.data,t.orderList=e.data.data.list):(t.search_default=!1,t.load=!0))}))},onChild:function(t){this.childtxt=t.obj.nickname,this.childzid=t.obj.zid,this.page=1,this.orderLista()},selectAccount:function(){this.$refs.account.show()},titleTab:function(t){this.orderTitle=t,this.showOrderType=!1,"未支付"==t?this.type=2:"全部订单"==t&&(this.type=1),this.page=1,this.lineShow=!1,this.activeTab=6,this.isActive="全部",this.orderLista()},changeFirst:function(t){this.load=!0,this.isActive=t,this.lineShow=!0,this.page=1,this.orderLista()},rightClick:function(){t.hideTabBar(),this.showOrderType=!0},goTop:function(){t.pageScrollTo({scrollTop:0})}},onShow:function(){var e=this;if(e.is_child=t.getStorageSync("is_child"),e.is_miniBind=t.getStorageSync("is_miniBind"),e.childList=[{zid:"",nickname:"当前账号"}],t.getStorageSync("cdj_token")){var a=d.aData.show;0==a&&(e.orderList=[],e.childtxt="当前账号",e.childzid="",e.page=1,e.type=1,e.activeTab=6,this.load=!0,this.lineShow=!1,e.orderTitle="全部订单",e.isActive="全部",e.orderListb(),e.goTop()),0==t.getStorageSync("is_child")&&e.childInfo()}else t.navigateTo({url:"/pages/account/login"})},onHide:function(){1==this.map?d.aData.show=!0:d.aData.show=!1},onReachBottom:function(){var e=this;if("全部"!=e.isActive)var a=e.isActive+1;else a="";var n=e.page,d=e.type,c=10,l=Math.round((new Date).getTime()/1e3),u={appid:s,page:n+1,timeStamp:l,type:d},f=i.default.hexMD5(o.default.objKeySort(u)+r),h={appid:s,page:n+1,timeStamp:l,num:c,sign:f,type:d,status:a};0==t.getStorageSync("is_child")&&(h.select_zid=e.childzid),o.default.getRequests("orderList",h,(function(t){if(200==t.data.code)if(""!=t.data.data.list){for(var a=0;a<t.data.data.list.length;a++)e.orderList.push(t.data.data.list[a]);e.is_look=t.data.data.is_look,e.page=n+1}else e.load=!1}))},onLoad:function(){d.aData.show=!1,t.hideTabBar()}};e.default=u}).call(this,a("543d")["default"])},"6c74":function(t,e,a){"use strict";a.d(e,"b",(function(){return o})),a.d(e,"c",(function(){return n})),a.d(e,"a",(function(){return i}));var i={mySTabs:function(){return a.e("components/s-tabs/index").then(a.bind(null,"5b6a"))},mySTab:function(){return a.e("components/s-tab/index").then(a.bind(null,"61f4"))},myLoading:function(){return a.e("components/loading/index").then(a.bind(null,"9c2f"))}},o=function(){var t=this,e=t.$createElement;t._self._c},n=[]},b45d:function(t,e,a){},cee0:function(t,e,a){"use strict";a.r(e);var i=a("307d"),o=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,(function(){return i[t]}))}(n);e["default"]=o.a},e57a:function(t,e,a){"use strict";var i=a("b45d"),o=a.n(i);o.a},f595:function(t,e,a){"use strict";(function(t){a("0c84"),a("921b");i(a("66fd"));var e=i(a("ff5c"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},ff5c:function(t,e,a){"use strict";a.r(e);var i=a("6c74"),o=a("cee0");for(var n in o)"default"!==n&&function(t){a.d(e,t,(function(){return o[t]}))}(n);a("e57a");var d,s=a("f0c5"),r=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,"b325d76a",null,!1,i["a"],d);e["default"]=r.exports}},[["f595","common/runtime","common/vendor"]]]);