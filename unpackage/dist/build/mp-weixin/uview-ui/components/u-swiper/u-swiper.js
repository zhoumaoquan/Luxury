(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uview-ui/components/u-swiper/u-swiper"],{3258:function(t,e,n){"use strict";n.r(e);var i=n("d0a5"),r=n("9f1b");for(var o in r)"default"!==o&&function(t){n.d(e,t,(function(){return r[t]}))}(o);n("fa76");var u,a=n("f0c5"),f=Object(a["a"])(r["default"],i["b"],i["c"],!1,null,"bc079378",null,!1,i["a"],u);e["default"]=f.exports},"98ce":function(t,e,n){},"98ef":function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"u-swiper",props:{list:{type:Array,default:function(){return[]}},title:{type:Boolean,default:!1},indicator:{type:Object,default:function(){return{}}},borderRadius:{type:[Number,String],default:8},interval:{type:[String,Number],default:3e3},mode:{type:String,default:"round"},height:{type:[Number,String],default:250},indicatorPos:{type:String,default:"bottomCenter"},effect3d:{type:Boolean,default:!1},effect3dPreviousMargin:{type:[Number,String],default:50},autoplay:{type:Boolean,default:!0},duration:{type:[Number,String],default:500},circular:{type:Boolean,default:!0},imgMode:{type:String,default:"aspectFill"},name:{type:String,default:"image"},bgColor:{type:String,default:"#f3f4f6"}},watch:{list:function(t,e){t.length!==e.length&&(this.current=0)}},data:function(){return{current:0}},computed:{justifyContent:function(){return"topLeft"==this.indicatorPos||"bottomLeft"==this.indicatorPos?"flex-start":"topCenter"==this.indicatorPos||"bottomCenter"==this.indicatorPos?"center":"topRight"==this.indicatorPos||"bottomRight"==this.indicatorPos?"flex-end":void 0},titlePaddingBottom:function(){var t=0;return"none"==this.mode?"12rpx":(t=["bottomLeft","bottomCenter","bottomRight"].indexOf(this.indicatorPos)>=0&&"number"==this.mode?"60rpx":["bottomLeft","bottomCenter","bottomRight"].indexOf(this.indicatorPos)>=0&&"number"!=this.mode?"40rpx":"12rpx",t)}},methods:{listClick:function(t){this.$emit("click",t)},change:function(t){var e=t.detail.current;this.current=e,this.$emit("change",e)},animationfinish:function(t){}}};e.default=i},"9f1b":function(t,e,n){"use strict";n.r(e);var i=n("98ef"),r=n.n(i);for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);e["default"]=r.a},d0a5:function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return i}));var r=function(){var t=this,e=t.$createElement;t._self._c},o=[]},fa76:function(t,e,n){"use strict";var i=n("98ce"),r=n.n(i);r.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uview-ui/components/u-swiper/u-swiper-create-component',
    {
        'uview-ui/components/u-swiper/u-swiper-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("3258"))
        })
    },
    [['uview-ui/components/u-swiper/u-swiper-create-component']]
]);
