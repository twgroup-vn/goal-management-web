<template>
  <div>
    <el-select v-model="lang" placeholder="Language" @change="handleChangeLang" style="width: 120px" class="ml-2">
      <div v-if="lang == 'en'">
        <el-option
          v-for="(item, index) in commonData.optionLangEN"
          :key="index"
          :label="item.text"
          :value="item.value"
        >
          <div class="d-flex align-items-center">
            <img class="logo-lang" :src="item.flag" />
            <div class="ml-2">{{ item.text }}</div>
          </div>
        </el-option>
      </div>
      <div v-else>
        <el-option
          v-for="(item, index) in commonData.optionLangVN"
          :key="index"
          :label="item.text"
          :value="item.value"
        >
          <div class="d-flex align-items-center">
            <img class="logo-lang" :src="item.flag" />
            <div class="ml-2">{{ item.text }}</div>
          </div>
        </el-option>
      </div>
    </el-select>
  </div>
</template>

<script>
import commonData from "../utils/common-data/index";
export default {
  components: {},
  directives: {},
  data() {
    return {
      commonData,
      lang: "vn",
    };
  },
  computed: {},
  created() {},
  methods: {
    redirectTo: function (path) {
      if (path) {
        this.$router.push(path);
      } else {
        this.$router.go(-1);
      }
    },
    handleChangeLang: function (val) {
      var _this = this;
      _this.lang = val;
      this.$store.dispatch("setLang", _this.lang);
    },
  },
};
</script>

<style scoped>
</style>