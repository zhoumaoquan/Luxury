(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Profile/index"],{"0f18":function(n,e,t){},"1e56":function(n,e,t){"use strict";var i=t("0f18"),o=t.n(i);o.a},"389b":function(n,e,t){"use strict";(function(n){t("fa97");i(t("66fd"));var e=i(t("ab25"));function i(n){return n&&n.__esModule?n:{default:n}}n(e.default)}).call(this,t("543d")["createPage"])},4483:function(n,e,t){"use strict";t.r(e);var i=t("58c3"),o=t.n(i);for(var u in i)"default"!==u&&function(n){t.d(e,n,(function(){return i[n]}))}(u);e["default"]=o.a},"58c3":function(n,e,t){"use strict";(function(n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=u(t("a34a")),o=t("af94");function u(n){return n&&n.__esModule?n:{default:n}}function r(n,e,t,i,o,u,r){try{var a=n[u](r),c=a.value}catch(s){return void t(s)}a.done?e(c):Promise.resolve(c).then(i,o)}function a(n){return function(){var e=this,t=arguments;return new Promise((function(i,o){var u=n.apply(e,t);function a(n){r(u,i,o,a,c,"next",n)}function c(n){r(u,i,o,a,c,"throw",n)}a(void 0)}))}}var c={data:function(){return{isLogin:!1,current:1,userInfo:{},m_id:""}},onLoad:function(e){n.showLoading({title:"加载中..."})},onShow:function(){this.m_id=n.getStorageSync("m_id"),""!==this.m_id&&void 0!==this.m_id?this._getUserInfo():n.hideLoading()},methods:{goLogin:function(){n.hideTabBar({animation:!0}),this.isLogin=!0},closeLogin:function(){this.isLogin=!1,n.showTabBar({animation:!0})},onLogin:function(){this.closeLogin(),n.navigateTo({url:"/pages/Profile/Login"})},_getUserInfo:function(){var e=this;return a(i.default.mark((function t(){var u,r;return i.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,(0,o.getUserInfo)(e.m_id);case 3:u=t.sent,e.userInfo=u,n.hideLoading(),t.next=13;break;case 8:t.prev=8,t.t0=t["catch"](0),r=e,n.hideLoading(),n.showToast({title:"获取用户信息失败",icon:"none",success:function(){setTimeout((function(){n.removeStorageSync("m_id"),r.userInfo={}}),1500)}});case 13:case"end":return t.stop()}}),t,null,[[0,8]])})))()},getPhone:function(e){var t=this;return a(i.default.mark((function u(){var r,a;return i.default.wrap((function(i){while(1)switch(i.prev=i.next){case 0:r=t,a=n.getStorageSync("session_key"),(0,o.bindUserPhone)({m_id:t.m_id,session_key:a,iv:e.detail.iv,encryptedData:e.detail.encryptedData}).then((function(e){n.showToast({title:"绑定手机成功",icon:"none",success:function(){setTimeout((function(){r._getUserInfo()}),1500)}})})).catch((function(e){n.showToast({title:"绑定手机号失败",icon:"none"})}));case 3:case"end":return i.stop()}}),u)})))()},jumpUserInfo:function(){n.navigateTo({url:"/pages/Profile/userdata/myData?m_id="+this.m_id})},jumpHelpList:function(){n.navigateTo({url:"/pages/Profile/help/helpList"})},jumpFeedBack:function(){""!==this.m_id&&void 0!==this.m_id?n.navigateTo({url:"/pages/Profile/feedback?m_id="+this.m_id}):this.goLogin()},jumpSell:function(e){if(""===this.m_id||void 0==this.m_id)return this.goLogin();n.navigateTo({url:"/pages/Profile/order/orderList?type=1&m_id="+this.m_id})},jumpReceive:function(e){if(""===this.m_id||void 0==this.m_id)return this.goLogin();n.navigateTo({url:"/pages/Profile/order/orderList?type=2&m_id="+this.m_id})}}};e.default=c}).call(this,t("543d")["default"])},ab25:function(n,e,t){"use strict";t.r(e);var i=t("ec15"),o=t("4483");for(var u in o)"default"!==u&&function(n){t.d(e,n,(function(){return o[n]}))}(u);t("1e56");var r,a=t("f0c5"),c=Object(a["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],r);e["default"]=c.exports},ec15:function(n,e,t){"use strict";t.d(e,"b",(function(){return o})),t.d(e,"c",(function(){return u})),t.d(e,"a",(function(){return i}));var i={uIcon:function(){return t.e("uview-ui/components/u-icon/u-icon").then(t.bind(null,"5322"))},uImage:function(){return t.e("uview-ui/components/u-image/u-image").then(t.bind(null,"3f08"))},uPopup:function(){return t.e("uview-ui/components/u-popup/u-popup").then(t.bind(null,"6b2a"))}},o=function(){var n=this,e=n.$createElement,t=(n._self._c,Object.keys(n.userInfo));n._isMounted||(n.e0=function(e){n.current=1},n.e1=function(e){n.current=2}),n.$mp.data=Object.assign({},{$root:{g0:t}})},u=[]}},[["389b","common/runtime","common/vendor"]]]);