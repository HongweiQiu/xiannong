(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabar/index"],{"0adc":function(t,e,n){"use strict";var a=n("e35f"),o=n.n(a);o.a},"15e2":function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}));var a={mySearch:function(){return n.e("components/search/index").then(n.bind(null,"e6f8"))},uniNoticeBar:function(){return n.e("components/uni-notice-bar/uni-notice-bar").then(n.bind(null,"bf8a"))},myCountdown:function(){return n.e("components/countdown/index").then(n.bind(null,"63e9"))},myRecomend:function(){return n.e("components/recomend/index").then(n.bind(null,"83d8"))},myLoading:function(){return n.e("components/loading/index").then(n.bind(null,"9c2f"))},myBacktop:function(){return n.e("components/backtop/index").then(n.bind(null,"5158"))},uniPopup:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-popup/uni-popup")]).then(n.bind(null,"8cf4"))},myAddcart:function(){return n.e("components/addcart/index").then(n.bind(null,"8f64"))},myTabar:function(){return n.e("components/tabar/index").then(n.bind(null,"957a"))}},o=function(){var t=this,e=t.$createElement;t._self._c},i=[]},"22c1":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i(n("46b2")),o=i(n("1a92"));function i(t){return t&&t.__esModule?t:{default:t}}function r(t){return d(t)||s(t)||c(t)||u()}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t,e){if(t){if("string"===typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(t,e):void 0}}function s(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function d(t){if(Array.isArray(t))return l(t)}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function f(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var p=function(){n.e("components/uni-notice-bar/uni-notice-bar").then(function(){return resolve(n("bf8a"))}.bind(null,n)).catch(n.oe)},h=getApp().globalData,m=h.appid,g=h.appsecret,b=h.imgRemote,v={components:{uniNoticeBar:p},data:function(){return{showActive:!1,support:!1,showTop:!1,token:"",imgRemote:b,speed:30,loading:!0,page:1,num:10,hours:1e3,adList:{},activeList:{},activeConf:{},cartware:{},config:{},itemList:[],count:0}},methods:{closeCart:function(){this.$refs.addcart.onClose()},navUrl:function(e){var n=this;if(this.count++,1==this.count){setTimeout((function(){n.count=0}),1e3);var a=e.id,i=e.cate_id,r=e.status;if(0!=r)switch(a){case 1:this.token?t.navigateTo({url:"/pages/index/collect"}):t.navigateTo({url:"/pages/account/login"});break;case 2:this.token?t.navigateTo({url:"/pages/index/newback"}):t.navigateTo({url:"/pages/account/login"});break;case 3:this.token?t.navigateTo({url:"/pages/index/recommed"}):t.navigateTo({url:"/pages/account/login"});break;case 4:t.makePhoneCall({phoneNumber:this.adList.phone});break;case 5:t.switchTab({url:"/pages/tabar/classify"});break;case 6:this.token?t.switchTab({url:"/pages/tabar/shopcart"}):t.navigateTo({url:"/pages/account/login"});break;case 7:this.token?t.switchTab({url:"/pages/tabar/order"}):t.navigateTo({url:"/pages/account/login"});break;case 8:t.switchTab({url:"/pages/tabar/user"});break;default:getApp().globalData.classId=i,wx.switchTab({url:"/pages/tabar/classify"});break}else o.default.Toast("该栏目已下架")}},openCart:function(t){this.$refs.popup.open(),this.cartware=t},onClose:function(){this.$refs.popup.close()},newPage:function(e,n){var a=this;this.count++,1==this.count&&(setTimeout((function(){a.count=0}),1e3),n?t.navigateTo({url:"/pages/index/".concat(e,"?id=").concat(n)}):t.navigateTo({url:"/pages/index/".concat(e)}))},indexAd:function(){var t=this,e=Math.round((new Date).getTime()/1e3),n={appid:m,timeStamp:e},i=a.default.hexMD5(o.default.objKeySort(n)+g),r=Object.assign({sign:i},n);o.default.getRequests("indexAd",r,(function(e){var n=e.data;200==n.code&&(t.adList=n.data)}))},indexItem:function(){var t,e=this;this.itemList=[];var n=Math.round((new Date).getTime()/1e3),i={appid:m,timeStamp:n},r=this.num,u=this.page,c=a.default.hexMD5(o.default.objKeySort(i)+g),s=Object.assign((t={page:1,sign:c},f(t,"page",u),f(t,"num",r),t),i);o.default.getRequests("indexItem",s,(function(t){var n=t.data;200==n.code&&(e.itemList=n.data.list,e.config=n.data,n.data.total<=10?(e.loading=!1,e.support=!0):(e.support=!1,e.loading=!0))}))},limitList:function(){var t=this,e=Math.round((new Date).getTime()/1e3),n={appid:m,timeStamp:e},i=a.default.hexMD5(o.default.objKeySort(n)+g),r=Object.assign({sign:i},n);o.default.getRequests("panicBuyIndex",r,(function(e){var n=e.data;if(200==n.code){var a=n.data,o=a.itemList,i=a.timeRemain;0!=n.data.length?t.showActive=!0:t.showActive=!1,t.hours=Math.abs(i),t.activeConf=n.data,t.activeList=o}}))}},onShow:function(){this.token=t.getStorageSync("cdj_token"),this.indexAd(),this.limitList(),1==h.isReload&&(this.page=1,t.pageScrollTo({scrollTop:0,duration:0}),this.indexItem())},onLoad:function(){h.isReload=!0,t.hideTabBar()},onReachBottom:function(){var t=this,e=this,n=Math.round((new Date).getTime()/1e3),i=e.num,u=e.page,c={appid:m,timeStamp:n},s=a.default.hexMD5(o.default.objKeySort(c)+g),d={appid:m,num:i,page:u+1,timeStamp:n,sign:s};o.default.getRequests("indexItem",d,(function(e){var n,a=e.data;(a.code=200)&&(""!=a.data?((n=t.itemList).push.apply(n,r(a.data.list)),t.page+=1,t.loading=!0):(t.support=!0,t.loading=!1))}))},onPageScroll:function(t){0==t.scrollTop?this.showTop=!1:this.showTop=!0}};e.default=v}).call(this,n("543d")["default"])},"7c95":function(t,e,n){"use strict";n.r(e);var a=n("22c1"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},8762:function(t,e,n){"use strict";(function(t){n("0c84"),n("921b");a(n("66fd"));var e=a(n("cb1f"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},cb1f:function(t,e,n){"use strict";n.r(e);var a=n("15e2"),o=n("7c95");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("0adc");var r,u=n("f0c5"),c=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=c.exports},e35f:function(t,e,n){}},[["8762","common/runtime","common/vendor"]]]);