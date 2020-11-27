<template>
    <div>
      <a href="javascript:;" class="d-flex align-items-center group-avatar" v-click-outside="hideDropdown" @click="toggle">
        <div class="avatar-circle original">
          <div v-if="currentUser && !currentUser.avatar" class="avatar-without-img">{{convertName}}</div>
          <div v-else class="avatar-with-img" :style="{ backgroundImage: `url(${currentUser && currentUser.avatar ? currentUser.avatar : ''})` }"></div>
        </div>
        <div class="avatar-text ml-2 mr-2">{{ currentUser && currentUser.fullName ? currentUser.fullName : '' }}</div>
        <font-awesome-icon :icon="['fas', 'chevron-down']" class="avatar-icon"/>
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
      commonData,
      convertName: '',
      opened: false,
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
      var _this = this;
      _this.opened = !_this.opened;
      _this.$emit('toggle', _this.opened);
    },
    hideDropdown () {
      var _this = this;
      _this.opened = false;
      _this.$emit('hide-dropdown', _this.opened);
    },
  },
};
</script>