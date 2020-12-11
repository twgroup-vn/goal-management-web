<template>
  <div>
    <nav-menu params="route: route" v-on:handle-theme="updateParentTheme" class="board-detail-nav"></nav-menu>
    <div :class="currentTheme" class="page-content">
      <BoardDetail />
    </div>
  </div>
</template>

<script>
import NavMenu from "../components/nav-bar";
import BoardDetail from "../modules/boardDetail";
export default {
  name: "boardDetail",
  data() {
    return {
      currentTheme: localStorage.getItem("theme-color") ? localStorage.getItem("theme-color") : 'theme-light',
    };
  },
  components: {
    BoardDetail,
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
