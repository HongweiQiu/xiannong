(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/search"],{"0836":function(e,t,a){"use strict";a.r(t);var n=a("5715"),o=a("a262");for(var i in o)"default"!==i&&function(e){a.d(t,e,(function(){return o[e]}))}(i);a("5dd0");var r,s=a("f0c5"),c=Object(s["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);t["default"]=c.exports},2043:function(e,t,a){},"4f7b":function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=i(a("3782")),o=i(a("fe41"));function i(e){return e&&e.__esModule?e:{default:e}}var r=console,s=(r.log,getApp().globalData),c=s.appid,u=s.appsecret,d=(s.imgRemote,{data:function(){return{keyList:[],list:[],keyword:"",showSearch:!0,startSpeech:!0,config:[],bitmap:!1,arrObj:{},index:"",cartware:{}}},methods:{back:function(){e.navigateBack({delta:1})},toParent:function(e){var t=this,a=e.arrObj,i=Math.round((new Date).getTime()/1e3),r={appid:c,timeStamp:i,item_id:a.id,attr_id:0,item_num:e.val},s=n.default.hexMD5(o.default.objKeySort(r)+u),d=Object.assign({sign:s},r);o.default.postRequests("changeNum",d,(function(a){var n=a.data;200==n.code?(o.default.Toast("加入购物车成功"),t.list[t.index].cart_num=e.val):407==n.code||406==n.code?o.default.Toast("购买数量不能超过活动数量"):o.default.Toast(a.data.msg)})),this.$refs.popup.close()},openCart:function(e){this.cartware=e,this.$refs.cart.open()},onClose:function(){this.$refs.cart.close()},showKey:function(e,t){this.arrObj=e,this.index=t,this.$refs.popup.open()},getSearchData:function(){var e=this,t=Math.round((new Date).getTime()/1e3),a={appid:c,timeStamp:t},i=n.default.hexMD5(o.default.objKeySort(a)+u),r=Object.assign({sign:i},a);o.default.getRequests("getSearchData",r,(function(t){var a=t.data;200==a.code?e.keyList=a.data:o.default.Toast(a.msg)}))},submit:function(){this.searchList(this.keyword)},focus:function(){this.keyword="",this.showSearch=!0},searchList:function(e){var t=this;this.list=[];var a=Math.round((new Date).getTime()/1e3),i={appid:c,timeStamp:a,keyword:e},r=n.default.hexMD5(o.default.objKeySort(i)+u),s=Object.assign({sign:r},i);o.default.getRequest("getSearchItem",s,(function(a){var n=a.data;200==n.code?(t.keyword=e,t.showSearch=!1,0!=n.data.length?(t.list=n.data.list,t.config=n.data,t.bitmap=!1):t.bitmap=!0):o.default.Toast(n.msg)}))},speed:function(){this.$refs.speech.open();var t=this;t.startSpeech=!0;var a=e.getRecorderManager(),i={duration:3e3,sampleRate:16e3,numberOfChannels:1,encodeBitRate:96e3,format:"mp3",frameSize:50};a.start(i),a.onStop((function(a){var i=Math.round((new Date).getTime()/1e3),r={appid:c,timeStamp:i},d=n.default.hexMD5(o.default.objKeySort(r)+u),f=a.tempFilePath;e.uploadFile({url:s.rootUrl+"/mobileOrder/voiceSearch",filePath:f,method:"POST",name:"audio",header:{"content-type":"multipart/form-data"},formData:{appid:c,timeStamp:i,audio:f,sign:d},success:function(e){console.log(JSON.parse(e.data));e=JSON.parse(e.data);200==e.code&&(t.keyword=e.data.message.replace(/。/g,""),t.showSearch=!1,t.$refs.speech.close(),t.searchList(t.keyword)),501==e.code&&(t.startSpeech=!1)},fail:function(){t.startSpeech=!1,console.log("语音识别失败")}})}))},wxConfig:function(){var e=Math.round((new Date).getTime()/1e3),t={appid:c,timeStamp:e},a=n.default.hexMD5(o.default.objKeySort(t)+u),i=Object.assign({sign:a},t);o.default.getRequests("wxConfig",i,(function(e){200==e.data.code&&(console.log(e.data),wx.config({debug:!1,appId:e.data.data.appId,timestamp:e.data.data.timestamp,nonceStr:e.data.data.nonceStr,signature:e.data.data.signature,jsApiList:["checkJsApi","startRecord","stopRecord","translateVoice","downloadVoice","uploadVoice","getLocation"]}))}))}},onHide:function(){e.setStorageSync("search",this.list)},onShow:function(){this.wxConfig(),this.getSearchData(),this.keyword&&(this.list=e.getStorageSync("search"))}});t.default=d}).call(this,a("543d")["default"])},5715:function(e,t,a){"use strict";var n={"uni-icons":function(){return Promise.all([a.e("common/vendor"),a.e("components/uni-icons/uni-icons")]).then(a.bind(null,"4aa4"))},"my-profile":function(){return a.e("components/profile/index").then(a.bind(null,"5738"))},"uni-popup":function(){return Promise.all([a.e("common/vendor"),a.e("components/uni-popup/uni-popup")]).then(a.bind(null,"4939"))},"my-addcart":function(){return a.e("components/addcart/index").then(a.bind(null,"2687"))},"my-keyboard":function(){return Promise.all([a.e("common/vendor"),a.e("components/keyboard/index")]).then(a.bind(null,"2a6a"))}},o=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){return e.$refs.speech.close()},e.e1=function(t){return e.$refs.popup.close()})},i=[];a.d(t,"b",(function(){return o})),a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return n}))},"5dd0":function(e,t,a){"use strict";var n=a("2043"),o=a.n(n);o.a},a0aa:function(e,t,a){"use strict";(function(e){a("47a8"),a("921b");n(a("66fd"));var t=n(a("0836"));function n(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},a262:function(e,t,a){"use strict";a.r(t);var n=a("4f7b"),o=a.n(n);for(var i in n)"default"!==i&&function(e){a.d(t,e,(function(){return n[e]}))}(i);t["default"]=o.a}},[["a0aa","common/runtime","common/vendor"]]]);