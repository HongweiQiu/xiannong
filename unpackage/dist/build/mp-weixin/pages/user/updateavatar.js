(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/updateavatar"],{1292:function(t,e,a){},"3cf2":function(t,e,a){"use strict";a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return i})),a.d(e,"a",(function(){return o}));var o={uniPopup:function(){return Promise.all([a.e("common/vendor"),a.e("components/uni-popup/uni-popup")]).then(a.bind(null,"8cf4"))}},n=function(){var t=this,e=t.$createElement;t._self._c},i=[]},"5d79":function(t,e,a){"use strict";(function(t){a("0c84"),a("921b");o(a("66fd"));var e=o(a("7463"));function o(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},"71f8":function(t,e,a){"use strict";var o=a("1292"),n=a.n(o);n.a},7463:function(t,e,a){"use strict";a.r(e);var o=a("3cf2"),n=a("cbbd");for(var i in n)"default"!==i&&function(t){a.d(e,t,(function(){return n[t]}))}(i);a("71f8");var r,u=a("f0c5"),c=Object(u["a"])(n["default"],o["b"],o["c"],!1,null,"0a7c6211",null,!1,o["a"],r);e["default"]=c.exports},cbbd:function(t,e,a){"use strict";a.r(e);var o=a("f281"),n=a.n(o);for(var i in o)"default"!==i&&function(t){a.d(e,t,(function(){return o[t]}))}(i);e["default"]=n.a},f281:function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=getApp().globalData,o=a.imgRemote,n={data:function(){return{tempFilePath:"",cropFilePath:"",avatarUrl:t.getStorageSync("userInfo").avatar,imgUrl:a.imgUrl,imgRemote:o,phone:"",memberInfoData:"",member_default:"",nickname:"",password:"",confirmPwd:"",imgPath:"",count:0}},methods:{memberInfo:function(){var t=this,e=Math.round((new Date).getTime()/1e3),a={appid:appid,timeStamp:e},o=md5.hexMD5(rs.objKeySort(a)+appsecret),n={appid:appid,timeStamp:e,sign:o};rs.getRequests("memberInfo",n,(function(e){if(200==e.data.code){var a=/^(\d{3})\d*(\d{4})$/;t.memberInfoData=e.data.data.info,t.cropFilePath=t.memberInfoData.logo,t.nickname=t.memberInfoData.nickname,t.member_default=e.data.data.member_default,t.phone=e.data.data.info.phone.replace(a,"$1****$2")}}))},modifyPwd:function(){t.navigateTo({url:"./modifypwd"})},showUpload:function(t){"open"==t?this.$refs.popup.open():this.$refs.popup.close()},upload:function(){var e=this;t.chooseImage({count:1,sizeType:["original","compressed"],success:function(t){e.showtitle=!1,e.tempFilePath=t.tempFilePaths.shift()}})},confirm:function(e){this.showtitle=!0,this.tempFilePath="";var o=e.detail.tempFilePath,n="avatars",i=Math.round((new Date).getTime()/1e3),r={appid:appid,type:n,timeStamp:i},u=md5.hexMD5(rs.objKeySort(r)+appsecret),c=this;t.uploadFile({method:"POST",url:a.rootUrl+"/mobileOrder/uploadImg",name:"img",header:{Authorization:t.getStorageSync("cdj_token")},formData:{appid:appid,timeStamp:i,type:n,img:o,sign:u},filePath:o,success:function(t){var e=JSON.parse(t.data);c.imgPath=e.data.path,c.cropFilePath=e.data.src,c.uploadAvatar()}})},uploadAvatar:function(){var e=this,a=e.imgPath,o=Math.round((new Date).getTime()/1e3),n={appid:appid,img:a,timeStamp:o},i=md5.hexMD5(rs.objKeySort(n)+appsecret),r={appid:appid,img:a,timeStamp:o,sign:i};rs.postRequests("uploadAvatar",r,(function(e){200==e.data.code&&t.showToast({title:"更换头像成功",icon:"none"})}))},formSubmit:function(){var e=this;t.showModal({title:"提示",content:"是否退出",cancelColor:"#999",confirmColor:"#59B727",success:function(a){a.confirm&&e.$get(e.$api.userLogout,{token:t.getStorageSync("userInfo").token},(function(a){1==a.data.code?(e.$Toast("退出成功"),t.removeStorageSync("userInfo"),t.removeStorageSync("userToken"),setTimeout((function(){t.reLaunch({url:"../account/login"})}),1e3)):e.$Toast(a.data.msg)}))}})}},onShow:function(){}};e.default=n}).call(this,a("543d")["default"])}},[["5d79","common/runtime","common/vendor"]]]);