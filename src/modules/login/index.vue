<template>
  <div>
    <div class="authen-container" id="container">
      <div class="form-container log-in-container">
        <div class="wrapper" v-if="currentUser || user">
          <div class="mb-3">
            <div class="avatar-circle mb-3">
              <img class="img-fluid" :src="NoAvatar" />
            </div>
            <div class="name-login">{{currentUser && currentUser.fullName ? currentUser.fullName : ''}}</div>
            <div class="email-login">{{currentUser && currentUser.email ? currentUser.email: ''}}</div>
          </div>
          <button class="btn btn-primary" @click="logout">Log out</button>
        </div>
        <div class="wrapper" v-else>
          <h1>Login</h1>
          <div class="form-group w-100">
            <input class="input-primary" type="email" placeholder="Email" v-model="formData.Username" />
          </div>
          <div class="form-group w-100">
            <input class="input-primary" type="password" placeholder="Password" v-model="formData.Password" />
          </div>
          <button class="btn btn-primary" @click="submit">Log In</button>
        </div>
      </div>
      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-right">
            <h1>Welcome User</h1>
            <a
              href="javascript:;"
              @click="redirectTo('/createCompany')"
              class="text-white"
            >Create company</a>
            <hr />
            <div class="form-group">
              <div>Select your company</div>
              <div class="my-2">
                <el-select v-model="company" placeholder="Select">
                  <el-option
                    v-for="item in companyList"
                    :key="item.companyId"
                    :label="item.name"
                    :value="item.companyId"
                  ></el-option>
                </el-select>
              </div>
              <a href="javascript:;" class="btn btn-point-click" @click="chooseCompany">
                <div class="mr-2">Getting started</div>
                <font-awesome-icon :icon="['far', 'hand-point-right']" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapState, mapGetters } from "vuex";
import NoAvatar from "../../assets/imgs/no-images.jpg";
export default {
  components: {},
  data() {
    return {
      NoAvatar,
      formData: {
        Username: "",
        Password: "",
      },
      company: "",
      user: null,
    };
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.$_loginPage.currentUser,
    }),
    ...mapGetters({
      companyList: "$_loginPage/getCompanyOfUser",
    }),
  },
  async created() {
    var _this = this;
    if (localStorage.getItem("userId")) {
      _this.user = localStorage.getItem("userId");
      await _this.$store.dispatch("$_loginPage/getCompanyOfUser", _this.user);
    }
  },
  methods: {
    redirectTo: function (path) {
      if (path) {
        this.$router.push(path);
      } else {
        this.$router.go(-1);
      }
    },
    submit: _.debounce(async function () {
      var _this = this;
      try {
        await _this.$store.dispatch("$_loginPage/login", _this.formData);
        _this.$notify({
          title: "Chúc mừng",
          message: "Đăng nhập thành công",
          type: "success",
        });
        await _this.$store.dispatch("$_loginPage/getCompanyOfUser", localStorage.getItem("userId"));
      } catch (error) {
        _this.$notify.error({
          title: "Thất bại",
          message: "Đăng nhập thất bại",
        });
      }
    }, 500),
    async chooseCompany() {
      var _this = this;
      await _this.$store.dispatch("$_loginPage/chooseCompany", _this.company);
      _this.$router.push("/checkIn");
    },
    async logout() {
      var _this = this;
      await _this.$store.dispatch("$_loginPage/logout");
      _this.user = null;
    },
  },
};
</script>
