<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light">
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
          </router-link>
          </li>
        </ul>
        <ul class="navbar-nav ml-auto">
          <avatar></avatar>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import { routes } from '../router/routes'
import commonData from '../utils/common-data/index';
import Avatar from "../components/avatar"
import MainLogo from '../assets/svgs/mainLogo/TWG-white.svg'
export default {
  components: {
    'avatar': Avatar
  },
  directives: {},
  data() {
    return {
      routes,
      commonData,
      MainLogo
    };
  },
  created() {
  },
  computed: {
  },
  methods: {
    redirectTo: function (path) {
      if (path) {
        this.$router.push(path);
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style scoped>
</style>