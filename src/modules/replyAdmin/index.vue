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
            <button class="btn btn-primary" @click="handleSearch">Tìm kiếm</button>
          </div>
        </div>
      </div>
      <!-- <div class="col-md-6 text-right">
        <button class="btn btn-primary" @click="addNew">Thêm mới</button>
      </div> -->
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
                <th :key="index" scope="col">{{$t('replyAdmin.'+props)}}</th>
              </template>
          </tr>
          </thead>
          <tbody>
            <tr class="break-word" v-for="(item , i) in data.data" :key="i">
              <td>
                <el-checkbox :value="item.id" v-model="ids"></el-checkbox>
              </td>
              <td>{{ feedbackUser.find(x => { return x.id === item.userId}).fullName }}</td>
              <td>{{ evaluateCompany.find(x => { return x.id === item.evaluativeCriteriaId}).content }}</td>
              <td>{{ feedbackUser.find(x => { return x.id === item.receiveUserId}).fullName }}</td>
              <td>{{ item.content }}</td>
              <td>{{ goalList.find(x => { return x.id === item.goalId}).name }}</td>
              <td>{{ item.createdAt.slice(0, 10) }}</td>
              <td>{{ item.type ? commonData.replyTypeDisplay[item.type] : '' }}</td>
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
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import commonData from '../../utils/common-data';
import store from "./_store";
import _ from 'lodash';
export default {
  components: {},
  data() {
    return {
      commonData,
      ids: [],
      isCheckAll: false,
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
      headers: state => state.$_replyAdmin.headers,
      searchRequest: state => state.$_replyAdmin.searchRequest,
    }),
    ...mapGetters({
        data: "$_replyAdmin/getData",
        feedbackUser: "$_replyAdmin/getUserList",
        evaluateCompany: "$_loginPage/getEvaluateCriteriaCompany",
        goalList: "$_replyAdmin/getGoalList",
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
    const STORE_KEY = "$_replyAdmin";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      _this.$store.registerModule(STORE_KEY, store);
    }
    await _this.$store.dispatch("$_replyAdmin/getData");
    await _this.$store.dispatch("$_replyAdmin/getUserList");
    await _this.$store.dispatch("$_replyAdmin/getGoalListOfCompany");
  },
  methods: {
    async handleSearch(){
      var _this = this;
      _this.searchRequest.description = _this.description;
      await _this.$store.dispatch("$_replyAdmin/getData");
    },
    async handleSizeChange(val) {
      var _this = this;
      _this.searchRequest.pageSize = val;
      await _this.$store.dispatch("$_replyAdmin/getData");
    },
    async handleCurrentChange(val) {
      var _this = this;
      _this.searchRequest.pageIndex = val;
      await _this.$store.dispatch("$_replyAdmin/getData");
    }   
  },
};
</script>
