(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabar/index"],{"1cfc":function(n,t,e){"use strict";e.d(t,"b",(function(){return a})),e.d(t,"c",(function(){return o})),e.d(t,"a",(function(){return i}));var i={mySearch:function(){return e.e("components/search/index").then(e.bind(null,"e6f8"))},myRecomend:function(){return e.e("components/recomend/index").then(e.bind(null,"83d8"))},myBacktop:function(){return e.e("components/backtop/index").then(e.bind(null,"5158"))},uniPopup:function(){return Promise.all([e.e("common/vendor"),e.e("components/uni-popup/uni-popup")]).then(e.bind(null,"8cf4"))},myAddcart:function(){return e.e("components/addcart/index").then(e.bind(null,"8f64"))}},a=function(){var n=this,t=n.$createElement;n._self._c},o=[]},"22c1":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=function(){e.e("components/uni-notice-bar/uni-notice-bar").then(function(){return resolve(e("bf8a"))}.bind(null,e)).catch(e.oe)},a=getApp().globalData,o=(a.appid,a.appsecret,a.imgRemote),c={components:{uniNoticeBar:i},data:function(){return{support:!1,showTop:!1,token:"",imgRemote:o,speed:30,loading:!0,page:1,num:10,adList:[],navList:[],newList:[],recommendList:[],noticeList:[]}},methods:{navUrl:function(t){getApp().globalData.classId=t.id,getApp().globalData.isReload=!0,n.switchTab({url:"./classify"})},indexMainAd:function(){var n=this;this.$get(this.$api.mainAd,{},(function(t){var e=t.data;1==e.code&&(n.adList=e.data)}))},indexMainCate:function(){var n=this;this.$get(this.$api.mainCate,{},(function(t){var e=t.data;1==e.code&&(n.navList=e.data)}))},indexMainRecommend:function(){var n=this;this.num,this.page;this.$get(this.$api.mainRecommend,{},(function(t){var e=t.data;1==e.code&&(n.recommendList=e.data)}))},indexMainNew:function(){var n=this;this.$get(this.$api.mainNew,{},(function(t){var e=t.data;1==e.code&&(n.newList=e.data)}))},indexMainNotice:function(){var n=this;this.$get(this.$api.mainNotice,{},(function(t){var e=t.data;1==e.code&&(n.noticeList=e.data)}))}},onShow:function(){this.token=n.getStorageSync("cdj_token")},onLoad:function(){this.indexMainAd(),this.indexMainCate(),this.indexMainRecommend(),this.indexMainNew(),this.indexMainNotice()},onReachBottom:function(){var n=this;n.page++}};t.default=c}).call(this,e("543d")["default"])},"35d0":function(n,t,e){},"7c95":function(n,t,e){"use strict";e.r(t);var i=e("22c1"),a=e.n(i);for(var o in i)"default"!==o&&function(n){e.d(t,n,(function(){return i[n]}))}(o);t["default"]=a.a},8762:function(n,t,e){"use strict";(function(n){e("0c84"),e("921b");i(e("66fd"));var t=i(e("cb1f"));function i(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},a228:function(n,t,e){"use strict";var i=e("35d0"),a=e.n(i);a.a},cb1f:function(n,t,e){"use strict";e.r(t);var i=e("1cfc"),a=e("7c95");for(var o in a)"default"!==o&&function(n){e.d(t,n,(function(){return a[n]}))}(o);e("a228");var c,u=e("f0c5"),d=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,"55a36700",null,!1,i["a"],c);t["default"]=d.exports}},[["8762","common/runtime","common/vendor"]]]);