<template>
  <div>
    <nav-menu params="route: route"></nav-menu>
    <div class="container-fluid my-3">
      <UserInfo />
    </div>
  </div>
</template>

<script>
import NavMenu from "../components/nav-bar";
import UserInfo from "../modules/userInfo";
export default {
  name: "userInfo",
  data() {
    return {};
  },
  components: {
    UserInfo,
    "nav-menu": NavMenu
  },
  methods: {
  },
};
</script>
