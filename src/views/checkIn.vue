<template>
  <div>
    <nav-menu params="route: route" v-on:handle-theme="updateParentTheme"></nav-menu>
    <div :class="currentTheme">
      <CheckIn />
    </div>
  </div>
</template>

<script>
import NavMenu from "../components/nav-bar";
import CheckIn from "../modules/checkIn";
export default {
  name: "checkInUser",
  data() {
    return {
      currentTheme: localStorage.getItem("theme-color") ? localStorage.getItem("theme-color") : 'theme-light',
    };
  },
  components: {
    CheckIn,
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
