<template>
  <div>
    <div class="row">
      <div class="col-md-4">
        <div class="form-group">
          <div class="avatar-circle square">
              <div class="logo">
                <img class="img-fluid" :src="NoAvatar" v-if="!formData.logo"/>
                <img class="img-fluid" :src="formData.logo" v-else/>
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
      <div class="col-md-8 group-company-detail">
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputName">Name</label>
            <input
              type="text"
              class="input-primary medium"
              id="inputName"
              v-model="formData.name"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputShortName">Short name</label>
            <input
              type="text"
              class="input-primary medium"
              id="inputShortName"
              v-model="formData.shortName"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group col-md-6">
            <label for="inputCompanyName">Email:</label>
            <input
              type="email"
              class="input-primary medium"
              id="inputCompanyName"
              v-model="formData.email"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="inputPassword">Phone number</label>
            <input
              type="text"
              class="input-primary medium"
              id="inputPassword"
              v-model="formData.phoneNumber"
            />
          </div>
        </div>
        <div>
          <button class="btn btn-primary btn-medium" @click="submit">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import store from "./_store";
import NoAvatar from "../../assets/imgs/no-images.jpg";
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
        email: "",
        phoneNumber: "",
      },
      file: null,
      path: null,
    };
  },
  computed: {
    ...mapState({
      state: (state) => state.$_companyAdmin,
    }),
    ...mapGetters({
      companyDetail: "$_loginPage/getCompanyDetail",
    }),
  },
  async created() {
    var _this = this;
    const STORE_KEY = "$_companyAdmin";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      _this.$store.registerModule(STORE_KEY, store);
    }
    try {
      // await _this.$store.dispatch("$_companyAdmin/getData");
      _this.formData = _.cloneDeep(_this.companyDetail);
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
          "$_companyAdmin/uploadImage",
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
        _this.dialogVisible = true;
        if(_this.companyDetail.id){
          await _this.$store.dispatch("$_companyAdmin/editCompany", _this.formData);
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


<style scoped>
</style>