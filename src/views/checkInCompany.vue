<template>
  <div>
    <nav-menu params="route: route"></nav-menu>
    <div class="container-fluid my-3">
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
    return {};
  },
  components: {
    CheckInCompany,
    "nav-menu": NavMenu
  },
  methods: {
  },
};
</script>
