(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Main/consignment"],{"10e0":function(t,e,n){"use strict";(function(t){n("fa97");i(n("66fd"));var e=i(n("7d64"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},"53cd":function(t,e,n){},"7d64":function(t,e,n){"use strict";n.r(e);var i=n("fa86"),a=n("f415");for(var s in a)"default"!==s&&function(t){n.d(e,t,(function(){return a[t]}))}(s);n("9bad");var o,r=n("f0c5"),u=Object(r["a"])(a["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],o);e["default"]=u.exports},"9bad":function(t,e,n){"use strict";var i=n("53cd"),a=n.n(i);a.a},e0d1:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=o(n("a34a")),a=n("effd"),s=o(n("dfdf"));function o(t){return t&&t.__esModule?t:{default:t}}function r(t,e,n,i,a,s,o){try{var r=t[s](o),u=r.value}catch(c){return void n(c)}r.done?e(u):Promise.resolve(u).then(i,a)}function u(t){return function(){var e=this,n=arguments;return new Promise((function(i,a){var s=t.apply(e,n);function o(t){r(s,i,a,o,u,"next",t)}function u(t){r(s,i,a,o,u,"throw",t)}o(void 0)}))}}var c={data:function(){return{type:"",categoryList:[],brandsList:[],channelsList:[],addressInfos:{},activeClass:"",activeBrand:"",activeChannel:"",isLogin:!1,isModal:!1,signup:!1,params:{type:"",name:""},addressParams:{type:1,m_id:""},loading:!1,addressType:0,positive:{image:"",id:""},side:{image:"",id:""},details:{image:"",id:""},buy:{image:"",id:""},wxImages:{image:"",id:""}}},onLoad:function(e){this.type=e.type,0==e.type?t.setNavigationBarTitle({title:"寄卖商品"}):t.setNavigationBarTitle({title:"回收商品"}),this._getCategoryList(),this._getChannelList(),this._getAddressInfo()},onUnload:function(){t.removeStorageSync("signID")},computed:{title:function(){return 0==this.addressType?"自行寄出":"预约顺丰"}},onShow:function(){this._getWxImage()},methods:{_getCategoryList:function(){var e=this;return u(i.default.mark((function n(){var s;return i.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,n.next=3,(0,a.categoryList)();case 3:s=n.sent,(s.length>0||""!==s)&&(e.activeClass=s[0].id,e.params.type=s[0].id),e.categoryList=s,e._getBrandList(),n.next=12;break;case 9:n.prev=9,n.t0=n["catch"](0),t.showToast({title:"品类数据获取失败",icon:"none"});case 12:case"end":return n.stop()}}),n,null,[[0,9]])})))()},_getBrandList:function(){var e=this;(0,a.brandList)(this.params).then((function(t){0===t.length?e.brandsList=[]:(e.activeBrand=t[0].name,e.brandsList=t),setTimeout((function(){e.loading=!1}),700)})).catch((function(e){t.showToast({title:"品牌数据获取失败",icon:"none"})}))},_getChannelList:function(){var e=this;(0,a.channelList)().then((function(t){e.channelsList=t})).catch((function(e){t.showToast({title:"购买渠道数据获取失败",icon:"none"})}))},_getAddressInfo:function(){var e=this;(0,a.addressInfo)(this.addressParams).then((function(t){e.addressInfos=t[0]})).catch((function(e){t.showToast({title:"获取地址信息失败",icon:"none"})}))},_getWxImage:function(){var e=this,n=t.getStorageSync("m_id"),i=t.getStorageSync("signID");(0,a.wxImage)(n).then((function(t){""!==i&&void 0!==i&&(e.signup=!0),t.wx_image.length>0&&(e.wxImages.id=t.wx_image[0].id||"",e.wxImages.image=t.wx_image[0].abs_url||"")}))},classChange:function(t){this.loading=!0,this.activeClass=t,this.params.type=t,this.params.name="",this._getBrandList()},brandChange:function(t){this.activeBrand=t},channelChange:function(t){this.activeChannel=t},custom:function(){this.activeBrand=this.params.name},searchClear:function(){this.activeBrand="",this.params.name=""},uploadImage:function(e){var n=this;return u(i.default.mark((function a(){var o,r;return i.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.prev=0,i.next=3,new s.default({count:1,url:"Personal/upload"}).uploadPic();case 3:o=i.sent,r={image:o[0].data.list[0].abs_url,id:o[0].data.list[0].id},i.t0=e,i.next=1===i.t0?8:2===i.t0?10:3===i.t0?12:4===i.t0?14:5===i.t0?16:18;break;case 8:return n.positive=r,i.abrupt("break",18);case 10:return n.side=r,i.abrupt("break",18);case 12:return n.details=r,i.abrupt("break",18);case 14:return n.buy=r,i.abrupt("break",18);case 16:return n.wxImages=r,i.abrupt("break",18);case 18:i.next=23;break;case 20:i.prev=20,i.t1=i["catch"](0),t.showToast({title:"上传图片失败，请重试",icon:"none"});case 23:case"end":return i.stop()}}),a,null,[[0,20]])})))()},closeImage:function(e){var n=this;t.showModal({title:"提示",content:"确定需要删除该图片吗？",success:function(t){if(t.confirm){var i={image:"",id:""};switch(e){case 1:n.positive=i;break;case 2:n.side=i;break;case 3:n.details=i;break;case 4:n.buy=i;break;case 5:n.wxImages=i;break}}}})},onLogin:function(){this.isLogin=!1,t.navigateTo({url:"/pages/Profile/Login"})},jumpAddress:function(){var e=t.getStorageSync("m_id");if(""===e||void 0==e)return this.isLogin=!0;t.navigateTo({url:"/pages/Main/Mail?type="+this.addressType+"&m_id="+e+"&id="+this.addressInfos.id})},jumpReserve:function(){var e=t.getStorageSync("m_id");if(""===e||void 0==e)return this.isLogin=!0;t.navigateTo({url:"/pages/Main/protocol?type=1&m_id="+e+"&id=0"})},_sellOrder:function(e){(0,a.sellOrder)(e).then((function(e){t.showToast({title:"订单提交成功",mask:!0,success:function(){setTimeout((function(){t.redirectTo({url:"/pages/Main/success?type=1"})}),1500)}})})).catch((function(e){t.showToast({title:e,icon:"none"})}))},_recycleOrder:function(e){(0,a.recycleOrder)(e).then((function(e){t.showToast({title:"订单提交成功",mask:!0,success:function(){setTimeout((function(){t.redirectTo({url:"/pages/Main/success?type=2"})}),1500)}})})).catch((function(e){t.showToast({title:e,icon:"none"})}))},submitOrder:function(){var e=t.getStorageSync("m_id");if(""===e||void 0==e)return this.isLogin=!0;if(""===this.activeBrand)return t.showToast({title:"请选择对应品牌",icon:"none"});if(""===this.activeChannel)return t.showToast({title:"请选择购买渠道",icon:"none"});if(""===this.positive.id&&""===this.side.id&&""===this.details.id&&""===this.buy.id)return t.showToast({title:"请至少上传一张商品图片",icon:"none"});if(""===this.wxImages.id)return t.showToast({title:"请上传微信账号图",icon:"none"});t.showLoading({title:"订单提交中...",mask:!0});var n={m_id:e,category_id:this.activeClass,brand_id:this.activeBrand,channel:this.activeChannel,positive_image:this.positive.id||"",side_image:this.side.id||"",details_image:this.details.id||"",buy_image:this.buy.id||"",wx_image:this.wxImages.id,address_type:this.addressType-0+1,address_id:this.addressInfos.id,time_string:this.addressInfos.time_string||""};0==this.type?this._sellOrder(n):this._recycleOrder(n)}}};e.default=c}).call(this,n("543d")["default"])},f415:function(t,e,n){"use strict";n.r(e);var i=n("e0d1"),a=n.n(i);for(var s in i)"default"!==s&&function(t){n.d(e,t,(function(){return i[t]}))}(s);e["default"]=a.a},fa86:function(t,e,n){"use strict";n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return s})),n.d(e,"a",(function(){return i}));var i={uEmpty:function(){return n.e("uview-ui/components/u-empty/u-empty").then(n.bind(null,"c5a8"))},uLoading:function(){return n.e("uview-ui/components/u-loading/u-loading").then(n.bind(null,"82e8"))},uSearch:function(){return n.e("uview-ui/components/u-search/u-search").then(n.bind(null,"be45"))},uIcon:function(){return n.e("uview-ui/components/u-icon/u-icon").then(n.bind(null,"5322"))},uImage:function(){return n.e("uview-ui/components/u-image/u-image").then(n.bind(null,"3f08"))},uPopup:function(){return n.e("uview-ui/components/u-popup/u-popup").then(n.bind(null,"6b2a"))}},a=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.isLogin=!1})},s=[]}},[["10e0","common/runtime","common/vendor"]]]);