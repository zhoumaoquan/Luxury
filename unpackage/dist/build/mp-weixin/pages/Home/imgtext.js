(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/Home/imgtext"],{1834:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u=e("143e"),o={data:function(){return{content:""}},onLoad:function(n){t.showLoading({title:"加载中..."}),this._getDetail(n.id)},methods:{_getDetail:function(n){var e=this;(0,u.imgtextDesc)(n).then((function(n){t.setNavigationBarTitle({title:n.title}),e.content=n.content,t.hideLoading()})).catch((function(n){t.showToast({title:n,icon:"none",success:function(){setTimeout((function(){t.navigateBack({delta:1})}),1e3)}})}))}}};n.default=o}).call(this,e("543d")["default"])},"70a4":function(t,n,e){"use strict";e.r(n);var u=e("1834"),o=e.n(u);for(var i in u)"default"!==i&&function(t){e.d(n,t,(function(){return u[t]}))}(i);n["default"]=o.a},"75f5":function(t,n,e){"use strict";(function(t){e("fa97");u(e("66fd"));var n=u(e("ad76"));function u(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"81dd":function(t,n,e){"use strict";e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return i})),e.d(n,"a",(function(){return u}));var u={uParse:function(){return Promise.all([e.e("common/vendor"),e.e("uview-ui/components/u-parse/u-parse")]).then(e.bind(null,"00fd"))}},o=function(){var t=this,n=t.$createElement;t._self._c},i=[]},ad76:function(t,n,e){"use strict";e.r(n);var u=e("81dd"),o=e("70a4");for(var i in o)"default"!==i&&function(t){e.d(n,t,(function(){return o[t]}))}(i);var a,c=e("f0c5"),r=Object(c["a"])(o["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],a);n["default"]=r.exports}},[["75f5","common/runtime","common/vendor"]]]);