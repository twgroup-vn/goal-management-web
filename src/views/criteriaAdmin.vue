<template>
  <div>
    <div class="container-fluid px-0">
      <side-menu-admin class="side-nav" params="route: route" v-bind:class="{active: target}"></side-menu-admin>
      <header class="main-header" v-bind:class="{active: target}">
        <div class="d-flex align-items-center">
          <a class="open-menu" @click="openMenu" v-bind:class="{active: target}">
            <font-awesome-icon :icon="['fas', 'bars']" />
          </a>
          <a class="close-menu" @click="closeMenu" v-bind:class="{active: target}">
            <font-awesome-icon :icon="['fas', 'bars']" />
          </a>
          <a href="javascript:;" class="logo-brand" @click="linkToUser()">
            <img class="img-fluid" :src="MainLogo"/>
          </a>
        </div>
        <div class="d-flex align-items-center">
          <div class="noti-group d-none">
            <font-awesome-icon :icon="['far', 'bell']" class="icon mr-3" />
            <div class="noti-number">2</div>
          </div>
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
        </div>
      </header>
      <div class="page-wrap" v-bind:class="{active: target}">
        <div class="main-body">
          <CriteriaAdmin />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenuAdmin from "../components/side-bar-admin";
import CriteriaAdmin from "../modules/criteriaAdmin";
import Avatar from "../components/avatar";
import MainLogo from '../assets/svgs/mainLogo/TWG.svg';
import ClickOutside from 'vue-click-outside';
import commonData from '../utils/common-data/index';
export default {
  name: "criteriaAdmin",
  data() {
    return {
      target: true,
      MainLogo,
      commonData,
      opened: false,
      lang: 'vn',
    };
  },
  components: {
    CriteriaAdmin,
    "side-menu-admin": SideMenuAdmin,
    avatar: Avatar,
  },
  directives: {ClickOutside},
  methods: {
    redirectTo: function (path) {
      if (path) {
        this.$router.push(path);
      } else {
        this.$router.go(-1);
      }
    },
    openMenu: function () {
      this.target = true;
    },
    closeMenu: function () {
      this.target = false;
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
      _this.lang = val
      this.$store.dispatch('setLang', _this.lang);
    },
    async logout() {
      var _this = this;
      await _this.$store.dispatch("$_loginPage/logout");
      _this.user = null;
      _this.$router.push("/login");
    },
    linkToUser(){
      var _this = this;
      document.title = "Hệ thống quản lý mục tiêu"
      _this.$router.push("/checkIn");
    }
  },
};
</script>
