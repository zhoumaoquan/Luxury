(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Profile/userdata/nickname"],{"0667":function(n,t,e){"use strict";e.d(t,"b",(function(){return o})),e.d(t,"c",(function(){return u})),e.d(t,"a",(function(){return i}));var i={uSkeleton:function(){return e.e("uview-ui/components/u-skeleton/u-skeleton").then(e.bind(null,"fd0f"))}},o=function(){var n=this,t=n.$createElement;n._self._c},u=[]},"1cf6":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=u(e("a34a")),o=e("af94");function u(n){return n&&n.__esModule?n:{default:n}}function a(n,t,e,i,o,u,a){try{var c=n[u](a),r=c.value}catch(f){return void e(f)}c.done?t(r):Promise.resolve(r).then(i,o)}function c(n){return function(){var t=this,e=arguments;return new Promise((function(i,o){var u=n.apply(t,e);function c(n){a(u,i,o,c,r,"next",n)}function r(n){a(u,i,o,c,r,"throw",n)}c(void 0)}))}}var r={onLoad:function(n){this.m_id=n.m_id,this._getUserInfo()},data:function(){return{nickname:"",loading:!0}},methods:{_getUserInfo:function(){var t=this;return c(i.default.mark((function e(){var u;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,o.getUserInfo)(t.m_id);case 3:u=e.sent,t.nickname=u.nickname,t.loading&&setTimeout((function(){t.loading=!1}),1e3),e.next=11;break;case 8:e.prev=8,e.t0=e["catch"](0),n.showToast({title:"获取昵称失败",icon:"none"});case 11:case"end":return e.stop()}}),e,null,[[0,8]])})))()},nameConfirm:function(){if(""===this.nickname&&0===this.nickname.tirm().length)return n.showToast({title:"请输入昵称",icon:"none"});this._updataInfo(this.nickname)},_updataInfo:function(t){(0,o.updataInfo)({m_id:this.m_id,nickname:t}).then((function(t){n.showToast({title:"保存成功",icon:"none",success:function(){setTimeout((function(){n.navigateBack({delta:1})}),1500)}})})).catch((function(t){n.showToast({title:"保存失败",icon:"none"})}))}}};t.default=r}).call(this,e("543d")["default"])},3405:function(n,t,e){"use strict";e.r(t);var i=e("0667"),o=e("4946");for(var u in o)"default"!==u&&function(n){e.d(t,n,(function(){return o[n]}))}(u);e("d903");var a,c=e("f0c5"),r=Object(c["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);t["default"]=r.exports},4946:function(n,t,e){"use strict";e.r(t);var i=e("1cf6"),o=e.n(i);for(var u in i)"default"!==u&&function(n){e.d(t,n,(function(){return i[n]}))}(u);t["default"]=o.a},"7d4f":function(n,t,e){},cf1f:function(n,t,e){"use strict";(function(n){e("fa97");i(e("66fd"));var t=i(e("3405"));function i(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},d903:function(n,t,e){"use strict";var i=e("7d4f"),o=e.n(i);o.a}},[["cf1f","common/runtime","common/vendor"]]]);