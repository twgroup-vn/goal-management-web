<template>
  <div>
    <nav-menu params="route: route" v-on:handle-theme="updateParentTheme"></nav-menu>
    <div :class="currentTheme">
      <CheckInCompany />
    </div>
  </div>
</template>

<script>
import NavMenu from "../components/nav-bar";
import CheckInCompany from "../modules/checkInCompany";
export default {
  name: "checkInUser",
  data() {
    return {
      currentTheme: localStorage.getItem("theme-color") ? localStorage.getItem("theme-color") : 'theme-light',
    };
  },
  components: {
    CheckInCompany,
    "nav-menu": NavMenu
  },
  methods: {
    updateParentTheme(val) {
      var _this = this;
      _this.currentTheme = val;
    },
  },
};
</script>
