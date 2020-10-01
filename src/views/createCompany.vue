<template>
  <div>
    <div class="container-fluid px-0">
      <CreateCompany />
    </div>
  </div>
</template>

<script>
import CreateCompany from "../modules/createCompany";
export default {
  name: "createCompany",
  data() {
    return {
      target: true,
    };
  },
  components: {
    CreateCompany,
  },
  methods: {
  },
};
</script>
