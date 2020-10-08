<template>
  <div>
    <nav-menu params="route: route"></nav-menu>
    <div class="container-fluid my-3">
      <Conversation />
    </div>
  </div>
</template>

<script>
import NavMenu from "../components/nav-bar";
import Conversation from "../modules/conversation";
export default {
  name: "conversation",
  data() {
    return {};
  },
  components: {
    Conversation,
    "nav-menu": NavMenu
  },
  methods: {
  },
};
</script>
