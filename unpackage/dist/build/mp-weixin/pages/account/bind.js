(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/account/bind"],{2083:function(t,e,a){"use strict";a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}));var n={myIdentifyingcode:function(){return a.e("components/identifyingcode/index").then(a.bind(null,"fb3a"))}},i=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.back=!1})},o=[]},3381:function(t,e,a){"use strict";a.r(e);var n=a("2083"),i=a("4d21");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("d545");var s,r=a("f0c5"),u=Object(r["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],s);e["default"]=u.exports},"4d21":function(t,e,a){"use strict";a.r(e);var n=a("6463"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},"570d":function(t,e,a){"use strict";(function(t){a("0c84"),a("921b");n(a("66fd"));var e=n(a("3381"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},6463:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o(a("46b2")),i=o(a("1a92"));function o(t){return t&&t.__esModule?t:{default:t}}var s=getApp().globalData,r=s.navBar,u=s.appid,d=s.appsecret,c={data:function(){return{resultData:{},mobile:"",verify_code:"",secret_str:"",identifying:"",navBar:r,back:!0,count:0}},methods:{leftClick:function(){t.navigateBack({delta:1})},verifyResult:function(t){this.resultData=t,1!=this.resultData.flag||this.captcha()},verifyReset:function(){this.$refs.verifyElement.reset(),this.resultData={}},captcha:function(){var e=this,a=Math.round((new Date).getTime()/1e3),o={appid:u,timeStamp:a},s=n.default.hexMD5(i.default.objKeySort(o)+d),r=Object.assign({sign:s},o);i.default.getRequests("random",r,(function(a){var n=a.data;200==n.code?(e.secret_str=n.data.number,t.setStorageSync("laravel_session",a.header["Set-Cookie"])):i.default.Toast(n.msg)}))},getCode:function(){var e=this,a=Math.round((new Date).getTime()/1e3);if(e.mobile){var o=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;if(o.test(e.mobile))if(e.secret_str){var r={appid:u,mobile:e.mobile,timeStamp:a},c=n.default.hexMD5(d+e.secret_str),l=n.default.hexMD5(i.default.objKeySort(r)+d),f=Object.assign({sign:l,secret_str:c},r);t.request({url:s.rootUrl+"/mobileOrder/sendCodeNot",method:"POST",header:{"content-type":"application/json",cookie:t.getStorageSync("laravel_session")},data:f,success:function(t){200==t.data.code?(e.secret_str=t.data.data.random_str,i.default.Toast("验证码已发送到你手机中，请注意查收"),e.$refs.code.sendCode()):(e.verifyReset(),i.default.Toast(t.data.msg))}})}else i.default.Toast("请拖动滑块验证");else i.default.Toast("不能输入特殊字符和空格")}else i.default.Toast("手机号不能为空")},forget:function(){var e=this,a=this,o=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;if(this.mobile)if(o.test(this.mobile))if(this.verify_code){if(this.count++,1==this.count){setTimeout((function(){e.count=0}),1e3);var r=Math.round((new Date).getTime()/1e3),c={appid:u,timeStamp:r},l=n.default.hexMD5(i.default.objKeySort(c)+d),f=Object.assign({sign:l,mobile:this.mobile,code:this.verify_code,identifying:a.identifying},c);t.request({url:s.rootUrl+"/mobileOrder/wxLoginFollow",method:"POST",data:f,header:{"content-type":"application/json",cookie:t.getStorageSync("laravel_session")},success:function(e){if(200==e.data.code){var a=e.data;i.default.Toast("手机号绑定成功"),t.setStorageSync("cdj_token",a.data.token),t.setStorageSync("is_child",a.data.is_child),t.setStorageSync("is_miniBind",a.data.is_miniBind),setTimeout((function(){t.switchTab({url:"../tabar/index"})}),1e3)}else 403==e.data.code?(i.default.Toast("绑定手机成功，请耐心等待审核"),setTimeout((function(){t.navigateTo({url:"./login"})}),1e3)):i.default.Toast(e.data.msg)}})}}else i.default.Toast("请输入验证码");else i.default.Toast("不能输入特殊字符和空格");else i.default.Toast("手机号不能为空")}},onLoad:function(t){this.identifying=t.identifying},onShow:function(){t.setNavigationBarTitle({title:t.getStorageSync("titleKey")})}};e.default=c}).call(this,a("543d")["default"])},d545:function(t,e,a){"use strict";var n=a("dae1"),i=a.n(n);i.a},dae1:function(t,e,a){}},[["570d","common/runtime","common/vendor"]]]);