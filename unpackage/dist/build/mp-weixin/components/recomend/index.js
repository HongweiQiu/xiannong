(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/recomend/index"],{2160:function(t,n,e){"use strict";var a,i=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return a}))},"3a9c":function(t,n,e){"use strict";e.r(n);var a=e("2160"),i=e("9d5d");for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);e("b0be");var u,c=e("f0c5"),r=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);n["default"]=r.exports},"3dfb":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=getApp().globalData,a=e.imgRemote,i={props:["ware","config"],data:function(){return{imgRemote:a,token:t.getStorageSync("cdj_token")}},methods:{showCart:function(){this.$emit("showCart")},detail:function(){1==this.config.is_detail&&t.navigateTo({url:"/pages/index/shopdetail?id=".concat(this.ware.id)})}}};n.default=i}).call(this,e("543d")["default"])},"9d5d":function(t,n,e){"use strict";e.r(n);var a=e("3dfb"),i=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);n["default"]=i.a},a480:function(t,n,e){},b0be:function(t,n,e){"use strict";var a=e("a480"),i=e.n(a);i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/recomend/index-create-component',
    {
        'components/recomend/index-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3a9c"))
        })
    },
    [['components/recomend/index-create-component']]
]);
