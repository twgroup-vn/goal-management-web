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
        <button class="btn btn-primary" @click="openCreateFeedback">Phản hồi</button>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6">
        <div class="wrapper-target">
          <div class="title">Mục tiêu toàn công ty</div>
          <div class="content">
            <PieChart/>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div class="wrapper-target">
          <div class="title">Mục tiêu của {{ currentUser.fullName  }}</div>
          <div class="content">
            <PieChart/>
          </div>
        </div>
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
                <div class="col-md-12 d-flex align-items-center justify-content-between">
                  <div class="d-flex align-items-center">
                    <div class="group-avatar">
                      <div v-if="!item.avatar" class="avatar-without-img">{{item.convertName}}</div>
                      <div v-else class="avatar-with-img" :style="{ backgroundImage: `url(${item && item.avatar ? item.avatar : ''})` }"></div>
                    </div>
                    <div class="ml-2 mr-2">
                      <div class="">{{ item && item.fullName ? item.fullName : '' }}</div>
                      <div class="created-date">{{ item.createdAt.slice(0,10) }}</div>
                    </div>
                  </div>
                  <div class="d-flex align-items-center">
                    <a class="relative-group-icon mr-4" @click="handleModalViewFeedback(item.id)">
                      <div class="number star" :class="{ danger: item.star < 0 }">{{ item.star }}</div>
                      <div>
                        <font-awesome-icon :icon="['fas', 'star']" class="icon star" :class="{ danger: item.star < 0 }"/>
                      </div>
                    </a>
                    <a class="relative-group-icon" @click="handleModalViewFeedback(item.id)">
                      <div class="number">{{ item.reply.length }}</div>
                      <font-awesome-icon :icon="['far', 'comment-dots']" class="icon" />
                    </a>
                  </div>
                </div>
              </div>
              <hr class=""/>
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
                <div class="col-md-2 d-flex flex-column justify-content-center">
                  <div class="title">Thay đổi</div>
                  <div class="content">{{ item.compare >= 0 ? `+${item.compare}%` : `${item.compare}%`}}</div>
                </div>
                <div class="col-md-2 d-flex flex-column justify-content-center">
                  <div class="title">Mức độ tự tin</div>
                  <div class="content">{{ item.confidenceLevel ?  commonData.confidenceLevelDisplay[item.confidenceLevel] : ''}}</div>
                </div>
                <div class="col-md-2 d-flex flex-column justify-content-center">
                  <div class="title">Trạng thái</div>
                  <div class="content">
                    <div class="tag" :class="`${commonData.goalStatusDisplay[item.status].color}`">
                      {{ item.status ?  commonData.goalStatusDisplay[item.status].name : ''}}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <chat-box></chat-box>
    </div>

    <el-dialog title="Form check-in hàng tuần" :visible.sync="modalCheckIn" class="transition-box-center" width="80%" top="0vh" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="modal-body">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="Check-in" name="check-in">
            <div class="row my-2">
              <div class="col-md-4 title">Kết quả</div>
              <div class="col-md-8">Hoàn thành được 60% dự án</div>
            </div>
            <div class="row my-2">
              <div class="col-md-4 title">Mục tiêu</div>
              <div class="col-md-8">
                <input class="input-secondary" placeholder="Nhập mục tiêu" />
              </div>
            </div>
            <div class="row my-2">
              <div class="col-md-4 title">Tiến độ</div>
              <div class="col-md-8">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="radio" id="veryGood" />
                  <label class="form-check-label" for="veryGood">
                    Rất ổn
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="radio" id="good" />
                  <label class="form-check-label" for="good">Ổn</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="radio" id="bad" />
                  <label class="form-check-label" for="bad">Không ổn</label>
                </div>
              </div>
            </div>
            <div class="row my-2" v-for="(item, index) in questionsCompany" :key="index">
              <div class="col-md-4 title">{{ item.question }}</div>
              <div class="col-md-8">
                <textarea rows="4" class="w-100"></textarea>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Lịch sử" name="history">Lịch sử</el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-secondary mr-3" @click="modalCheckIn = false">
          Hủy
        </button>
        <button class="btn btn-primary" @click="modalCheckIn = false">
          Xác nhận
        </button>
      </span>
    </el-dialog>

    <el-dialog title="Form phản hồi, ghi nhận" :visible.sync="modalFeedback" class="transition-box-center" width="80%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="modal-body">
        <div class="row my-2">
          <div class="col-md-4 title">Loại phản hồi</div>
          <div class="col-md-8">
            <el-select v-model="formData.type" placeholder="Select" class="w-100">
              <el-option
                v-for="(item, index) in commonData.replyType"
                :key="index"
                :label="item.name"
                :value="item.code">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row my-2">
          <div class="col-md-4 title">Người được phản hồi</div>
          <div class="col-md-8">
            <el-select v-model="formData.receiveUserId" placeholder="Select" class="w-100">
              <el-option
                v-for="item in feedbackUser"
                :key="item.id"
                :label="item.fullName"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row my-2">
          <div class="col-md-4 title">Chu kỳ</div>
          <div class="col-md-8">
            <el-select v-model="cycleId" placeholder="Select" class="w-100">
              <el-option
                v-for="item in cycleCompany"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row my-2">
          <div class="col-md-4 title">Mục tiêu</div>
          <div class="col-md-8">
            <el-select v-model="formData.goalId" placeholder="Select" class="w-100">
              <el-option
                v-for="item in goalUser"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row my-2">
          <div class="col-md-4 title">Tiêu chí</div>
          <div class="col-md-8">
            <el-select v-model="formData.evaluativeCriteriaId" placeholder="Select" class="w-100">
              <el-option
                v-for="item in evaluateUser"
                :key="item.id"
                :label="item.content"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row my-2">
          <div class="col-md-4 title">Nội dung</div>
          <div class="col-md-8">
            <textarea rows="10" class="w-100" v-model="formData.content"></textarea>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-secondary mr-3" @click="modalFeedback = false">
          Hủy
        </button>
        <button class="btn btn-primary" @click="submitResponse">
          Xác nhận
        </button>
      </span>
    </el-dialog>

    <el-dialog title="Xem phản hồi, ghi nhận" :visible.sync="modalViewFeedback" class="transition-box-center" width="80%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Người phản hồi</th>
              <th>Loại phản hồi</th>
              <th>Ngày phản hồi</th>
              <th>Nội dung phản hồi</th>
              <th>Số sao</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in replyClone" :key="index">
            <tr v-for="(text, key) in item.reply" :key="key"> 
              <td>{{ feedbackUser.find(x => { return x.id === text.userId}).fullName }}</td>
              <td>{{ text.type ? commonData.replyTypeDisplay[text.type] : '' }}</td>
              <td>{{ text.createdAt.slice(0, 10) }}</td>
              <td>{{ text.content ? text.content : 'Không có nội dung' }}</td>
              <td>
                <a class="relative-group-icon">
                  <span class="mr-2"><font-awesome-icon :icon="['fas', 'star']" class="icon star" /></span>
                  <span class="number">{{ evaluateCompany.find(x => { return x.id === text.evaluativeCriteriaId}).star }}</span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import store from "./_store";
