(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-368c679e"],{"057f":function(t,e,n){var r=n("fc6a"),i=n("241c").f,o={}.toString,c="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return i(t)}catch(e){return c.slice()}};t.exports.f=function(t){return c&&"[object Window]"==o.call(t)?a(t):i(r(t))}},1276:function(t,e,n){"use strict";var r=n("d784"),i=n("44e7"),o=n("825a"),c=n("1d80"),a=n("4840"),u=n("8aa5"),s=n("50c4"),f=n("14c3"),l=n("9263"),d=n("d039"),p=[].push,h=Math.min,v=4294967295,g=!d((function(){return!RegExp(v,"y")}));r("split",2,(function(t,e,n){var r;return r="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,n){var r=String(c(this)),o=void 0===n?v:n>>>0;if(0===o)return[];if(void 0===t)return[r];if(!i(t))return e.call(r,t,o);var a,u,s,f=[],d=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),h=0,g=new RegExp(t.source,d+"g");while(a=l.call(g,r)){if(u=g.lastIndex,u>h&&(f.push(r.slice(h,a.index)),a.length>1&&a.index<r.length&&p.apply(f,a.slice(1)),s=a[0].length,h=u,f.length>=o))break;g.lastIndex===a.index&&g.lastIndex++}return h===r.length?!s&&g.test("")||f.push(""):f.push(r.slice(h)),f.length>o?f.slice(0,o):f}:"0".split(void 0,0).length?function(t,n){return void 0===t&&0===n?[]:e.call(this,t,n)}:e,[function(e,n){var i=c(this),o=void 0==e?void 0:e[t];return void 0!==o?o.call(e,i,n):r.call(String(i),e,n)},function(t,i){var c=n(r,t,this,i,r!==e);if(c.done)return c.value;var l=o(t),d=String(this),p=a(l,RegExp),b=l.unicode,m=(l.ignoreCase?"i":"")+(l.multiline?"m":"")+(l.unicode?"u":"")+(g?"y":"g"),y=new p(g?l:"^(?:"+l.source+")",m),O=void 0===i?v:i>>>0;if(0===O)return[];if(0===d.length)return null===f(y,d)?[d]:[];var w=0,S=0,j=[];while(S<d.length){y.lastIndex=g?S:0;var x,_=f(y,g?d:d.slice(S));if(null===_||(x=h(s(y.lastIndex+(g?0:S)),d.length))===w)S=u(d,S,b);else{if(j.push(d.slice(w,S)),j.length===O)return j;for(var k=1;k<=_.length-1;k++)if(j.push(_[k]),j.length===O)return j;S=w=x}}return j.push(d.slice(w)),j}]}),!g)},"159b":function(t,e,n){var r=n("da84"),i=n("fdbc"),o=n("17c2"),c=n("9112");for(var a in i){var u=r[a],s=u&&u.prototype;if(s&&s.forEach!==o)try{c(s,"forEach",o)}catch(f){s.forEach=o}}},"17c2":function(t,e,n){"use strict";var r=n("b727").forEach,i=n("a640"),o=n("ae40"),c=i("forEach"),a=o("forEach");t.exports=c&&a?[].forEach:function(t){return r(this,t,arguments.length>1?arguments[1]:void 0)}},"267f":function(t,e,n){t.exports=n.p+"img/TWG.a48732cf.svg"},4160:function(t,e,n){"use strict";var r=n("23e7"),i=n("17c2");r({target:"Array",proto:!0,forced:[].forEach!=i},{forEach:i})},5530:function(t,e,n){"use strict";n.d(e,"a",(function(){return o}));n("a4d3"),n("4de4"),n("4160"),n("e439"),n("dbb4"),n("b64b"),n("159b");function r(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function o(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}},6547:function(t,e,n){var r=n("a691"),i=n("1d80"),o=function(t){return function(e,n){var o,c,a=String(i(e)),u=r(n),s=a.length;return u<0||u>=s?t?"":void 0:(o=a.charCodeAt(u),o<55296||o>56319||u+1===s||(c=a.charCodeAt(u+1))<56320||c>57343?t?a.charAt(u):o:t?a.slice(u,u+2):c-56320+(o-55296<<10)+65536)}};t.exports={codeAt:o(!1),charAt:o(!0)}},7150:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("a",{directives:[{name:"click-outside",rawName:"v-click-outside",value:t.hideDropdown,expression:"hideDropdown"}],staticClass:"d-flex align-items-center group-avatar",attrs:{href:"javascript:;"},on:{click:t.toggle}},[n("div",{staticClass:"avatar-circle original"},[t.currentUser&&!t.currentUser.avatar?n("div",{staticClass:"avatar-without-img"},[t._v(t._s(t.convertName))]):n("div",{staticClass:"avatar-with-img",style:{backgroundImage:"url("+(t.currentUser&&t.currentUser.avatar?t.currentUser.avatar:"")+")"}})]),n("div",{staticClass:"avatar-text ml-2 mr-2"},[t._v(t._s(t.currentUser&&t.currentUser.fullName?t.currentUser.fullName:""))]),n("font-awesome-icon",{staticClass:"avatar-icon",attrs:{icon:["fas","chevron-down"]}})],1)])},i=[],o=(n("a15b"),n("d81d"),n("fb6a"),n("ac1f"),n("1276"),n("5530")),c=(n("96cf"),n("1da1")),a=n("2f62"),u=n("29db"),s=n("e67d"),f=n.n(s),l={data:function(){return{commonData:u["a"],convertName:"",opened:!1}},components:{},directives:{ClickOutside:f.a},created:function(){var t=this;return Object(c["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(n=t,!localStorage.getItem("userId")){e.next=4;break}return e.next=4,n.$store.dispatch("$_loginPage/getCurrentUser",localStorage.getItem("userId"));case 4:n.convertName=n.currentUser.fullName.split(" ").map((function(t){return t[0]})).join("").slice(-2);case 5:case"end":return e.stop()}}),e)})))()},computed:Object(o["a"])(Object(o["a"])({},Object(a["c"])({currentUser:function(t){return t.$_loginPage.currentUser}})),Object(a["b"])({})),methods:{redirectTo:function(t){t?this.$router.push(t):this.$router.go(-1)},toggle:function(){var t=this;t.opened=!t.opened,t.$emit("toggle",t.opened)},hideDropdown:function(){var t=this;t.opened=!1,t.$emit("hide-dropdown",t.opened)}}},d=l,p=n("2877"),h=Object(p["a"])(d,r,i,!1,null,null,null);e["a"]=h.exports},"746f":function(t,e,n){var r=n("428f"),i=n("5135"),o=n("e538"),c=n("9bf2").f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});i(e,t)||c(e,t,{value:o.f(t)})}},"8aa5":function(t,e,n){"use strict";var r=n("6547").charAt;t.exports=function(t,e,n){return e+(n?r(t,e).length:1)}},a15b:function(t,e,n){"use strict";var r=n("23e7"),i=n("44ad"),o=n("fc6a"),c=n("a640"),a=[].join,u=i!=Object,s=c("join",",");r({target:"Array",proto:!0,forced:u||!s},{join:function(t){return a.call(o(this),void 0===t?",":t)}})},a4d3:function(t,e,n){"use strict";var r=n("23e7"),i=n("da84"),o=n("d066"),c=n("c430"),a=n("83ab"),u=n("4930"),s=n("fdbf"),f=n("d039"),l=n("5135"),d=n("e8b5"),p=n("861d"),h=n("825a"),v=n("7b0b"),g=n("fc6a"),b=n("c04e"),m=n("5c6c"),y=n("7c73"),O=n("df75"),w=n("241c"),S=n("057f"),j=n("7418"),x=n("06cf"),_=n("9bf2"),k=n("d1e7"),L=n("9112"),P=n("6eeb"),C=n("5692"),E=n("f772"),T=n("d012"),D=n("90e3"),N=n("b622"),I=n("e538"),A=n("746f"),U=n("d44e"),M=n("69f3"),R=n("b727").forEach,$=E("hidden"),V="Symbol",G="prototype",F=N("toPrimitive"),H=M.set,J=M.getterFor(V),W=Object[G],q=i.Symbol,B=o("JSON","stringify"),Q=x.f,z=_.f,K=S.f,X=k.f,Y=C("symbols"),Z=C("op-symbols"),tt=C("string-to-symbol-registry"),et=C("symbol-to-string-registry"),nt=C("wks"),rt=i.QObject,it=!rt||!rt[G]||!rt[G].findChild,ot=a&&f((function(){return 7!=y(z({},"a",{get:function(){return z(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=Q(W,e);r&&delete W[e],z(t,e,n),r&&t!==W&&z(W,e,r)}:z,ct=function(t,e){var n=Y[t]=y(q[G]);return H(n,{type:V,tag:t,description:e}),a||(n.description=e),n},at=s?function(t){return"symbol"==typeof t}:function(t){return Object(t)instanceof q},ut=function(t,e,n){t===W&&ut(Z,e,n),h(t);var r=b(e,!0);return h(n),l(Y,r)?(n.enumerable?(l(t,$)&&t[$][r]&&(t[$][r]=!1),n=y(n,{enumerable:m(0,!1)})):(l(t,$)||z(t,$,m(1,{})),t[$][r]=!0),ot(t,r,n)):z(t,r,n)},st=function(t,e){h(t);var n=g(e),r=O(n).concat(ht(n));return R(r,(function(e){a&&!lt.call(n,e)||ut(t,e,n[e])})),t},ft=function(t,e){return void 0===e?y(t):st(y(t),e)},lt=function(t){var e=b(t,!0),n=X.call(this,e);return!(this===W&&l(Y,e)&&!l(Z,e))&&(!(n||!l(this,e)||!l(Y,e)||l(this,$)&&this[$][e])||n)},dt=function(t,e){var n=g(t),r=b(e,!0);if(n!==W||!l(Y,r)||l(Z,r)){var i=Q(n,r);return!i||!l(Y,r)||l(n,$)&&n[$][r]||(i.enumerable=!0),i}},pt=function(t){var e=K(g(t)),n=[];return R(e,(function(t){l(Y,t)||l(T,t)||n.push(t)})),n},ht=function(t){var e=t===W,n=K(e?Z:g(t)),r=[];return R(n,(function(t){!l(Y,t)||e&&!l(W,t)||r.push(Y[t])})),r};if(u||(q=function(){if(this instanceof q)throw TypeError("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?String(arguments[0]):void 0,e=D(t),n=function(t){this===W&&n.call(Z,t),l(this,$)&&l(this[$],e)&&(this[$][e]=!1),ot(this,e,m(1,t))};return a&&it&&ot(W,e,{configurable:!0,set:n}),ct(e,t)},P(q[G],"toString",(function(){return J(this).tag})),P(q,"withoutSetter",(function(t){return ct(D(t),t)})),k.f=lt,_.f=ut,x.f=dt,w.f=S.f=pt,j.f=ht,I.f=function(t){return ct(N(t),t)},a&&(z(q[G],"description",{configurable:!0,get:function(){return J(this).description}}),c||P(W,"propertyIsEnumerable",lt,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!u,sham:!u},{Symbol:q}),R(O(nt),(function(t){A(t)})),r({target:V,stat:!0,forced:!u},{for:function(t){var e=String(t);if(l(tt,e))return tt[e];var n=q(e);return tt[e]=n,et[n]=e,n},keyFor:function(t){if(!at(t))throw TypeError(t+" is not a symbol");if(l(et,t))return et[t]},useSetter:function(){it=!0},useSimple:function(){it=!1}}),r({target:"Object",stat:!0,forced:!u,sham:!a},{create:ft,defineProperty:ut,defineProperties:st,getOwnPropertyDescriptor:dt}),r({target:"Object",stat:!0,forced:!u},{getOwnPropertyNames:pt,getOwnPropertySymbols:ht}),r({target:"Object",stat:!0,forced:f((function(){j.f(1)}))},{getOwnPropertySymbols:function(t){return j.f(v(t))}}),B){var vt=!u||f((function(){var t=q();return"[null]"!=B([t])||"{}"!=B({a:t})||"{}"!=B(Object(t))}));r({target:"JSON",stat:!0,forced:vt},{stringify:function(t,e,n){var r,i=[t],o=1;while(arguments.length>o)i.push(arguments[o++]);if(r=e,(p(e)||void 0!==t)&&!at(t))return d(e)||(e=function(t,e){if("function"==typeof r&&(e=r.call(this,t,e)),!at(e))return e}),i[1]=e,B.apply(null,i)}})}q[G][F]||L(q[G],F,q[G].valueOf),U(q,V),T[$]=!0},a640:function(t,e,n){"use strict";var r=n("d039");t.exports=function(t,e){var n=[][t];return!!n&&r((function(){n.call(null,e||function(){throw 1},1)}))}},b64b:function(t,e,n){var r=n("23e7"),i=n("7b0b"),o=n("df75"),c=n("d039"),a=c((function(){o(1)}));r({target:"Object",stat:!0,forced:a},{keys:function(t){return o(i(t))}})},d81d:function(t,e,n){"use strict";var r=n("23e7"),i=n("b727").map,o=n("1dde"),c=n("ae40"),a=o("map"),u=c("map");r({target:"Array",proto:!0,forced:!a||!u},{map:function(t){return i(this,t,arguments.length>1?arguments[1]:void 0)}})},dbb4:function(t,e,n){var r=n("23e7"),i=n("83ab"),o=n("56ef"),c=n("fc6a"),a=n("06cf"),u=n("8418");r({target:"Object",stat:!0,sham:!i},{getOwnPropertyDescriptors:function(t){var e,n,r=c(t),i=a.f,s=o(r),f={},l=0;while(s.length>l)n=i(r,e=s[l++]),void 0!==n&&u(f,e,n);return f}})},e439:function(t,e,n){var r=n("23e7"),i=n("d039"),o=n("fc6a"),c=n("06cf").f,a=n("83ab"),u=i((function(){c(1)})),s=!a||u;r({target:"Object",stat:!0,forced:s,sham:!a},{getOwnPropertyDescriptor:function(t,e){return c(o(t),e)}})},e538:function(t,e,n){var r=n("b622");e.f=r},e67d:function(t,e){function n(t){return"function"===typeof t.value||(console.warn("[Vue-click-outside:] provided expression",t.expression,"is not a function."),!1)}function r(t,e){if(!t||!e)return!1;for(var n=0,r=e.length;n<r;n++)try{if(t.contains(e[n]))return!0;if(e[n].contains(t))return!1}catch(i){return!1}return!1}function i(t){return"undefined"!==typeof t.componentInstance&&t.componentInstance.$isServer}t.exports={bind:function(t,e,o){if(!n(e))return;function c(e){if(o.context){var n=e.path||e.composedPath&&e.composedPath();n&&n.length>0&&n.unshift(e.target),t.contains(e.target)||r(o.context.popupItem,n)||t.__vueClickOutside__.callback(e)}}t.__vueClickOutside__={handler:c,callback:e.value};const a="ontouchstart"in document.documentElement?"touchstart":"click";!i(o)&&document.addEventListener(a,c)},update:function(t,e){n(e)&&(t.__vueClickOutside__.callback=e.value)},unbind:function(t,e,n){const r="ontouchstart"in document.documentElement?"touchstart":"click";!i(n)&&t.__vueClickOutside__&&document.removeEventListener(r,t.__vueClickOutside__.handler),delete t.__vueClickOutside__}}},fdbc:function(t,e){t.exports={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0}}}]);
//# sourceMappingURL=chunk-368c679e.b935b3cc.js.map