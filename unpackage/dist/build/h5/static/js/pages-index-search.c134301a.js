(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-search"],{"0dec":function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,".my_profile[data-v-c180055a]{padding:%?20?% %?20?% %?10?%;background:#fff}.my_profile .photo[data-v-c180055a]{margin-right:%?20?%;width:%?200?%}.my_profile .good_img[data-v-c180055a]{width:100%;height:%?160?%}.my_profile .info[data-v-c180055a]{width:calc(100% - %?200?%);display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.my_profile .operate[data-v-c180055a]{height:100%;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.my_profile .add_cart[data-v-c180055a]{width:%?32?%;height:%?32?%}",""]),e.exports=t},"2fac":function(e,t,i){e.exports=i.p+"static/img/no_content.abece34c.png"},"546a":function(e,t,i){(function(n){var a;i("c975"),i("ac1f"),i("466d"),i("5319"),i("1276");var o=i("5757");!function(n,o){a=function(){return o(n)}.call(t,i,t,e),void 0===a||(e.exports=a)}(window,(function(e,t){if(!e.jWeixin){var i,a,r={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},s=function(){var e={};for(var t in r)e[r[t]]=t;return e}(),c=e.document,d=c.title,l=navigator.userAgent.toLowerCase(),u=navigator.platform.toLowerCase(),f=!(!u.match("mac")&&!u.match("win")),p=-1!=l.indexOf("wxdebugger"),h=-1!=l.indexOf("micromessenger"),g=-1!=l.indexOf("android"),v=-1!=l.indexOf("iphone")||-1!=l.indexOf("ipad"),m=(a=l.match(/micromessenger\/(\d+\.\d+\.\d+)/)||l.match(/micromessenger\/(\d+\.\d+)/))?a[1]:"",w={initStartTime:$(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},_={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:v?1:g?2:-1,clientVersion:m,url:encodeURIComponent(location.href)},y={},b={_completes:[]},k={state:0,data:{}};j((function(){w.initEndTime=$()}));var S=!1,x=[],C=(i={config:function(t){L("config",y=t);var i=!1!==y.check;j((function(){if(i)M(r.config,{verifyJsApiList:A(y.jsApiList),verifyOpenTagList:A(y.openTagList)},function(){b._complete=function(e){w.preVerifyEndTime=$(),k.state=1,k.data=e},b.success=function(e){_.isPreVerifyOk=0},b.fail=function(e){b._fail?b._fail(e):k.state=-1};var e=b._completes;return e.push((function(){!function(){if(!(f||p||y.debug||m<"6.0.2"||_.systemType<0)){var e=new Image;_.appId=y.appId,_.initTime=w.initEndTime-w.initStartTime,_.preVerifyTime=w.preVerifyEndTime-w.preVerifyStartTime,C.getNetworkType({isInnerInvoke:!0,success:function(t){_.networkType=t.networkType;var i="https://open.weixin.qq.com/sdk/report?v="+_.version+"&o="+_.isPreVerifyOk+"&s="+_.systemType+"&c="+_.clientVersion+"&a="+_.appId+"&n="+_.networkType+"&i="+_.initTime+"&p="+_.preVerifyTime+"&u="+_.url;e.src=i}})}}()})),b.complete=function(t){for(var i=0,n=e.length;i<n;++i)e[i]();b._completes=[]},b}()),w.preVerifyStartTime=$();else{k.state=1;for(var e=b._completes,t=0,n=e.length;t<n;++t)e[t]();b._completes=[]}})),C.invoke||(C.invoke=function(t,i,n){e.WeixinJSBridge&&WeixinJSBridge.invoke(t,V(i),n)},C.on=function(t,i){e.WeixinJSBridge&&WeixinJSBridge.on(t,i)})},ready:function(e){0!=k.state?e():(b._completes.push(e),!h&&y.debug&&e())},error:function(e){m<"6.0.2"||(-1==k.state?e(k.data):b._fail=e)},checkJsApi:function(e){M("checkJsApi",{jsApiList:A(e.jsApiList)},(e._complete=function(e){if(g){var t=e.checkResult;t&&(e.checkResult=JSON.parse(t))}e=function(e){var t=e.checkResult;for(var i in t){var n=s[i];n&&(t[n]=t[i],delete t[i])}return e}(e)},e))},onMenuShareTimeline:function(e){P(r.onMenuShareTimeline,{complete:function(){M("shareTimeline",{title:e.title||d,desc:e.title||d,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){P(r.onMenuShareAppMessage,{complete:function(t){"favorite"===t.scene?M("sendAppMessage",{title:e.title||d,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""}):M("sendAppMessage",{title:e.title||d,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){P(r.onMenuShareQQ,{complete:function(){M("shareQQ",{title:e.title||d,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){P(r.onMenuShareWeibo,{complete:function(){M("shareWeiboApp",{title:e.title||d,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){P(r.onMenuShareQZone,{complete:function(){M("shareQZone",{title:e.title||d,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},updateTimelineShareData:function(e){M("updateTimelineShareData",{title:e.title,link:e.link,imgUrl:e.imgUrl},e)},updateAppMessageShareData:function(e){M("updateAppMessageShareData",{title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl},e)},startRecord:function(e){M("startRecord",{},e)},stopRecord:function(e){M("stopRecord",{},e)},onVoiceRecordEnd:function(e){P("onVoiceRecordEnd",e)},playVoice:function(e){M("playVoice",{localId:e.localId},e)},pauseVoice:function(e){M("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){M("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){P("onVoicePlayEnd",e)},uploadVoice:function(e){M("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){M("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){M("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){M("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},(e._complete=function(e){if(g){var t=e.localIds;try{t&&(e.localIds=JSON.parse(t))}catch(e){}}},e))},getLocation:function(e){},previewImage:function(e){M(r.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){M("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){M("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===S?(S=!0,M("getLocalImgData",{localId:e.localId},(e._complete=function(e){if(S=!1,0<x.length){var t=x.shift();wx.getLocalImgData(t)}},e))):x.push(e)},getNetworkType:function(e){M("getNetworkType",{},(e._complete=function(e){e=function(e){var t=e.errMsg;e.errMsg="getNetworkType:ok";var i=e.subtype;if(delete e.subtype,i)e.networkType=i;else{var n=t.indexOf(":"),a=t.substring(n+1);switch(a){case"wifi":case"edge":case"wwan":e.networkType=a;break;default:e.errMsg="getNetworkType:fail"}}return e}(e)},e))},openLocation:function(e){M("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)}},o(i,"getLocation",(function(e){M(r.getLocation,{type:(e=e||{}).type||"wgs84"},(e._complete=function(e){delete e.type},e))})),o(i,"hideOptionMenu",(function(e){M("hideOptionMenu",{},e)})),o(i,"showOptionMenu",(function(e){M("showOptionMenu",{},e)})),o(i,"closeWindow",(function(e){M("closeWindow",{},e=e||{})})),o(i,"hideMenuItems",(function(e){M("hideMenuItems",{menuList:e.menuList},e)})),o(i,"showMenuItems",(function(e){M("showMenuItems",{menuList:e.menuList},e)})),o(i,"hideAllNonBaseMenuItem",(function(e){M("hideAllNonBaseMenuItem",{},e)})),o(i,"showAllNonBaseMenuItem",(function(e){M("showAllNonBaseMenuItem",{},e)})),o(i,"scanQRCode",(function(e){M("scanQRCode",{needResult:(e=e||{}).needResult||0,scanType:e.scanType||["qrCode","barCode"]},(e._complete=function(e){if(v){var t=e.resultStr;if(t){var i=JSON.parse(t);e.resultStr=i&&i.scan_code&&i.scan_code.scan_result}}},e))})),o(i,"openAddress",(function(e){M(r.openAddress,{},(e._complete=function(e){e=function(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}(e)},e))})),o(i,"openProductSpecificView",(function(e){M(r.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)})),o(i,"addCard",(function(e){for(var t=e.cardList,i=[],n=0,a=t.length;n<a;++n){var o=t[n],s={card_id:o.cardId,card_ext:o.cardExt};i.push(s)}M(r.addCard,{card_list:i},(e._complete=function(e){var t=e.card_list;if(t){for(var i=0,n=(t=JSON.parse(t)).length;i<n;++i){var a=t[i];a.cardId=a.card_id,a.cardExt=a.card_ext,a.isSuccess=!!a.is_succ,delete a.card_id,delete a.card_ext,delete a.is_succ}e.cardList=t,delete e.card_list}},e))})),o(i,"chooseCard",(function(e){M("chooseCard",{app_id:y.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},(e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e))})),o(i,"openCard",(function(e){for(var t=e.cardList,i=[],n=0,a=t.length;n<a;++n){var o=t[n],s={card_id:o.cardId,code:o.code};i.push(s)}M(r.openCard,{card_list:i},e)})),o(i,"consumeAndShareCard",(function(e){M(r.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)})),o(i,"chooseWXPay",(function(e){M(r.chooseWXPay,E(e),e)})),o(i,"openEnterpriseRedPacket",(function(e){M(r.openEnterpriseRedPacket,E(e),e)})),o(i,"startSearchBeacons",(function(e){M(r.startSearchBeacons,{ticket:e.ticket},e)})),o(i,"stopSearchBeacons",(function(e){M(r.stopSearchBeacons,{},e)})),o(i,"onSearchBeacons",(function(e){P(r.onSearchBeacons,e)})),o(i,"openEnterpriseChat",(function(e){M("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)})),o(i,"launchMiniProgram",(function(e){M("launchMiniProgram",{targetAppId:e.targetAppId,path:function(e){if("string"==typeof e&&0<e.length){var t=e.split("?")[0],i=e.split("?")[1];return t+=".html",void 0!==i?t+"?"+i:t}}(e.path),envVersion:e.envVersion},e)})),o(i,"openBusinessView",(function(e){M("openBusinessView",{businessType:e.businessType,queryString:e.queryString||"",envVersion:e.envVersion},(e._complete=function(e){if(g){var t=e.extraData;if(t)try{e.extraData=JSON.parse(t)}catch(t){e.extraData={}}}},e))})),o(i,"miniProgram",{navigateBack:function(e){e=e||{},j((function(){M("invokeMiniProgramAPI",{name:"navigateBack",arg:{delta:e.delta||1}},e)}))},navigateTo:function(e){j((function(){M("invokeMiniProgramAPI",{name:"navigateTo",arg:{url:e.url}},e)}))},redirectTo:function(e){j((function(){M("invokeMiniProgramAPI",{name:"redirectTo",arg:{url:e.url}},e)}))},switchTab:function(e){j((function(){M("invokeMiniProgramAPI",{name:"switchTab",arg:{url:e.url}},e)}))},reLaunch:function(e){j((function(){M("invokeMiniProgramAPI",{name:"reLaunch",arg:{url:e.url}},e)}))},postMessage:function(e){j((function(){M("invokeMiniProgramAPI",{name:"postMessage",arg:e.data||{}},e)}))},getEnv:function(t){j((function(){t({miniprogram:"miniprogram"===e.__wxjs_environment})}))}}),i),I=1,T={};return c.addEventListener("error",(function(e){if(!g){var t=e.target,i=t.tagName,n=t.src;if(("IMG"==i||"VIDEO"==i||"AUDIO"==i||"SOURCE"==i)&&-1!=n.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var a=t["wx-id"];if(a||(a=I++,t["wx-id"]=a),T[a])return;T[a]=!0,wx.ready((function(){wx.getLocalImgData({localId:n,success:function(e){t.src=e.localData}})}))}}}),!0),c.addEventListener("load",(function(e){if(!g){var t=e.target,i=t.tagName;if(t.src,"IMG"==i||"VIDEO"==i||"AUDIO"==i||"SOURCE"==i){var n=t["wx-id"];n&&(T[n]=!1)}}}),!0),t&&(e.wx=e.jWeixin=C),C}function M(t,i,n){e.WeixinJSBridge?WeixinJSBridge.invoke(t,V(i),(function(e){O(t,e,n)})):L(t,n)}function P(t,i,n){e.WeixinJSBridge?WeixinJSBridge.on(t,(function(e){n&&n.trigger&&n.trigger(e),O(t,e,i)})):L(t,n||i)}function V(e){return(e=e||{}).appId=y.appId,e.verifyAppId=y.appId,e.verifySignType="sha1",e.verifyTimestamp=y.timestamp+"",e.verifyNonceStr=y.nonceStr,e.verifySignature=y.signature,e}function E(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function O(e,t,i){"openEnterpriseChat"!=e&&"openBusinessView"!==e||(t.errCode=t.err_code),delete t.err_code,delete t.err_desc,delete t.err_detail;var n=t.errMsg;n||(n=t.err_msg,delete t.err_msg,n=function(e,t){var i=e,n=s[i];n&&(i=n);var a="ok";if(t){var o=t.indexOf(":");"confirm"==(a=t.substring(o+1))&&(a="ok"),"failed"==a&&(a="fail"),-1!=a.indexOf("failed_")&&(a=a.substring(7)),-1!=a.indexOf("fail_")&&(a=a.substring(5)),"access denied"!=(a=(a=a.replace(/_/g," ")).toLowerCase())&&"no permission to execute"!=a||(a="permission denied"),"config"==i&&"function not exist"==a&&(a="ok"),""==a&&(a="fail")}return i+":"+a}(e,n),t.errMsg=n),(i=i||{})._complete&&(i._complete(t),delete i._complete),n=t.errMsg||"",y.debug&&!i.isInnerInvoke&&alert(JSON.stringify(t));var a=n.indexOf(":");switch(n.substring(a+1)){case"ok":i.success&&i.success(t);break;case"cancel":i.cancel&&i.cancel(t);break;default:i.fail&&i.fail(t)}i.complete&&i.complete(t)}function A(e){if(e){for(var t=0,i=e.length;t<i;++t){var n=e[t],a=r[n];a&&(e[t]=a)}return e}}function L(e,t){if(!(!y.debug||t&&t.isInnerInvoke)){var i=s[e];i&&(e=i),t&&t._complete&&delete t._complete,n.log('"'+e+'",',t||"")}}function $(){return(new Date).getTime()}function j(t){h&&(e.WeixinJSBridge?t():c.addEventListener&&c.addEventListener("WeixinJSBridgeReady",t,!1))}}))}).call(this,i("5a52")["default"])},5757:function(e,t){function i(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}e.exports=i},"6bd4":function(e,t,i){var n=i("24fb");t=n(!1),t.push([e.i,".search_list .input_key[data-v-f8c170b6]{position:fixed;width:98%;z-index:9;background:#fff;height:%?68?%;padding:%?20?% 0;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding-right:%?20?%}.search_list .input_key .select_key[data-v-f8c170b6]{padding:0 %?10?% 0 %?20?%;border-radius:%?40?%;background:#f7f6f6;width:84%;height:%?68?%}.search_list .input_key .arrow_left[data-v-f8c170b6]{width:14%}.search_list .input_key .right_area[data-v-f8c170b6]{width:85%}.search_list .input_key .select_key .keyword[data-v-f8c170b6]{width:100%;background:#f7f6f6}.search_list .hot_search[data-v-f8c170b6]{position:fixed;height:calc(100vh - %?108?%);background:#fff;width:100%;padding:0 %?20?%}.search_list .hot_search .key_tag[data-v-f8c170b6]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap}.search_list .hot_search .key_tag uni-text[data-v-f8c170b6]{border-radius:3px;color:grey;padding:0 %?6?%;background:#f2f2f2;margin:%?20?% %?20?% 0 0}.search_list .search_bitmap[data-v-f8c170b6]{margin-top:25%;text-align:center}.search_list .search_bitmap .bitmap[data-v-f8c170b6]{width:47%}.search_list .search_result .my_profile[data-v-f8c170b6]{margin-bottom:%?10?%}.search_list .lang_search[data-v-f8c170b6]{background:#fff;border-radius:%?10?% %?10?% 0 0;height:%?371?%;color:#009943}.search_list .lang_search .icon-X[data-v-f8c170b6]{position:absolute;right:%?20?%;text-align:right;color:grey;margin-top:%?20?%}.search_list .lang_search .correct>uni-view[data-v-f8c170b6]{height:%?50?%;line-height:%?50?%;text-align:center}.search_list .lang_search .error_txt>uni-view[data-v-f8c170b6]{height:%?50?%;line-height:%?50?%;text-align:center}\n\n\n\n\n\n\n\n",""]),e.exports=t},"6c76":function(e,t,i){"use strict";i.r(t);var n=i("ba82"),a=i.n(n);for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);t["default"]=a.a},"73a0":function(e,t,i){"use strict";var n=i("abc3"),a=i.n(n);a.a},"76f4":function(e,t,i){var n=i("6bd4");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("0d818677",n,!0,{sourceMap:!1,shadowMode:!1})},7956:function(e,t,i){"use strict";var n={"uni-icons":i("4ac6").default,"my-profile":i("9177").default,"uni-popup":i("c6a8").default,"my-keyboard":i("ae27").default,"my-addcart":i("b877").default},a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"search_list"},[n("v-uni-view",{staticClass:"fixed"},[n("v-uni-view",{staticClass:"status_bar fixed white_b"}),n("v-uni-view",{staticClass:"status_bar"}),n("v-uni-view",{staticClass:"input_key"},[n("v-uni-view",{staticClass:"arrow_left",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.back.apply(void 0,arguments)}}},[n("uni-icons",{attrs:{type:"arrowleft",size:"25"}})],1),n("v-uni-view",{staticClass:"flex_left_right right_area"},[n("v-uni-view",{staticClass:"select_key align_center"},[n("v-uni-text",{staticClass:"iconfont icon-sousuo"}),n("v-uni-input",{staticClass:"keyword",attrs:{placeholder:"请输入商品名称","placeholder-class":"place_style"},on:{focus:function(t){arguments[0]=t=e.$handleEvent(t),e.focus.apply(void 0,arguments)}},model:{value:e.keyword,callback:function(t){e.keyword=t},expression:"keyword"}}),n("uni-icons",{attrs:{type:"mic-filled",size:"20",color:"#808080"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.speed.apply(void 0,arguments)}}})],1),n("v-uni-view",{staticStyle:{color:"#009B44"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.submit.apply(void 0,arguments)}}},[e._v("搜索")])],1)],1)],1),n("v-uni-view",{staticClass:"status_bar"}),n("v-uni-view",{staticStyle:{height:"109rpx"}}),e.showSearch?n("v-uni-view",{staticClass:"hot_search"},[n("v-uni-view",{staticClass:"title"},[e._v("热门搜索")]),n("v-uni-view",{staticClass:"key_tag"},e._l(e.keyList,(function(t,i){return n("v-uni-text",{key:i,on:{click:function(i){arguments[0]=i=e.$handleEvent(i),e.searchList(t.keywords)}}},[e._v(e._s(t.keywords))])})),1)],1):n("v-uni-view",{staticClass:"search_result"},[e._l(e.list,(function(t,i){return n("my-profile",{key:i,attrs:{wares:t,config:e.config},on:{showCart:function(i){arguments[0]=i=e.$handleEvent(i),e.openCart(t)},showKey:function(n){arguments[0]=n=e.$handleEvent(n),e.showKey(t,i)}}})})),e.bitmap?n("v-uni-view",{staticClass:"search_bitmap"},[n("v-uni-image",{staticClass:"bitmap",attrs:{src:i("2fac"),mode:"aspectFit"}})],1):e._e()],2),n("uni-popup",{ref:"speech",attrs:{type:"bottom"}},[n("v-uni-view",{staticClass:"lang_search"},[n("v-uni-text",{staticClass:"iconfont icon-X",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.$refs.speech.close()}}}),n("v-uni-view",{staticStyle:{display:"flex","justify-content":"center","align-items":"center",height:"371rpx"}},[e.startSpeech?n("v-uni-view",{staticClass:"correct"},[n("v-uni-view",[e._v("正在倾听")]),n("v-uni-view",[e._v("请说出你想要的的内容")])],1):n("v-uni-view",{staticClass:"error_txt"},[n("v-uni-view",[e._v("没有听清,请重试")]),n("v-uni-view",[e._v("点击说话")]),n("v-uni-view",{staticStyle:{height:"40rpx","line-height":"14rpx"}},[n("uni-icons",{attrs:{type:"arrowdown",size:"18",color:"#009943"}})],1),n("v-uni-view",{staticStyle:{"margin-top":"10rpx"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.speed.apply(void 0,arguments)}}},[n("uni-icons",{staticClass:"mic_filled",attrs:{type:"mic-filled",size:"40",color:"white"}})],1)],1)],1)],1)],1),n("uni-popup",{ref:"popup",attrs:{type:"bottom"},on:{maskInfo:function(t){arguments[0]=t=e.$handleEvent(t),e.closeKey.apply(void 0,arguments)}}},[n("my-keyboard",{ref:"keyboard",attrs:{arrObj:e.arrObj},on:{cancelKey:function(t){arguments[0]=t=e.$handleEvent(t),e.$refs.popup.close()},toParent:function(t){arguments[0]=t=e.$handleEvent(t),e.toParent.apply(void 0,arguments)}}})],1),n("uni-popup",{ref:"cart",attrs:{type:"bottom"},on:{maskInfo:function(t){arguments[0]=t=e.$handleEvent(t),e.closeCart.apply(void 0,arguments)}}},[n("my-addcart",{ref:"addcart",attrs:{cartware:e.cartware,config:e.config},on:{onClose:function(t){arguments[0]=t=e.$handleEvent(t),e.onClose.apply(void 0,arguments)}}})],1)],1)},o=[];i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return o})),i.d(t,"a",(function(){return n}))},9177:function(e,t,i){"use strict";i.r(t);var n=i("c404"),a=i("6c76");for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);i("73a0");var r,s=i("f0c5"),c=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"c180055a",null,!1,n["a"],r);t["default"]=c.exports},a068:function(e,t,i){"use strict";i.r(t);var n=i("7956"),a=i("dcae");for(var o in a)"default"!==o&&function(e){i.d(t,e,(function(){return a[e]}))}(o);i("fa1f");var r,s=i("f0c5"),c=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,"f8c170b6",null,!1,n["a"],r);t["default"]=c.exports},abc3:function(e,t,i){var n=i("0dec");"string"===typeof n&&(n=[[e.i,n,""]]),n.locals&&(e.exports=n.locals);var a=i("4f06").default;a("82f4d394",n,!0,{sourceMap:!1,shadowMode:!1})},ba82:function(e,t,i){"use strict";(function(e){var n=i("ee27");i("a9e3"),i("8ba4"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(i("4b89")),o=n(i("d07b")),r=getApp().globalData,s=r.appid,c=r.appsecret,d=r.imgRemote,l=e,u=(l.log,{props:["wares","config","url"],watch:{wares:function(e){this.ware=e}},data:function(){return{ware:this.wares,imgRemote:d,token:uni.getStorageSync("cdj_token"),count:0}},methods:{showCart:function(){this.$emit("showCart")},addcart:function(e,t){var i=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"成功加入购物车",r=this.ware;if(1!=r.is_float||Number.isInteger(Number(t))){var d=Math.round((new Date).getTime()/1e3),l={appid:s,timeStamp:d,item_id:r.id,attr_id:0,item_num:t},u=a.default.hexMD5(o.default.objKeySort(l)+c),f=Object.assign({sign:u},l);o.default.postRequests(e,f,(function(e){var a=e.data;200==a.code?(o.default.Toast(n),i.ware.cart_num=t<=0?0:t):407==a.code||406==a.code?o.default.Toast("购买数量不能超过活动数量"):o.default.Toast(e.data.msg)}))}else o.default.Toast("购买数量不能为小数")},minus:function(e){0==e?this.addcart("deleteCart",e,"成功删除商品"):this.addcart("changeNum",e)},plus:function(e){this.addcart("changeNum",e)},plusCart:function(){this.addcart("changeNum",1)},showKey:function(){this.$emit("showKey")},detail:function(){var e=this;this.count++,1==this.count&&(setTimeout((function(){e.count=0}),1e3),1==this.config.is_detail&&uni.navigateTo({url:"/pages/index/shopdetail?id=".concat(this.ware.id)}))},cancelCollect:function(){this.$emit("cancelCollect")}}});t.default=u}).call(this,i("5a52")["default"])},c2ba:function(e,t,i){"use strict";(function(e){var n=i("ee27");i("ac1f"),i("5319"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=n(i("4b89")),o=n(i("d07b")),r=e,s=(r.log,getApp().globalData),c=s.appid,d=s.appsecret,l=(s.imgRemote,i("546a")),u={data:function(){return{keyList:[],list:[],keyword:"",showSearch:!0,startSpeech:!0,config:[],bitmap:!1,arrObj:{},index:"",cartware:{}}},methods:{closeCart:function(){this.$refs.addcart.onClose()},closeKey:function(){this.$refs.keyboard.cancel()},back:function(){window.history.back(-1)},toParent:function(e){var t=this,i=e.arrObj,n=Math.round((new Date).getTime()/1e3),r={appid:c,timeStamp:n,item_id:i.id,attr_id:0,item_num:e.val},s=a.default.hexMD5(o.default.objKeySort(r)+d),l=Object.assign({sign:s},r);o.default.postRequests("changeNum",l,(function(i){var n=i.data;200==n.code?(o.default.Toast("加入购物车成功"),t.list[t.index].cart_num=e.val):407==n.code||406==n.code?o.default.Toast("购买数量不能超过活动数量"):o.default.Toast(i.data.msg)})),this.$refs.popup.close()},openCart:function(e){this.cartware=e,this.$refs.cart.open()},onClose:function(){this.$refs.cart.close()},showKey:function(e,t){this.arrObj=e,this.index=t,this.$refs.popup.open()},getSearchData:function(){var e=this,t=Math.round((new Date).getTime()/1e3),i={appid:c,timeStamp:t},n=a.default.hexMD5(o.default.objKeySort(i)+d),r=Object.assign({sign:n},i);o.default.getRequests("getSearchData",r,(function(t){var i=t.data;200==i.code?e.keyList=i.data:o.default.Toast(i.msg)}))},submit:function(){this.searchList(this.keyword)},focus:function(){this.keyword="",this.showSearch=!0},searchList:function(e){var t=this;this.list=[];var i=Math.round((new Date).getTime()/1e3),n={appid:c,timeStamp:i,keyword:e},r=a.default.hexMD5(o.default.objKeySort(n)+d),s=Object.assign({sign:r},n);o.default.getRequests("getSearchItem",s,(function(i){var n=i.data;200==n.code?(t.keyword=e,t.showSearch=!1,0!=n.data.length?(t.list=n.data.list,t.config=n.data,t.bitmap=!1):t.bitmap=!0):o.default.Toast(n.msg)}))},speed:function(){this.$refs.speech.open();var t=this;t.startSpeech=!0,l.startRecord({success:function(){e.log(l),recordTimer=setTimeout((function(){l.stopRecord({success:function(e){t.wxuploadVoice(e.localId),clearTimeout(recordTimer)},fail:function(e){alert(JSON.stringify(e))}})}),5e3)},cancel:function(){t.$toast("用户拒绝授权录音")}})},wxuploadVoice:function(e){var t=this;l.uploadVoice({localId:e,isShowProgressTips:1,success:function(e){l.downloadVoice({serverId:e.serverId,isShowProgressTips:1,success:function(e){var i=e.localId;l.translateVoice({localId:i,isShowProgressTips:1,success:function(e){var i=e.translateResult;i=i.replace(/。/g,""),t.keyword=i,t.list=[],t.showSearch=!1,t.$refs.speech.close(),t.searchList(t.keyword)},fail:function(e){t.startSpeech=!1}})}})}})},wxConfig:function(){var t=Math.round((new Date).getTime()/1e3),i={appid:c,timeStamp:t},n=a.default.hexMD5(o.default.objKeySort(i)+d),r=Object.assign({sign:n},i);o.default.getRequests("wxConfig",r,(function(t){200==t.data.code&&(e.log(t.data),l.config({debug:!1,appId:t.data.data.appId,timestamp:t.data.data.timestamp,nonceStr:t.data.data.nonceStr,signature:t.data.data.signature,jsApiList:["checkJsApi","startRecord","stopRecord","translateVoice","downloadVoice","uploadVoice","getLocation"]}))}))}},onHide:function(){uni.setStorageSync("search",this.list)},onShow:function(){this.wxConfig(),this.getSearchData(),this.keyword&&(this.list=uni.getStorageSync("search"))}};t.default=u}).call(this,i("5a52")["default"])},c404:function(e,t,i){"use strict";var n={"my-stepper":i("b7a4").default},a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-uni-view",{staticClass:"my_profile flex"},[n("v-uni-view",{staticClass:"photo",on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.detail.apply(void 0,arguments)}}},[e.config.logo&&1==e.config.shuiyin?n("v-uni-image",{staticClass:"shuiyin",attrs:{src:e.config.logo,mode:"aspectFit"}}):e._e(),n("v-uni-image",{staticClass:"good_img",attrs:{src:""==e.ware.img?e.imgRemote+e.config.item_default:e.ware.img,mode:"aspectFit"}})],1),n("v-uni-view",{staticClass:"info"},[n("v-uni-view",{staticClass:"operate flex"},[n("v-uni-view",{staticStyle:{width:"86%"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.detail.apply(void 0,arguments)}}},[n("v-uni-view",[e._v(e._s(e.ware.title))]),e.ware.describe?n("v-uni-view",{staticClass:"hidden gray_font twelve"},[e._v(e._s(e.ware.describe))]):e._e()],1),"collect"==e.url?n("v-uni-view",{on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.cancelCollect.apply(void 0,arguments)}}},[n("v-uni-text",{staticClass:"iconfont icon-alreadystar",staticStyle:{color:"orange"}})],1):e._e()],1),n("v-uni-view",{staticClass:"flex_left_right"},[n("v-uni-view",{staticStyle:{width:"82%"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.detail.apply(void 0,arguments)}}},[n("v-uni-view",e._l(e.ware.label,(function(t,i){return n("v-uni-text",{key:i,staticClass:"red_tag"},[e._v(e._s(t))])})),1),e.token?[1==e.config.is_look?[e.ware.attr.length?n("v-uni-view",{staticClass:"hidden"},[n("v-uni-text",{staticClass:"red_font"},[e._v("￥"+e._s(e.ware.area_price)+"/"+e._s(e.ware.unit))]),n("v-uni-text",{staticClass:"gray_font"},[e._v("(多规格)")])],1):n("v-uni-view",{staticClass:"red_font"},[e.ware.activity_num>=e.ware.cart_num&&1==e.ware.is_activity?[e._v("￥"+e._s(e.ware.activity_price+"/"+e.ware.unit))]:[1==e.ware.market_price?n("v-uni-view",[e._v("时价")]):n("v-uni-view",[e._v("￥"+e._s(e.ware.price+"/"+e.ware.unit))])]],2)]:[n("v-uni-view",{staticClass:"red_font"},[e._v("￥***")])]]:[e.ware.attr.length?n("v-uni-view",{staticClass:"hidden"},[n("v-uni-text",{staticClass:"red_font"},[e._v("￥"+e._s(e.ware.area_price)+"/"+e._s(e.ware.unit))]),n("v-uni-text",{staticClass:"gray_font"},[e._v("(多规格)")])],1):n("v-uni-view",{staticClass:"red_font"},[1==e.ware.market_price?[e._v("时价")]:[e._v("￥"+e._s(e.ware.price)+"/"+e._s(e.ware.unit))]],2)]],2),n("v-uni-view",{staticClass:"align_center"},[e.ware.attr.length?[n("v-uni-image",{staticClass:"add_cart",attrs:{src:i("27f0")},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.showCart.apply(void 0,arguments)}}})]:[e.ware.cart_num?n("my-stepper",{attrs:{val:e.ware.cart_num},on:{showKey:function(t){arguments[0]=t=e.$handleEvent(t),e.showKey.apply(void 0,arguments)},minus:function(t){arguments[0]=t=e.$handleEvent(t),e.minus(e.ware.cart_num-1)},plus:function(t){arguments[0]=t=e.$handleEvent(t),e.plus(e.ware.cart_num+1)}}}):n("v-uni-image",{staticClass:"add_cart",attrs:{src:i("eb75")},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.plusCart.apply(void 0,arguments)}}})]],2)],1)],1)],1)},o=[];i.d(t,"b",(function(){return a})),i.d(t,"c",(function(){return o})),i.d(t,"a",(function(){return n}))},dcae:function(e,t,i){"use strict";i.r(t);var n=i("c2ba"),a=i.n(n);for(var o in n)"default"!==o&&function(e){i.d(t,e,(function(){return n[e]}))}(o);t["default"]=a.a},fa1f:function(e,t,i){"use strict";var n=i("76f4"),a=i.n(n);a.a}}]);