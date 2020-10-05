<template>
  <div>
    <div class="row white-background">
      <div class="col-md-4">
        <div class="form-group mb-0">
          <div class="avatar-circle square">
              <div class="logo">
                <img class="img-fluid" :src="NoAvatar" v-if="!formData.avatar"/>
                <img class="img-fluid" :src="formData.avatar" v-else/>
              </div>
              <div class="group-edit-avatar">
                <font-awesome-icon :icon="['fas', 'pen-square']" />
                <input
                  type="file"
                  class="avatar-input"
                  name="file"
                  id="file"
                  @change="handleFileUpload"
                />
              </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="group-company-detail">
          <div class="form-row">
            <div class="form-group col-md-12">
              <label for="inputUserName">User Name</label>
              <input
                type="text"
                class="input-primary"
                id="inputUserName"
                v-model="formData.username"
                readonly
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputName">Name</label>
              <input
                type="text"
                class="input-primary"
                id="inputName"
                v-model="formData.fullName"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputShortName">Password</label>
              <input
                type="text"
                class="input-primary"
                id="inputShortName"
                v-model="formData.password"
              />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group col-md-6">
              <label for="inputCompanyName">Email:</label>
              <input
                type="email"
                class="input-primary"
                id="inputCompanyName"
                v-model="formData.email"
              />
            </div>
            <div class="form-group col-md-6">
              <label for="inputPassword">Phone number</label>
              <input
                type="text"
                class="input-primary"
                id="inputPassword"
                v-model="formData.phoneNumber"
              />
            </div>
          </div>
          <div>
            <button class="btn btn-primary" @click="submit">Submit</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import store from "./_store";
import NoAvatar from "../../assets/imgs/no-images.jpg";
import _ from 'lodash';
export default {
  components: {},
  data() {
    return {
      NoAvatar,
      formData: {
        avatar: null,
        username: "",
        fullName: "",
        password: "",
        email: "",
        phoneNumber: "",
      },
      file: null,
      path: null,
    };
  },
  computed: {
    ...mapState({
      // currentUser: (state) => state.$_loginPage.currentUser,
    }),
    ...mapGetters({
      currentUser: "$_loginPage/getCurrentUser",
    }),
  },
  async created() {
    var _this = this;
    const STORE_KEY = "$_userInfo";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      _this.$store.registerModule(STORE_KEY, store);
    }
    if (localStorage.getItem("userId")) {
      await _this.$store.dispatch("$_loginPage/getCurrentUser", localStorage.getItem("userId"));
    }
    try {
      _this.formData = _.cloneDeep(_this.currentUser);
    } catch (error) {
      console.log(error);
    }
  },
  methods: {
    async handleFileUpload(e) {
      var _this = this;
      _this.file = e.target.files[0];
      if (_this.file) {
        var response = await this.$store.dispatch(
          "$_userInfo/uploadImage",
          _this.file
        );
        if (response && response.path) {
          _this.path = response.path;
          _this.formData.avatar = _this.path;
        }
      } else {
        this.$notify.error({
          title: "Thất bại",
          message: "Ảnh k đúng định dạng",
        });
      }
    },
    submit: _.debounce(async function () {
      var _this = this;
      try {
        _this.dialogVisible = true;
        if(_this.currentUser.id){
          await _this.$store.dispatch("$_userInfo/editUser", _this.formData);
        }
        _this.$notify({
          title: "Chúc mừng",
          message: "Cập nhật thành công",
          type: "success",
        });
      } catch (error) {
        _this.$notify.error({
          title: "Thất bại",
          message: "Cập nhật thất bại",
        });
      }
    }, 500),
  },
};
</script>
