(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/updateavatar"],{"1b3f":function(t,e,n){},"5d79":function(t,e,n){"use strict";(function(t){n("0c84"),n("921b");a(n("66fd"));var e=a(n("7463"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},7463:function(t,e,n){"use strict";n.r(e);var a=n("ef99"),o=n("cbbd");for(var u in o)"default"!==u&&function(t){n.d(e,t,(function(){return o[t]}))}(u);n("f2de");var r,i=n("f0c5"),c=Object(i["a"])(o["default"],a["b"],a["c"],!1,null,"568308ae",null,!1,a["a"],r);e["default"]=c.exports},cbbd:function(t,e,n){"use strict";n.r(e);var a=n("f281"),o=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,(function(){return a[t]}))}(u);e["default"]=o.a},ef99:function(t,e,n){"use strict";n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return a}));var a={uniPopup:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-popup/uni-popup")]).then(n.bind(null,"8cf4"))}},o=function(){var t=this,e=t.$createElement;t._self._c},u=[]},f281:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=getApp().globalData,a=n.imgRemote,o={data:function(){return{imgRemote:a,avatarUrl:"",personInfo:{},file:""}},methods:{memberInfo:function(){var e=this,n={token:t.getStorageSync("userToken")};this.$get(this.$api.userInfo,n,(function(t){var n=t.data;1==n.code&&(e.personInfo=n.data,e.avatarUrl=n.data.avatar)}))},showUpload:function(t){"open"==t?this.$refs.popup.open():this.$refs.popup.close()},chooseImage:function(e){var n=this;t.chooseImage({count:1,sizeType:["original","compressed"],sourceType:[e],success:function(t){n.file=t.tempFilePaths[0],n.$refs.popup.close(),n.uploadImg()}})},uploadImg:function(){var e=this;t.uploadFile({url:getApp().globalData.rootUrl+e.$api.mainUpload,name:"file",filePath:e.file,success:function(t){e.avatarUrl=e.imgRemote+JSON.parse(t.data).data}})},formSubmit:function(){var e=this;this.$showModal("确认修改信息",(function(){var n={avatar:e.avatarUrl};e.$get(e.$api.userProfile,n,(function(n){1==n.data.code?(e.$Toast("修改成功"),setTimeout((function(){t.navigateBack()}),1e3)):e.$Toast(n.data.msg)}))}))}},onLoad:function(){var t=this;t.memberInfo()}};e.default=o}).call(this,n("543d")["default"])},f2de:function(t,e,n){"use strict";var a=n("1b3f"),o=n.n(a);o.a}},[["5d79","common/runtime","common/vendor"]]]);