<template>
  <div>
    <div class="white-background">
      <div class="row justify-content-between align-items-center mb-3">
        <div class="col-md-2">
          <el-select v-model="cycle" @change="handleFilter">
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
              <div class="position-relative">
                <input placeholder="Tìm kiếm" class="input-primary medium" v-model="description" @keyup="handleSearch"/>
                <font-awesome-icon :icon="['fas', 'search']" class="icon-search"/>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 text-right">
          <a class="btn btn-secondary btn-switchLayout mr-3" @click="handleSwitchLayout">
            <font-awesome-icon :icon="['fas', 'th-large']" class="switch-icon" :class="{ show : switchLayout == true}" />
            <font-awesome-icon :icon="['fas', 'th-list']" class="switch-icon" :class="{ show : switchLayout == false}"/>
          </a>
          <button class="btn btn-primary btn-medium" @click="openCreateGoal">Tạo mục tiêu</button>
        </div>
      </div>
    </div>
    <div class="main container-fluid">
      <div class="d-flex justify-content-end align-items-center">
        <el-pagination  @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        background
                        :current-page.sync="searchRequest.pageIndex"
                        layout="sizes, prev, pager, next , jumper"
                        :page-sizes="[5, 10, 20]" 
                        :total="goalList.total">
        </el-pagination>
      </div>
      <div class="row mt-4">
        <div :class="switchLayout == false ? 'col-lg-12' : 'col-lg-3 col-md-6 col-12'" v-for="(item, index) in goalList" :key="index">
          <div class="card mb-4">
            <div class="card-body">
              <div class="row align-items-center">
                <div :class="switchLayout == false ? 'col-md-6 d-flex align-items-center' : 'col-12 d-flex align-items-center'">
                  <div class="created-date mr-3">Ngày tạo: {{ item.createdAt.slice(0,10) }}</div>
                  <div :class="`status ${commonData.checkInStatusDisplay[item.checkInStatus].color}`" @click="handleOpenModalCheckIn(item)" style="cursor:pointer">
                      {{ commonData.checkInStatusDisplay[item.checkInStatus].name }}
                  </div>
                </div>
                <div :class="switchLayout == false ? 'col-md-6 d-flex align-items-center justify-content-end' : 'col-12 d-flex align-items-center justify-content-between mt-4'">
                  <a class="relative-group-icon mr-4" @click="handleModalViewRalation(item)">
                      <div class="number">{{ item.relation.length }}</div>
                      <font-awesome-icon :icon="['fas', 'project-diagram']" class="icon diagram" />
                  </a>
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
              <hr class=""/>
              <div class="row">
                <div :class="switchLayout == false ? 'col-md-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                  <div class="title">Mục tiêu</div>
                  <div class="content">{{ item.name ? item.name : ''}}</div>
                </div>
                <div :class="switchLayout == false ? 'col-md-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                  <div class="title">Kết quả chính</div>
                  <div class="content">
                    <a href="javascript:;" @click="handleModalViewCheckIn(item.id)" class="result">{{item.checkIn && item.checkIn.length ? item.checkIn.length : 0}} kết quả</a>
                  </div>
                </div>
                <div :class="switchLayout == false ? 'col-md-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                  <div class="title">Tiến độ</div>
                  <div class="content">
                    <el-progress :percentage="item.progressPercent" :format="format" :color="customColorMethod"></el-progress>
                  </div>
                </div>
                <div :class="switchLayout == false ? 'col-md-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                  <div class="title">Thay đổi</div>
                  <div class="content">{{ item.compare >= 0 ? `+${item.compare}%` : `${item.compare}%`}}</div>
                </div>
                <div :class="switchLayout == false ? 'col-md-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                  <div class="title">Mức độ tự tin</div>
                  <div class="content">{{ item.confidenceLevel ?  commonData.confidenceLevelDisplay[item.confidenceLevel] : ''}}</div>
                </div>
                <div :class="switchLayout == false ? 'col-md-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
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
                <input class="input-primary medium" placeholder="Nhập kết quả" v-model="formCheckIn.result" />
              </div>
            </div>
            <div class="row my-2">
              <div class="col-md-4 title">Tiến độ</div>
              <div class="col-md-8">
                <input type="number" class="input-primary medium" placeholder="Nhập tiến độ" v-model="formCheckIn.currentProgress" />
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
        <button class="btn btn-standard btn-medium mr-3" @click="modalCheckIn = false">
          Hủy
        </button>
        <button class="btn btn-primary btn-medium" @click="submitCheckIn">
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
            <input class="input-primary medium" placeholder="Nhập mục tiêu của bạn" v-model="formCreate.name" />
          </div>      
        </div>
        <div class="row my-2">
          <div class="col-md-4 title">Link kế hoạch</div>
          <div class="col-md-8">
            <input class="input-primary medium" placeholder="Nhập link kế hoạch" v-model="formCreate.linkPlan" />
          </div>      
        </div><hr/>
        <div class="row my-2">
          <div class="col-md-4 title">
            Các mục tiêu liên kết
          </div>
          <div class="col-md-8 text-right">
              <button class="btn btn-secondary mr-2" @click="clearRelation">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
              <button class="btn btn-primary" @click="addRelation">
                <font-awesome-icon :icon="['fas', 'plus']" />
              </button>
          </div>
        </div>
        <div class="row my-2" v-for="(item, index) in relationArray" :key="index">
           <div class="col-md-8">
             <el-select
                v-model="item.RelatedGoalId"
                filterable
                remote
                reserve-keyword
                placeholder="Nhập mục tiêu liên kết"
                :remote-method="remoteMethod"
                :loading="loading">
                <el-option
                  v-for="goal in options"
                  :key="goal.id"
                  :label="goal.name"
                  :value="goal.id">
                </el-option>
              </el-select>
           </div>
           <div class="col-md-4">
              <el-select v-model="item.Type" placeholder="Chọn loại liên kết">
                <el-option
                  v-for="type in commonData.relationshipType"
                  :key="type.code"
                  :label="type.name"
                  :value="type.code">
                </el-option>
              </el-select>
           </div>
        </div>
        <!-- <div class="row my-2">
          <div class="col-md-4 title">Hình đính kèm</div>
          <div class="col-md-8">
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
        </div> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-standard btn-medium mr-3" @click="modalCreateGoal = false">
          Hủy
        </button>
        <button class="btn btn-primary btn-medium" @click="submit">
          Xác nhận
        </button>
      </span>
    </el-dialog>

    <el-dialog title="Form xem kết quả chính" :visible.sync="modalViewCheckIn" class="transition-box-center" width="80%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="thead-light">
            <tr>
              <th>{{ questionsCompany.find(x => x.orderNo === 1).question }}</th>
              <th>{{ questionsCompany.find(x => x.orderNo === 2).question }}</th>
              <th>{{ questionsCompany.find(x => x.orderNo === 3).question }}</th>
              <th>{{ questionsCompany.find(x => x.orderNo === 4).question }}</th>
              <th>Mức độ tự tin</th>
              <th>Phần trăm tiến độ</th>
              <th>Ngày check-in gần nhất</th>
            </tr>
          </thead>
         <tbody v-for="(item, index) in checkInData" :key="index">
            <tr v-for="(check, key) in item.checkIn" :key="key"> 
              <td>{{ check.answerFirst ? check.answerFirst : 'Không có câu trả lời' }}</td>
              <td>{{ check.answerSecond ? check.answerSecond : 'Không có câu trả lời' }}</td>
              <td>{{ check.answerThird ? check.answerThird : 'Không có câu trả lời' }}</td>
              <td>{{ check.answerFourth ? check.answerFourth : 'Không có câu trả lời' }}</td>
              <td>{{ check.confidenceLevel ?  commonData.confidenceLevelDisplay[check.confidenceLevel] : ''}}</td>
              <td>{{ check.currentProgress ? check.currentProgress + '%' : 'Không có kết quả' }}</td>
              <td>{{ item.lastCheckInDate ? item.lastCheckInDate.slice(0, 10) : '' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-dialog>

    <el-dialog title="Xem phản hồi, ghi nhận" :visible.sync="modalViewFeedback" class="transition-box-center" width="80%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="thead-light">
            <tr>
              <th>Người phản hồi</th>
              <th>Loại phản hồi</th>
              <th>Ngày phản hồi</th>
              <th>Nội dung phản hồi</th>
              <th>Số sao</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in replyData" :key="index">
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

    <el-dialog title="Cập nhật liên kết" :visible.sync="modalViewRalation" class="transition-box-center" width="60%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="modal-body">       
        <div class="row my-2">
          <div class="col-md-4 title">
            Các mục tiêu liên kết
          </div>
          <div class="col-md-8 text-right">
              <button class="btn btn-primary" @click="addRelationById">
                <font-awesome-icon :icon="['fas', 'plus']" />
              </button>
          </div>
        </div>
        <div class="row my-2" v-for="(item, index) in relationArray" :key="index">
           <div class="col-md-8">
             <el-select
                v-model="item.RelatedGoalId"
                filterable
                remote
                reserve-keyword
                placeholder="Nhập mục tiêu liên kết"
                :remote-method="remoteMethod"
                :loading="loading">
                <el-option
                  v-for="goal in options"
                  :key="goal.id"
                  :label="goal.name"
                  :value="goal.id">
                </el-option>
              </el-select>
           </div>
           <div class="col-md-4">
              <el-select v-model="item.Type" placeholder="Chọn loại liên kết">
                <el-option
                  v-for="type in commonData.relationshipType"
                  :key="type.code"
                  :label="type.name"
                  :value="type.code">
                </el-option>
              </el-select>
           </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-standard btn-medium mr-3" @click="modalViewRalation = false">
          Hủy
        </button>
        <button class="btn btn-primary btn-medium" @click="updateRelation">
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
      modalViewCheckIn: false,
      modalViewFeedback: false,
      modalViewRalation: false,
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
      goalDetails: null,
      checkInClone: null,
      replyData: null,
      checkInData: null,
      switchLayout: false,
      relationArray: [
        { GoalId: null, RelatedGoalId: null, Type: null  }
      ],
      loading: false,
      options: [],
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
      feedbackUser: "$_checkInUser/getUserList",
      evaluateCompany: "$_loginPage/getEvaluateCriteriaCompany",
      companyGoalList: "$_checkInUser/getCompanyGoalList",
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
    await _this.$store.dispatch("$_checkInUser/getAllGoalOfCompany");
  },
  methods: {
    clearRelation(){
      var _this = this;
      _this.relationArray = [
        { GoalId: null, RelatedGoalId: null, Type: null  }
      ]
    },
    clearRelationById(){
      var _this = this;
      _this.relationArray = [
        { GoalId: _this.updateRelationGoalId, RelatedGoalId: null, Type: null  }
      ]
    },
    addRelation(){
      var _this = this;
      _this.relationArray.push({
        GoalId: null, RelatedGoalId: null, Type: null
      });
    },
    addRelationById(){
      var _this = this;
      _this.relationArray.push({
        GoalId: _this.updateRelationGoalId, RelatedGoalId: null, Type: null
      });
    },
    handleSwitchLayout(){
      var _this = this;
      _this.switchLayout = ! _this.switchLayout;
    },
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
    handleModalViewCheckIn(val){
      var _this = this;
      _this.checkInData = _.filter(_this.goalList, (o)=>{ return o.id === val });
      _this.modalViewCheckIn = true;
    },
    async handleModalViewFeedback(val){
      var _this = this;
      _this.replyData = _.filter(_this.goalList, (o)=>{ return o.id === val });
      _this.modalViewFeedback = true;
    },
    handleModalViewRalation(item){
      var _this = this;
      _this.updateRelationGoalId = item.id;
      if(item.relation && item.relation.length){
        _this.relationArray = [];
        _.forEach(item.relation, (o)=> {
          _this.relationArray.push({ GoalId: o.goalId, RelatedGoalId: o.relatedGoalId, Type: o.type });
        });
        _this.options = _.cloneDeep(_this.companyGoalList);
      }
      else
      {
        _this.clearRelationById();
      }
      _this.modalViewRalation = true;
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
      _this.clearRelation();
      _this.modalCreateGoal = true;
    },
    submit: _.debounce(async function () {
      var _this = this;
      try {
        var response = await _this.$store.dispatch("$_checkInUser/editGoal", _this.formCreate);
        if(response && response.id){
          if(_this.relationArray && _this.relationArray.length && _this.relationArray[0].RelatedGoalId && _this.relationArray[0].Type){
            var relationArraySubmit = _.map(_this.relationArray, (o) => {
              o.GoalId = response.id;
              return o;
            });
            var arrayToString = JSON.stringify(relationArraySubmit);
            await _this.$store.dispatch("$_checkInUser/createRelation", arrayToString);
          }
        }
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
        _this.clearRelation();
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
    }, 500),
    remoteMethod(query) {
        var _this = this;
        if (query !== '') {
          _this.loading = true;
          setTimeout(() => {
            _this.loading = false;
            _this.options = _this.companyGoalList.filter(item => {
              return item.name.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          _this.options = [];
        }
      },
    updateRelation: _.debounce(async function () {
      var _this = this;
      try {
          if(_this.relationArray && _this.relationArray.length && _this.relationArray[0].RelatedGoalId && _this.relationArray[0].Type){
            var arrayToString = JSON.stringify(_this.relationArray);
            await _this.$store.dispatch("$_checkInUser/createRelation", arrayToString);
          }
          _this.$notify({
            title: "Chúc mừng",
            message: "Cập nhật thành công",
            type: "success",
          });
        _this.modalViewRalation = false;
        _this.clearRelation();
        await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
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
