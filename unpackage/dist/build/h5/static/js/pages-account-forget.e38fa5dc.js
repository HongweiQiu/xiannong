(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-account-forget"],{3782:function(t,e,n){n("d3b7"),n("ac1f"),n("25f0"),n("5319");var a=function(t,e){return t<<e|t>>>32-e},o=function(t,e){var n,a,o,i,r;return o=2147483648&t,i=2147483648&e,n=1073741824&t,a=1073741824&e,r=(1073741823&t)+(1073741823&e),n&a?2147483648^r^o^i:n|a?1073741824&r?3221225472^r^o^i:1073741824^r^o^i:r^o^i},i=function(t,e,n){return t&e|~t&n},r=function(t,e,n){return t&n|e&~n},s=function(t,e,n){return t^e^n},c=function(t,e,n){return e^(t|~n)},u=function(t,e,n,r,s,c,u){return t=o(t,o(o(i(e,n,r),s),u)),o(a(t,c),e)},d=function(t,e,n,i,s,c,u){return t=o(t,o(o(r(e,n,i),s),u)),o(a(t,c),e)},l=function(t,e,n,i,r,c,u){return t=o(t,o(o(s(e,n,i),r),u)),o(a(t,c),e)},f=function(t,e,n,i,r,s,u){return t=o(t,o(o(c(e,n,i),r),u)),o(a(t,s),e)},p=function(t){var e,n=t.length,a=n+8,o=(a-a%64)/64,i=16*(o+1),r=Array(i-1),s=0,c=0;while(c<n)e=(c-c%4)/4,s=c%4*8,r[e]=r[e]|t.charCodeAt(c)<<s,c++;return e=(c-c%4)/4,s=c%4*8,r[e]=r[e]|128<<s,r[i-2]=n<<3,r[i-1]=n>>>29,r},g=function(t){var e,n,a="",o="";for(n=0;n<=3;n++)e=t>>>8*n&255,o="0"+e.toString(16),a+=o.substr(o.length-2,2);return a},h=function(t){t=t.replace(/\x0d\x0a/g,"\n");for(var e="",n=0;n<t.length;n++){var a=t.charCodeAt(n);a<128?e+=String.fromCharCode(a):a>127&&a<2048?(e+=String.fromCharCode(a>>6|192),e+=String.fromCharCode(63&a|128)):(e+=String.fromCharCode(a>>12|224),e+=String.fromCharCode(a>>6&63|128),e+=String.fromCharCode(63&a|128))}return e};function v(t){var e,n,a,i,r,s,c,v,m,b=Array(),y=7,w=12,_=17,S=22,k=5,j=9,T=14,x=20,C=4,A=11,z=16,O=23,D=6,M=10,E=15,q=21;for(t=h(t),b=p(t),s=1732584193,c=4023233417,v=2562383102,m=271733878,e=0;e<b.length;e+=16)n=s,a=c,i=v,r=m,s=u(s,c,v,m,b[e+0],y,3614090360),m=u(m,s,c,v,b[e+1],w,3905402710),v=u(v,m,s,c,b[e+2],_,606105819),c=u(c,v,m,s,b[e+3],S,3250441966),s=u(s,c,v,m,b[e+4],y,4118548399),m=u(m,s,c,v,b[e+5],w,1200080426),v=u(v,m,s,c,b[e+6],_,2821735955),c=u(c,v,m,s,b[e+7],S,4249261313),s=u(s,c,v,m,b[e+8],y,1770035416),m=u(m,s,c,v,b[e+9],w,2336552879),v=u(v,m,s,c,b[e+10],_,4294925233),c=u(c,v,m,s,b[e+11],S,2304563134),s=u(s,c,v,m,b[e+12],y,1804603682),m=u(m,s,c,v,b[e+13],w,4254626195),v=u(v,m,s,c,b[e+14],_,2792965006),c=u(c,v,m,s,b[e+15],S,1236535329),s=d(s,c,v,m,b[e+1],k,4129170786),m=d(m,s,c,v,b[e+6],j,3225465664),v=d(v,m,s,c,b[e+11],T,643717713),c=d(c,v,m,s,b[e+0],x,3921069994),s=d(s,c,v,m,b[e+5],k,3593408605),m=d(m,s,c,v,b[e+10],j,38016083),v=d(v,m,s,c,b[e+15],T,3634488961),c=d(c,v,m,s,b[e+4],x,3889429448),s=d(s,c,v,m,b[e+9],k,568446438),m=d(m,s,c,v,b[e+14],j,3275163606),v=d(v,m,s,c,b[e+3],T,4107603335),c=d(c,v,m,s,b[e+8],x,1163531501),s=d(s,c,v,m,b[e+13],k,2850285829),m=d(m,s,c,v,b[e+2],j,4243563512),v=d(v,m,s,c,b[e+7],T,1735328473),c=d(c,v,m,s,b[e+12],x,2368359562),s=l(s,c,v,m,b[e+5],C,4294588738),m=l(m,s,c,v,b[e+8],A,2272392833),v=l(v,m,s,c,b[e+11],z,1839030562),c=l(c,v,m,s,b[e+14],O,4259657740),s=l(s,c,v,m,b[e+1],C,2763975236),m=l(m,s,c,v,b[e+4],A,1272893353),v=l(v,m,s,c,b[e+7],z,4139469664),c=l(c,v,m,s,b[e+10],O,3200236656),s=l(s,c,v,m,b[e+13],C,681279174),m=l(m,s,c,v,b[e+0],A,3936430074),v=l(v,m,s,c,b[e+3],z,3572445317),c=l(c,v,m,s,b[e+6],O,76029189),s=l(s,c,v,m,b[e+9],C,3654602809),m=l(m,s,c,v,b[e+12],A,3873151461),v=l(v,m,s,c,b[e+15],z,530742520),c=l(c,v,m,s,b[e+2],O,3299628645),s=f(s,c,v,m,b[e+0],D,4096336452),m=f(m,s,c,v,b[e+7],M,1126891415),v=f(v,m,s,c,b[e+14],E,2878612391),c=f(c,v,m,s,b[e+5],q,4237533241),s=f(s,c,v,m,b[e+12],D,1700485571),m=f(m,s,c,v,b[e+3],M,2399980690),v=f(v,m,s,c,b[e+10],E,4293915773),c=f(c,v,m,s,b[e+1],q,2240044497),s=f(s,c,v,m,b[e+8],D,1873313359),m=f(m,s,c,v,b[e+15],M,4264355552),v=f(v,m,s,c,b[e+6],E,2734768916),c=f(c,v,m,s,b[e+13],q,1309151649),s=f(s,c,v,m,b[e+4],D,4149444226),m=f(m,s,c,v,b[e+11],M,3174756917),v=f(v,m,s,c,b[e+2],E,718787259),c=f(c,v,m,s,b[e+9],q,3951481745),s=o(s,n),c=o(c,a),v=o(v,i),m=o(m,r);var R=g(s)+g(c)+g(v)+g(m);return R.toLowerCase()}t.exports={hexMD5:v}},5223:function(t,e,n){var a=n("dc36");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=n("4f06").default;o("a7d86c2a",a,!0,{sourceMap:!1,shadowMode:!1})},"7f68":function(t,e,n){"use strict";n.r(e);var a=n("a47a"),o=n("c0f7");for(var i in o)"default"!==i&&function(t){n.d(e,t,(function(){return o[t]}))}(i);n("9496");var r,s=n("f0c5"),c=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,"1e928dce",null,!1,a["a"],r);e["default"]=c.exports},9496:function(t,e,n){"use strict";var a=n("5223"),o=n.n(a);o.a},a47a:function(t,e,n){"use strict";var a={"uni-nav-bar":n("01c8").default,"my-identifyingcode":n("858d").default},o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"register"},[n("uni-nav-bar",{attrs:{"left-icon":"arrowleft",title:"忘记密码","status-bar":t.navBar,fixed:"true"},on:{clickLeft:function(e){arguments[0]=e=t.$handleEvent(e),t.leftClick.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"get_info"},[n("v-uni-view",[n("v-uni-text",[t._v("手机号")]),n("v-uni-input",{attrs:{type:"number",placeholder:"请输入手机号","placeholder-class":"place_style"},model:{value:t.mobile,callback:function(e){t.mobile=e},expression:"mobile"}})],1),n("v-uni-view",[n("v-uni-text",[t._v("密码")]),n("v-uni-input",{attrs:{type:"password",placeholder:"请输入六位及以上的密码","placeholder-class":"place_style"},model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),n("v-uni-view",[n("v-uni-text",[t._v("确认密码")]),n("v-uni-input",{attrs:{type:"password",placeholder:"请再次确认登录密码","placeholder-class":"place_style"},model:{value:t.confirm_pwd,callback:function(e){t.confirm_pwd=e},expression:"confirm_pwd"}})],1),n("move-verify",{ref:"verifyElement",on:{result:function(e){arguments[0]=e=t.$handleEvent(e),t.verifyResult.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"flex"},[n("v-uni-text",[t._v("验证码")]),n("v-uni-view",{staticClass:"flex_left_right",staticStyle:{width:"79%"}},[n("v-uni-input",{attrs:{type:"number","placeholder-class":"place_style"},on:{focus:function(e){arguments[0]=e=t.$handleEvent(e),t.back=!1}},model:{value:t.verify_code,callback:function(e){t.verify_code=e},expression:"verify_code"}}),n("my-identifyingcode",{ref:"code",on:{getCode:function(e){arguments[0]=e=t.$handleEvent(e),t.getCode.apply(void 0,arguments)}}})],1)],1)],1),n("v-uni-view",{staticClass:"submit_button button_style",class:{gray_b:t.back},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.forget.apply(void 0,arguments)}}},[t._v("保存")])],1)},i=[];n.d(e,"b",(function(){return o})),n.d(e,"c",(function(){return i})),n.d(e,"a",(function(){return a}))},c0f7:function(t,e,n){"use strict";n.r(e);var a=n("c5c7"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,(function(){return a[t]}))}(i);e["default"]=o.a},c5c7:function(t,e,n){"use strict";(function(t){var a=n("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(n("bf09")),i=a(n("3782")),r=a(n("fe41")),s=getApp().globalData,c=s.navBar,u=s.appid,d=s.appsecret,l={components:{moveVerify:o.default},data:function(){return{resultData:{},mobile:"",password:"",confirm_pwd:"",verify_code:"",secret_str:"",navBar:c,back:!0}},methods:{leftClick:function(){uni.navigateBack({delta:1})},verifyResult:function(t){this.resultData=t,1!=this.resultData.flag||this.captcha()},verifyReset:function(){this.$refs.verifyElement.reset(),this.resultData={}},captcha:function(){var t=this,e=Math.round((new Date).getTime()/1e3),n={appid:u,timeStamp:e},a=i.default.hexMD5(r.default.objKeySort(n)+d),o=Object.assign({sign:a},n);r.default.getRequests("random",o,(function(e){var n=e.data;200==n.code?(t.secret_str=n.data.number,uni.setStorageSync("laravel_session",e.header["Set-Cookie"])):r.default.Toast(n.msg)}))},getCode:function(){var t=this,e=Math.round((new Date).getTime()/1e3);if(t.mobile){var n=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;if(n.test(t.mobile))if(t.secret_str){var a={appid:u,mobile:t.mobile,timeStamp:e},o=i.default.hexMD5(d+t.secret_str),c=i.default.hexMD5(r.default.objKeySort(a)+d),l=Object.assign({sign:c,secret_str:o},a);uni.request({url:s.rootUrl+"/mobileOrder/sendCodeNot",method:"POST",header:{"content-type":"application/json",cookie:uni.getStorageSync("laravel_session")},data:l,success:function(e){200==e.data.code?(t.secret_str=e.data.data.random_str,r.default.Toast("验证码已发送到你手机中，请注意查收"),t.$refs.code.sendCode()):(t.verifyReset(),r.default.Toast(e.data.msg))}})}else r.default.Toast("请拖动滑块验证");else r.default.Toast("不能输入特殊字符和空格")}else r.default.Toast("手机号不能为空")},forget:function(){var e=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;if(this.mobile)if(this.password)if(t.log(this.password.length),this.password.length<6)r.default.Toast("请设置六位及以上的密码");else if(this.password==this.confirm_pwd)if(e.test(this.mobile)&&e.test(this.password)&&e.test(this.confirm_pwd))if(this.verify_code){var n=Math.round((new Date).getTime()/1e3),a={appid:u,timeStamp:n,mobile:this.mobile,password:this.password,confirm_pwd:this.confirm_pwd,verify_code:this.verify_code},o=i.default.hexMD5(r.default.objKeySort(a)+d),c=Object.assign({sign:o},a),l=this;uni.request({url:s.rootUrl+"/mobileOrder/forgetPassword",method:"POST",data:c,header:{"content-type":"application/json",cookie:uni.getStorageSync("laravel_session")},success:function(t){200==t.data.code?(r.default.Toast("修改成功,去登陆"),setTimeout((function(){uni.navigateTo({url:"./login"})}),1e3)):(l.verifyReset(),r.default.Toast(t.data.msg))}})}else r.default.Toast("请输入验证码");else r.default.Toast("不能输入特殊字符和空格");else r.default.Toast("请确保密码一致");else r.default.Toast("密码不能为空");else r.default.Toast("手机号不能为空")}}};e.default=l}).call(this,n("5a52")["default"])},dc36:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,"uni-page-body[data-v-1e928dce]{background:#fff}.register .get_info[data-v-1e928dce]{background:#fff;padding:0 %?20?%;margin-top:%?10?%}.register .get_info>uni-view[data-v-1e928dce]{display:-webkit-box;display:-webkit-flex;display:flex;height:%?80?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-bottom:1px solid #f7f6f6}.register .get_info>uni-view>uni-text[data-v-1e928dce]{width:%?150?%;color:grey}.register .button_style[data-v-1e928dce]{font-size:%?32?%;width:%?384?%;height:%?64?%;line-height:%?64?%}.register .now_login[data-v-1e928dce]{color:#a1a1a1;text-align:center;font-size:%?24?%}.register .agree[data-v-1e928dce]{position:fixed;width:100%;bottom:%?20?%;text-align:center;font-size:%?24?%;color:#418d5f}body.?%PAGE?%[data-v-1e928dce]{background:#fff}",""]),t.exports=e},fe41:function(t,e,n){n("4160"),n("4e82"),n("b64b"),n("d3b7"),n("25f0"),n("159b");var a=getApp(),o={active:a.globalData.active},i=a.globalData.rootUrl+"/mobileOrder/";if(uni.getStorageSync("cdj_token"))var r={Accept:"application/json","content-type":"application/json",Authorization:uni.getStorageSync("cdj_token")};function s(t,e,n){uni.showLoading({title:"加载中...",duration:2e3,mask:!0,success:function(a){uni.request({url:i+t,method:"GET",header:{Accept:"application/json","content-type":"application/json",Authorization:uni.getStorageSync("cdj_token")},data:Object.assign(e,o),success:function(t){n(t),void 0!=t.header.Authorization&&uni.setStorageSync("cdj_token",t.header.Authorization),400==t.data.code&&uni.showToast({title:t.data.msg,icon:"none",duration:2e3,success:function(){}}),401==t.data.code&&uni.navigateTo({url:"/pages/account/login"}),uni.hideLoading()},fail:function(t){uni.showModal({title:t.data,content:"网络出错，请刷新重试",showCancel:!1})}})},fail:function(t){},complete:function(t){}})}function c(t,e,n){uni.request({url:i+t,method:"GET",header:{Accept:"application/json","content-type":"application/json",Authorization:uni.getStorageSync("cdj_token")},data:Object.assign(e,o),success:function(t){n(t),void 0!=t.header.Authorization&&uni.setStorageSync("cdj_token",t.header.Authorization),401==t.data.code&&uni.navigateTo({url:"/pages/account/login"}),408==t.data.code&&uni.navigateTo({url:"/pages/account/service"})},fail:function(t){uni.showModal({title:t.data,content:"网络出错，请刷新重试",showCancel:!1})}})}function u(t,e,n){uni.showLoading({title:"加载中",mask:!0,success:function(a){uni.request({url:i+t,method:"POST",header:{Accept:"application/json","content-type":"application/json",Authorization:uni.getStorageSync("cdj_token")},data:Object.assign(e,o),success:function(t){n(t),void 0!=t.header.Authorization&&uni.setStorageSync("cdj_token",t.header.Authorization),400==t.data.code&&uni.showToast({title:t.data.msg,icon:"none",duration:2e3,success:function(){}}),401==t.data.code&&uni.navigateTo({url:"/pages//account/login"}),403==t.data.code&&uni.showToast({title:"账号已禁用",icon:"none",duration:2e3,success:function(){uni.navigateTo({url:"/pages/account/login"})}}),408==t.data.code&&uni.showToast({title:"抱歉，您的服务已到期，请联系《菜东家》工作人员续费！",icon:"none",duration:2e3}),uni.hideLoading()},fail:function(t){uni.showModal({title:"网络错误",content:"网络出错，请刷新重试",showCancel:!1})}})},fail:function(t){},complete:function(t){}})}function d(t,e,n){uni.request({url:i+t,method:"POST",header:{Accept:"application/json","content-type":"application/json",Authorization:uni.getStorageSync("cdj_token")},data:Object.assign(e,o),success:function(t){n(t),void 0!=t.header.Authorization&&uni.setStorageSync("cdj_token",t.header.Authorization),401==t.data.code&&uni.navigateTo({url:"/pages/account/login"})},fail:function(t){uni.showModal({title:"网络错误",content:"网络出错，请刷新重试",showCancel:!1})}})}function l(t){for(var e=Object.keys(t).sort(),n={},a="",o=0;o<e.length;o++)n[e[o]]=t[e[o]];return Object.keys(n).forEach((function(t){a+="&"+t+"="+n[t]})),a.substr(1)}function f(t){uni.showToast({title:t,icon:"none",duration:1e3})}function p(){var t=new Date,e=t.getFullYear().toString(),n=(t.getMonth()+1).toString(),a="";a=n<10?"0"+n:n;var o=t.getDate().toString(),i=e+"-"+a+"-01",r=e+"-"+a+"-"+o,s=[i,r];return s}t.exports={getRequest:s,getRequests:c,postRequest:u,postRequests:d,Toast:f,header:r,objKeySort:l,thedefaulttime:p}}}]);