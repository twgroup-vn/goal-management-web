<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light fixed-top" :class="currentTheme">
      <router-link class="navbar-brand" to="/">
        <img class="img-fluid" :src="MainLogo"/>
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" v-for="(route, index) in routes" :key="index">
          <router-link :to="route.path" exact-active-class="active">
            <div class="nav-link-wrapper" v-if="route.name =='checkIn'">
              <a class="nav-link">{{ $t("userNav.checkin") }}</a>
            </div>
            <div class="nav-link-wrapper" v-if="route.name =='checkInCompany'">
              <a class="nav-link">{{ $t("userNav.companyCheckin") }}</a>
            </div>
            <div class="nav-link-wrapper" v-if="route.name =='conversation'">
              <a class="nav-link">{{ $t("userNav.conversation") }}</a>
            </div>
            <div class="nav-link-wrapper" v-if="route.name =='board'">
              <a class="nav-link">{{ $t("userNav.board") }}</a>
            </div>
          </router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <div class="dropdown d-flex align-items-center mr-3">
            <a href="javascript:;" @click="openDropdownDirections">
              <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0,3A3,3,0,0,1,3,0H5A1,1,0,0,1,6,1V5A1,1,0,0,1,5,6H1A1,1,0,0,1,0,5Z" style="fill:#000"></path><rect x="9" width="6" height="6" rx="1" ry="1" style="fill:#000"></rect><rect x="18" width="6" height="6" rx="1" ry="1" style="fill:#000"></rect><rect y="9" width="6" height="6" rx="1" ry="1" style="fill:#000"></rect><rect x="9" y="9" width="6" height="6" rx="1" ry="1" style="fill:#000"></rect><rect x="18" y="9" width="6" height="6" rx="1" ry="1" style="fill:#000"></rect><rect y="18" width="6" height="6" rx="1" ry="1" style="fill:#000"></rect><rect x="9" y="18" width="6" height="6" rx="1" ry="1" style="fill:#000"></rect><rect x="18" y="18" width="6" height="6" rx="1" ry="1" style="fill:#000"></rect></svg>
            </a>
            <div class="dropdown-menu max-content" :class="{ show : dropdownDirections}">
              <div v-for="(modules, index) in modulesList" :key="index">
                <a class="dropdown-item" :href="modules.DuongDanTruyCap">
                  <img :src="modules.Icon"/>
                  <span class="ml-2">{{ modules.Ten }}</span>
                </a>
              </div>
            </div>
          </div>
          <avatar v-on:toggle="updateParentOpened" v-on:hide-dropdown="updateParentHideDropdown"></avatar>
          <div class="position-relative">
            <div class="dropdown-menu" :class="{ show : opened}">
                <div class="dropdown-item d-flex align-items-center justify-content-between">
                  <div class="col-md-4 px-0">{{ $t("common.selectLang") }}:</div>
                  <el-select v-model="$i18n.locale" placeholder="Language" @change="handleChangeLang" class="col-md-8">
                    <div v-if="$i18n.locale == 'en'">
                      <el-option v-for="(item, index) in commonData.optionLangEN" :key="index" :label="item.text" :value="item.value">
                        <div class="d-flex align-items-center">
                          <img class="logo-lang" :src="item.flag" />
                          <div class="ml-2">{{ item.text }}</div>
                        </div>
                      </el-option>
                    </div>
                    <div v-else>
                      <el-option v-for="(item, index) in commonData.optionLangVN" :key="index" :label="item.text" :value="item.value">
                        <div class="d-flex align-items-center">
                          <img class="logo-lang" :src="item.flag" />
                          <div class="ml-2">{{ item.text }}</div>
                        </div>
                      </el-option>
                    </div>
                  </el-select>
                </div>
                <div class="dropdown-item d-flex align-items-center justify-content-between">
                  <div class="col-md-4 px-0">{{ $t("common.theme") }}:</div>
                  <div class="col-md-8">
                    <div class="custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" id="switch" :checked="currentTheme == 'theme-dark'" @change="handleTheme()">
                      <label class="custom-control-label" for="switch"></label>
                    </div>
                  </div>
                </div>
                <div class="dropdown-item">
                  <a href="javascript:;" @click="redirectTo(`/userInfo`)" class="d-block">{{ $t("common.accountInfo") }}</a>
                </div>
                <div class="dropdown-item" v-if="currentUser.isAdmin">
                  <a href="javascript:;" @click="linkToAdmin" class="d-block">{{ $t("common.infoManagement") }}</a>
                </div>
                <div class="dropdown-item">
                  <a href="javascript:;" class="d-block" @click="logout">{{ $t("common.logout") }}</a>
                </div>
            </div>
          </div>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { routes } from '../router/routes';
