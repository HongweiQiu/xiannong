(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/updateavatar"],{"5d79":function(n,e,t){"use strict";(function(n){t("0c84"),t("921b");o(t("66fd"));var e=o(t("7463"));function o(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("543d")["createPage"])},7463:function(n,e,t){"use strict";t.r(e);var o=t("8430"),u=t("cbbd");for(var a in u)"default"!==a&&function(n){t.d(e,n,(function(){return u[n]}))}(a);t("9bca");var c,r=t("f0c5"),i=Object(r["a"])(u["default"],o["b"],o["c"],!1,null,"69184c9f",null,!1,o["a"],c);e["default"]=i.exports},8430:function(n,e,t){"use strict";t.d(e,"b",(function(){return u})),t.d(e,"c",(function(){return a})),t.d(e,"a",(function(){return o}));var o={uniPopup:function(){return Promise.all([t.e("common/vendor"),t.e("components/uni-popup/uni-popup")]).then(t.bind(null,"8cf4"))}},u=function(){var n=this,e=n.$createElement;n._self._c},a=[]},"8e9d":function(n,e,t){},"9bca":function(n,e,t){"use strict";var o=t("8e9d"),u=t.n(o);u.a},cbbd:function(n,e,t){"use strict";t.r(e);var o=t("f281"),u=t.n(o);for(var a in o)"default"!==a&&function(n){t.d(e,n,(function(){return o[n]}))}(a);e["default"]=u.a},f281:function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var t=getApp().globalData,o=(t.imgRemote,{data:function(){return{avatarUrl:"",personInfo:{}}},methods:{memberInfo:function(){var e=this,t={token:n.getStorageSync("userToken")};this.$get(this.$api.userInfo,t,(function(n){var t=n.data;1==t.code&&(e.personInfo=t.data,e.avatarUrl=t.data.avatar)}))},showUpload:function(n){"open"==n?this.$refs.popup.open():this.$refs.popup.close()},chooseImage:function(e){n.chooseImage({count:6,sizeType:["original","compressed"],sourceType:[e],success:function(n){console.log(n)}})},formSubmit:function(){var e=this;n.showModal({title:"提示",content:"是否退出",cancelColor:"#999",confirmColor:"#59B727",success:function(t){t.confirm&&e.$get(e.$api.userLogout,{token:n.getStorageSync("userInfo").token},(function(t){1==t.data.code?(e.$Toast("退出成功"),n.removeStorageSync("userInfo"),n.removeStorageSync("userToken"),setTimeout((function(){n.reLaunch({url:"../account/login"})}),1e3)):e.$Toast(t.data.msg)}))}})}},onShow:function(){var n=this;n.memberInfo()}});e.default=o}).call(this,t("543d")["default"])}},[["5d79","common/runtime","common/vendor"]]]);