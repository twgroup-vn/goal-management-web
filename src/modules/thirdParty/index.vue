<template>
  <div>
    <div class="wrapper">
      <div class="box">
        <div class="text-center">
          <img class="main-logo mb-3" :src="MainLogo"/>
          <div class="title mb-2" v-if="!loading">
            Sync dữ liệu nhân viên từ cổng HR 
          </div>
          <div class="mt-3" v-if="!showButtonSync">
            <input type="password" class="input-primary small" placeholder="Nhập mật khẩu" v-model="password" />
            <button class="btn btn-primary btn-small mt-3" @click="login">
                Đăng nhập
            </button>
          </div>
          <div class="mt-3" v-if="showButtonSync">
            <button class="btn btn-primary btn-small mt-3" v-if="!loading" @click="syncData">
                Bắt đầu tiến trình
            </button>
            <div class="spinner-loading" v-if="loading">
              <font-awesome-icon :icon="['fas', 'spinner']" class="icon-loading" /> 
              <div class="mt-2">Vui lòng đợi trong giây lát</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import MainLogo from '@/assets/svgs/mainLogo/TWG.svg';
import "./assets/css/styles.scss";
import store from "./_store";
export default {
  components: {
  },
  data() {
    return {
      password: "",
      MainLogo,
      showButtonSync: false,
      loading: false,
    };
  },
  computed: {
    ...mapState({
    }),
    ...mapGetters({
    }),
  },
  created() {
    var _this = this;
    const STORE_KEY = "$_thirdParty";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      _this.$store.registerModule(STORE_KEY, store);
    }
  },
  methods: {
    login(){
      var _this = this;
      if(_this.password%4===0){
        _this.showButtonSync = true;
        _this.showNotify( "Đăng nhập thành công !" , "success" );
      }
      else{
        _this.showButtonSync = false;
        _this.showNotify( "Đăng nhập thất bại" , "error" );
      }
    },
    showNotify( message, status){
      var _this = this;
      switch(status){
        case "success":
          _this.$message({message: message,type: status});
          break;
        case "error":
          _this.$message.error(message);
          break;
        default:
          break;
      }   
    },
    async syncData(){
      var _this = this;
      try {
        _this.loading = true;
        await _this.$store.dispatch("$_thirdParty/syncDataFromHR");
        _this.loading = false;
        _this.showNotify( "Sync dữ liệu thành công" , "success" );
      }
      catch {
        _this.showNotify( "Lỗi hệ thống" , "error" );
      }     
    } 
  },
};
</script>