<template>
  <div>
    <nav-menu params="route: route" v-on:handle-theme="updateParentTheme"></nav-menu>
    <div :class="currentTheme">
      <Board />
    </div>
  </div>
</template>

<script>
import NavMenu from "../components/nav-bar";
import Board from "../modules/board";
export default {
  name: "createCompany",
  data() {
    return {
      currentTheme: localStorage.getItem("theme-color") ? localStorage.getItem("theme-color") : 'theme-light',
    };
  },
  components: {
    Board,
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
