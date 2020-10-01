<template>
  <div>
    <div class="white-background">
      <div class="row justify-content-between align-items-center mb-3">
        <div class="col-md-2">
          <el-select v-model="cycle"  @change="handleFilter">
            <el-option value="" label="Tất cả"></el-option>
            <el-option
              v-for="item in cycleCompany"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="col-md-6">
          <div class="row align-items-center">
            <div class="col-md-8">
              <input placeholder="Tìm kiếm" class="form-control" v-model="description" />
            </div>
            <div class="col-md-4">
              <button class="btn btn-primary" @click="handleSearch">Tìm kiếm</button>
            </div>
          </div>
        </div>
        <div class="col-md-4 text-right">
          <button class="btn btn-primary" @click="openCreateGoal">Tạo mục tiêu</button>
        </div>
      </div>
      <el-pagination class="text-right"
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     background
                     :current-page.sync="searchRequest.pageIndex"
                     layout="sizes, prev, pager, next , jumper"
                     :page-sizes="[5, 10, 20]" 
                     :total="goalList.total">
      </el-pagination>
      <div class="row mt-4" v-for="(item, index) in goalList" :key="index">
        <div class="col-lg-12">
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-12">
                  <div class="created-date mb-3">Ngày tạo: {{ item.createdAt.slice(0,10) }}</div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-2 d-flex flex-column justify-content-center">
                  <div class="title">Mục tiêu</div>
                  <div class="content">{{ item.name ? item.name : ''}}</div>
                </div>
                <div class="col-md-2 d-flex flex-column justify-content-center">
                  <div class="title">Kết quả chính</div>
                  <div class="content">
                    <a href="javascript:;" class="result">{{item.checkIn && item.checkIn.length ? item.checkIn.length : 0}} kết quả</a>
                  </div>
                </div>
                <div class="col-md-2 d-flex flex-column justify-content-center">
                  <div class="title">Tiến độ</div>
                  <div class="content">
                    <el-progress :percentage="item.progressPercent" :format="format" :color="customColorMethod"></el-progress>
                  </div>
                </div>
                <div class="col-md-1 d-flex flex-column justify-content-center">
                  <div class="title">Thay đổi</div>
                  <div class="content">{{ item.compare >= 0 ? `+${item.compare}%` : `${item.compare}%`}}</div>
                </div>
                <div class="col-md-2 d-flex flex-column justify-content-center">
                  <div class="title">Mức độ tự tin</div>
                  <div class="content">{{ item.confidenceLevel ?  commonData.confidenceLevelDisplay[item.confidenceLevel] : ''}}</div>
                </div>
                <div class="col-md-2 d-flex flex-column justify-content-center">
                  <div class="title">Check-in</div>
                  <div class="content">
                    <div :class="`status ${commonData.checkInStatusDisplay[item.checkInStatus].color}`" @click="handleOpenModalCheckIn(item)" style="cursor:pointer">
                      {{ commonData.checkInStatusDisplay[item.checkInStatus].name }}
                    </div>
                  </div>
                </div>
                <div class="col-md-1 d-flex flex-column justify-content-center">
                  <div class="title">Trạng thái</div>
                  <div class="content">
                    <div :class="`text-${commonData.goalStatusDisplay[item.status].color}`">
                      {{ item.status ?  commonData.goalStatusDisplay[item.status].name : ''}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="Form check-in hàng tuần" :visible.sync="modalCheckIn" class="transition-box-center" width="80%" top="0vh" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="modal-body">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="Check-in" name="check-in" v-if="goalDetails">
            <div class="row my-2">
              <div class="col-md-4 title">Mục tiêu</div>
              <div class="col-md-8">
                {{ goalDetails.name ?  goalDetails.name : "" }}
              </div>
            </div>
            <div class="row my-2">
              <div class="col-md-4 title">Mức độ tự tin</div>
              <div class="col-md-8">
               <el-radio-group v-model="formCheckIn.confidenceLevel" v-for="(item,k) in commonData.confidenceLevel" :key="k">
                <el-radio :label="item.code" class="mr-2">{{item.name}}</el-radio>
              </el-radio-group>
              </div>
            </div>
            <div class="row my-2">
              <div class="col-md-4 title">Kết quả</div>
              <div class="col-md-8">
                <input class="input-secondary" placeholder="Nhập kết quả" v-model="formCheckIn.result" />
              </div>
            </div>
            <div class="row my-2">
              <div class="col-md-4 title">Tiến độ</div>
              <div class="col-md-8">
                <input type="number" class="input-secondary" placeholder="Nhập tiến độ" v-model="formCheckIn.currentProgress" />
              </div> 
            </div>
            <div class="row my-2" v-for="(item, index) in questionsCompany" :key="index">
              <div class="col-md-4 title">{{ item.question }}</div>
              <div class="col-md-8">
                <textarea placeholder="Nhập trả lời" rows="4" class="w-100" v-if="item.orderNo == 1" v-model="formCheckIn.answerFirst"></textarea>
                <textarea placeholder="Nhập trả lời" rows="4" class="w-100" v-if="item.orderNo == 2" v-model="formCheckIn.answerSecond"></textarea>
                <textarea placeholder="Nhập trả lời" rows="4" class="w-100" v-if="item.orderNo == 3" v-model="formCheckIn.answerThird"></textarea>
                <textarea placeholder="Nhập trả lời" rows="4" class="w-100" v-if="item.orderNo == 4" v-model="formCheckIn.answerFourth"></textarea>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Lịch sử" name="history">
            <div class="block mt-4" v-if="goalDetails && goalDetails.checkIn && goalDetails.checkIn.length">
              <el-timeline v-for="(item,index) in goalDetails.checkIn" :key="index">
                <el-timeline-item :timestamp="item.createdAt.slice(0,10)" placement="top">
                  <el-card>
                    <div>{{item.result ? item.result : 'Không có kết quả' }}</div>
                    <div><strong>Mức độ tự tin:</strong> {{ commonData.confidenceLevelDisplay[item.confidenceLevel] }}</div>
                    <div><strong>Tiến độ:</strong> {{ item.currentProgress }}%</div>
                    <div>Xem chi tiết</div>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-secondary mr-3" @click="modalCheckIn = false">
          Hủy
        </button>
        <button class="btn btn-primary" @click="submitCheckIn">
          Xác nhận
        </button>
      </span>
    </el-dialog>

    <el-dialog title="Tạo mục tiêu" :visible.sync="modalCreateGoal" class="transition-box-center" width="60%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="modal-body">
        <div class="row my-2">
            <div class="col-md-4 title">Chu kỳ</div>
            <div class="col-md-8">
              <el-select v-model="formCreate.cycleId" clearable placeholder="Chọn chu kỳ" class="w-100">
                <el-option v-for="item in cycleCompany"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                </el-option>
              </el-select>
            </div>
        </div>
        <div class="row my-2">
          <div class="col-md-4 title">Cấp trên</div>
          <div class="col-md-8">
            <el-select v-model="formCreate.higherUserId" clearable placeholder="Chọn cấp trên quản lý mục tiêu" class="w-100">
              <el-option v-for="item in userCompany"
                          :key="item.id"
                          :label="`${item.fullName} ( ${item.email} )`"
                          :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row my-2">
          <div class="col-md-4 title">Mục tiêu của bạn</div>
          <div class="col-md-8">
            <input class="input-secondary" placeholder="Nhập mục tiêu của bạn" v-model="formCreate.name" />
          </div>      
        </div>
        <div class="row my-2">
          <div class="col-md-4 title">Link kế hoạch</div>
          <div class="col-md-8">
            <input class="input-secondary" placeholder="Nhập link kế hoạch" v-model="formCreate.linkPlan" />
          </div>      
        </div>
        <div class="row my-2">
          <div class="col-md-4 title">Hình đính kèm</div>
          <div class="col-md-4">
            <div class="avatar-circle square">
              <img class="img-fluid" :src="NoAvatar" v-if="!formCreate.image" />
              <img class="img-fluid" :src="formCreate.image" v-else />
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
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-secondary mr-3" @click="modalCreateGoal = false">
          Hủy
        </button>
        <button class="btn btn-primary" @click="submit">
          Xác nhận
        </button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import store from "./_store";
import commonData from '../../utils/common-data';
import NoAvatar from "../../assets/imgs/no-images.jpg";
import _ from 'lodash';
export default {
  components: {},
  data() {
    return {
      NoAvatar,
      commonData,
      cycle: '',
      description: '',
      modalCheckIn: false,
      activeTab: "check-in",
      modalCreateGoal: false,
      formCreate: {
        cycleId : '',
        userId : localStorage.getItem('userId'),
        higherUserId: '',
        name: '',
        linkPlan: null,
        confidenceLevel: 'fine',
        progressPercent: 0,
        image: null,
        isDelete: false,
        status: 'new'
      },
      formCheckIn: {
        goalId: '',
        result: '',
        confidenceLevel: '',
        currentProgress: 0,
        answerFirst: '',
        answerSecond: '',
        answerThird: '',
        answerFourth: '',
        isDelete: false
      },
      file: null,
      path: null,
      goalDetails: null
    };
  },
  computed: {
    ...mapState({
      searchRequest: state => state.$_checkInUser.searchRequest,
    }),
    ...mapGetters({
      questionsCompany: "$_loginPage/getQuestionsCompany",
      cycleCompany: "$_loginPage/getCycleCompany",
      userCompany: "$_checkInUser/getUserList",
      goalList: "$_checkInUser/getGoalList",
    }),
  },
  async created() {
    var _this = this;
    const STORE_KEY = "$_checkInUser";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      _this.$store.registerModule(STORE_KEY, store);
    }
    await _this.$store.dispatch("$_checkInUser/getUserList");
    await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
  },
  methods: {
    async handleSizeChange(val) {
      var _this = this;
      _this.searchRequest.pageSize = val;
      await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
    },
    async handleCurrentChange(val) {
      var _this = this;
      _this.searchRequest.pageIndex = val;
      await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
    },
    async handleSearch(){
      var _this = this;
      _this.searchRequest.description = _this.description;
      await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
    },
    async handleFilter(){
      var _this = this;
      _this.searchRequest.title = _this.cycle;
      await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
    },
    customColorMethod(percentage) {
      if (percentage < 10) {
        return '#909399';
      } else if (percentage < 50) {
        return '#ff0404';
      } else if (percentage < 70) {
        return '#e6a23c';
      } else {
        return '#67c23a';
      }
    },
    async handleFileUpload(e) {
      var _this = this;
      _this.file = e.target.files[0];
      if (_this.file) {
        var response = await this.$store.dispatch(
          "$_checkInUser/uploadImage",
          _this.file
        );
        if (response && response.path) {
          _this.path = response.path;
          _this.formCreate.image = _this.path;
        }
      } else {
        this.$notify.error({
          title: "Thất bại",
          message: "Ảnh k đúng định dạng",
        });
      }
    },
    format(percentage) {
      return percentage === 100 ? "Full" : `${percentage}%`;
    },
    handleOpenModalCheckIn(goalDetails) {
      var _this = this;
      _this.goalDetails = _.cloneDeep(goalDetails);
      _this.formCheckIn.goalId = goalDetails.id;
      _this.formCheckIn.companyId = goalDetails.companyId;
      _this.formCheckIn.currentProgress = goalDetails.progressPercent;
      _this.formCheckIn.confidenceLevel = goalDetails.confidenceLevel;
      _this.formCheckIn.result = '',
      _this.formCheckIn.answerFirst = '',
      _this.formCheckIn.answerSecond = '',
      _this.formCheckIn.answerThird = '',
      _this.formCheckIn.answerFourth = '',
      _this.modalCheckIn = true;
    },
    openCreateGoal(){
      var _this = this;
      _this.modalCreateGoal = true;
    },
    submit: _.debounce(async function () {
      var _this = this;
      try {
        await _this.$store.dispatch("$_checkInUser/editGoal", _this.formCreate);
        _this.$notify({
          title: "Chúc mừng",
          message: "Cập nhật thành công",
          type: "success",
        });
        _this.modalCreateGoal = false;
        _this.formCreate = {
          cycleId : '',
          userId : localStorage.getItem('userId'),
          higherUserId: '',
          name: '',
          linkPlan: null,
          confidenceLevel: 'fine',
          progressPercent: 0,
          image: null,
          isDelete: false,
          status: 'new'
        };
        await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
      } catch (error) {
        _this.$notify.error({
          title: "Thất bại",
          message: "Cập nhật thất bại",
        });
      }
    }, 500),
    submitCheckIn: _.debounce(async function () {
      var _this = this;
      try {
        _this.formCheckIn.currentProgress = parseFloat(_this.formCheckIn.currentProgress);
        await _this.$store.dispatch("$_checkInUser/editCheckIn", _this.formCheckIn);
        _this.$notify({
          title: "Chúc mừng",
          message: "Cập nhật thành công",
          type: "success",
        });
        _this.modalCheckIn = false;
        _this.formCheckIn = {
          goalId: '',
          confidenceLevel: '',
          currentProgress: 0,
          result: '',
          answerFirst: '',
          answerSecond: '',
          answerThird: '',
          answerFourth: '',
          isDelete: false
        };
        await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
      } catch (error) {
        _this.$notify.error({
          title: "Thất bại",
          message: "Cập nhật thất bại",
        });
      }
    }, 500)
  },
};
</script>
