(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/account/register"],{"1ae8":function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=o(a("46b2")),n=o(a("1a92"));function o(e){return e&&e.__esModule?e:{default:e}}var s=getApp().globalData,u=s.navBar,r=s.appid,d=s.appsecret,c={data:function(){return{navBar:u,nickname:"",mobile:"",password:"",confirm_pwd:"",number_code:"",verify_code:"",showcode:!1,back:!0,display1:!0,identifying:"",sale:"",scrollHeight:"",resultData:{},count:0,height:""}},methods:{pageUrl:function(t){var a=this;this.count++,1==this.count&&(setTimeout((function(){a.count=0}),1e3),e.hideKeyboard(),setTimeout((function(){e.navigateTo({url:t})}),100))},verifyResult:function(e){this.resultData=e,1!=this.resultData.flag||this.captcha()},captcha:function(){var t=this,a=Math.round((new Date).getTime()/1e3),o={appid:r,timeStamp:a},s=i.default.hexMD5(n.default.objKeySort(o)+d),u=Object.assign({sign:s},o);n.default.getRequests("random",u,(function(a){var i=a.data;200==i.code?(t.number_code=i.data.number,e.setStorageSync("laravel_session",a.header["Set-Cookie"])):n.default.Toast(i.msg)}))},getCode:function(){var t=Math.round((new Date).getTime()/1e3);if(this.mobile)if(this.number_code){var a=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;if(a.test(this.mobile)){var o={appid:r,mobile:this.mobile,timeStamp:t},u=this,c=i.default.hexMD5(n.default.objKeySort(o)+d),f=i.default.hexMD5(d+this.number_code),l=Object.assign({sign:c,secret_str:f,active:2},o);e.request({url:s.rootUrl+"/mobileOrder/sendCode",method:"POST",header:{"content-type":"application/json",cookie:e.getStorageSync("laravel_session")},data:l,success:function(e){200==e.data.code?(u.$refs.code.sendCode(),u.number_code=e.data.data.random_str,n.default.Toast("验证码已发送到你手机中，请注意查收")):(u.verifyReset(),n.default.Toast(e.data.msg))}})}else n.default.Toast("不能输入特殊字符和空格")}else n.default.Toast("请先拖动滑块");else n.default.Toast("手机号不能为空")},verifyReset:function(){this.$refs.verifyElement.reset(),this.resultData={}},register:function(){var t=this;if(this.count++,1==this.count)if(setTimeout((function(){t.count=0}),1e3),this.nickname)if(this.mobile)if(this.password){var a=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;if(a.test(this.nickname)&&a.test(this.mobile)&&a.test(this.password))if(this.password.length<6)n.default.Toast("请设置六位及以上的密码");else if(this.password==this.confirm_pwd){var o=Math.round((new Date).getTime()/1e3),u={appid:r,timeStamp:o,nickname:this.nickname,mobile:this.mobile,password:this.password,confirm_pwd:this.confirm_pwd,verify_code:this.verify_code},c=i.default.hexMD5(n.default.objKeySort(u)+d);this.identifying&&(u.openid=this.identifying),this.sale&&(u.sale=this.sale);var f=Object.assign({sign:c},u),l=this;e.request({url:s.rootUrl+"/mobileOrder/register",method:"POST",data:f,header:{"content-type":"application/json",cookie:e.getStorageSync("laravel_session")},success:function(t){200==t.data.code?(n.default.Toast("注册成功"),setTimeout((function(){e.navigateTo({url:"./login"})}),1e3)):(n.default.Toast(t.data.msg),l.verifyReset())}})}else n.default.Toast("请确保密码一致");else n.default.Toast("不能输入特殊字符和空格")}else n.default.Toast("密码不能为空");else n.default.Toast("手机号不能为空");else n.default.Toast("单位名称不能为空")}},onReady:function(){},onLoad:function(e){var t=this;t.sale=e.sale,t.identifying=e.identifying},onShow:function(){},mounted:function(){}};t.default=c}).call(this,a("543d")["default"])},"31a7":function(e,t,a){"use strict";(function(e){a("0c84"),a("921b");i(a("66fd"));var t=i(a("b751"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},3447:function(e,t,a){},"3d1e":function(e,t,a){"use strict";a.r(t);var i=a("1ae8"),n=a.n(i);for(var o in i)"default"!==o&&function(e){a.d(t,e,(function(){return i[e]}))}(o);t["default"]=n.a},"53ed":function(e,t,a){"use strict";var i=a("3447"),n=a.n(i);n.a},8316:function(e,t,a){"use strict";a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return o})),a.d(t,"a",(function(){return i}));var i={myIdentifyingcode:function(){return a.e("components/identifyingcode/index").then(a.bind(null,"fb3a"))}},n=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.back=!1})},o=[]},b751:function(e,t,a){"use strict";a.r(t);var i=a("8316"),n=a("3d1e");for(var o in n)"default"!==o&&function(e){a.d(t,e,(function(){return n[e]}))}(o);a("53ed");var s,u=a("f0c5"),r=Object(u["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);t["default"]=r.exports}},[["31a7","common/runtime","common/vendor"]]]);