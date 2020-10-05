<template>
<div>
  <div>
    <div class="row justify-content-between align-items-center mb-3">
      <div class="col-md-6">
        <div class="row align-items-center">
          <div class="col-md-8">
            <input class="input-primary" placeholder="Tìm kiếm" v-model="description" />  
          </div>
          <div class="col-md-4">
            <button class="btn btn-secondary btn-medium" @click="handleSearch">Tìm kiếm</button>
          </div>
        </div>
      </div>
      <div class="col-md-6 text-right">
        <button class="btn btn-primary btn-medium" @click="addNew">Thêm mới</button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <table class="table table-hover">
        <thead class="thead-light">
          <tr>
            <th>
              <el-checkbox v-model="isCheckAll"></el-checkbox>
            </th>
              <template v-for="(item, props, index) in headers">
                <th :key="index" scope="col">{{$t('checkInQuestionAdmin.'+props)}}</th>
              </template>
          </tr>
          </thead>
          <tbody>
            <tr class="break-word" v-for="(item , i) in data.data" :key="i">
              <td>
                <el-checkbox :value="item.id" v-model="ids"></el-checkbox>
              </td>
              <td>{{item.question}}</td>
              <td>{{item.orderNo}}</td>
              <td>
                <div class="d-flex justify-content-end">
                  <font-awesome-icon :icon="['fas', 'edit']" @click="openDiaLog(item)" class="mr-3"/>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <el-pagination class="text-right" 
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="searchRequest.pageIndex" 
          layout="sizes, prev, pager, next , jumper"
          :page-sizes="[5, 10, 20]" 
          :total="data.total">
        </el-pagination>
      </div>
    </div>
  </div>
  <div>
    <el-dialog title="Câu hỏi check-in" class="transition-box-center" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <div>
        <div class="form-group">
          <label class="control-label font-weight-bold">Câu hỏi</label>
          <div class="mb-20">
            <input type="text" class="input-primary" placeholder="Nhập câu hỏi" v-model="formData.question" />
          </div>
        </div>
        <div class="form-group mt-3">
          <label class="control-label font-weight-bold">Số thự tự</label>
          <div class="mb-20">
            <input type="number" class="input-primary" placeholder="Nhập số thự tự"  v-model="formData.orderNo" />
          </div>
        </div>       
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-primary btn-medium mr-3" @click="dialogVisible = false">Hủy</button>
        <button class="btn btn-primary btn-medium" @click="submit">Đồng ý</button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import store from "./_store";
import _ from 'lodash';
export default {
  components: {},
  data() {
    return {
      ids: [],
      isCheckAll: false,
      dialogVisible: false,
      description: '',
      formData: {
        question: '',
        orderNo: 0,
        isDelete: false,
      }
    };
  },
  computed: {
    ...mapState({
      headers: state => state.$_checkInQuestionAdmin.headers,
      searchRequest: state => state.$_checkInQuestionAdmin.searchRequest,
    }),
    ...mapGetters({
        data: "$_checkInQuestionAdmin/getData",
    }),
  },
  watch: {
    isCheckAll: function (val) {
      var _this = this;
      _this.ids = val ? _.map(_this.data.data, o => { return o.id; }) : [];
    }
  },  
  async created() {
    var _this = this;
    const STORE_KEY = "$_checkInQuestionAdmin";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      _this.$store.registerModule(STORE_KEY, store);
    }
    await _this.$store.dispatch("$_checkInQuestionAdmin/getData");
  },
  methods: {
    async handleSearch(){
      var _this = this;
      _this.searchRequest.description = _this.description;
      await _this.$store.dispatch("$_checkInQuestionAdmin/getData");
    },
    openDiaLog(item){
      var _this = this;
      _this.formData = _.cloneDeep(item);
      _this.dialogVisible = true;
    },
    addNew(){
      var _this = this;
      _this.formData = {
        question: '',
        orderNo: 0,
        isDelete: false,
      }
      _this.dialogVisible = true;
    },
    async handleSizeChange(val) {
      var _this = this;
      _this.searchRequest.pageSize = val;
      await _this.$store.dispatch("$_checkInQuestionAdmin/getData");
    },
    async handleCurrentChange(val) {
      var _this = this;
      _this.searchRequest.pageIndex = val;
      await _this.$store.dispatch("$_checkInQuestionAdmin/getData");
    },
    submit: _.debounce(async function () {
      var _this = this;
      try {
        _this.formData.orderNo = parseInt(_this.formData.orderNo);
        await _this.$store.dispatch("$_checkInQuestionAdmin/editQuestion", _this.formData);
        _this.$notify({
          title: "Chúc mừng",
          message: "Đăng nhập thành công",
          type: "success",
        });
        await _this.$store.dispatch("$_checkInQuestionAdmin/getData");
        _this.dialogVisible = false;
      } catch (error) {
        _this.$notify.error({
          title: "Thất bại",
          message: "Đăng nhập thất bại",
        });
      }
    }, 500),    
  },
};
</script>
