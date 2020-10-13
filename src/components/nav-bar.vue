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
          <avatar></avatar>
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
export default {
  components: {
    'avatar': Avatar
  },
  directives: {},
  data() {
    return {
      routes,
      commonData,
      MainLogo,
      connection: null,
      pathname: '',
    };
  },
  created() {
    var _this = this;
    _this.pathname = window.location.pathname;
    _this.listeningSocket();
  },
  computed: {
      ...mapGetters({
        currentUser: "$_loginPage/getCurrentUser",
      }),
  },
  methods: {
    listeningSocket(){
      var _this = this;
      const signalR = require("@aspnet/signalr");
      _this.connection = new signalR.HubConnectionBuilder().withUrl("http://localhost:5000/chatHub").build();
      _this.connection.start().then(() => {
        _this.connection.on("ReceiveMessage", async function (user, message, func, params, type) {
          switch(type){
            case "sendTextMessage":
                if (_this.pathname.includes(`conversation`) && _this.currentUser.id === user) {
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
  },
};
</script>

<style scoped>
</style>