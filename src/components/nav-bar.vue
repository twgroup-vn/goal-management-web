<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light" :class="currentTheme">
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
          <avatar v-on:toggle="updateParentOpened" v-on:hide-dropdown="updateParentHideDropdown"></avatar>
          <div class="position-relative">
            <div class="dropdown-menu" :class="{ show : opened}">
                <div class="dropdown-item d-flex align-items-center justify-content-between">
                  <div class="col-md-4 px-0">{{ $t("common.selectLang") }}:</div>
                  <el-select v-model="lang" placeholder="Language" @change="handleChangeLang" class="col-md-8">
                    <div v-if="lang == 'en'">
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
                  <a href="javascript:;" @click="redirectTo(`/userInfo`)" class="d-block">Thông tin tài khoản</a>
                </div>
                <div class="dropdown-item">
                  <a href="javascript:;" @click="redirectTo(`/admin/company`)" class="d-block">Quản trị thông tin</a>
                </div>
                <div class="dropdown-item">
                  <a href="javascript:;" class="d-block" @click="logout">Đăng xuất</a>
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
import { mapGetters } from "vuex";
import commonData from '../utils/common-data/index';
import Avatar from "../components/avatar"
import MainLogo from '../assets/svgs/mainLogo/TWG.svg'
import ClickOutside from 'vue-click-outside'
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
      lang: 'vn',
      currentTheme: localStorage.getItem("theme-color") ? localStorage.getItem("theme-color") : 'theme-light'
    };
  },
  created() {
    var _this = this;
    _this.pathname = window.location.pathname;
    _this.listeningSocket();
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
      ...mapGetters({
        currentUser: "$_loginPage/getCurrentUser",
      }),
  },
  methods: {
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
      _this.lang = val
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
    async logout() {
      var _this = this;
      await _this.$store.dispatch("$_loginPage/logout");
      _this.user = null;
      _this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
</style>