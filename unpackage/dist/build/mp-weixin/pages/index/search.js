(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/search"],{"2b8d":function(e,t,n){"use strict";n.r(t);var o=n("36e1"),a=n("fbf1");for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);n("9f0f");var i,s=n("f0c5"),c=Object(s["a"])(a["default"],o["b"],o["c"],!1,null,"429263b6",null,!1,o["a"],i);t["default"]=c.exports},"36e1":function(e,t,n){"use strict";n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return o}));var o={myRecomend:function(){return n.e("components/recomend/index").then(n.bind(null,"83d8"))},uniPopup:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-popup/uni-popup")]).then(n.bind(null,"8cf4"))},myKeyboard:function(){return Promise.all([n.e("common/vendor"),n.e("components/keyboard/index")]).then(n.bind(null,"a2f5"))},myAddcart:function(){return n.e("components/addcart/index").then(n.bind(null,"8f64"))}},a=function(){var e=this,t=e.$createElement;e._self._c;e._isMounted||(e.e0=function(t){e.sortIndex=1},e.e1=function(t){e.sortIndex=2},e.e2=function(t){e.sortIndex=3},e.e3=function(t){return e.$refs.speech.close()},e.e4=function(t){return e.$refs.popup.close()})},r=[]},5328:function(e,t,n){},6056:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=getApp().globalData,o=n.appid,a=n.appsecret,r=(n.imgRemote,{data:function(){return{sortIndex:1,keyList:[],list:[],keyword:"",showSearch:!0,startSpeech:!0,config:[],bitmap:!1,arrObj:{},index:"",cartware:{}}},methods:{deleteHistory:function(){e.showModal({title:"提示",content:"确定清空历史记录吗？",confirmColor:"#57B127",success:function(e){e.confirm?console.log("用户点击确定"):e.cancel&&console.log("用户点击取消")}})},closeCart:function(){this.$refs.addcart.onClose()},closeKey:function(){this.$refs.keyboard.cancel()},toParent:function(e){var t=this,n=e.arrObj,r=Math.round((new Date).getTime()/1e3),i={appid:o,timeStamp:r,item_id:n.id,attr_id:0,item_num:e.val},s=md5.hexMD5(rs.objKeySort(i)+a),c=Object.assign({sign:s},i);rs.postRequests("changeNum",c,(function(n){var o=n.data;200==o.code?(rs.Toast("加入购物车成功"),t.list[t.index].cart_num=e.val):407==o.code||406==o.code?rs.Toast("购买数量不能超过活动数量"):rs.Toast(n.data.msg)})),this.$refs.popup.close()},openCart:function(e){this.cartware=e,this.$refs.cart.open()},onClose:function(){this.$refs.cart.close()},showKey:function(e,t){this.arrObj=e,this.index=t,this.$refs.popup.open()},getSearchData:function(){var e=this,t=Math.round((new Date).getTime()/1e3),n={appid:o,timeStamp:t},r=md5.hexMD5(rs.objKeySort(n)+a),i=Object.assign({sign:r},n);rs.getRequests("getSearchData",i,(function(t){var n=t.data;200==n.code?e.keyList=n.data:rs.Toast(n.msg)}))},submit:function(){this.searchList(this.keyword)},focus:function(){this.keyword="",this.showSearch=!0},searchList:function(e){var t=this;this.list=[],rs.getRequests("getSearchItem",params,(function(n){var o=n.data;200==o.code?(t.keyword=e,t.showSearch=!1,0!=o.data.length?(t.list=o.data.list,t.config=o.data,t.bitmap=!1):t.bitmap=!0):rs.Toast(o.msg)}))},hotSearch:function(){this.$get(this.$api.mainHotSearch,{},(function(e){}))},speed:function(){this.$refs.speech.open();var t=this;t.startSpeech=!0;var r=e.getRecorderManager(),i={duration:3e3,sampleRate:16e3,numberOfChannels:1,encodeBitRate:96e3,format:"mp3",frameSize:50};r.start(i),r.onStop((function(r){var i=Math.round((new Date).getTime()/1e3),s={appid:o,timeStamp:i},c=md5.hexMD5(rs.objKeySort(s)+a),u=r.tempFilePath;e.uploadFile({url:n.rootUrl+"/mobileOrder/voiceSearch",filePath:u,method:"POST",name:"audio",header:{"content-type":"multipart/form-data"},formData:{appid:o,timeStamp:i,audio:u,sign:c},success:function(e){console.log(JSON.parse(e.data));e=JSON.parse(e.data);200==e.code&&(t.keyword=e.data.message.replace(/。/g,""),t.showSearch=!1,t.$refs.speech.close(),t.searchList(t.keyword)),501==e.code&&(t.startSpeech=!1)},fail:function(){t.startSpeech=!1,console.log("语音识别失败")}})}))}},onHide:function(){},onShow:function(){this.hotSearch()}});t.default=r}).call(this,n("543d")["default"])},"7fce":function(e,t,n){"use strict";(function(e){n("0c84"),n("921b");o(n("66fd"));var t=o(n("2b8d"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"9f0f":function(e,t,n){"use strict";var o=n("5328"),a=n.n(o);a.a},fbf1:function(e,t,n){"use strict";n.r(t);var o=n("6056"),a=n.n(o);for(var r in o)"default"!==r&&function(e){n.d(t,e,(function(){return o[e]}))}(r);t["default"]=a.a}},[["7fce","common/runtime","common/vendor"]]]);