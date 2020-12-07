<template>
  <div>
    <div class="main container-fluid">
      <div class="row mb-4">
        <div class="col-12 board-title">
          <font-awesome-icon :icon="['fas', 'user']" class="icon" />
          <div class="text">Bảng cá nhân</div>
        </div>
        <div class="col-md-3">
          <div class="card boardCreate" @click="createNewBoard">
            <div class="card-body">
              <div class="text-inside">
                <a class="btn btn-primary circle">
                  <font-awesome-icon :icon="['fas', 'plus']" />
                </a>
                Tạo bảng 
              </div>
            </div>
          </div>
        </div>
        <div v-for="(item, key) in boardList.myBoard" :key="key" class="col-md-3 mb-3">
          <router-link :to="`/boardDetail/${item.id}`">
            <div class="card boardCard" :style="{backgroundImage: `url(${item && item.backgroundColor ? require(`@/assets/landscapes/${item.backgroundColor}`) : ''})`}">
              <div class="card-body d-flex flex-column justify-content-between">
                <div class="d-flex justify-content-between">
                  <div class="text-inside">{{ item.title }}</div>
                  <font-awesome-icon :icon="['fas', 'lock']" v-if="item.visibility == 'private'" />
                  <font-awesome-icon :icon="['fas', 'globe-europe']" v-else />
                </div>
                <div class="d-flex justify-content-end">
                  <div class="avatar-circle board" v-for="(user, index) in item.userList" :key="index">
                    <div class="inside img-thumbnail" :style="{ backgroundImage: `url(${user && user.avatar ? user.avatar : ''})` }"></div>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-12 board-title">
          <font-awesome-icon :icon="['fas', 'users']" class="icon" />
          <div class="text">Bảng toàn công ty</div>
        </div>
        <div v-for="(item, key) in boardList.data" :key="key" class="col-md-3 mb-3">  
            <div class="card boardCard" :style="{backgroundImage: `url(${item && item.backgroundColor ? item.backgroundColor : ''})`}" @click="showMessage('noPermission')">
              <div class="card-body d-flex flex-column justify-content-between">
                <div class="d-flex justify-content-between">
                  <div class="text-inside">{{ item.title }}</div>
                  <font-awesome-icon :icon="['fas', 'lock']" v-if="item.visibility == 'private'" />
                  <font-awesome-icon :icon="['fas', 'globe-europe']" v-else />
                </div>
                <div class="d-flex justify-content-end">
                  <div class="avatar-circle board" v-for="(user, index) in item.userList" :key="index">
                    <div class="inside img-thumbnail" :style="{ backgroundImage: `url(${user && user.avatar ? user.avatar : ''})` }"></div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="Tạo bảng mới"
      :visible.sync="modalCreateBoard"
      class="transition-box-center"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div>
        <div class="form-group">
          <label class="control-label font-weight-bold">Tên bảng</label>
          <div class="mb-20">
            <input
              type="text"
              class="input-primary medium"
              placeholder="Nhập tên chu kỳ"
              v-model="formCreate.title"
            />
          </div>
        </div>
        <div class="form-group">
          <label class="control-label font-weight-bold">Chế độ</label>
          <div class="mb-20">
            <el-select
              v-model="formCreate.visibility"
              clearable
              placeholder="Chọn chế độ"
              class="w-100"
            >
              <el-option
                v-for="item in commonData.visibilityBoard"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              >
              </el-option>
            </el-select>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-primary btn-medium" @click="submit">
          Tạo bảng
        </button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import commonData from "../../utils/common-data/index";
import store from "./_store";
import _ from "lodash";
export default {
  components: {},
  data() {
    return {
      commonData,
      modalCreateBoard: false,
      formCreate: {
        title: "",
        adminId: "",
        companyId: "",
        visible: "public",
        participant: [],
        status: "new",
        isDelete: false,
      },
    };
  },
  computed: {
    ...mapState({
      searchRequest: (state) => state.$_board.searchRequest,
    }),
    ...mapGetters({
      boardList: "$_board/getData",
    }),
  },
  async created() {
    var _this = this;
    const STORE_KEY = "$_board";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      _this.$store.registerModule(STORE_KEY, store);
    }
    await _this.$store.dispatch("$_board/getUserList");
    await _this.$store.dispatch("$_board/getData");
  },
  methods: {
    showMessage(type){
      var _this = this;
      let message = "";
      let color = "success";
      switch(type){
        case "noPermission":
          color = "error";
          message = "Bạn không có quyền truy cập";
          break;
        default:
          break;
      }
      _this.$message({message: message, type: color});

    },
    redirectTo: function(path) {
      if (path) {
        this.$router.push(path);
      } else {
        this.$router.go(-1);
      }
    },
    createNewBoard() {
      var _this = this;
      _this.modalCreateBoard = true;
    },
    submit: _.debounce(async function() {
      var _this = this;
      try {
        _this.formCreate.adminId = localStorage.getItem("userId");
        _this.formCreate.participant.push(localStorage.getItem("userId"));
        _this.formCreate.participant = JSON.stringify(
          _this.formCreate.participant
        );
        _this.formCreate.participant = _this.formCreate.participant.replace(
          /"/g,
          "'"
        );
        await _this.$store.dispatch("$_board/editBoard", _this.formCreate);
        _this.$notify({
          title: "Chúc mừng",
          message: "Tạo thành công",
          type: "success",
        });
        await _this.$store.dispatch("$_board/getData");
        _this.modalCreateBoard = false;
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
