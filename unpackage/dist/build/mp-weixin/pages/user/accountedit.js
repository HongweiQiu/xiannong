(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/accountedit"],{"1c0d":function(t,e,a){"use strict";var n={"uni-nav-bar":function(){return a.e("components/uni-nav-bar/uni-nav-bar").then(a.bind(null,"f858"))},"evan-switch":function(){return a.e("components/evan-switch/evan-switch").then(a.bind(null,"dcd6"))},"uni-icons":function(){return Promise.all([a.e("common/vendor"),a.e("components/uni-icons/uni-icons")]).then(a.bind(null,"4ac6"))}},i=function(){var t=this,e=t.$createElement;t._self._c},o=[];a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return o})),a.d(e,"a",(function(){return n}))},"5deb":function(t,e,a){"use strict";(function(t){a("1995"),a("921b");n(a("66fd"));var e=n(a("f6be"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])},7586:function(t,e,a){"use strict";var n=a("c14c"),i=a.n(n);i.a},"88c5":function(t,e,a){"use strict";a.r(e);var n=a("9fab"),i=a.n(n);for(var o in n)"default"!==o&&function(t){a.d(e,t,(function(){return n[t]}))}(o);e["default"]=i.a},"9fab":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=o(a("4b89")),i=o(a("d07b"));function o(t){return t&&t.__esModule?t:{default:t}}var c=console,d=(c.log,getApp().globalData),u=d.appid,s=d.appsecret,l=(d.imgRemote,d.navBar),r={data:function(){return{navBar:l,checked:!1,status:"",childInfo:"",select_zid:"",longitude:"",latitude:"",save:!0,password:"",count:"",hide:""}},methods:{leftClick:function(){this.hide=!0,t.navigateBack({delta:1})},urlPage:function(){0==this.save?t.showModal({title:"放弃编辑",content:"地址信息未保存，确定离开吗？",success:function(e){e.confirm?t.navigateTo({url:"accountmange"}):e.cancel}}):t.navigateTo({url:"accountmange"})},mapPage:function(){var e=this;t.chooseLocation({success:function(t){e.childInfo.address=t.address;var a=e.tobdMap(t.longitude,t.latitude);e.lng=a.lng,e.lat=a.lat}})},tobdMap:function(t,e){var a=52.35987755982988,n=t,i=e,o=Math.sqrt(n*n+i*i)+2e-5*Math.sin(i*a),c=Math.atan2(i,n)+3e-6*Math.cos(n*a),d=o*Math.cos(c)+.0065,u=o*Math.sin(c)+.006;return{lng:d,lat:u}},deleteAccount:function(){var e=this;t.showModal({title:"提示",content:"是否删除该子账号？",success:function(a){if(a.confirm){var o=e.select_zid,c=Math.round((new Date).getTime()/1e3),d={appid:u,select_zid:o,timeStamp:c},l=n.default.hexMD5(i.default.objKeySort(d)+s),r={appid:u,timeStamp:c,select_zid:o,sign:l};i.default.getRequests("delChild",r,(function(e){101==e.data.code&&i.default.Toast("该账号已产生数据，无法删除"),200==e.data.code&&(i.default.Toast("删除成功"),setTimeout((function(){t.navigateTo({url:"accountmange"})}),1e3))}))}else a.cancel}})},openStatu:function(t){var e=this;e.checked=t.target.value},memberAddressInfo:function(){var t=this,e=t.select_zid,a=Math.round((new Date).getTime()/1e3),o={appid:u,timeStamp:a},c=n.default.hexMD5(i.default.objKeySort(o)+s),d={appid:u,timeStamp:a,sign:c,select_zid:e};i.default.getRequests("memberAddressInfo",d,(function(e){200==e.data.code&&(t.childInfo=e.data.data,t.status=e.data.data.status,0==t.status?t.checked=!1:1==t.status&&(t.checked=!0))}))},formSubmit:function(e){var a=this,o=a.select_zid;if(0==a.checked)var c=0;else if(1==a.checked)c=1;var d=e.detail.value.nickname,l=e.detail.value.contact,r=e.detail.value.mobile,f=e.detail.value.password,h=a.childInfo.address,m=a.longitude,v=a.latitude,p=e.detail.value.details,g=Math.round((new Date).getTime()/1e3),b={address:h,appid:u,contact:l,mobile:r,nickname:d,password:f,status:c,timeStamp:g,zid:o},M=n.default.hexMD5(i.default.objKeySort(b)+s);if(""==d)return i.default.Toast("名称不能为空"),!1;if(""==l)return i.default.Toast("联系人不能为空"),!1;if(""==r)return i.default.Toast("手机号不能为空"),!1;var _={address:h,appid:u,contact:l,mobile:r,nickname:d,password:f,status:c,zid:o,timeStamp:g,sign:M,longitude:m,latitude:v,details:p};i.default.postRequests("editChild",_,(function(e){200==e.data.code&&(i.default.Toast("修改成功"),a.save=!0,setTimeout((function(){t.navigateTo({url:"accountmange"})}),1e3)),400==e.data.code&&i.default.Toast(e.data.msg)}))}},onLoad:function(e){var a=t.getStorageSync("amend");a?(this.childInfo=a.childInfo,this.password=a.password,this.select_zid=a.select_zid):this.select_zid=e.select_zid,this.latitude=e.lat,this.longitude=e.lng,this.count=e.count||1,1==this.count&&this.memberAddressInfo()},onHide:function(){1==this.hide&&t.removeStorage({key:"amend"})}};e.default=r}).call(this,a("543d")["default"])},c14c:function(t,e,a){},f6be:function(t,e,a){"use strict";a.r(e);var n=a("1c0d"),i=a("88c5");for(var o in i)"default"!==o&&function(t){a.d(e,t,(function(){return i[t]}))}(o);a("7586");var c,d=a("f0c5"),u=Object(d["a"])(i["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],c);e["default"]=u.exports}},[["5deb","common/runtime","common/vendor"]]]);