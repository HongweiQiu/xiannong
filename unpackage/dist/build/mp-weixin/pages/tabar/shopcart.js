(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/tabar/shopcart"],{"0896":function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var i={uniIcons:function(){return Promise.all([n.e("common/vendor"),n.e("components/uni-icons/uni-icons")]).then(n.bind(null,"2cc7"))},myProfile:function(){return n.e("components/profile/index").then(n.bind(null,"0ac6"))},myRecomend:function(){return n.e("components/recomend/index").then(n.bind(null,"83d8"))},myLoading:function(){return n.e("components/loading/index").then(n.bind(null,"9c2f"))},myBacktop:function(){return n.e("components/backtop/index").then(n.bind(null,"5158"))},myTabar:function(){return n.e("components/tabar/index").then(n.bind(null,"957a"))}},a=function(){var t=this,e=t.$createElement;t._self._c},o=[]},"29bb":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=r(n("46b2")),a=r(n("19e6")),o=r(n("1a92"));function r(t){return t&&t.__esModule?t:{default:t}}function c(t,e){var n;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(n=d(t))||e&&t&&"number"===typeof t.length){n&&(t=n);var i=0,a=function(){};return{s:a,n:function(){return i>=t.length?{done:!0}:{done:!1,value:t[i++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,r=!0,c=!1;return{s:function(){n=t[Symbol.iterator]()},n:function(){var t=n.next();return r=t.done,t},e:function(t){c=!0,o=t},f:function(){try{r||null==n.return||n.return()}finally{if(c)throw o}}}}function s(t){return f(t)||l(t)||d(t)||u()}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function d(t,e){if(t){if("string"===typeof t)return h(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?h(t,e):void 0}}function l(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function f(t){if(Array.isArray(t))return h(t)}function h(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}var m=function(){n.e("components/w-picker/w-picker").then(function(){return resolve(n("eb35"))}.bind(null,n)).catch(n.oe)},p=function(){Promise.all([n.e("common/vendor"),n.e("components/rattenking-dtpicker/rattenking-dtpicker")]).then(function(){return resolve(n("308a"))}.bind(null,n)).catch(n.oe)},g=console,v=g.log,b=getApp().globalData,y=b.appid,T=b.appsecret,w=(b.imgRemote,{components:{wPicker:m,ruiDatePicker:p},data:function(){return{display:!0,page:1,num:10,loading:!0,showTop:!1,config:[],cartware:[],itemList:[],settlement:!0,allCheck:!0}},methods:{selectCheck:function(t){t>=0&&(this.itemList[t].check=!this.itemList[t].check),this.settlement=this.itemList.some((function(t){return 1==t.check})),this.allCheck=this.itemList.every((function(t){return 1==t.check}))},allCheckGood:function(){var t=this;this.allCheck=!this.allCheck,this.itemList.map((function(e){return e.check=t.allCheck,e})),this.selectCheck()},shoplist:function(){this.settlement?t.navigateTo({url:"/pages/shopcart/shoplist"}):o.default.Toast("没有选中商品哦")},deliveryPage:function(){t.navigateTo({url:"/pages/shopcart/delivery?childzid="+this.childzid})},collectBill:function(){t.switchTab({url:"/pages/tabar/index"})},childInfo:function(){var t=this,e=Math.round((new Date).getTime()/1e3),n={appid:y,timeStamp:e},a=i.default.hexMD5(o.default.objKeySort(n)+T),r=Object.assign({sign:a},n);o.default.getRequests("childInfo",r,(function(e){var n,i=e.data;200==i.code&&(n=t.childList).push.apply(n,s(i.data))}))},newArr:function(t){return t.map((function(t,e){return{id:t.id,txt:""}}))},addInfo:function(){var t=this,e=Math.round((new Date).getTime()/1e3),n={appid:y,timeStamp:e},r=i.default.hexMD5(o.default.objKeySort(n)+T),u=Object.assign({sign:r},n);o.default.getRequests("addInfo",u,(function(e){var n,i=e.data;t.cartInfo=i.data;var o=i.data,r=o.userInfo,u=o.activity_rule,d=o.totalPrice,l=o.activity_type;if(t.contact=r.contact,t.mobile=r.phone,t.address=r.address,t.indexItem(),(n=t.deliveryList).push.apply(n,s(i.data.delivery_time_list)),0!=i.data.couponsList.length){for(var f,h=t.newArr(i.data.couponsList),m=0;m<i.data.couponsList.length;m++)h[m].txt="".concat(i.data.couponsList[m].coupons_title,"(余额").concat(i.data.couponsList[m].residue,"元)");(f=t.couponsList).push.apply(f,s(h))}2==l&&(i.data.fullPrice>=u[0].price?t.gift=1:t.gift=0);var p=u.length-1;if(1==l)if(u[p].price<=d)t.reduce=(0,a.default)("已享受满<span style='color: #FF3E1E;'>".concat(u[p].price,"元</span>减<span style='color: #FF3E1E;'>").concat(u[p].reduce,"元<span>"));else{var g,v=c(u);try{for(v.s();!(g=v.n()).done;){var b=g.value;if(d<b.price)return void(t.reduce=(0,a.default)("再满<span style='color: #FF3E1E;'>".concat(b.price-d,"元</span>减<span style='color: #FF3E1E;'>").concat(b.reduce,"元</span>")))}}catch(y){v.e(y)}finally{v.f()}}}))},selectAccount:function(){this.$refs.account.show()},onConfirmAccount:function(t){if(t.value)this.address=t.obj.address,this.contact=t.obj.contact,this.mobile=t.obj.mobile;else{var e=this.cartInfo.userInfo;this.address=e.address,this.contact=e.contact,this.mobile=e.mobile}this.childzid=t.value,this.account=t.result},selectDate:function(){this.$refs.date.show()},onConfirmDate:function(t){var e=t.obj,n=e.year,i=e.month,a=e.day;this.sendDate="".concat(n,"-").concat(i,"-").concat(a)},selectTime:function(){this.$refs.delivery.show()},onConfirmDelivery:function(t){v(t),this.deliveryTime=t.result,this.deliveryId=t.value},selectCash:function(){this.$refs.cash.show()},onConfirmCash:function(t){var e=this;if(this.cash=t.result,this.couponsId=t.value,this.juanPrice=0,v(t),""!=t.obj.id){var n=Math.round((new Date).getTime()/1e3),a={appid:y,timeStamp:n,id:t.obj.id},r=i.default.hexMD5(o.default.objKeySort(a)+T),c=Object.assign({sign:r},a);o.default.getRequests("useCouponsPrice",c,(function(t){200==t.data.code?e.juanPrice=t.data.data.couponsPrice:o.default.Toast(t.data.msg)}))}},confirmOrder:function(){var e=this;if(!this.contact||!this.mobile||!this.address)return o.default.Toast("请先填写收货信息"),void setTimeout((function(){t.navigateTo({url:"../shopcart/delivery"})}),1e3);if(this.count++,1==this.count){setTimeout((function(){e.count=0}),500);var n=Math.round((new Date).getTime()/1e3),a={appid:y,timeStamp:n,send_time:this.sendDate},r=i.default.hexMD5(o.default.objKeySort(a)+T),c=Object.assign({sign:r},a),s=this;o.default.getRequests("testOrder",c,(function(e){var n=e.data.code,i=e.data.data;if(1==i.on_delivery)switch(n){case 101:t.showModal({title:"提示",content:"直接下单？",success:function(t){t.confirm&&s.order()}});break;case 300:t.showModal({title:"提示",content:"信用金即将用完，请及时结账（可以直接下单）？",success:function(t){t.confirm&&s.order()}});break;case 301:t.showModal({title:"提示",content:"信用金即将用完，请及时结账（可以合并订单）？",success:function(e){e.confirm?s.mergeOrder():e.cancel&&t.showModal({title:"提示",content:"直接下单？",success:function(t){t.confirm&&s.order()}})}});break;case 500:o.default.Toast({message:"信用金已用完，不能下单",duration:1200});break;case 200:t.showModal({title:"提示",content:"可以合并订单？",success:function(e){e.confirm?s.mergeOrder():e.cancel&&t.showModal({title:"提示",content:"直接下单？",success:function(t){t.confirm&&s.order()}})}});break}else t.showModal({title:"提示",content:"直接下单？",success:function(t){t.confirm&&s.order()}})}))}},mergeOrder:function(){var e=Math.round((new Date).getTime()/1e3),n=this.sendDate,a=3,r={appid:y,timeStamp:e,send_time:n,way:a},c=i.default.hexMD5(o.default.objKeySort(r)+T),s=Object.assign({sign:c},r);o.default.postRequests("mergeOrder",s,(function(e){200!=e.data.code?o.default.Toast(e.data.msg):(o.default.Toast("合拼订单成功"),setTimeout((function(){t.switchTab({url:"/pages/tabar/order"})}),1e3))}))},order:function(){var e=Math.round((new Date).getTime()/1e3),n=this.sendDate,a=this.childzid,r=this.deliveryTime,c=this.deliveryId,s=this.remark.replace(/\s/g,""),u="";u="不限"==r?"":r;var d=3,l={appid:y,timeStamp:e,send_time:n,way:d},f=i.default.hexMD5(o.default.objKeySort(l)+T),h=Object.assign({delivery_time_id:c,delivery_time_info:u,sign:f,remark:s,coupons_member_id:0==this.cartInfo.on_delivery?this.couponsId:0,select_zid:a},l);o.default.postRequests("addOrder",h,(function(e){var n=e.data;if(104==n.code)return o.default.Toast("超出下单时间，不能下单"),!1;if(200==n.code){if(0==n.data.on_delivery){var i=n.data.orderId;return void t.navigateTo({url:"/pages/shopcart/pay?id=".concat(i)})}o.default.Toast("下单成功"),setTimeout((function(){t.switchTab({url:"/pages/tabar/order"})}),1e3)}else 500==n.code?o.default.Toast("服务器内部错误,请稍候再试"):407==n.code?o.default.Toast("超出活动限制,请删除部分商品"):o.default.Toast(n.msg)}))},indexItem:function(){var t=this;this.itemList=[],this.page=1,this.loading=!0;var e=Math.round((new Date).getTime()/1e3),n={appid:y,timeStamp:e},a=this.num,r=(this.page,i.default.hexMD5(o.default.objKeySort(n)+T)),c=Object.assign({page:1,sign:r,num:a},n);o.default.getRequests("indexItem",c,(function(e){var n=e.data;200==n.code&&(n.data.list.map((function(t){return t.check=!0,t})),t.itemList=n.data.list,t.config=n.data,n.data.total<=10?t.loading=!1:t.loading=!0)}))},openCart:function(t){this.$refs.popup.open(),this.cartware=t},onClose:function(){this.$refs.popup.close()},getSendTime:function(){var t=new Date,e=t.getTime()+864e5;t.setTime(e);var n=t.getFullYear(),i=t.getMonth()+1,a=t.getDate();this.startyear=n,i<10&&(i="0"+i),a<10&&(a="0"+a),this.sendDate="".concat(n,"-").concat(i,"-").concat(a)},onShow:function(){t.getStorageSync("cdj_token")?(1!=t.getStorageSync("is_child")&&this.childInfo(),this.getSendTime(),this.addInfo()):t.navigateTo({url:"/pages/account/login"})},onHide:function(){this.childzid="",this.childList=[{zid:"",nickname:"当前账号"}],this.deliveryList=[{delivery_time_id:"",delivery_time_info:"不限"}],this.couponsList=[{id:"",txt:"不使用"}],this.deliveryId="",this.deliveryTime="不限",this.account="当前账号",this.cash="不使用",this.couponsId="",this.juanPrice=0,this.remark=""},onLoad:function(){b.isReload=!0,t.hideTabBar()}},onReachBottom:function(){var t=this,e=this,n=Math.round((new Date).getTime()/1e3),a=e.num,r=e.page,c={appid:y,timeStamp:n},u=i.default.hexMD5(o.default.objKeySort(c)+T),d={appid:y,num:a,page:r+1,timeStamp:n,sign:u};o.default.getRequests("indexItem",d,(function(e){var n,i=e.data;(i.code=200)&&(""!=i.data?((n=t.itemList).push.apply(n,s(i.data.list)),t.page+=1,t.loading=!0):t.loading=!1)}))},onPageScroll:function(t){0==t.scrollTop?this.showTop=!1:this.showTop=!0}});e.default=w}).call(this,n("543d")["default"])},"3fac":function(t,e,n){"use strict";(function(t){n("0c84"),n("921b");i(n("66fd"));var e=i(n("69fb"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"69fb":function(t,e,n){"use strict";n.r(e);var i=n("0896"),a=n("c267");for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);n("6f3d");var r,c=n("f0c5"),s=Object(c["a"])(a["default"],i["b"],i["c"],!1,null,"fb5d467e",null,!1,i["a"],r);e["default"]=s.exports},"6f3d":function(t,e,n){"use strict";var i=n("edd9"),a=n.n(i);a.a},c267:function(t,e,n){"use strict";n.r(e);var i=n("29bb"),a=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=a.a},edd9:function(t,e,n){}},[["3fac","common/runtime","common/vendor"]]]);