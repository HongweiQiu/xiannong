(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabar/user"],{"28af":function(e,n,t){"use strict";(function(e){t("1995"),t("921b");a(t("66fd"));var n=a(t("cd99"));function a(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},3741:function(e,n,t){"use strict";t.r(n);var a=t("93c1"),o=t.n(a);for(var i in a)"default"!==i&&function(e){t.d(n,e,(function(){return a[e]}))}(i);n["default"]=o.a},6671:function(e,n,t){"use strict";var a={"uni-icons":function(){return Promise.all([t.e("common/vendor"),t.e("components/uni-icons/uni-icons")]).then(t.bind(null,"4ac6"))},"my-tabar":function(){return t.e("components/tabar/index").then(t.bind(null,"abb6"))}},o=function(){var e=this,n=e.$createElement;e._self._c},i=[];t.d(n,"b",(function(){return o})),t.d(n,"c",(function(){return i})),t.d(n,"a",(function(){return a}))},"8c1c":function(e,n,t){"use strict";var a=t("bba1"),o=t.n(a);o.a},"93c1":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=i(t("4b89")),o=i(t("d07b"));function i(e){return e&&e.__esModule?e:{default:e}}var c=getApp().globalData,s=c.appid,r=c.appsecret,u=c.imgRemote,d=(c.navBar,function(){Promise.all([t.e("common/vendor"),t.e("components/uni-icons/uni-icons")]).then(function(){return resolve(t("4ac6"))}.bind(null,t)).catch(t.oe)}),l={components:{uniIcons:d},data:function(){return{hShare:!1,userList:[{icon:"icon-08_zizhanghaoguanli",name:"账号管理",color:"#3DABFF",url:"accountmange"},{icon:"icon-fapiao",name:"开具发票",color:"#FF9C00",url:"receipt"},{icon:"icon-tianchongxing--",name:"账单记录",color:"#FFF000",url:"bill"},{color:"#ffab9a",icon:"icon-buy-fill",name:"购买记录",url:"purchase_record"},{icon:"icon-qianbao",name:"充值",color:"#2DC4B4",url:"invest"},{icon:"icon-juan",name:"现金劵",color:"#F8632F",url:"cash"},{icon:"icon-weixin",name:0==e.getStorageSync("is_miniBind")?"绑定微信":"改绑微信",color:"#26DD5B",url:"bindWeChat"}],is_bind:"",is_child:"",token:"",imgRemote:u,memberInfoData:"",member_default:"",code:"",shareInfo:[]}},methods:{share:function(){if(this.token)if(0==this.hShare){var n=this;n.hShare=!0;var t=Math.round((new Date).getTime()/1e3),i={appid:s,timeStamp:t},c=a.default.hexMD5(o.default.objKeySort(i)+r),u={appid:s,timeStamp:t,sign:c};o.default.getRequests("shareConfig",u,(function(e){if(200==e.data.code){var t=e.data.data;WeixinJSBridge.on("menu:share:appmessage",(function(e){WeixinJSBridge.invoke("sendAppMessage",{appid:n.userinfo.appId,img_url:t.share_img,img_width:"120",img_height:"120",link:t.share_href,desc:t.share_describe,title:t.share_title},(function(e){this.hShare=!1,console.log(e)}))}))}else o.default.Toast(e.data.msg)}))}else this.hShare=!1;else e.navigateTo({url:"/pages/account/login"})},memberInfo:function(){var e=this,n=Math.round((new Date).getTime()/1e3),t={appid:s,timeStamp:n},i=a.default.hexMD5(o.default.objKeySort(t)+r),c={appid:s,timeStamp:n,sign:i};o.default.getRequests("memberInfo",c,(function(n){200==n.data.code&&(e.memberInfoData=n.data.data.info,e.member_default=n.data.data.member_default)}))},myinfoPage:function(){this.token?e.navigateTo({url:"/pages/user/myinfo"}):e.navigateTo({url:"/pages/account/login"})},pageUrl:function(n){this.token?"bindWeChat"==n.url?this.wxbindWeChat():(getApp().globalData.isReload=!0,e.navigateTo({url:"/pages/user/".concat(n.url)})):e.reLaunch({url:"/pages/account/login"})},wxbindWeChat:function(n){console.log("小程序绑定");var t=this;e.showModal({content:1==this.is_bind?"是否微信改绑":"是否绑定微信",cancelText:"我再想想",cancelColor:"#999",confirmText:"确认",confirmColor:"#009a44",success:function(n){n.confirm?e.getUserInfo({provider:"weixin",success:function(n){n.encryptedData,n.iv;console.log(n),e.login({provider:"weixin",success:function(e){console.log(e.code),t.wxbindWeChata(e.code)}})}}):n.cancel}})},wxbindWeChata:function(n){var t=Math.round((new Date).getTime()/1e3),i={appid:s,code:n,timeStamp:t},c=a.default.hexMD5(o.default.objKeySort(i)+r),u={appid:s,code:n,type:"mini",timeStamp:t,sign:c};o.default.postRequests("bindWeChat",u,(function(n){200==n.data.code?(o.default.Toast("绑定微信成功"),setTimeout((function(){e.clearStorage({success:function(n){e.navigateTo({url:"/pages/account/login"})}})}),1e3)):o.default.Toast(n.data.msg)}))},adminisus_weixin:function(){console.log("H5绑定");var n=this;e.showModal({content:1==this.is_bind?"是否微信改绑":"是否绑定微信",cancelText:"我再想想",cancelColor:"#999",confirmText:"确认",confirmColor:"#DEC17C",success:function(t){if(t.confirm){e.setStorageSync("isWeixin",!0);var a=location.search,o=a.substring(a.indexOf("=")+1,a.lastIndexOf("&"));if(!o){var i=window.location.href,c=encodeURIComponent(i),s="https://open.weixin.qq.com/connect/oauth2/authorize?appid="+n.userinfo.appId+"&redirect_uri="+c+"&response_type=code&scope=snsapi_userinfo#wechat_redirect";window.location.href=s}}else t.cancel}})},bindWeChat:function(){console.log("APP绑定");var n=this;e.getProvider({service:"oauth",success:function(t){~t.provider.indexOf("weixin")?e.login({provider:"weixin",success:function(t){e.getUserInfo({provider:"weixin",success:function(e){n.code=e.userInfo.openId,n.bindWeChata()}})}}):e.showToast({title:"手机上还没安装微信,请安装微信后重试",duration:2e3,icon:"none"})}})},bindWeChata:function(){var n=this;e.showModal({content:1==this.is_bind?"是否微信改绑":"是否绑定微信",cancelText:"我再想想",cancelColor:"#999",confirmText:"确认",confirmColor:"#DEC17C",success:function(t){if(t.confirm){var i=n.code,c=Math.round((new Date).getTime()/1e3),u={appid:s,timeStamp:c},d=a.default.hexMD5(o.default.objKeySort(u)+r),l={appid:s,app_openid:i,type:"app",timeStamp:c,sign:d};o.default.postRequests("saveMemberInfo",l,(function(n){200==n.data.code?(o.default.Toast("绑定微信成功,"),setTimeout((function(){e.clearStorage({success:function(n){e.navigateTo({url:"/pages/account/login"})}})}),1e3)):o.default.Toast(n.data.msg)}))}else t.cancel}})},threePage:function(n){if(this.token)switch(n){case"recomend":e.navigateTo({url:"/pages/index/recommed"});break;case"address":e.navigateTo({url:"/pages/user/userAddress"});break;case"password":e.navigateTo({url:"/pages/user/modifypwd"});break}else e.reLaunch({url:"/pages/account/login"})},exit:function(){this.token?e.showModal({title:"提示",content:"是否退出登录？",success:function(n){if(n.confirm){var t=Math.round((new Date).getTime()/1e3),i={appid:s,timeStamp:t},c=a.default.hexMD5(o.default.objKeySort(i)+r),u={appid:s,timeStamp:t,sign:c};o.default.getRequests("logout",u,(function(n){200==n.data.code&&(e.showToast({title:"退出成功",icon:"none"}),setTimeout((function(){e.clearStorage({success:function(n){e.navigateTo({url:"/pages/account/login"})}})}),1e3))}))}else n.cancel}}):e.navigateTo({url:"/pages/account/login"})},wxConfig:function(){var e=this;if(this.token){var n=Math.round((new Date).getTime()/1e3),t={appid:s,timeStamp:n},i=a.default.hexMD5(o.default.objKeySort(t)+r),c={appid:s,timeStamp:n,sign:i};o.default.getRequests("wxConfig",c,(function(n){200==n.data.code&&(e.userinfo=n.data.data,wx.config({debug:!1,appId:n.data.data.appId,timestamp:n.data.data.timestamp,nonceStr:n.data.data.nonceStr,signature:n.data.data.signature,jsApiList:["updateAppMessageShareData","onMenuShareAppMessage"]}))}))}}},onLoad:function(){e.hideTabBar()},onShow:function(){var n=this;n.memberInfo(),n.is_bind=e.getStorageSync("is_miniBind"),n.is_child=e.getStorageSync("is_child"),n.token=e.getStorageSync("cdj_token");var t=Math.round((new Date).getTime()/1e3),i={appid:s,timeStamp:t},c=a.default.hexMD5(o.default.objKeySort(i)+r),u={appid:s,timeStamp:t,sign:c};o.default.getRequests("shareConfig",u,(function(e){200==e.data.code&&(n.shareInfo=e.data.data)}))},onShareAppMessage:function(){var e=this.shareInfo.share_href;return{imageUrl:this.shareInfo.share_img,path:e.substring(e.indexOf("#")+1),desc:this.shareInfo.share_describe,title:this.shareInfo.share_title}}};n.default=l}).call(this,t("543d")["default"])},bba1:function(e,n,t){},cd99:function(e,n,t){"use strict";t.r(n);var a=t("6671"),o=t("3741");for(var i in o)"default"!==i&&function(e){t.d(n,e,(function(){return o[e]}))}(i);t("8c1c");var c,s=t("f0c5"),r=Object(s["a"])(o["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],c);n["default"]=r.exports}},[["28af","common/runtime","common/vendor"]]]);