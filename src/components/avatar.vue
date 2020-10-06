<template>
    <div>
      <a href="javascript:;" class="d-flex align-items-center group-avatar" v-click-outside="hide" @click="toggle">
        <div class="avatar-circle original">
          <div v-if="!currentUser.avatar" class="avatar-without-img">{{convertName}}</div>
          <div v-else class="avatar-with-img" :style="{ backgroundImage: `url(${currentUser && currentUser.avatar ? currentUser.avatar : ''})` }"></div>
        </div>
        <div class="ml-2 mr-2">{{ currentUser && currentUser.fullName ? currentUser.fullName : '' }}</div>
        <font-awesome-icon :icon="['fas', 'chevron-down']" />
        <div class="dropdown-menu" :class="{ show : opened}">
          <div class="dropdown-item d-flex align-items-center justify-content-between">
            <div class="col-md-4 px-0">{{ $t("common.selectLang") }}:</div>
            <el-select v-model="lang" placeholder="Language" @change="handleChangeLang" class="col-md-8">
              <div v-if="lang == 'en'">
                <el-option v-for="(item, index) in commonData.optionLangEN" :key="index" :label="item.text" :value="item.value">
                  <div class="d-flex align-items-center">
                    <img class="logo-lang" :src="item.flag" />
                    <div class="ml-2">{{ item.text }}</div>
                  </div>
                </el-option>
              </div>
              <div v-else>
                <el-option v-for="(item, index) in commonData.optionLangVN" :key="index" :label="item.text" :value="item.value">
                  <div class="d-flex align-items-center">
                    <img class="logo-lang" :src="item.flag" />
                    <div class="ml-2">{{ item.text }}</div>
                  </div>
                </el-option>
              </div>
            </el-select>
          </div>
          <div class="dropdown-item d-flex align-items-center justify-content-between">
            <div class="col-md-4 px-0">{{ $t("common.theme") }}:</div>
            <el-select v-model="theme" placeholder="Theme" class="col-md-8">
              <el-option v-for="(item, index) in commonData.theme" :key="index" :label="item.text" :value="item.code">
                  <div class="d-flex align-items-center">
                    <div class="theme-info"></div>
                    <div class="ml-2">{{ item.text }}</div>
                  </div>
              </el-option>
            </el-select>
          </div>
          <div class="dropdown-item">
            <a href="javascript:;" @click="redirectTo(`/userInfo`)">Thông tin tài khoản</a>
          </div>
          <div class="dropdown-item">
            <a href="javascript:;" @click="redirectTo(`/admin/company`)">Quản trị thông tin</a>
          </div>
          <div class="dropdown-item">
            <a href="javascript:;" @click="logout">Đăng xuất</a>
          </div>
        </div>
      </a>
    </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import commonData from '../utils/common-data/index';
import ClickOutside from 'vue-click-outside'
// import _ from "lodash";
export default {
  data() {
    return {
      opened: false,
      lang: 'vn',
      theme: 'cyan',
      commonData,
      convertName: ''
    };
  },
  components: {
    
  },
  directives: {
    ClickOutside
  },
  async created() {
    var _this = this;
    if (localStorage.getItem("userId")) {
      await _this.$store.dispatch("$_loginPage/getCurrentUser", localStorage.getItem("userId"));
    }
    _this.convertName = _this.currentUser.fullName.split(" ").map(x => x[0]).join("").slice(-2);
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.$_loginPage.currentUser,
    }),
    ...mapGetters({
      // companyList: "$_loginPage/getCurrentUser",
    }),
  },
  methods: {
    redirectTo: function (path) {
      if (path) {
        this.$router.push(path);
      } else {
        this.$router.go(-1);
      }
    },
    toggle () {
      this.opened = !this.opened;
    },
    hide () {
      this.opened = false
    },
    handleChangeLang: function (val) {
      var _this = this;
      _this.lang = val
      this.$store.dispatch('setLang', _this.lang);
    },
    async logout() {
      var _this = this;
      await _this.$store.dispatch("$_loginPage/logout");
      _this.user = null;
      _this.$router.push("/login");
    },
  },
};
</script>