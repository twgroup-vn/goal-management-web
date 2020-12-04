<template>
<div>
  <div>
    <div class="row justify-content-between align-items-center mb-3">
      <div class="col-md-6">
        <div class="row align-items-center">
          <div class="col-md-8">
            <div class="position-relative">
              <input placeholder="Tìm kiếm" class="input-primary medium" v-model="description" @keyup="handleSearch"/>
              <font-awesome-icon :icon="['fas', 'search']" class="icon-search"/>
            </div>  
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
                <th :key="index" scope="col">{{$t('employeeAdmin.'+props)}}</th>
              </template>
          </tr>
          </thead>
          <tbody>
            <tr class="break-word" v-for="(item , i) in data.data" :key="i">
              <td>
                <el-checkbox :value="item.id" v-model="ids"></el-checkbox>
              </td>
              <td>{{item.fullName}}</td>
              <td>{{item.email}}</td>
              <td>{{item.phoneNumber}}</td>
              <td>{{item.departmentName ? item.departmentName : '' }}</td>
              <td>{{item.positionName ? item.positionName : '' }}</td>
              <td :class="item.positionInCompany.IsAdmin ? 'text-success font-weight-bold' : ''">{{item.positionInCompany.IsAdmin ? 'Admin' : 'Nhân viên'}}</td>
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
    <el-dialog title="Thêm Nhân viên" class="transition-box-center" :visible.sync="dialogVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <div>
        <div class="form-group">
          <label class="control-label font-weight-bold">Nhân viên</label>
          <div class="mb-20">
            <el-select v-model="formData.userId" clearable placeholder="Chọn nhân viên" class="w-100">
              <el-option v-for="item in userListAfterReduce"
                          :key="item.id"
                          :label="`${item.fullName} (${item.email})`"
                          :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="form-group mt-3">
          <label class="control-label font-weight-bold">Phòng ban</label>
          <div class="mb-20">
            <el-select v-model="formData.departmentId" clearable placeholder="Chọn phòng ban" class="w-100">
              <el-option v-for="item in departmentList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="form-group mt-3">
          <label class="control-label font-weight-bold">Vị trí công việc</label>
          <div class="mb-20">
            <el-select v-model="formData.positionId" clearable placeholder="Chọn vị trí công việc" class="w-100">
              <el-option v-for="item in positionList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>  
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-primary btn-medium mr-3" @click="dialogVisible = false">Hủy</button>
        <button class="btn btn-primary btn-medium" @click="addUserToCompany">Đồng ý</button>
      </span>
    </el-dialog>
  </div>
  <div>
    <el-dialog title="Cập nhật Nhân viên" class="transition-box-center" :visible.sync="dialogEditVisible" :close-on-click-modal="false" :close-on-press-escape="false">
      <div>
        <div class="form-group">
          <label class="control-label font-weight-bold">Nhân viên</label>
          <div class="mb-20">
            <input type="text" class="input-primary medium" v-model="userNameUpdate" readonly/>
          </div>
        </div>
        <div class="form-group mt-3">
          <label class="control-label font-weight-bold">Phòng ban</label>
          <div class="mb-20">
            <el-select v-model="formEdit.departmentId" clearable placeholder="Chọn phòng ban" class="w-100">
              <el-option v-for="item in departmentList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="form-group mt-3">
          <label class="control-label font-weight-bold">Vị trí công việc</label>
          <div class="mb-20">
            <el-select v-model="formEdit.positionId" clearable placeholder="Chọn vị trí công việc" class="w-100">
              <el-option v-for="item in positionList"
                          :key="item.id"
                          :label="item.name"
                          :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>  
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-standard btn-medium mr-3" @click="dialogEditVisible = false">Hủy</button>
        <button class="btn btn-primary btn-medium" @click="editUser">Đồng ý</button>
      </span>
    </el-dialog>
  </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import store from "./_store";
