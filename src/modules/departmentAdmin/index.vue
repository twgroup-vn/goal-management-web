<template>
<div>
  <div>
    <div class="row justify-content-between align-items-center mb-3">
      <div class="col-md-6">
        <div class="row align-items-center">
          <div class="col-md-8">
            <input class="input-primary medium" placeholder="Tìm kiếm" v-model="description" />  
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
                <th :key="index" scope="col">{{$t('departmentAdmin.'+props)}}</th>
              </template>
          </tr>
          </thead>
          <tbody>
            <tr class="break-word" v-for="(item , i) in data.data" :key="i">
              <td>
                <el-checkbox :value="item.id" v-model="ids"></el-checkbox>
              </td>
              <td>{{item.name}}</td>
              <td>{{item.description}}</td>
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
    <el-dialog title="Phòng ban" class="transition-box-center custom" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <div>
        <div class="form-group">
          <label class="control-label font-weight-bold">Tên phòng ban</label>
          <div class="mb-20">
            <input type="text" class="input-primary medium" placeholder="Nhập tên phòng ban" v-model="formData.name" />
          </div>
        </div>
        <div class="form-group mt-3">
          <label class="control-label font-weight-bold">Mô tả</label>
          <div class="mb-20">
              <el-input
                type="textarea"
                :rows="2"
                placeholder="Nhập mô tả"
                v-model="formData.description">
              </el-input>
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
        name: '',
        description: '',
        isDelete: false,
      }
    };
  },
  computed: {
    ...mapState({
      headers: state => state.$_departmentAdmin.headers,
      searchRequest: state => state.$_departmentAdmin.searchRequest,
    }),
    ...mapGetters({
        data: "$_departmentAdmin/getData",
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
    const STORE_KEY = "$_departmentAdmin";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      _this.$store.registerModule(STORE_KEY, store);
    }
    await _this.$store.dispatch("$_departmentAdmin/getData");
  },
  methods: {
    async handleSearch(){
      var _this = this;
      _this.searchRequest.description = _this.description;
      await _this.$store.dispatch("$_departmentAdmin/getData");
    },
    openDiaLog(item){
      var _this = this;
      _this.formData = _.cloneDeep(item);
      _this.dialogVisible = true;
    },
    addNew(){
      var _this = this;
      _this.formData = {
        name: '',
        description: '',
        isDelete: false,
      }
      _this.dialogVisible = true;
    },
    async handleSizeChange(val) {
      var _this = this;
      _this.searchRequest.pageSize = val;
      await _this.$store.dispatch("$_departmentAdmin/getData");
    },
    async handleCurrentChange(val) {
      var _this = this;
      _this.searchRequest.pageIndex = val;
      await _this.$store.dispatch("$_departmentAdmin/getData");
    },
    submit: _.debounce(async function () {
      var _this = this;
      try {
        await _this.$store.dispatch("$_departmentAdmin/editDepartment", _this.formData);
        _this.$notify({
          title: "Chúc mừng",
          message: "Cập nhật thành công",
          type: "success",
        });
        await _this.$store.dispatch("$_departmentAdmin/getData");
        _this.dialogVisible = false;
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
