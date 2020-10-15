<template>
  <div>
    <nav-menu params="route: route"></nav-menu>
    <div>
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
      target: true,
    };
  },
  components: {
    Board,
    "nav-menu": NavMenu
  },
  methods: {
  },
};
</script>
