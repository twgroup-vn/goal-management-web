<template>
  <div>
    <div class="general-container">
      <div class="form-container">
        <div class="wrapper">
          <h1 class="text-center">Create company</h1>
          <div class="form-group">
            <div v-if="!formData.logo">
              <div class="avatar-circle">
                <img class="img-fluid" :src="NoAvatar" />
                <div class="group-edit-avatar">
                  <font-awesome-icon :icon="['fas', 'pen-square']" />
                  <input type="file" class="avatar-input" name="file" id="file" @change="handleFileUpload" />
                </div>
              </div>
            </div>
            <div v-else>
              <div class="avatar-circle">
                <img class="img-fluid" :src="formData.logo" />
                <div class="group-edit-avatar">
                  <font-awesome-icon :icon="['fas', 'pen-square']" />
                  <input type="file" class="avatar-input" name="file" id="file" @change="handleFileUpload" />
                </div>
              </div>
            </div>
          </div>
          <div class="form-group">
            <input type="text" placeholder="Company name" class="input-primary" v-model="formData.name" />
          </div>
          <div class="form-group">
            <input type="text" placeholder="Company short name" class="input-primary" v-model="formData.shortName" />
          </div>
          <div class="form-group">
            <input type="text" placeholder="Company phone number" class="input-primary" v-model="formData.phoneNumber" />
          </div>
          <div class="form-group">
            <input type="text" placeholder="Company email" class="input-primary" v-model="formData.email" />
          </div>
          <button class="btn btn-primary btn-medium" @click="submit">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import NoAvatar from "../../assets/imgs/no-images.jpg";
import store from "./_store";
import _ from "lodash";
export default {
  components: {},
  data() {
    return {
      NoAvatar,
      formData: {
        logo: null,
        name: "",
        shortName: "",
        phoneNumber: "",
        email: "",
        userId: "",
        isDelete: false,
      },
      file: null,
      path: null,
    };
  },
  computed: {
    ...mapState({
      state: (state) => state.$_createCompany,
    }),
    ...mapGetters({
      // data: "$_createCompany/getData",
    }),
  },
  async created() {
    var _this = this;
    const STORE_KEY = "$_createCompany";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      _this.$store.registerModule(STORE_KEY, store);
    }
    try {
      // await _this.$store.dispatch("$_createCompany/createCompany");
    } catch (error) {
      console.log(error);
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
    async handleFileUpload(e) {
      var _this = this;
      this.file = e.target.files[0];
      if (_this.file) {
        var response = await this.$store.dispatch(
          "$_createCompany/uploadImage",
          _this.file
        );
        if (response && response.path) {
          _this.path = response.path;
          _this.formData.logo = _this.path;
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
        _this.formData.userId = localStorage.getItem("userId");
        console.log(_this.formData)
        await _this.$store.dispatch("$_createCompany/create", _this.formData);
        _this.$notify({
          title: "Chúc mừng",
          message: "Tạo thành công",
          type: "success",
        });
        _this.$router.push("/login");
      } catch (error) {
        _this.$notify.error({
          title: "Thất bại",
          message: "Tạo thất bại",
        });
      }
    }, 500),
  },
};
</script>


<style scoped>
</style>