(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabar/order","components/uni-notice-bar/uni-notice-bar"],{"3a48":function(t,e,a){"use strict";var n={"uni-icons":function(){return Promise.all([a.e("common/vendor"),a.e("components/uni-icons/uni-icons")]).then(a.bind(null,"4ac6"))}},i=function(){var t=this,e=t.$createElement;t._self._c},o=[];a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}))},"3dcf":function(t,e,a){"use strict";var n={"uni-nav-bar":function(){return a.e("components/uni-nav-bar/uni-nav-bar").then(a.bind(null,"f858"))},"uni-icons":function(){return Promise.all([a.e("common/vendor"),a.e("components/uni-icons/uni-icons")]).then(a.bind(null,"4ac6"))},"my-s-tabs":function(){return a.e("components/s-tabs/index").then(a.bind(null,"b4d7"))},"my-s-tab":function(){return a.e("components/s-tab/index").then(a.bind(null,"68be"))},"my-loading":function(){return a.e("components/loading/index").then(a.bind(null,"efc6"))},"w-picker":function(){return a.e("components/w-picker/w-picker").then(a.bind(null,"3258"))},"my-tabar":function(){return a.e("components/tabar/index").then(a.bind(null,"abb6"))},"my-mask":function(){return a.e("components/mask/index").then(a.bind(null,"5fde"))}},i=function(){var t=this,e=t.$createElement;t._self._c},o=[];a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}))},5643:function(t,e,a){"use strict";var n=a("da09"),i=a.n(n);i.a},"694c":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o(a("4b89")),i=o(a("d07b"));o(a("d616"));function o(t){return t&&t.__esModule?t:{default:t}}var d=getApp().globalData,c=d.appid,r=d.appsecret,s=d.imgRemote,u=d.navBar,l=function(){a.e("components/w-picker/w-picker").then(function(){return resolve(a("3258"))}.bind(null,a)).catch(a.oe)},f={components:{wPicker:l},data:function(){return{masktabar:!1,is_child:"",is_miniBind:"",imgRemote:s,load:!0,navBar:u,tabList:[{name:"待审核"},{name:"备货中"},{name:"配送中"},{name:"已收货"},{name:"已取消"}],activeTab:1,lineShow:!1,showOrderType:!1,childListProps:{label:"nickname",value:"zid"},childList:[{zid:"",nickname:"当前账号"}],childzid:"",childtxt:"当前账号",isActive:"全部",orderTitle:"全部订单",type:1,search_default:!0,is_look:"",count:0,orderList:[],orderInfo:"",page:1,map:!1}},methods:{closemask:function(){this.showOrderType=!1},receiveOrder:function(e,a){var o=this,d=e;t.showModal({title:"提示",content:"是否确认收货？",success:function(e){if(e.confirm){var s=d,u=Math.round((new Date).getTime()/1e3),l={appid:c,id:s,timeStamp:u},f=n.default.hexMD5(i.default.objKeySort(l)+r),h={appid:c,timeStamp:u,id:s,sign:f};i.default.getRequests("receiveOrder",h,(function(e){200==e.data.code?(t.showToast({title:"确认收货成功",icon:"none"}),o.orderList.splice(a,1),o.orderList.length<=0&&o.orderLista()):t.showToast({title:e.data.msg,icon:"none"})}))}else e.cancel}})},play:function(e){var a=this;if(this.count++,1==this.count){setTimeout((function(){a.count=0}),1e3);var n=e;t.navigateTo({url:"/pages/order/pay?oid="+n})}},orderDetailPage:function(e,a){var n=this;this.count++,1==this.count&&(setTimeout((function(){n.count=0}),1e3),"orderDetail"==e?t.navigateTo({url:"/pages/order/orderdetail?orderItem="+a.id}):"user"==e&&(i.default.Toast("还未绑定微信,请去我的页面绑定微信"),t.navigateTo({url:"/pages/tabar/user"})))},cancelOrder:function(e,a){var o=this,d=e;t.showModal({title:"提示",content:"是否取消订单？",success:function(e){if(e.confirm){var s=d,u=Math.round((new Date).getTime()/1e3),l={appid:c,id:s,timeStamp:u},f=n.default.hexMD5(i.default.objKeySort(l)+r),h={appid:c,timeStamp:u,id:s,sign:f};i.default.getRequests("cancelOrder",h,(function(e){console.log(e),200==e.data.code?(t.showToast({title:"取消订单成功",icon:"none"}),o.orderList.splice(a,1),o.orderList.length<=0&&o.orderLista()):101==e.data.code?t.showToast({title:"订单已审核，不能取消",icon:"none"}):t.showToast({title:e.data.msg,icon:"none"})}))}else e.cancel}})},ckwl:function(e){var a=this,o=e;if(o<=0)i.default.Toast("无物流信息");else{var d=Math.round((new Date).getTime()/1e3),s={appid:c,id:o,timeStamp:d},u=n.default.hexMD5(i.default.objKeySort(s)+r);e={appid:c,timeStamp:d,id:o,sign:u};i.default.postRequests("carPosition",e,(function(e){if(200==e.data.code)if(""!=e.data.data){var n=e.data.data.latitude,o=e.data.data.longitude;""==e.data.data.latitude||""==e.data.data.longitude?i.default.Toast("无物流信息"):t.getLocation({type:"gcj02",success:function(e){a.map=!0;var i=a.bd_decrypt(o,n);t.openLocation({latitude:i.lat,longitude:i.lng,name:" ",address:" "})}})}else i.default.Toast("无物流信息");else i.default.Toast(e.data.msg)}))}},bd_decrypt:function(t,e){var a=3e3*Math.PI/180,n=t-.0065,i=e-.006,o=Math.sqrt(n*n+i*i)-2e-5*Math.sin(i*a),d=Math.atan2(i,n)-3e-6*Math.cos(n*a),c=o*Math.cos(d),r=o*Math.sin(d);return{lng:c,lat:r}},oneMoreTime:function(e){var a=e;t.showModal({title:"提示",content:"是否再来一单？",success:function(e){if(e.confirm){var o=a,d=Math.round((new Date).getTime()/1e3),s={appid:c,id:o,timeStamp:d},u=n.default.hexMD5(i.default.objKeySort(s)+r),l={appid:c,timeStamp:d,id:o,sign:u};i.default.getRequests("oneMoreTime",l,(function(e){console.log(e),200==e.data.code?(i.default.Toast("再来一单成功"),setTimeout((function(){t.switchTab({url:"/pages/tabar/shopcart"})}),1e3)):102==e.data.code?(i.default.Toast("有下架商品"),setTimeout((function(){t.switchTab({url:"/pages/tabar/shopcart"})}),1e3)):i.default.Toast(e.data.msg)}))}else e.cancel}})},childInfo:function(){var t=this;t.childList=[{zid:"",nickname:"当前账号"}];var e=Math.round((new Date).getTime()/1e3),a={appid:c,timeStamp:e},o=n.default.hexMD5(i.default.objKeySort(a)+r),d={appid:c,timeStamp:e,sign:o};i.default.getRequests("childInfo",d,(function(e){if(200==e.data.code)for(var a=e.data.data,n=0;n<a.length;n++)t.childList.push(a[n])}))},orderListb:function(){var t=this;t.orderList=[],t.search_default=!0;var e=t.page,a=t.type;if("全部"!=t.isActive)var o=t.isActive+1;else o="";var d=10,s=Math.round((new Date).getTime()/1e3),u={appid:c,page:e,timeStamp:s,type:a},l=n.default.hexMD5(i.default.objKeySort(u)+r),f={appid:c,page:e,timeStamp:s,num:d,sign:l,type:a,status:o};i.default.getRequests("orderList",f,(function(e){200==e.data.code&&(e.data.data.list.length>0?(e.data.data.list.length<=9?t.load=!1:t.load=!0,t.search_default=!0,t.is_look=e.data.data.is_look,t.orderInfo=e.data.data,t.orderList=e.data.data.list):(t.search_default=!1,t.load="空"))}))},orderLista:function(){var t=this;t.orderList=[],t.search_default=!0,t.load=!0;var e=t.childzid;if("全部"!=t.isActive)var a=t.isActive+1;else a="";var o=1,d=t.type,s=10,u=Math.round((new Date).getTime()/1e3),l={appid:c,page:o,timeStamp:u,type:d},f=n.default.hexMD5(i.default.objKeySort(l)+r),h={appid:c,page:o,timeStamp:u,num:s,sign:f,type:d,select_zid:e,status:a};i.default.getRequests("orderList",h,(function(e){200==e.data.code&&(e.data.data.list.length>0?(e.data.data.list.length<=9?t.load=!1:t.load=!0,t.search_default=!0,t.is_look=e.data.data.is_look,t.orderInfo=e.data.data,t.orderList=e.data.data.list):(t.search_default=!1,t.load=!0))}))},onChild:function(t){this.childtxt=t.obj.nickname,this.childzid=t.obj.zid,this.page=1,this.orderLista()},selectAccount:function(){this.$refs.account.show()},titleTab:function(t){this.orderTitle=t,this.showOrderType=!1,"未支付"==t?this.type=2:"全部订单"==t&&(this.type=1),this.page=1,this.lineShow=!1,this.activeTab=6,this.isActive="全部",this.orderLista()},changeFirst:function(t){this.load=!0,this.isActive=t,this.lineShow=!0,this.page=1,this.orderLista()},rightClick:function(){t.hideTabBar(),this.showOrderType=!0},goTop:function(){t.pageScrollTo({scrollTop:0})}},onShow:function(){var e=this;if(e.is_child=t.getStorageSync("is_child"),e.is_miniBind=t.getStorageSync("is_miniBind"),e.childList=[{zid:"",nickname:"当前账号"}],t.getStorageSync("cdj_token")){var a=d.aData.show;0==a&&(e.orderList=[],e.childtxt="当前账号",e.childzid="",e.page=1,e.type=1,e.activeTab=6,this.load=!0,this.lineShow=!1,e.orderTitle="全部订单",e.isActive="全部",e.orderListb(),e.goTop()),0==t.getStorageSync("is_child")&&e.childInfo()}else t.navigateTo({url:"/pages/account/login"})},onHide:function(){1==this.map?d.aData.show=!0:d.aData.show=!1},onReachBottom:function(){var e=this;if("全部"!=e.isActive)var a=e.isActive+1;else a="";var o=e.page,d=e.type,s=10,u=Math.round((new Date).getTime()/1e3),l={appid:c,page:o+1,timeStamp:u,type:d},f=n.default.hexMD5(i.default.objKeySort(l)+r),h={appid:c,page:o+1,timeStamp:u,num:s,sign:f,type:d,status:a};0==t.getStorageSync("is_child")&&(h.select_zid=e.childzid),i.default.getRequests("orderList",h,(function(t){if(200==t.data.code)if(""!=t.data.data.list){for(var a=0;a<t.data.data.list.length;a++)e.orderList.push(t.data.data.list[a]);e.is_look=t.data.data.is_look,e.page=o+1}else e.load=!1}))},onLoad:function(){d.aData.show=!1,t.hideTabBar()}};e.default=f}).call(this,a("543d")["default"])},"6d97":function(t,e,a){"use strict";(function(t){a("1995"),a("921b");n(a("66fd"));var e=n(a("f799"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},"83c0":function(t,e,a){"use strict";var n=a("bea7"),i=a.n(n);i.a},8670:function(t,e,a){"use strict";a.r(e);var n=a("694c"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},bea7:function(t,e,a){},c82c:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=function(){Promise.all([a.e("common/vendor"),a.e("components/uni-icons/uni-icons")]).then(function(){return resolve(a("4ac6"))}.bind(null,a)).catch(a.oe)},i={name:"UniNoticeBar",components:{uniIcons:n},props:{text:{type:String,default:""},moreText:{type:String,default:""},backgroundColor:{type:String,default:"#fffbe8"},speed:{type:Number,default:100},color:{type:String,default:"#de8c17"},moreColor:{type:String,default:"#999999"},single:{type:[Boolean,String],default:!1},scrollable:{type:[Boolean,String],default:!1},showIcon:{type:[Boolean,String],default:!1},showGetMore:{type:[Boolean,String],default:!1},showClose:{type:[Boolean,String],default:!1}},data:function(){var t="Uni_".concat(Math.ceil(1e6*Math.random()).toString(36)),e="Uni_".concat(Math.ceil(1e6*Math.random()).toString(36));return{textWidth:0,boxWidth:0,wrapWidth:"",webviewHide:!1,elId:t,elIdBox:e,show:!0,animationDuration:"none",animationPlayState:"paused",animationDelay:"0s"}},mounted:function(){var t=this;this.$nextTick((function(){t.initSize()}))},methods:{initSize:function(){var e=this;if(this.scrollable){var a=[],n=new Promise((function(a,n){t.createSelectorQuery().in(e).select("#".concat(e.elId)).boundingClientRect().exec((function(t){e.textWidth=t[0].width,a()}))})),i=new Promise((function(a,n){t.createSelectorQuery().in(e).select("#".concat(e.elIdBox)).boundingClientRect().exec((function(t){e.boxWidth=t[0].width,a()}))}));a.push(n),a.push(i),Promise.all(a).then((function(){e.animationDuration="".concat(e.textWidth/e.speed,"s"),e.animationDelay="-".concat(e.boxWidth/e.speed,"s"),setTimeout((function(){e.animationPlayState="running"}),1e3)}))}},loopAnimation:function(){},clickMore:function(){this.$emit("getmore")},close:function(){this.show=!1,this.$emit("close")},onClick:function(){this.$emit("click")}}};e.default=i}).call(this,a("543d")["default"])},d616:function(t,e,a){"use strict";a.r(e);var n=a("3a48"),i=a("ef48");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("83c0");var d,c=a("f0c5"),r=Object(c["a"])(i["default"],n["b"],n["c"],!1,null,"29ffd536",null,!1,n["a"],d);e["default"]=r.exports},da09:function(t,e,a){},ef48:function(t,e,a){"use strict";a.r(e);var n=a("c82c"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},f799:function(t,e,a){"use strict";a.r(e);var n=a("3dcf"),i=a("8670");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("5643");var d,c=a("f0c5"),r=Object(c["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],d);e["default"]=r.exports}},[["6d97","common/runtime","common/vendor"]]]);