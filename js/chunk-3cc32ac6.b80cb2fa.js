(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3cc32ac6"],{"95fa":function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"container-fluid px-0"},[e("side-menu-admin",{staticClass:"side-nav",class:{active:t.target},attrs:{params:"route: route"}}),e("header",{staticClass:"main-header",class:{active:t.target}},[e("div",{staticClass:"d-flex align-items-center"},[e("a",{staticClass:"open-menu",class:{active:t.target},on:{click:t.openMenu}},[e("font-awesome-icon",{attrs:{icon:["fas","bars"]}})],1),e("a",{staticClass:"close-menu",class:{active:t.target},on:{click:t.closeMenu}},[e("font-awesome-icon",{attrs:{icon:["fas","bars"]}})],1),e("router-link",{staticClass:"logo-brand",attrs:{to:"/checkIn"}},[e("img",{staticClass:"img-fluid",attrs:{src:t.MainLogo}})])],1),e("div",{staticClass:"d-flex align-items-center"},[e("div",{staticClass:"noti-group d-none"},[e("font-awesome-icon",{staticClass:"icon mr-3",attrs:{icon:["far","bell"]}}),e("div",{staticClass:"noti-number"},[t._v("2")])],1),e("avatar",{on:{toggle:t.updateParentOpened,"hide-dropdown":t.updateParentHideDropdown}}),e("div",{staticClass:"position-relative"},[e("div",{staticClass:"dropdown-menu",class:{show:t.opened}},[e("div",{staticClass:"dropdown-item d-flex align-items-center justify-content-between"},[e("div",{staticClass:"col-md-4 px-0"},[t._v(t._s(t.$t("common.selectLang"))+":")]),e("el-select",{staticClass:"col-md-8",attrs:{placeholder:"Language"},on:{change:t.handleChangeLang},model:{value:t.lang,callback:function(a){t.lang=a},expression:"lang"}},["en"==t.lang?e("div",t._l(t.commonData.optionLangEN,(function(a,n){return e("el-option",{key:n,attrs:{label:a.text,value:a.value}},[e("div",{staticClass:"d-flex align-items-center"},[e("img",{staticClass:"logo-lang",attrs:{src:a.flag}}),e("div",{staticClass:"ml-2"},[t._v(t._s(a.text))])])])})),1):e("div",t._l(t.commonData.optionLangVN,(function(a,n){return e("el-option",{key:n,attrs:{label:a.text,value:a.value}},[e("div",{staticClass:"d-flex align-items-center"},[e("img",{staticClass:"logo-lang",attrs:{src:a.flag}}),e("div",{staticClass:"ml-2"},[t._v(t._s(a.text))])])])})),1)])],1),e("div",{staticClass:"dropdown-item"},[e("a",{staticClass:"d-block",attrs:{href:"javascript:;"},on:{click:function(a){return t.redirectTo("/userInfo")}}},[t._v("Thông tin tài khoản")])]),e("div",{staticClass:"dropdown-item"},[e("a",{staticClass:"d-block",attrs:{href:"javascript:;"},on:{click:function(a){return t.redirectTo("/admin/company")}}},[t._v("Quản trị thông tin")])]),e("div",{staticClass:"dropdown-item"},[e("a",{staticClass:"d-block",attrs:{href:"javascript:;"},on:{click:t.logout}},[t._v("Đăng xuất")])])])])],1)]),e("div",{staticClass:"page-wrap",class:{active:t.target}},[e("div",{staticClass:"main-body"},[e("DashBoardAdmin")],1)])],1)])},s=[],i=(e("96cf"),e("1da1")),r=e("cb5a"),c=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("div",{staticClass:"row justify-content-between align-items-center mb-3"},[e("div",{staticClass:"col-md-6"},[e("div",{staticClass:"row align-items-center"},[e("div",{staticClass:"col-md-8"},[e("div",{staticClass:"position-relative"},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.description,expression:"description"}],staticClass:"input-primary medium",attrs:{placeholder:"Tìm kiếm"},domProps:{value:t.description},on:{keyup:t.handleSearch,input:function(a){a.target.composing||(t.description=a.target.value)}}}),e("font-awesome-icon",{staticClass:"icon-search",attrs:{icon:["fas","search"]}})],1)])])]),t._m(0)]),e("div",{staticClass:"row"},[e("div",{staticClass:"col-lg-12"},[e("table",{staticClass:"table table-hover"},[t._m(1),e("tbody",[e("tr",[e("td",[t._v("Tháng 9 - Tháng 10")]),e("td",[t._v("18/09/2020")]),e("td",[t._v("18/10/2020")]),e("td",[e("div",{staticClass:"d-flex justify-content-end"},[e("font-awesome-icon",{staticClass:"mr-3",attrs:{icon:["fas","edit"]}}),e("font-awesome-icon",{attrs:{icon:["fas","trash"]}})],1)])])])]),e("el-pagination",{staticClass:"text-right",attrs:{background:"",layout:"prev, pager, next",total:100}})],1)])])},o=[function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"col-md-6 text-right"},[e("button",{staticClass:"btn btn-primary btn-medium"},[t._v("Thêm mới")])])},function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("thead",{staticClass:"thead-light"},[e("tr",[e("th",{attrs:{scope:"col"}},[t._v("Tên chu kỳ")]),e("th",{attrs:{scope:"col"}},[t._v("Ngày bắt đầu")]),e("th",{attrs:{scope:"col"}},[t._v("Ngày kết thúc")]),e("th",{attrs:{scope:"col"}})])])}],l=e("5530"),u=e("2f62"),d=(e("ac1f"),e("841c"),e("99af"),e("2b0e")),m=function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a,e,n,s,i){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",d["default"].prototype.$http.get("https://5efd8910dd373900160b321d.mockapi.io/listUser?search=".concat(a,"&page=").concat(e,"&limit=").concat(n,"&sortBy=").concat(s,"&order=").concat(i)));case 1:case"end":return t.stop()}}),t)})));return function(a,e,n,s,i){return t.apply(this,arguments)}}(),p=function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",d["default"].prototype.$http.get("https://5efd8910dd373900160b321d.mockapi.io/listUser?search=".concat(a)));case 1:case"end":return t.stop()}}),t)})));return function(a){return t.apply(this,arguments)}}(),v=function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",d["default"].prototype.$http.delete("https://5efd8910dd373900160b321d.mockapi.io/listUser/".concat(a)));case 1:case"end":return t.stop()}}),t)})));return function(a){return t.apply(this,arguments)}}(),f={getData:m,deleteData:v,getDataNoPaging:p},g=function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f.getData(a.state.search,a.state.page,a.state.limit,a.state.sortBy,a.state.sortDirection);case 2:e=t.sent,a.commit("SET_DATA",e);case 4:case"end":return t.stop()}}),t)})));return function(a){return t.apply(this,arguments)}}(),h=function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f.getDataNoPaging(a.state.search);case 2:e=t.sent,a.commit("SET_DATA_NO_PAGING",e);case 4:case"end":return t.stop()}}),t)})));return function(a){return t.apply(this,arguments)}}(),C=function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a,e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a.commit("SET_SEARCH",e);case 1:case"end":return t.stop()}}),t)})));return function(a,e){return t.apply(this,arguments)}}(),_=function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a,e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a.commit("SET_ORDER_DIRECTION",e);case 1:case"end":return t.stop()}}),t)})));return function(a,e){return t.apply(this,arguments)}}(),w=function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a,e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:a.commit("SET_ORDERBY",e);case 1:case"end":return t.stop()}}),t)})));return function(a,e){return t.apply(this,arguments)}}(),b=function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(a,e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f.deleteData(e);case 2:n=t.sent,a.commit("DELETE_DATA",n);case 4:case"end":return t.stop()}}),t)})));return function(a,e){return t.apply(this,arguments)}}(),k={getData:g,getDataNoPaging:h,setSearch:C,setOrderDirection:_,setOrderBy:w,deleteData:b},y=(e("4de4"),e("d81d"),e("2ef0")),D=e.n(y),A=function(t){var a={};return t.data&&(a=D.a.map(t.data,(function(t){return t})),a=D.a.filter(a,(function(t){return!t.isDelete})),a.data=a),a},x={getData:A},R=function(t,a){t.data=a.data},O=function(t,a){t.total=a.data.length},$=function(t,a){t.search=a},E=function(t,a){t.sortBy=a},T=function(t,a){t.sortDirection=a},j=function(t,a){t.data=a},N={SET_DATA:R,SET_DATA_NO_PAGING:O,SET_SEARCH:$,SET_ORDERBY:E,SET_ORDER_DIRECTION:T,DELETE_DATA:j},S={data:null,search:"",sortBy:[],sortDirection:"asc",page:1,limit:5,total:null},P={namespaced:!0,state:S,actions:k,getters:x,mutations:N},I={components:{},data:function(){return{}},computed:Object(l["a"])(Object(l["a"])({},Object(u["c"])({state:function(t){return t.$_dashboardAdmin}})),Object(u["b"])({data:"$_dashboardAdmin/getData"})),created:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var e,n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e=t,n="$_dashboardAdmin",n in t.$store._modules.root._children||e.$store.registerModule(n,P),a.prev=3,a.next=6,e.$store.dispatch("$_dashboardAdmin/getData");case 6:a.next=11;break;case 8:a.prev=8,a.t0=a["catch"](3),console.log(a.t0);case 11:case"end":return a.stop()}}),a,null,[[3,8]])})))()},methods:{}},L=I,B=e("2877"),M=Object(B["a"])(L,c,o,!1,null,"56ca0ab2",null),G=M.exports,H=e("7150"),Q=e("267f"),U=e.n(Q),J=e("e67d"),Y=e.n(J),q=e("29db"),V={name:"dashBoarduser",data:function(){return{target:!0,commonData:q["a"],opened:!1,lang:"vn",MainLogo:U.a}},components:{DashBoardAdmin:G,"side-menu-admin":r["a"],avatar:H["a"]},directives:{ClickOutside:Y.a},methods:{openMenu:function(){this.target=!0},closeMenu:function(){this.target=!1},updateParentOpened:function(t){var a=this;a.opened=t},updateParentHideDropdown:function(t){var a=this;a.opened=t},handleChangeLang:function(t){var a=this;a.lang=t,this.$store.dispatch("setLang",a.lang)},logout:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var e;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e=t,a.next=3,e.$store.dispatch("$_loginPage/logout");case 3:e.user=null,e.$router.push("/login");case 5:case"end":return a.stop()}}),a)})))()}}},z=V,F=Object(B["a"])(z,n,s,!1,null,null,null);a["default"]=F.exports},cb5a:function(t,a,e){"use strict";var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("nav",[e("ul",{staticClass:"sidebar-nav"},[t._l(t.routes,(function(a,n){return e("li",{key:n,staticClass:"nav-item"},[e("router-link",{attrs:{to:a.path,"exact-active-class":"active"}},["companyAdmin"==a.name?e("div",{staticClass:"nav-link-wrapper"},[e("div",{staticClass:"icon"},[e("font-awesome-icon",{attrs:{icon:["far","building"]}})],1),e("a",{staticClass:"nav-link"},[t._v(t._s(t.$t("nav.companyAdmin")))])]):t._e(),"checkInQuestionAdmin"==a.name?e("div",{staticClass:"nav-link-wrapper"},[e("div",{staticClass:"icon"},[e("font-awesome-icon",{attrs:{icon:["far","question-circle"]}})],1),e("a",{staticClass:"nav-link"},[t._v(t._s(t.$t("nav.checkInQuestionAdmin")))])]):t._e(),"cycleAdmin"==a.name?e("div",{staticClass:"nav-link-wrapper"},[e("div",{staticClass:"icon"},[e("font-awesome-icon",{attrs:{icon:["far","life-ring"]}})],1),e("a",{staticClass:"nav-link"},[t._v(t._s(t.$t("nav.cycleAdmin")))])]):t._e(),"departmentAdmin"==a.name?e("div",{staticClass:"nav-link-wrapper"},[e("div",{staticClass:"icon"},[e("font-awesome-icon",{attrs:{icon:["fa","users"]}})],1),e("a",{staticClass:"nav-link"},[t._v(t._s(t.$t("nav.departmentAdmin")))])]):t._e(),"positionAdmin"==a.name?e("div",{staticClass:"nav-link-wrapper"},[e("div",{staticClass:"icon"},[e("font-awesome-icon",{attrs:{icon:["far","building"]}})],1),e("a",{staticClass:"nav-link"},[t._v(t._s(t.$t("nav.positionAdmin")))])]):t._e(),"criteriaAdmin"==a.name?e("div",{staticClass:"nav-link-wrapper"},[e("div",{staticClass:"icon"},[e("font-awesome-icon",{attrs:{icon:["far","star"]}})],1),e("a",{staticClass:"nav-link"},[t._v(t._s(t.$t("nav.criteriaAdmin")))])]):t._e(),"employeeAdmin"==a.name?e("div",{staticClass:"nav-link-wrapper"},[e("div",{staticClass:"icon"},[e("font-awesome-icon",{attrs:{icon:["far","user"]}})],1),e("a",{staticClass:"nav-link"},[t._v(t._s(t.$t("nav.employeeAdmin")))])]):t._e(),"replyAdmin"==a.name?e("div",{staticClass:"nav-link-wrapper"},[e("div",{staticClass:"icon"},[e("font-awesome-icon",{attrs:{icon:["far","comment-dots"]}})],1),e("a",{staticClass:"nav-link"},[t._v(t._s(t.$t("nav.replyAdmin")))])]):t._e(),"goalAdmin"==a.name?e("div",{staticClass:"nav-link-wrapper"},[e("div",{staticClass:"icon"},[e("font-awesome-icon",{attrs:{icon:["fa","bullseye"]}})],1),e("a",{staticClass:"nav-link"},[t._v(t._s(t.$t("nav.goalAdmin")))])]):t._e()])],1)})),t.companyDetail&&t.companyDetail.logo?e("li",{staticClass:"nav-brand"},[e("div",{staticClass:"bg-logo-company",style:{backgroundImage:"url("+(t.companyDetail&&t.companyDetail.logo?t.companyDetail.logo:"")+")"}})]):t._e()],2)])])},s=[],i=e("5530"),r=e("2f62"),c=e("d046"),o={components:{},directives:{},data:function(){return{routes:c["a"]}},computed:Object(i["a"])({},Object(r["b"])({companyDetail:"$_loginPage/getCompanyDetail"})),created:function(){},methods:{redirectTo:function(t){t?this.$router.push(t):this.$router.go(-1)}}},l=o,u=e("2877"),d=Object(u["a"])(l,n,s,!1,null,"7972f2f0",null);a["a"]=d.exports}}]);
//# sourceMappingURL=chunk-3cc32ac6.b80cb2fa.js.map