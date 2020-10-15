<template>
  <div>
    <nav-menu params="route: route"></nav-menu>
    <div>
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
      target: true,
    };
  },
  components: {
    BoardDetail,
    "nav-menu": NavMenu
  },
  methods: {
  },
};
</script>
