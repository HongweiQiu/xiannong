(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-account-register"],{"235e":function(e,t,n){"use strict";var a=n("ee27");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(n("bf09")),o=a(n("3782")),r=a(n("fe41")),s=getApp().globalData,c=s.navBar,u=s.appid,l=s.appsecret,d={components:{moveVerify:i.default},data:function(){return{navBar:c,nickname:"",mobile:"",password:"",confirm_pwd:"",number_code:"",verify_code:"",showcode:!1,back:!0,identifying:"",resultData:{}}},methods:{leftClick:function(){uni.navigateBack({delta:1})},pageUrl:function(e){uni.navigateTo({url:e})},verifyResult:function(e){this.resultData=e,1!=this.resultData.flag||this.captcha()},captcha:function(){var e=this,t=Math.round((new Date).getTime()/1e3),n={appid:u,timeStamp:t},a=o.default.hexMD5(r.default.objKeySort(n)+l),i=Object.assign({sign:a},n);r.default.getRequests("random",i,(function(t){var n=t.data;200==n.code?(e.number_code=n.data.number,uni.setStorageSync("laravel_session",t.header["Set-Cookie"])):r.default.Toast(n.msg)}))},getCode:function(){var e=Math.round((new Date).getTime()/1e3);if(this.mobile)if(this.number_code){var t=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;if(t.test(this.mobile)){var n={appid:u,mobile:this.mobile,timeStamp:e},a=this,i=o.default.hexMD5(r.default.objKeySort(n)+l),c=o.default.hexMD5(l+this.number_code),d=Object.assign({sign:i,secret_str:c,active:2},n);uni.request({url:s.rootUrl+"/mobileOrder/sendCode",method:"POST",header:{"content-type":"application/json",cookie:uni.getStorageSync("laravel_session")},data:d,success:function(e){200==e.data.code?(a.$refs.code.sendCode(),a.number_code=e.data.data.random_str,r.default.Toast("验证码已发送到你手机中，请注意查收")):(a.verifyReset(),r.default.Toast(e.data.msg))}})}else uni.showToast({title:"不能输入特殊字符和空格",duration:2e3,icon:"none"})}else r.default.Toast("请先拖动滑块");else r.default.Toast("手机号不能为空")},verifyReset:function(){this.$refs.verifyElement.reset(),this.resultData={}},register:function(){if(this.nickname)if(this.mobile)if(this.password){var e=/^[\u4e00-\u9fa5_a-zA-Z0-9]+$/;if(e.test(this.nickname)&&e.test(this.mobile)&&e.test(this.password))if(this.password.length<6)r.default.Toast("请设置六位及以上的密码");else if(this.password==this.confirm_pwd){var t=Math.round((new Date).getTime()/1e3),n={appid:u,timeStamp:t,nickname:this.nickname,mobile:this.mobile,password:this.password,confirm_pwd:this.confirm_pwd,verify_code:this.verify_code},a=o.default.hexMD5(r.default.objKeySort(n)+l);this.identifying&&(n.openid=this.identifying);var i=Object.assign({sign:a},n),c=this;uni.request({url:s.rootUrl+"/mobileOrder/register",method:"POST",data:i,header:{"content-type":"application/json",cookie:uni.getStorageSync("laravel_session")},success:function(e){200==e.data.code?(r.default.Toast("注册成功"),setTimeout((function(){uni.navigateTo({url:"./login"})}),1e3)):(r.default.Toast(e.data.msg),c.verifyReset())}})}else r.default.Toast("请确保密码一致");else r.default.Toast("不能输入特殊字符和空格")}else r.default.Toast("密码不能为空");else r.default.Toast("手机号不能为空");else r.default.Toast("单位名称不能为空")}},onLoad:function(e){var t=this;t.identifying=e.identifying}};t.default=d},"31be":function(e,t,n){"use strict";n.r(t);var a=n("235e"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},3782:function(e,t,n){n("d3b7"),n("ac1f"),n("25f0"),n("5319");var a=function(e,t){return e<<t|e>>>32-t},i=function(e,t){var n,a,i,o,r;return i=2147483648&e,o=2147483648&t,n=1073741824&e,a=1073741824&t,r=(1073741823&e)+(1073741823&t),n&a?2147483648^r^i^o:n|a?1073741824&r?3221225472^r^i^o:1073741824^r^i^o:r^i^o},o=function(e,t,n){return e&t|~e&n},r=function(e,t,n){return e&n|t&~n},s=function(e,t,n){return e^t^n},c=function(e,t,n){return t^(e|~n)},u=function(e,t,n,r,s,c,u){return e=i(e,i(i(o(t,n,r),s),u)),i(a(e,c),t)},l=function(e,t,n,o,s,c,u){return e=i(e,i(i(r(t,n,o),s),u)),i(a(e,c),t)},d=function(e,t,n,o,r,c,u){return e=i(e,i(i(s(t,n,o),r),u)),i(a(e,c),t)},f=function(e,t,n,o,r,s,u){return e=i(e,i(i(c(t,n,o),r),u)),i(a(e,s),t)},p=function(e){var t,n=e.length,a=n+8,i=(a-a%64)/64,o=16*(i+1),r=Array(o-1),s=0,c=0;while(c<n)t=(c-c%4)/4,s=c%4*8,r[t]=r[t]|e.charCodeAt(c)<<s,c++;return t=(c-c%4)/4,s=c%4*8,r[t]=r[t]|128<<s,r[o-2]=n<<3,r[o-1]=n>>>29,r},h=function(e){var t,n,a="",i="";for(n=0;n<=3;n++)t=e>>>8*n&255,i="0"+t.toString(16),a+=i.substr(i.length-2,2);return a},v=function(e){e=e.replace(/\x0d\x0a/g,"\n");for(var t="",n=0;n<e.length;n++){var a=e.charCodeAt(n);a<128?t+=String.fromCharCode(a):a>127&&a<2048?(t+=String.fromCharCode(a>>6|192),t+=String.fromCharCode(63&a|128)):(t+=String.fromCharCode(a>>12|224),t+=String.fromCharCode(a>>6&63|128),t+=String.fromCharCode(63&a|128))}return t};function g(e){var t,n,a,o,r,s,c,g,b,m=Array(),y=7,w=12,_=17,k=22,S=5,T=9,j=14,x=20,C=4,A=11,z=16,O=23,D=6,M=10,E=15,$=21;for(e=v(e),m=p(e),s=1732584193,c=4023233417,g=2562383102,b=271733878,t=0;t<m.length;t+=16)n=s,a=c,o=g,r=b,s=u(s,c,g,b,m[t+0],y,3614090360),b=u(b,s,c,g,m[t+1],w,3905402710),g=u(g,b,s,c,m[t+2],_,606105819),c=u(c,g,b,s,m[t+3],k,3250441966),s=u(s,c,g,b,m[t+4],y,4118548399),b=u(b,s,c,g,m[t+5],w,1200080426),g=u(g,b,s,c,m[t+6],_,2821735955),c=u(c,g,b,s,m[t+7],k,4249261313),s=u(s,c,g,b,m[t+8],y,1770035416),b=u(b,s,c,g,m[t+9],w,2336552879),g=u(g,b,s,c,m[t+10],_,4294925233),c=u(c,g,b,s,m[t+11],k,2304563134),s=u(s,c,g,b,m[t+12],y,1804603682),b=u(b,s,c,g,m[t+13],w,4254626195),g=u(g,b,s,c,m[t+14],_,2792965006),c=u(c,g,b,s,m[t+15],k,1236535329),s=l(s,c,g,b,m[t+1],S,4129170786),b=l(b,s,c,g,m[t+6],T,3225465664),g=l(g,b,s,c,m[t+11],j,643717713),c=l(c,g,b,s,m[t+0],x,3921069994),s=l(s,c,g,b,m[t+5],S,3593408605),b=l(b,s,c,g,m[t+10],T,38016083),g=l(g,b,s,c,m[t+15],j,3634488961),c=l(c,g,b,s,m[t+4],x,3889429448),s=l(s,c,g,b,m[t+9],S,568446438),b=l(b,s,c,g,m[t+14],T,3275163606),g=l(g,b,s,c,m[t+3],j,4107603335),c=l(c,g,b,s,m[t+8],x,1163531501),s=l(s,c,g,b,m[t+13],S,2850285829),b=l(b,s,c,g,m[t+2],T,4243563512),g=l(g,b,s,c,m[t+7],j,1735328473),c=l(c,g,b,s,m[t+12],x,2368359562),s=d(s,c,g,b,m[t+5],C,4294588738),b=d(b,s,c,g,m[t+8],A,2272392833),g=d(g,b,s,c,m[t+11],z,1839030562),c=d(c,g,b,s,m[t+14],O,4259657740),s=d(s,c,g,b,m[t+1],C,2763975236),b=d(b,s,c,g,m[t+4],A,1272893353),g=d(g,b,s,c,m[t+7],z,4139469664),c=d(c,g,b,s,m[t+10],O,3200236656),s=d(s,c,g,b,m[t+13],C,681279174),b=d(b,s,c,g,m[t+0],A,3936430074),g=d(g,b,s,c,m[t+3],z,3572445317),c=d(c,g,b,s,m[t+6],O,76029189),s=d(s,c,g,b,m[t+9],C,3654602809),b=d(b,s,c,g,m[t+12],A,3873151461),g=d(g,b,s,c,m[t+15],z,530742520),c=d(c,g,b,s,m[t+2],O,3299628645),s=f(s,c,g,b,m[t+0],D,4096336452),b=f(b,s,c,g,m[t+7],M,1126891415),g=f(g,b,s,c,m[t+14],E,2878612391),c=f(c,g,b,s,m[t+5],$,4237533241),s=f(s,c,g,b,m[t+12],D,1700485571),b=f(b,s,c,g,m[t+3],M,2399980690),g=f(g,b,s,c,m[t+10],E,4293915773),c=f(c,g,b,s,m[t+1],$,2240044497),s=f(s,c,g,b,m[t+8],D,1873313359),b=f(b,s,c,g,m[t+15],M,4264355552),g=f(g,b,s,c,m[t+6],E,2734768916),c=f(c,g,b,s,m[t+13],$,1309151649),s=f(s,c,g,b,m[t+4],D,4149444226),b=f(b,s,c,g,m[t+11],M,3174756917),g=f(g,b,s,c,m[t+2],E,718787259),c=f(c,g,b,s,m[t+9],$,3951481745),s=i(s,n),c=i(c,a),g=i(g,o),b=i(b,r);var q=h(s)+h(c)+h(g)+h(b);return q.toLowerCase()}e.exports={hexMD5:g}},"7a6c":function(e,t,n){"use strict";var a=n("85a9"),i=n.n(a);i.a},"85a9":function(e,t,n){var a=n("eadc");"string"===typeof a&&(a=[[e.i,a,""]]),a.locals&&(e.exports=a.locals);var i=n("4f06").default;i("2d160d9e",a,!0,{sourceMap:!1,shadowMode:!1})},eadc:function(e,t,n){var a=n("24fb");t=a(!1),t.push([e.i,"uni-page-body[data-v-3e3ba587]{background:#fff}.register .get_info[data-v-3e3ba587]{background:#fff;padding:0 %?20?%;margin-top:%?10?%}.register .get_info>uni-view[data-v-3e3ba587]{display:-webkit-box;display:-webkit-flex;display:flex;height:%?80?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;border-bottom:1px solid #f7f6f6}.register .get_info>uni-view>uni-text[data-v-3e3ba587]{width:%?150?%;color:grey}.register .button_style[data-v-3e3ba587]{font-size:%?32?%;width:%?384?%;height:%?64?%;line-height:%?64?%}.register .now_login[data-v-3e3ba587]{color:#a1a1a1;text-align:center;font-size:%?24?%;height:%?500?%}.register .agree[data-v-3e3ba587]{position:fixed;width:100%;bottom:%?20?%;text-align:center;font-size:%?24?%;color:#418d5f}body.?%PAGE?%[data-v-3e3ba587]{background:#fff}",""]),e.exports=t},f04a:function(e,t,n){"use strict";n.r(t);var a=n("fd4b"),i=n("31be");for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("7a6c");var r,s=n("f0c5"),c=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,"3e3ba587",null,!1,a["a"],r);t["default"]=c.exports},fd4b:function(e,t,n){"use strict";var a={"uni-nav-bar":n("01c8").default,"my-identifyingcode":n("858d").default},i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"register"},[n("uni-nav-bar",{attrs:{"left-icon":"arrowleft",title:"注册","status-bar":e.navBar,fixed:"true"},on:{clickLeft:function(t){arguments[0]=t=e.$handleEvent(t),e.leftClick.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"get_info"},[n("v-uni-view",[n("v-uni-text",[e._v("单位名称")]),n("v-uni-input",{attrs:{type:"text",placeholder:"请输入单位名称","placeholder-class":"place_style"},model:{value:e.nickname,callback:function(t){e.nickname=t},expression:"nickname"}})],1),n("v-uni-view",[n("v-uni-text",[e._v("手机号")]),n("v-uni-input",{attrs:{type:"number",placeholder:"请输入手机","placeholder-class":"place_style"},model:{value:e.mobile,callback:function(t){e.mobile=t},expression:"mobile"}})],1),n("v-uni-view",[n("v-uni-text",[e._v("密码")]),n("v-uni-input",{attrs:{password:!0,placeholder:"请输入六位及以上的密码","placeholder-class":"place_style"},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}})],1),n("v-uni-view",[n("v-uni-text",[e._v("确认密码")]),n("v-uni-input",{attrs:{password:!0,placeholder:"请再次确认登录密码","placeholder-class":"place_style"},model:{value:e.confirm_pwd,callback:function(t){e.confirm_pwd=t},expression:"confirm_pwd"}})],1),n("move-verify",{ref:"verifyElement",on:{result:function(t){arguments[0]=t=e.$handleEvent(t),e.verifyResult.apply(void 0,arguments)}}}),n("v-uni-view",{staticClass:"flex"},[n("v-uni-text",[e._v("验证码")]),n("v-uni-view",{staticClass:"flex_left_right",staticStyle:{width:"79%"}},[n("v-uni-input",{attrs:{type:"number",placeholder:"请输入验证码","placeholder-class":"place_style"},on:{focus:function(t){arguments[0]=t=e.$handleEvent(t),e.back=!1}},model:{value:e.verify_code,callback:function(t){e.verify_code=t},expression:"verify_code"}}),n("my-identifyingcode",{ref:"code",on:{getCode:function(t){arguments[0]=t=e.$handleEvent(t),e.getCode.apply(void 0,arguments)}}})],1)],1)],1),n("v-uni-view",{staticClass:"submit_button button_style",class:{gray_b:e.back},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.register.apply(void 0,arguments)}}},[e._v("提交")]),n("v-uni-view",{staticClass:"now_login",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.pageUrl("login")}}},[e._v("已有账户？现在登录>>")]),n("v-uni-view",{staticClass:"agree",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.pageUrl("treaty")}}},[e._v("注册协议")])],1)},o=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a}))},fe41:function(e,t,n){n("4160"),n("4e82"),n("b64b"),n("159b");var a=getApp(),i={active:a.globalData.active},o=a.globalData.rootUrl+"/mobileOrder/";if(uni.getStorageSync("cdj_token"))var r={Accept:"application/json","content-type":"application/json",Authorization:uni.getStorageSync("cdj_token")};function s(e,t,n){uni.showLoading({title:"加载中...",duration:2e3,mask:!0,success:function(a){uni.request({url:o+e,method:"GET",header:{Accept:"application/json","content-type":"application/json",Authorization:uni.getStorageSync("cdj_token")},data:Object.assign(t,i),success:function(e){n(e),void 0!=e.header.Authorization&&uni.setStorageSync("cdj_token",e.header.Authorization),400==e.data.code&&uni.showToast({title:e.data.msg,icon:"none",duration:2e3,success:function(){}}),401==e.data.code&&uni.navigateTo({url:"/pages/account/login"}),uni.hideLoading()},fail:function(e){uni.showModal({title:e.data,content:"网络出错，请刷新重试",showCancel:!1})}})},fail:function(e){},complete:function(e){}})}function c(e,t,n){uni.request({url:o+e,method:"GET",header:{Accept:"application/json","content-type":"application/json",Authorization:uni.getStorageSync("cdj_token")},data:Object.assign(t,i),success:function(e){n(e),void 0!=e.header.Authorization&&uni.setStorageSync("cdj_token",e.header.Authorization),401==e.data.code&&uni.navigateTo({url:"/pages/account/login"}),408==e.data.code&&uni.navigateTo({url:"/pages/account/service"})},fail:function(e){uni.showModal({title:e.data,content:"网络出错，请刷新重试",showCancel:!1})}})}function u(e,t,n){uni.showLoading({title:"加载中",mask:!0,success:function(a){uni.request({url:o+e,method:"POST",header:{Accept:"application/json","content-type":"application/json",Authorization:uni.getStorageSync("cdj_token")},data:Object.assign(t,i),success:function(e){n(e),void 0!=e.header.Authorization&&uni.setStorageSync("cdj_token",e.header.Authorization),400==e.data.code&&uni.showToast({title:e.data.msg,icon:"none",duration:2e3,success:function(){}}),401==e.data.code&&uni.navigateTo({url:"/pages//account/login"}),403==e.data.code&&uni.showToast({title:"账号已禁用",icon:"none",duration:2e3,success:function(){uni.navigateTo({url:"/pages/account/login"})}}),408==e.data.code&&uni.showToast({title:"抱歉，您的服务已到期，请联系《菜东家》工作人员续费！",icon:"none",duration:2e3}),uni.hideLoading()},fail:function(e){uni.showModal({title:"网络错误",content:"网络出错，请刷新重试",showCancel:!1})}})},fail:function(e){},complete:function(e){}})}function l(e,t,n){uni.request({url:o+e,method:"POST",header:{Accept:"application/json","content-type":"application/json",Authorization:uni.getStorageSync("cdj_token")},data:Object.assign(t,i),success:function(e){n(e),void 0!=e.header.Authorization&&uni.setStorageSync("cdj_token",e.header.Authorization),401==e.data.code&&uni.navigateTo({url:"/pages/account/login"})},fail:function(e){uni.showModal({title:"网络错误",content:"网络出错，请刷新重试",showCancel:!1})}})}function d(e){for(var t=Object.keys(e).sort(),n={},a="",i=0;i<t.length;i++)n[t[i]]=e[t[i]];return Object.keys(n).forEach((function(e){a+="&"+e+"="+n[e]})),a.substr(1)}function f(e){uni.showToast({title:e,icon:"none",duration:1e3})}e.exports={getRequest:s,getRequests:c,postRequest:u,postRequests:l,Toast:f,header:r,objKeySort:d}}}]);