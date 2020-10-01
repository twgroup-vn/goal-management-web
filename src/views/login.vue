<template>
  <div>
    <div class="container-fluid px-0">
      <Login />
    </div>
  </div>
</template>

<script>
import Login from "../modules/login";
export default {
  name: "checkinUser",
  data() {
    return {
      target: true,
    };
  },
  components: {
    Login,
  },
  methods: {
  },
};
</script>
