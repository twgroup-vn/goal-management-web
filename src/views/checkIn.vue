<template>
  <div>
    <nav-menu params="route: route"></nav-menu>
    <div class="container-fluid my-3">
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
    return {};
  },
  components: {
    CheckIn,
    "nav-menu": NavMenu
  },
  methods: {
  },
};
</script>