import commonData from '../../utils/common-data';
import PieChart from "./_components/pieChart";
import ChatBox from '../../components/chat-box'
import _ from 'lodash';
export default {
  components: {
    PieChart,
    'chat-box': ChatBox
  },
  data() {
    return {
      commonData,
      cycle: '',
      description: '',
      modalCheckIn: false,
      modalFeedback: false,
      modalViewFeedback: false,
      activeTab: "check-in",
      cycleId: '',
      formData:{
        receiveUserId: '',
        type: '',
        userId: localStorage.getItem("userId"),
        goalId: '',
        evaluativeCriteriaId: '',
        content: '',
        isDelete: false
      },
      user: null,
      rawEvaluateCompany:null,
      evaluateUser: null,
      replyClone: null,
    };
  },
  computed: {
    ...mapState({
      searchRequest: state => state.$_checkInCompany.searchRequest,
      currentUser: state => state.$_loginPage.currentUser,
    }),
    ...mapGetters({
      questionsCompany: "$_loginPage/getQuestionsCompany",
      cycleCompany: "$_loginPage/getCycleCompany",
      goalList: "$_checkInCompany/getGoalList",
      evaluateCompany: "$_loginPage/getEvaluateCriteriaCompany",
      feedbackUser: "$_checkInCompany/getUserList",
      goalUser: "$_checkInCompany/getUserGoal",
    }),
  },
  async created() {
    var _this = this;
    const STORE_KEY = "$_checkInCompany";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      _this.$store.registerModule(STORE_KEY, store);
    }
    await _this.$store.dispatch("$_checkInCompany/getUserList");
    await _this.$store.dispatch("$_checkInCompany/getGoalListOfCompany");
     _this.rawEvaluateCompany = _.cloneDeep(_this.evaluateCompany);
     _this.evaluateUser = _.cloneDeep(_this.rawEvaluateCompany);
  },
  watch:{
    "formData.receiveUserId": async function(val){
      var _this = this;
      await _this.$store.dispatch("$_checkInCompany/getAllGoalOfUser", val);
    },
    "cycleId": async function(val){
      var _this = this;
      await _this.$store.dispatch("$_checkInCompany/handleChangeCycleIdOfGoalUser", val);
    },
    "formData.type": async function(val){
      var _this = this;
      _this.evaluateUser = _.filter(_this.rawEvaluateCompany, o => {return o.type === val})
    },
  },
  methods: {
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
    openCreateFeedback(){
      var _this = this;
      _this.modalFeedback = true;
    },
    async handleSearch(){
      var _this = this;
      _this.searchRequest.description = _this.description;
      await _this.$store.dispatch("$_checkInCompany/getGoalListOfCompany");
    },
    async handleFilter(){
      var _this = this;
      _this.searchRequest.title = _this.cycle;
      await _this.$store.dispatch("$_checkInCompany/getGoalListOfCompany");
    },
    format(percentage) {
      return percentage === 100 ? "Full" : `${percentage}%`;
    },
    handleOpenModalCheckIn() {
      var _this = this;
      _this.modalCheckIn = true;
    },
    handleModalViewFeedback(val){
      var _this = this;
      _this.replyClone = _.filter(_this.goalList, (o)=>{ return o.id === val });
      _this.modalViewFeedback = true;
    },
    async handleSizeChange(val) {
      var _this = this;
      _this.searchRequest.pageSize = val;
      await _this.$store.dispatch("$_checkInCompany/getGoalListOfCompany");
    },
    async handleCurrentChange(val) {
      var _this = this;
      _this.searchRequest.pageIndex = val;
      await _this.$store.dispatch("$_checkInCompany/getGoalListOfCompany");
    },
    submitResponse: _.debounce(async function () {
      var _this = this;
      try {
        await _this.$store.dispatch("$_checkInCompany/createReply", _this.formData);
        await _this.$store.dispatch("$_checkInCompany/getGoalListOfCompany");
        _this.modalFeedback = false
        _this.$notify({
          title: "Chúc mừng",
          message: "Phản hồi thành công",
          type: "success",
        });
      } catch (error) {
        _this.$notify.error({
          title: "Thất bại",
          message: "Phản hồi thất bại",
        });
      }
    }, 500),
  },
};
</script>