import { mapState, mapGetters } from "vuex";
import commonData from '../utils/common-data/index';
import Avatar from "../components/avatar";
import MainLogo from '../assets/svgs/mainLogo/TWG.svg';
import ClickOutside from 'vue-click-outside';
import _ from "lodash";
export default {
  components: {
    'avatar': Avatar
  },
  directives: {ClickOutside},
  data() {
    return {
      routes,
      commonData,
      MainLogo,
      connection: null,
      pathname: '',
      opened: false,
      lang: localStorage.getItem("lang") ? localStorage.getItem("lang") : 'vn',
      currentTheme: localStorage.getItem("theme-color") ? localStorage.getItem("theme-color") : 'theme-light',
      modulesList: null,
      dropdownDirections: false,
    };
  },
  created() {
    var _this = this;
    _this.pathname = window.location.pathname;
    _this.listeningSocket();
    if(localStorage.getItem('modules')){
      _this.modulesList = _.cloneDeep(JSON.parse(localStorage.getItem('modules')));
      _this.modulesList = _this.modulesList.filter(x => x.Ten != 'Quản lý mục tiêu')
    }
    console.log(_this.modulesList)
  },
  mounted(){
    var _this = this;
    var body = document.body;
    if(_this.currentTheme == 'theme-dark'){
      body.classList.add("theme-dark");
    }else{
      body.classList.remove("theme-dark");
    }
  },
  computed: {
      ...mapState({
        modules: (state) => state.$_loginPage.modules,
      }),
      ...mapGetters({
        currentUser: "$_loginPage/getCurrentUser",
      }),
  },
  methods: {
    openDropdownDirections(){
      var _this = this;
      _this.dropdownDirections = ! _this.dropdownDirections;
    },
    updateParentOpened(val) {
      var _this = this;
      _this.opened = val;
    },
    updateParentHideDropdown(val) {
      var _this = this;
      _this.opened = val;
    },
    handleChangeLang: function (val) {
      var _this = this;
      _this.lang = val;
      localStorage.setItem("lang", _this.lang);
      this.$store.dispatch('setLang', _this.lang);
    },
    handleTheme(){
      var _this = this;
      var storedTheme = localStorage.getItem("theme-color");
      var body = document.body;
      if(storedTheme === "theme-dark"){
        localStorage.setItem("theme-color", "theme-light");
        _this.currentTheme = localStorage.getItem("theme-color");
        body.classList.remove("theme-dark");
      }else{
        localStorage.setItem("theme-color", "theme-dark");
        _this.currentTheme = localStorage.getItem("theme-color");
        body.classList.add("theme-dark");
      }
      _this.$emit('handle-theme', _this.currentTheme);
    },
    listeningSocket(){
      var _this = this;
      const signalR = require("@aspnet/signalr");
      _this.connection = new signalR.HubConnectionBuilder().withUrl(`${process.env.VUE_APP_API_ROOT}/chatHub`).build();
      _this.connection.start().then(() => {
        _this.connection.on("ReceiveMessage", async function (user, message, func, params, type) {
          switch(type){
            case "sendTextMessage":
                if (_this.pathname.includes(`conversation`) && _this.currentUser.id === user) {
                  await _this.$store.dispatch(func, params);
                  await _this.$store.dispatch("$_conversation/getListConversation");
                }
              break;
            case "moveCard":
              if(_this.pathname.includes(`boardDetail/${params}`) && _this.currentUser.id !== user){
                  await _this.$store.dispatch(func, params);
              }
              break;
            default:
              break;
          }
        });
      });    
    },
    redirectTo: function (path) {
      if (path) {
        this.$router.push(path);
      } else {
        this.$router.go(-1);
      }
    },
    linkToAdmin(){
      var _this = this;
      var body = document.body;
      body.classList.remove("theme-dark");
      _this.$router.push("/admin/company");
      document.title = "Quản trị - Hệ thống quản lý mục tiêu"
    },
    async logout() {
      var _this = this;
      await _this.$store.dispatch("$_loginPage/logout");
      _this.user = null;
      document.body.classList.remove("theme-dark");
    },
  },
};
</script>

<style scoped>
  .max-content{
    min-width: max-content;
  }
</style>