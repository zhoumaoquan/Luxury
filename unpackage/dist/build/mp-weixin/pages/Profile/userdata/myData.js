(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Profile/userdata/myData"],{"2a3c":function(n,t,e){},"2fc5":function(n,t,e){"use strict";e.d(t,"b",(function(){return o})),e.d(t,"c",(function(){return u})),e.d(t,"a",(function(){return i}));var i={uImage:function(){return e.e("uview-ui/components/u-image/u-image").then(e.bind(null,"3f08"))},uIcon:function(){return e.e("uview-ui/components/u-icon/u-icon").then(e.bind(null,"5322"))},uSkeleton:function(){return e.e("uview-ui/components/u-skeleton/u-skeleton").then(e.bind(null,"fd0f"))},uPopup:function(){return e.e("uview-ui/components/u-popup/u-popup").then(e.bind(null,"6b2a"))}},o=function(){var n=this,t=n.$createElement;n._self._c;n._isMounted||(n.e0=function(t){n.isSex=!0},n.e1=function(t){n.isAge=!0},n.e2=function(t){n.currentSex=1},n.e3=function(t){n.currentSex=0})},u=[]},3270:function(n,t,e){"use strict";e.r(t);var i=e("2fc5"),o=e("6293");for(var u in o)"default"!==u&&function(n){e.d(t,n,(function(){return o[n]}))}(u);e("d8a2");var a,s=e("f0c5"),c=Object(s["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],a);t["default"]=c.exports},6293:function(n,t,e){"use strict";e.r(t);var i=e("f98c"),o=e.n(i);for(var u in i)"default"!==u&&function(n){e.d(t,n,(function(){return i[n]}))}(u);t["default"]=o.a},a429:function(n,t,e){"use strict";(function(n){e("fa97");i(e("66fd"));var t=i(e("3270"));function i(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},d8a2:function(n,t,e){"use strict";var i=e("2a3c"),o=e.n(i);o.a},f98c:function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=a(e("a34a")),o=e("af94"),u=a(e("dfdf"));function a(n){return n&&n.__esModule?n:{default:n}}function s(n,t,e,i,o,u,a){try{var s=n[u](a),c=s.value}catch(r){return void e(r)}s.done?t(c):Promise.resolve(c).then(i,o)}function c(n){return function(){var t=this,e=arguments;return new Promise((function(i,o){var u=n.apply(t,e);function a(n){s(u,i,o,a,c,"next",n)}function c(n){s(u,i,o,a,c,"throw",n)}a(void 0)}))}}var r={data:function(){return{isSex:!1,currentSex:1,isAge:!1,ageList:[],m_id:"",sex:"",ageID:"",more:!1,userInfo:{},loading:!0,headimg:""}},onLoad:function(t){n.showLoading({title:"加载中..."}),this.m_id=t.m_id,this._getAgeList()},onShow:function(){this._getUserInfo()},methods:{_getAgeList:function(){var n=this;(0,o.ageSelect)().then((function(t){n.ageList=t}))},headChange:function(){var t=this;return c(i.default.mark((function e(){var o,a;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,new u.default({count:1,url:"Personal/upload"}).uploadPic();case 3:o=e.sent,t.headimg=o[0].data.list[0].abs_url,a=o[0].data.list[0].id,t._headUpdata(a),e.next=12;break;case 9:e.prev=9,e.t0=e["catch"](0),n.showToast({title:"上传头像失败，请重试",icon:"none"});case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))()},defineSex:function(){0==this.currentSex?(this.sex="女",this.userInfo.sex=0,this._updataInfo(0),this.isSex=!1):(this.sex="男",this.userInfo.sex=1,this._updataInfo(1),this.isSex=!1)},_headUpdata:function(t){(0,o.updataInfo)({m_id:this.m_id,face:t}).then((function(t){n.showToast({title:"上传头像成功",icon:"none"})})).catch((function(t){n.showToast({title:"保存失败",icon:"none"})}))},_updataInfo:function(t){(0,o.updataInfo)({m_id:this.m_id,sex:t}).then((function(t){n.showToast({title:"保存成功",icon:"none"})})).catch((function(t){n.showToast({title:"保存失败",icon:"none"})}))},_getUserInfo:function(){var t=this;return c(i.default.mark((function e(){var u;return i.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,(0,o.getUserInfo)(t.m_id);case 3:u=e.sent,t.userInfo=u,t.sex=1==u.sex?"男":"女",t.headimg=u.face[0].abs_url,t.loading&&setTimeout((function(){n.hideLoading(),t.loading=!1}),1500),e.next=13;break;case 10:e.prev=10,e.t0=e["catch"](0),n.showToast({title:"获取用户信息失败",icon:"none",success:function(){setTimeout((function(){n.navigateBack({delta:1})}),1e3)}});case 13:case"end":return e.stop()}}),e,null,[[0,10]])})))()},jumpName:function(){n.navigateTo({url:"/pages/Profile/userdata/nickname?m_id="+this.m_id})},ageChange:function(n){this.ageID=this.ageList[n.detail.value[0]].id},pickstart:function(){this.more=!0},pickend:function(){this.more=!1},ageConfirm:function(){var t=this;this.more||(0,o.updataInfo)({m_id:this.m_id,age:this.ageID}).then((function(e){t.isAge=!1,t._getUserInfo(),n.showToast({title:"保存成功",icon:"none"})})).catch((function(e){t.isAge=!1,n.showToast({title:"保存失败",icon:"none"})}))},jumpAddress:function(){n.navigateTo({url:"/pages/Profile/userdata/address?m_id="+this.m_id})}}};t.default=r}).call(this,e("543d")["default"])}},[["a429","common/runtime","common/vendor"]]]);