(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d755b702"],{2791:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"container-fluid px-0"},[a("side-menu-admin",{staticClass:"side-nav",class:{active:t.target},attrs:{params:"route: route"}}),a("header",{staticClass:"main-header",class:{active:t.target}},[a("div",{staticClass:"d-flex align-items-center"},[a("a",{staticClass:"open-menu",class:{active:t.target},on:{click:t.openMenu}},[a("font-awesome-icon",{attrs:{icon:["fas","bars"]}})],1),a("a",{staticClass:"close-menu",class:{active:t.target},on:{click:t.closeMenu}},[a("font-awesome-icon",{attrs:{icon:["fas","bars"]}})],1),a("a",{staticClass:"logo-brand",attrs:{href:"javascript:;"},on:{click:function(e){return t.linkToUser()}}},[a("img",{staticClass:"img-fluid",attrs:{src:t.MainLogo}})])]),a("div",{staticClass:"d-flex align-items-center"},[a("div",{staticClass:"noti-group d-none"},[a("font-awesome-icon",{staticClass:"icon mr-3",attrs:{icon:["far","bell"]}}),a("div",{staticClass:"noti-number"},[t._v("2")])],1),a("avatar",{on:{toggle:t.updateParentOpened,"hide-dropdown":t.updateParentHideDropdown}}),a("div",{staticClass:"position-relative"},[a("div",{staticClass:"dropdown-menu",class:{show:t.opened}},[a("div",{staticClass:"dropdown-item d-flex align-items-center justify-content-between"},[a("div",{staticClass:"col-md-4 px-0"},[t._v(t._s(t.$t("common.selectLang"))+":")]),a("el-select",{staticClass:"col-md-8",attrs:{placeholder:"Language"},on:{change:t.handleChangeLang},model:{value:t.lang,callback:function(e){t.lang=e},expression:"lang"}},["en"==t.lang?a("div",t._l(t.commonData.optionLangEN,(function(e,n){return a("el-option",{key:n,attrs:{label:e.text,value:e.value}},[a("div",{staticClass:"d-flex align-items-center"},[a("img",{staticClass:"logo-lang",attrs:{src:e.flag}}),a("div",{staticClass:"ml-2"},[t._v(t._s(e.text))])])])})),1):a("div",t._l(t.commonData.optionLangVN,(function(e,n){return a("el-option",{key:n,attrs:{label:e.text,value:e.value}},[a("div",{staticClass:"d-flex align-items-center"},[a("img",{staticClass:"logo-lang",attrs:{src:e.flag}}),a("div",{staticClass:"ml-2"},[t._v(t._s(e.text))])])])})),1)])],1),a("div",{staticClass:"dropdown-item"},[a("a",{staticClass:"d-block",attrs:{href:"javascript:;"},on:{click:function(e){return t.redirectTo("/userInfo")}}},[t._v("Thông tin tài khoản")])]),a("div",{staticClass:"dropdown-item"},[a("a",{staticClass:"d-block",attrs:{href:"javascript:;"},on:{click:function(e){return t.redirectTo("/admin/company")}}},[t._v("Quản trị thông tin")])]),a("div",{staticClass:"dropdown-item"},[a("a",{staticClass:"d-block",attrs:{href:"javascript:;"},on:{click:t.logout}},[t._v("Đăng xuất")])])])])],1)]),a("div",{staticClass:"page-wrap",class:{active:t.target}},[a("div",{staticClass:"main-body"},[a("GoalAdmin")],1)])],1)])},s=[],i=(a("96cf"),a("1da1")),r=a("cb5a"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",[a("div",{staticClass:"row justify-content-between align-items-center mb-3"},[a("div",{staticClass:"col-md-4"},[a("el-select",{on:{change:t.handleFilter},model:{value:t.cycle,callback:function(e){t.cycle=e},expression:"cycle"}},[a("el-option",{attrs:{value:"",label:"Tất cả"}}),t._l(t.cycleCompany,(function(t){return a("el-option",{key:t.id,attrs:{label:t.name,value:t.id}})}))],2)],1),a("div",{staticClass:"col-md-8"},[a("div",{staticClass:"row align-items-center"},[a("div",{staticClass:"col-md-8"},[a("div",{staticClass:"position-relative"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.description,expression:"description"}],staticClass:"input-primary medium",attrs:{placeholder:"Tìm kiếm"},domProps:{value:t.description},on:{keyup:t.handleSearch,input:function(e){e.target.composing||(t.description=e.target.value)}}}),a("font-awesome-icon",{staticClass:"icon-search",attrs:{icon:["fas","search"]}})],1)])])])]),a("div",{staticClass:"row"},[a("div",{staticClass:"col-lg-12"},[a("table",{staticClass:"table table-hover"},[a("thead",{staticClass:"thead-light"},[a("tr",[a("th",[a("el-checkbox",{model:{value:t.isCheckAll,callback:function(e){t.isCheckAll=e},expression:"isCheckAll"}})],1),t._l(t.headers,(function(e,n,s){return[a("th",{key:s,attrs:{scope:"col"}},[t._v(t._s(t.$t("goalAdmin."+n)))])]}))],2)]),a("tbody",t._l(t.data.data,(function(e,n){return a("tr",{key:n,staticClass:"break-word"},[a("td",[a("el-checkbox",{attrs:{value:e.id},model:{value:t.ids,callback:function(e){t.ids=e},expression:"ids"}})],1),a("td",[t._v(t._s(e.name))]),a("td",[t._v(t._s(e.fullName))]),a("td",[t._v(t._s(e.checkIn&&e.checkIn.length?e.checkIn.length:0)+" kết quả")]),a("td",[t._v(t._s(e.progressPercent>=0?"+"+e.progressPercent+"%":e.progressPercent))]),a("td",[t._v(t._s(t.commonData.confidenceLevelDisplay[e.confidenceLevel]))]),a("td",[t._v(t._s(e.lastCheckInDate?e.lastCheckInDate.slice(0,10):""))]),a("td",[a("div",{staticClass:"tag",class:""+t.commonData.goalStatusDisplay[e.status].color},[t._v(" "+t._s(e.status?t.commonData.goalStatusDisplay[e.status].name:"")+" ")])]),a("td",[a("div",{staticClass:"d-flex justify-content-end"},[a("font-awesome-icon",{staticClass:"mr-3",attrs:{icon:["fas","edit"]},on:{click:function(a){return t.openDiaLog(e)}}})],1)])])})),0)]),a("el-pagination",{staticClass:"text-right",attrs:{background:"","current-page":t.searchRequest.pageIndex,layout:"sizes, prev, pager, next , jumper","page-sizes":[5,10,20],total:t.data.total},on:{"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange,"update:currentPage":function(e){return t.$set(t.searchRequest,"pageIndex",e)},"update:current-page":function(e){return t.$set(t.searchRequest,"pageIndex",e)}}})],1)])]),a("div",[a("el-dialog",{staticClass:"transition-box-center",attrs:{title:"Phòng ban",visible:t.dialogVisible,"close-on-click-modal":!1,"close-on-press-escape":!1},on:{"update:visible":function(e){t.dialogVisible=e}}},[a("div",[a("div",{staticClass:"form-group"},[a("label",{staticClass:"control-label font-weight-bold"},[t._v("Tên phòng ban")]),a("div",{staticClass:"mb-20"},[a("input",{directives:[{name:"model",rawName:"v-model",value:t.formData.name,expression:"formData.name"}],staticClass:"input-primary medium",attrs:{type:"text",placeholder:"Nhập tên phòng ban"},domProps:{value:t.formData.name},on:{input:function(e){e.target.composing||t.$set(t.formData,"name",e.target.value)}}})])]),a("div",{staticClass:"form-group mt-3"},[a("label",{staticClass:"control-label font-weight-bold"},[t._v("Mô tả")]),a("div",{staticClass:"mb-20"},[a("el-input",{attrs:{type:"textarea",rows:2,placeholder:"Nhập mô tả"},model:{value:t.formData.description,callback:function(e){t.$set(t.formData,"description",e)},expression:"formData.description"}})],1)])]),a("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[a("button",{staticClass:"btn btn-standard btn-medium mr-3",on:{click:function(e){t.dialogVisible=!1}}},[t._v("Hủy")]),a("button",{staticClass:"btn btn-primary btn-medium",on:{click:t.submit}},[t._v("Đồng ý")])])])],1)])},c=[],l=(a("a4d3"),a("e01a"),a("d81d"),a("5530")),u=a("2f62"),d=a("2b0e"),p=function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e,a,n,s){var i;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return i={PageIndex:e,PageSize:a,Description:n,Title:s},t.abrupt("return",d["default"].prototype.$http.post("/api/goal/getAll",i));case 2:case"end":return t.stop()}}),t)})));return function(e,a,n,s){return t.apply(this,arguments)}}(),m=function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",d["default"].prototype.$http.post("/api/goal/create",e));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),v=function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",d["default"].prototype.$http.post("/api/goal/update",e));case 1:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),g=function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",d["default"].prototype.$http.get("/api/company/getRelatedUser"));case 1:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}(),f={getData:p,createGoal:m,updateGoal:v,getUserList:g},h=function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f.getData(e.state.searchRequest.pageIndex,e.state.searchRequest.pageSize,e.state.searchRequest.description,e.state.searchRequest.title);case 2:a=t.sent,e.commit("SET_DATA",a.data);case 4:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),b=function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e,a){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!a.id||""==a.id){t.next=6;break}return t.next=3,f.updateGoal(a);case 3:t.t0=t.sent,t.next=9;break;case 6:return t.next=8,f.createGoal(a);case 8:t.t0=t.sent;case 9:return n=t.t0,t.abrupt("return",n.data);case 11:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}(),C=function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e,a){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f.getUserList(a);case 2:n=t.sent,e.commit("SET_USER_LIST",n.data);case 4:case"end":return t.stop()}}),t)})));return function(e,a){return t.apply(this,arguments)}}(),_={getData:h,editGoal:b,getUserList:C},w=(a("4de4"),a("7db0"),a("2ef0")),k=a.n(w),y=function(t){var e={};return t.data&&(e=k.a.map(t.data,(function(e){var a=k.a.find(t.userList,(function(t){return t.id===e.userId}));return e.fullName=a.fullName,e})),e=k.a.filter(e,(function(t){return!t.isDelete})),e.data=e,e.total=t.total),e},x=function(t){var e={};return t.userList&&(e=k.a.map(t.userList,(function(t){return t}))),e},D={getData:y,getUserList:x},$=(a("ac1f"),a("841c"),function(t,e){t.data=e.data,t.total=e.total}),R=function(t,e){t.total=e.data.length},A=function(t,e){t.search=e},j=function(t,e){t.sortBy=e},O=function(t,e){t.sortDirection=e},S=function(t,e){t.data=e},L=function(t,e){t.userList=e},T={SET_DATA:$,SET_DATA_NO_PAGING:R,SET_SEARCH:A,SET_ORDERBY:j,SET_ORDER_DIRECTION:O,DELETE_DATA:S,SET_USER_LIST:L},I={data:null,total:0,userList:null,headers:{goal:!0,staffInCharge:!0,result:!0,progressPercent:!0,confidenceLevel:!0,lastCheckInDate:!0,status:!0,setting:!0},searchRequest:{title:"",description:"",pageIndex:1,pageSize:10}},E={namespaced:!0,state:I,actions:_,getters:D,mutations:T},P=a("29db"),q={components:{},data:function(){return{commonData:P["a"],cycle:"",ids:[],isCheckAll:!1,dialogVisible:!1,description:"",formData:{name:"",description:"",isDelete:!1}}},computed:Object(l["a"])(Object(l["a"])({},Object(u["c"])({headers:function(t){return t.$_goalAdmin.headers},searchRequest:function(t){return t.$_goalAdmin.searchRequest}})),Object(u["b"])({data:"$_goalAdmin/getData",cycleCompany:"$_loginPage/getCycleCompany"})),watch:{isCheckAll:function(t){var e=this;e.ids=t?k.a.map(e.data.data,(function(t){return t.id})):[]}},created:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t,n="$_goalAdmin",n in t.$store._modules.root._children||a.$store.registerModule(n,E),e.next=5,a.$store.dispatch("$_goalAdmin/getUserList");case 5:return e.next=7,a.$store.dispatch("$_goalAdmin/getData");case 7:case"end":return e.stop()}}),e)})))()},methods:{handleFilter:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t,a.searchRequest.title=a.cycle,e.next=4,a.$store.dispatch("$_goalAdmin/getData");case 4:case"end":return e.stop()}}),e)})))()},handleSearch:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t,a.searchRequest.description=a.description,e.next=4,a.$store.dispatch("$_goalAdmin/getData");case 4:case"end":return e.stop()}}),e)})))()},openDiaLog:function(t){var e=this;e.formData=k.a.cloneDeep(t),e.dialogVisible=!0},addNew:function(){var t=this;t.formData={name:"",description:"",isDelete:!1},t.dialogVisible=!0},handleSizeChange:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=e,n.searchRequest.pageSize=t,a.next=4,n.$store.dispatch("$_goalAdmin/getData");case 4:case"end":return a.stop()}}),a)})))()},handleCurrentChange:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){var n;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n=e,n.searchRequest.pageIndex=t,a.next=4,n.$store.dispatch("$_goalAdmin/getData");case 4:case"end":return a.stop()}}),a)})))()},submit:k.a.debounce(Object(i["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=this,t.prev=1,t.next=4,e.$store.dispatch("$_goalAdmin/editGoal",e.formData);case 4:return e.$notify({title:"Chúc mừng",message:"Cập nhật thành công",type:"success"}),t.next=7,e.$store.dispatch("$_goalAdmin/getData");case 7:e.dialogVisible=!1,t.next=13;break;case 10:t.prev=10,t.t0=t["catch"](1),e.$notify.error({title:"Thất bại",message:"Cập nhật thất bại"});case 13:case"end":return t.stop()}}),t,this,[[1,10]])}))),500)}},N=q,G=a("2877"),U=Object(G["a"])(N,o,c,!1,null,null,null),z=U.exports,M=a("7150"),V=a("267f"),H=a.n(V),Q=a("e67d"),B=a.n(Q),F={name:"replyAdmin",data:function(){return{target:!0,commonData:P["a"],opened:!1,lang:"vn",MainLogo:H.a}},components:{GoalAdmin:z,"side-menu-admin":r["a"],avatar:M["a"]},directives:{ClickOutside:B.a},methods:{openMenu:function(){this.target=!0},closeMenu:function(){this.target=!1},updateParentOpened:function(t){var e=this;e.opened=t},updateParentHideDropdown:function(t){var e=this;e.opened=t},handleChangeLang:function(t){var e=this;e.lang=t,this.$store.dispatch("setLang",e.lang)},logout:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t,e.next=3,a.$store.dispatch("$_loginPage/logout");case 3:a.user=null,a.$router.push("/login");case 5:case"end":return e.stop()}}),e)})))()},linkToUser:function(){var t=this;document.title="Hệ thống quản lý mục tiêu",t.$router.push("/checkIn")}}},J=F,Y=Object(G["a"])(J,n,s,!1,null,null,null);e["default"]=Y.exports},cb5a:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("nav",[a("ul",{staticClass:"sidebar-nav"},[t._l(t.routes,(function(e,n){return a("li",{key:n,staticClass:"nav-item"},[a("router-link",{attrs:{to:e.path,"exact-active-class":"active"}},["companyAdmin"==e.name?a("div",{staticClass:"nav-link-wrapper"},[a("div",{staticClass:"icon"},[a("font-awesome-icon",{attrs:{icon:["far","building"]}})],1),a("a",{staticClass:"nav-link"},[t._v(t._s(t.$t("nav.companyAdmin")))])]):t._e(),"checkInQuestionAdmin"==e.name?a("div",{staticClass:"nav-link-wrapper"},[a("div",{staticClass:"icon"},[a("font-awesome-icon",{attrs:{icon:["far","question-circle"]}})],1),a("a",{staticClass:"nav-link"},[t._v(t._s(t.$t("nav.checkInQuestionAdmin")))])]):t._e(),"cycleAdmin"==e.name?a("div",{staticClass:"nav-link-wrapper"},[a("div",{staticClass:"icon"},[a("font-awesome-icon",{attrs:{icon:["far","life-ring"]}})],1),a("a",{staticClass:"nav-link"},[t._v(t._s(t.$t("nav.cycleAdmin")))])]):t._e(),"departmentAdmin"==e.name?a("div",{staticClass:"nav-link-wrapper"},[a("div",{staticClass:"icon"},[a("font-awesome-icon",{attrs:{icon:["fa","users"]}})],1),a("a",{staticClass:"nav-link"},[t._v(t._s(t.$t("nav.departmentAdmin")))])]):t._e(),"positionAdmin"==e.name?a("div",{staticClass:"nav-link-wrapper"},[a("div",{staticClass:"icon"},[a("font-awesome-icon",{attrs:{icon:["far","building"]}})],1),a("a",{staticClass:"nav-link"},[t._v(t._s(t.$t("nav.positionAdmin")))])]):t._e(),"criteriaAdmin"==e.name?a("div",{staticClass:"nav-link-wrapper"},[a("div",{staticClass:"icon"},[a("font-awesome-icon",{attrs:{icon:["far","star"]}})],1),a("a",{staticClass:"nav-link"},[t._v(t._s(t.$t("nav.criteriaAdmin")))])]):t._e(),"employeeAdmin"==e.name?a("div",{staticClass:"nav-link-wrapper"},[a("div",{staticClass:"icon"},[a("font-awesome-icon",{attrs:{icon:["far","user"]}})],1),a("a",{staticClass:"nav-link"},[t._v(t._s(t.$t("nav.employeeAdmin")))])]):t._e(),"replyAdmin"==e.name?a("div",{staticClass:"nav-link-wrapper"},[a("div",{staticClass:"icon"},[a("font-awesome-icon",{attrs:{icon:["far","comment-dots"]}})],1),a("a",{staticClass:"nav-link"},[t._v(t._s(t.$t("nav.replyAdmin")))])]):t._e(),"goalAdmin"==e.name?a("div",{staticClass:"nav-link-wrapper"},[a("div",{staticClass:"icon"},[a("font-awesome-icon",{attrs:{icon:["fa","bullseye"]}})],1),a("a",{staticClass:"nav-link"},[t._v(t._s(t.$t("nav.goalAdmin")))])]):t._e()])],1)})),t.companyDetail&&t.companyDetail.logo?a("li",{staticClass:"nav-brand"},[a("div",{staticClass:"bg-logo-company",style:{backgroundImage:"url("+(t.companyDetail&&t.companyDetail.logo?t.companyDetail.logo:"")+")"}})]):t._e()],2)])])},s=[],i=a("5530"),r=a("2f62"),o=a("d046"),c={components:{},directives:{},data:function(){return{routes:o["a"]}},computed:Object(i["a"])({},Object(r["b"])({companyDetail:"$_loginPage/getCompanyDetail"})),created:function(){},methods:{redirectTo:function(t){t?this.$router.push(t):this.$router.go(-1)}}},l=c,u=a("2877"),d=Object(u["a"])(l,n,s,!1,null,"7972f2f0",null);e["a"]=d.exports},e01a:function(t,e,a){"use strict";var n=a("23e7"),s=a("83ab"),i=a("da84"),r=a("5135"),o=a("861d"),c=a("9bf2").f,l=a("e893"),u=i.Symbol;if(s&&"function"==typeof u&&(!("description"in u.prototype)||void 0!==u().description)){var d={},p=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof p?new u(t):void 0===t?u():u(t);return""===t&&(d[e]=!0),e};l(p,u);var m=p.prototype=u.prototype;m.constructor=p;var v=m.toString,g="Symbol(test)"==String(u("test")),f=/^Symbol\((.*)\)[^)]+$/;c(m,"description",{configurable:!0,get:function(){var t=o(this)?this.valueOf():this,e=v.call(t);if(r(d,t))return"";var a=g?e.slice(7,-1):e.replace(f,"$1");return""===a?void 0:a}}),n({global:!0,forced:!0},{Symbol:p})}}}]);
//# sourceMappingURL=chunk-d755b702.d68e8b60.js.map