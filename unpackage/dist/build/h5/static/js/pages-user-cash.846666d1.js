(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-user-cash"],{"06bd":function(t,a,e){t.exports=e.p+"static/img/cash_red.3beb2738.png"},"1de5":function(t,a,e){"use strict";t.exports=function(t,a){return a||(a={}),t=t&&t.__esModule?t.default:t,"string"!==typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),a.hash&&(t+=a.hash),/["'() \t\n]/.test(t)||a.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},"1f02":function(t,a,e){"use strict";var i={"uni-nav-bar":e("f858").default,"my-s-tabs":e("b4d7").default,"my-s-tab":e("68be").default,"uni-icons":e("4ac6").default,"my-loading":e("efc6").default},s=function(){var t=this,a=t.$createElement,i=t._self._c||a;return i("v-uni-view",{staticClass:"cash"},[i("uni-nav-bar",{attrs:{"left-icon":"arrowleft",title:"现金劵","status-bar":t.navBar,fixed:"true"},on:{clickLeft:function(a){arguments[0]=a=t.$handleEvent(a),t.leftClick.apply(void 0,arguments)}}}),i("v-uni-view",{staticStyle:{position:"fixed",width:"100%",background:"#f8f6f9"}},[i("my-s-tabs",{staticClass:"custom-tabs",attrs:{"slot-title":!0,"nav-per-view":5},on:{change:function(a){arguments[0]=a=t.$handleEvent(a),t.changeFirst.apply(void 0,arguments)}},model:{value:t.activeTab,callback:function(a){t.activeTab=a},expression:"activeTab"}},t._l(t.cashList,(function(a,e){return i("my-s-tab",{key:e},[t._v(t._s(a.name))])})),1)],1),i("v-uni-view",{staticStyle:{height:"80rpx"}}),t.bitmap?i("v-uni-view",[t._l(t.list,(function(a,e){return i("v-uni-view",{key:e,staticClass:"flex single_cash",class:{cash2:2==a.coupons_status,cash1:1==a.coupons_status,cash3:3==a.coupons_status,cash4:4==a.coupons_status},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.detailPage(a.id)}}},[i("v-uni-view",{staticClass:"price_cash"},[i("v-uni-view",{staticClass:"color"},[t._v("余额")]),i("v-uni-view",{staticClass:"color"},[t._v("￥"),i("v-uni-text",{staticClass:"fiveteen",staticStyle:{"font-size":"28px"}},[t._v(t._s(a.residue.split(".")[0]))]),t._v("."),i("v-uni-text",{staticClass:"twelve"},[t._v(t._s(a.residue.split(".")[1]))])],1),i("v-uni-view",[t._v("面值"+t._s(a.money)+"元")])],1),i("v-uni-view",{staticClass:"info_cash"},[i("v-uni-view",{staticClass:"detail"},[i("v-uni-view",{staticClass:"flex_left_right"},[i("v-uni-text",{staticClass:"fourteen"},[t._v(t._s(a.coupons_title))]),2==a.coupons_status?i("v-uni-text",{staticClass:"ten"},[t._v("正常")]):t._e(),1==a.coupons_status?i("v-uni-text",{staticClass:"ten"},[t._v("未开始")]):t._e(),3==a.coupons_status?i("v-uni-text",{staticClass:"ten"},[t._v("已使用")]):t._e(),4==a.coupons_status?i("v-uni-text",{staticClass:"ten"},[t._v("已过期")]):t._e()],1),i("v-uni-view",{staticClass:" all_tag"},[i("v-uni-view",{staticClass:"tag_cash"},t._l(a.coupons_label,(function(a,e){return i("v-uni-text",{key:e,staticClass:"color"},[t._v(t._s(a))])})),1),i("uni-icons",{attrs:{type:"arrowright",size:"18",color:"black"}})],1)],1),1==a.coupons_status?i("v-uni-view",{staticClass:"date gray_font ten"},[t._v(t._s(a.start_time)+" 开始")]):t._e(),2==a.coupons_status?i("v-uni-view",{staticClass:"date gray_font ten"},[t._v(t._s(a.expire_time)+" 过期")]):t._e()],1)],1)})),i("my-loading",{attrs:{loading:t.loading}})],2):i("v-uni-view",{staticClass:"bitmap"},[i("v-uni-image",{attrs:{src:e("9016"),mode:"aspectFit"}})],1)],1)},n=[];e.d(a,"b",(function(){return s})),e.d(a,"c",(function(){return n})),e.d(a,"a",(function(){return i}))},"261b":function(t,a,e){"use strict";e.r(a);var i=e("1f02"),s=e("6f9e");for(var n in s)"default"!==n&&function(t){e.d(a,t,(function(){return s[t]}))}(n);e("9b0b");var c,o=e("f0c5"),d=Object(o["a"])(s["default"],i["b"],i["c"],!1,null,"7cab96de",null,!1,i["a"],c);a["default"]=d.exports},"37a4":function(t,a,e){var i=e("24fb"),s=e("1de5"),n=e("ffbd"),c=e("8fe1"),o=e("06bd"),d=e("b9e9");a=i(!1);var r=s(n),l=s(c),u=s(o),p=s(d);a.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.cash .s-tabs-nav-wrap .s-tab-nav-view[data-v-7cab96de]{display:-webkit-box!important;display:-webkit-flex!important;display:flex!important;-webkit-justify-content:space-around!important;justify-content:space-around!important}.cash .custom-tabs[data-v-7cab96de] .s-tab-nav-view{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.cash .s-tab-nav[data-v-7cab96de]{width:100%!important}.cash .single_cash[data-v-7cab96de]{margin:0 %?20?%;border-radius:%?10?%;height:%?200?%}.cash .single_cash[data-v-7cab96de]:nth-child(n+2){margin-top:%?10?%}.cash .price_cash[data-v-7cab96de]{width:50%;padding:11px 0 %?11?% %?40?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-justify-content:space-around;justify-content:space-around}.cash .info_cash[data-v-7cab96de]{width:80%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.cash .info_cash .detail[data-v-7cab96de]{padding:%?10?% %?5?% %?15?% 0}.cash .date[data-v-7cab96de]{border-top:1px solid #efefef;height:%?50?%;line-height:%?50?%}.cash .tag_cash[data-v-7cab96de]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;width:%?160?%}.cash .tag_cash > uni-text[data-v-7cab96de]{margin-right:%?10?%;font-size:%?20?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;padding:0 %?6?%;border-radius:%?4?%}.cash .tag_cash > uni-text[data-v-7cab96de]:nth-child(n + 3){margin-top:%?10?%}.cash .all_tag[data-v-7cab96de]{margin-top:%?10?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.cash .cash2[data-v-7cab96de]{background:url('+r+");background-size:cover}.cash .cash1[data-v-7cab96de]{background:url("+l+");background-size:cover}.cash .cash3[data-v-7cab96de]{background:url("+u+");background-size:cover}.cash .cash4[data-v-7cab96de]{background:url("+p+");background-size:cover}.cash .cash2 .tag_cash > uni-text[data-v-7cab96de]{border:1px solid #009a44}.cash .cash1 .tag_cash > uni-text[data-v-7cab96de]{border:1px solid #3d98ff}.cash .cash3 .tag_cash > uni-text[data-v-7cab96de]{border:1px solid #cd2d44}.cash .cash4 .tag_cash > uni-text[data-v-7cab96de]{border:1px solid grey}.cash .cash2 .color[data-v-7cab96de]{color:#009a44}.cash .cash1 .color[data-v-7cab96de]{color:#3d98ff}.cash .cash3 .color[data-v-7cab96de]{color:#cd2d44}.cash .cash4 .color[data-v-7cab96de]{color:grey}.bitmap[data-v-7cab96de]{text-align:center;margin-top:20%}.bitmap uni-image[data-v-7cab96de]{width:50%}",""]),t.exports=a},"5dc1":function(t,a,e){var i=e("37a4");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var s=e("4f06").default;s("61c5de2c",i,!0,{sourceMap:!1,shadowMode:!1})},"6f9e":function(t,a,e){"use strict";e.r(a);var i=e("7807"),s=e.n(i);for(var n in i)"default"!==n&&function(t){e.d(a,t,(function(){return i[t]}))}(n);a["default"]=s.a},7807:function(t,a,e){"use strict";(function(t){var i=e("ee27");Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var s=i(e("d0ff")),n=i(e("4b89")),c=i(e("d07b")),o=getApp().globalData,d=o.appid,r=o.appsecret,l=(o.imgRemote,o.navBar),u={data:function(){return{navBar:l,cashList:[{name:"正常",id:"2"},{name:"未开始",id:"1"},{name:"已使用",id:"3"},{name:"已过期",id:"4"}],list:[],page:1,num:10,bitmap:!0,loading:!0,activeTab:0,orderType:2,count:0}},methods:{leftClick:function(){window.history.back(-1)},changeFirst:function(a){t.log(a),this.page=1,this.list=[],this.orderType=this.cashList[a].id,this.myCash()},myCash:function(){var t=this,a=this;if(1==a.page){a.loading=!0,a.bitmap=!0;var e=Math.round((new Date).getTime()/1e3),i=a.num,s=a.page,o=a.orderType,l={appid:d,timeStamp:e},u=n.default.hexMD5(c.default.objKeySort(l)+r),p={appid:d,num:i,page:s,timeStamp:e,type:o,sign:u};c.default.getRequests("couponsList",p,(function(a){var e=a.data;if(200==e.code){var i=e.data.list;t.list=i,0==i.length?(t.bitmap=!1,t.loading="空"):(t.bitmap=!0,i.length<10?t.loading=!1:t.loading=!0)}}))}},detailPage:function(t){var a=this;this.count++,1==this.count&&(setTimeout((function(){a.count=0}),1e3),uni.navigateTo({url:"cashdetail?id="+t}))}},onShow:function(){this.myCash()},onReachBottom:function(){var t=this,a=Math.round((new Date).getTime()/1e3),e=t.num,i=t.page,o=t.orderType,l={appid:d,timeStamp:a},u=n.default.hexMD5(c.default.objKeySort(l)+r),p={appid:d,num:e,page:i+1,timeStamp:a,type:o,sign:u};c.default.getRequests("couponsList",p,(function(a){var e,i=a.data;200==i.code&&(""==a.data.data.list?t.loading=!1:((e=t.list).push.apply(e,(0,s.default)(a.data.data.list)),t.page+=1,t.loading=!0))}))}};a.default=u}).call(this,e("5a52")["default"])},"8fe1":function(t,a,e){t.exports=e.p+"static/img/cash_blue.8164fd5a.png"},"9b0b":function(t,a,e){"use strict";var i=e("5dc1"),s=e.n(i);s.a},b9e9:function(t,a,e){t.exports=e.p+"static/img/cash_grey.60c45a51.png"},ffbd:function(t,a,e){t.exports=e.p+"static/img/cash_green.2b6a847d.png"}}]);