import _ from 'lodash';
import commonData from '../../utils/common-data';
export default {
  components: {},
  data() {
    return {
      ids: [],
      commonData,
      isCheckAll: false,
      dialogVisible: false,
      dialogEditVisible: false,
      description: '',
      formData: {
        userId: '',
        departmentId: null,
        positionId: null,
        permissionId: null,
        companyId: null,
        isDelete: false
      },
      formEdit: {
        userId: '',
        departmentId: null,
        positionId: null,
        companyId: null,
        isDelete: false
      },
      userListAfterReduce: null,
      userNameUpdate: '',
    };
  },
  computed: {
    ...mapState({
      userList: state => state.$_employeeAdmin.userList,
      departmentList: state => state.$_employeeAdmin.departmentList,
      positionList: state => state.$_employeeAdmin.positionList,
      headers: state => state.$_employeeAdmin.headers,
      searchRequest: state => state.$_employeeAdmin.searchRequest,
    }),
    ...mapGetters({
        data: "$_employeeAdmin/getData",
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
    const STORE_KEY = "$_employeeAdmin";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      _this.$store.registerModule(STORE_KEY, store);
    }
    await _this.$store.dispatch("$_employeeAdmin/getRelatedData");
    await _this.$store.dispatch("$_employeeAdmin/getData");
  },
  methods: {
    async handleSearch(){
      var _this = this;
      _this.searchRequest.description = _this.description;
      await _this.$store.dispatch("$_employeeAdmin/getData");
    },
    openDiaLog(item){
      var _this = this;
      _this.userNameUpdate = item.fullName;
      _this.formEdit.userId = item.id;
      _this.formEdit.departmentId = item.positionInCompany.DepartmentId;
      _this.formEdit.positionId = item.positionInCompany.PositionId;
      _this.dialogEditVisible = true;
    },
    addNew(){
      var _this = this;
      var userInCompanyList = _.map(_this.data.data, o => { return o.id });
      _this.userListAfterReduce = _.filter(_this.userList, o => { return userInCompanyList.indexOf(o.id) < 0 });
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
      await _this.$store.dispatch("$_employeeAdmin/getData");
    },
    async handleCurrentChange(val) {
      var _this = this;
      _this.searchRequest.pageIndex = val;
      await _this.$store.dispatch("$_employeeAdmin/getData");
    },
    addUserToCompany: _.debounce(async function () {
      var _this = this;
      try {
        await _this.$store.dispatch("$_employeeAdmin/addEmployee", _this.formData);
        await _this.createAccessModulesFromHR();
        _this.$notify({
          title: "Chúc mừng",
          message: "Cập nhật thành công",
          type: "success",
        });
        await _this.$store.dispatch("$_employeeAdmin/getData");
        _this.dialogVisible = false;
      } catch (error) {
        _this.$notify.error({
          title: "Thất bại",
          message: "Cập nhật thất bại",
        });
      }
    }, 500),
    editUser: _.debounce(async function () {
      var _this = this;
      try {
        await _this.$store.dispatch("$_employeeAdmin/addEmployee", _this.formEdit);
        await _this.updateAccessModulesFromHR();
        _this.$notify({
          title: "Chúc mừng",
          message: "Cập nhật thành công",
          type: "success",
        });
        await _this.$store.dispatch("$_employeeAdmin/getData");
        _this.dialogEditVisible = false;
      } catch (error) {
        _this.$notify.error({
          title: "Thất bại",
          message: "Cập nhật thất bại",
        });
      }
    }, 500),
    async createAccessModulesFromHR(){
      var _this = this;
      let userNeedUpdate = _this.userList.find(o=> o.id === _this.formData.userId);      
      let userListAccessModules = [];
      let template = {
        MaNhanVien: userNeedUpdate.mappingCode,
        MaCongTy: commonData.COMPANY_HR_PORT,
        DuongDanTruyCap: commonData.KPI_CLIENT_URL,
        DuocTruyCap: true,
      };
      userListAccessModules.push(template);
      await _this.$store.dispatch("$_employeeAdmin/updateAccessModulesFromHR", JSON.stringify(userListAccessModules) );
    }, 
    async updateAccessModulesFromHR(){
      var _this = this;
      let userNeedUpdate = _this.userList.find(o=> o.id === _this.formEdit.userId);      
      let userListAccessModules = [];
      let template = {
        MaNhanVien: userNeedUpdate.mappingCode,
        MaCongTy: commonData.COMPANY_HR_PORT,
        DuongDanTruyCap: commonData.KPI_CLIENT_URL,
        DuocTruyCap: true,
      };
      userListAccessModules.push(template);
      await _this.$store.dispatch("$_employeeAdmin/updateAccessModulesFromHR", JSON.stringify(userListAccessModules) );
    }        
  },
};
</script>
