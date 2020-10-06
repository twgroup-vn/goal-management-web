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
          <router-link class="logo-brand" to="/">
            <img class="img-fluid" :src="MainLogo"/>
          </router-link>
        </div>
        <div class="d-flex align-items-center">
          <div class="noti-bell d-none">
            <font-awesome-icon :icon="['far', 'bell']" class="icon mr-3" />
            <div class="noti-number">2</div>
          </div>
          <avatar></avatar>
        </div>
      </header>
      <div class="page-wrap" v-bind:class="{active: target}">
        <div class="main-body">
          <DashBoardAdmin />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideMenuAdmin from "../components/side-bar-admin";
import DashBoardAdmin from "../modules/dashboardAdmin";
import Avatar from "../components/avatar";
import MainLogo from '../assets/svgs/mainLogo/TWG-white.svg'
export default {
  name: "dashBoarduser",
  data() {
    return {
      target: true,
      MainLogo
    };
  },
  components: {
    DashBoardAdmin,
    "side-menu-admin": SideMenuAdmin,
    avatar: Avatar,
  },
  methods: {
    openMenu: function () {
      this.target = true;
    },
    closeMenu: function () {
      this.target = false;
    },
  },
};
</script>
