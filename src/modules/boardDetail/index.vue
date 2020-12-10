<template>
  <div>
    <!-- Header -->
    <div class="board-detail-header">
      <div class="row justify-content-between align-items-center">
        <div class="col-md-6 d-flex" :class="{ 'text-white' : boardDetail.backgroundColor }">
          <div class="title">{{ boardDetail && boardDetail.title ? boardDetail.title : ''}}</div>
          <div class="ml-2" v-for="user in boardDetail.userList" :key="user.id">
            <div v-if="boardDetail.userList">
              <el-tooltip class="item" effect="dark" :content="user.fullName" placement="top-start">
                <div class="avatar-circle board">
                  <div class="inside img-thumbnail" :style="{ backgroundImage: `url(${user && user.avatar ? user.avatar : ''})` }"></div>
                </div>
              </el-tooltip>
            </div>
          </div>
          <div class="ml-5">
            <div class="position-relative">
              <el-autocomplete
                class="input-primary small"
                v-model="description"
                :fetch-suggestions="advanceSearch"
                :placeholder="$t('checkinPage.placeholderSearch')"
                @select="handleSelect"
              ></el-autocomplete>
              <font-awesome-icon :icon="['fas', 'search']" class="icon-search"/>
            </div>
          </div>
        </div>
        <div class="col-md-6 text-right">
          <a href="javascript:;" @click="showStickyMenu" :class="{ 'text-white' : boardDetail.backgroundColor }">
            <font-awesome-icon :icon="['fas', 'ellipsis-h']" />
            <span class="ml-2">Show menu</span>
          </a>
        </div>
      </div>
    </div>
    <!-- Content -->
    <div class="main board-detail-background container-fluid" :style="{ backgroundImage: `url(${boardDetail && boardDetail.backgroundColor ? require(`@/assets/landscapes/${boardDetail.backgroundColor}`) : ''})` }">
      <div class="row board-detail-content">
        <div class="col-3" v-for="(item, index) in listCard" :key="item.id">
          <div class="wrapper-list" :class="boardDetail && boardDetail.backgroundColor ? 'background' : ''" >
            <div class="list-title">
              <div class="col-md-12 d-flex justify-content-between">
                <span class="cursor-pointer" v-if="boardDetail && boardDetail.cardGroup && boardDetail.cardGroup.length && boardDetail.cardGroup[index] && boardDetail.cardGroup[index].status === 'lock' ">
                  <font-awesome-icon :icon="['fas', 'lock']"/>
                </span>
                  {{ boardDetail && boardDetail.cardGroup && boardDetail.cardGroup.length && boardDetail.cardGroup[index] ? boardDetail.cardGroup[index].title : "" }}
                <span class="cursor-pointer">
                  <font-awesome-icon :icon="['fas', 'arrows-alt']" class="mr-2" @click="openMoveCardGroupManual(boardDetail.cardGroup[index])"/>
                  <font-awesome-icon :icon="['fas', 'ellipsis-h']" @click="openEditCardGroup(boardDetail.cardGroup[index])"/>
                </span>
              </div>
            </div>
            <div class="list-group-event" v-on:scroll="handleScroll($event, index)">
              <draggable class="list-group" :list="listCard[index]" group="working" ghost-class="ghost" :move="checkMove">
                <transition-group>
                  <div
                    :class="`list-group-item ${ !card.title ? 'invisible-card' : ''}`"
                    v-for="card in item" :key="card.id" @click="openCardDetail(card)" @contextmenu.prevent="$refs.card.open($event, card)">
                    <div>
                        <el-tooltip class="item" effect="dark" :content="commonData.cardStatus.find(o=>{ return o.code === card.status }).name" placement="top-start" v-if="card.status">
                          <div class="d-inline-block circle-dot" :style="{backgroundColor: commonData.cardStatus.find(o=>{ return o.code === card.status }).color }"></div>
                        </el-tooltip>
                        <div class="d-inline ml-2">{{ card.title }}</div>
                    </div>
                  </div>
                </transition-group>
              </draggable>
            </div>
            <div class="list-add-item" v-if="showInput && boardDetail.cardGroup[index].id === selectedId">
              <input class="input-primary medium mb-3" placeholder="Enter title for this group" v-model="formCard.title" />
              <div class="d-flex">
                <button class="btn btn-secondary btn-small mr-3" @click="createCard">Thêm</button>
                <font-awesome-icon :icon="['fas', 'times']" @click="closeAddInput()"/>
              </div>
            </div>
            <div class="spinner-loading" v-if="loading && loadingId == index">
              <span class="mr-2">Loading</span>
              <font-awesome-icon :icon="['fas', 'spinner']" /> 
            </div>
            <button class="btn btn-secondary btn-small mt-4" @click="openAddInput(index)" v-if="!showInput || boardDetail.cardGroup[index].id != selectedId">
              <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />
              <span>Thêm công việc</span>
            </button>
          </div>
        </div>
      </div>
      <!-- Float menu button -->
      <circle-menu type="top" :number="2" animate="animated jello" mask='white' circle>
        <button type="button" slot="item_btn">
           <font-awesome-icon :icon="['fas', 'plus']" />
        </button>
        <a slot="item_1" @click="openCreateColumn">
          <el-tooltip class="item" effect="light" content="Tạo cột" placement="top-start">
            <font-awesome-icon :icon="['fas', 'columns']" />
          </el-tooltip>
        </a>
          <a slot="item_2" @click="openAddNewMember">
            <el-tooltip class="item" effect="light" content="Thêm thành viên" placement="top-start">
              <font-awesome-icon :icon="['fas', 'adjust']" />
            </el-tooltip>
          </a>
      </circle-menu>
    </div>
    <!-- Right mouse click -->
    <vue-context ref="card" v-slot="{ data }">
      <template v-if="data">
        <li>
          <a @click.prevent="openCardDetail(data)">
            <font-awesome-icon :icon="['fas', 'edit']" class="mr-1"/>
              Chỉnh sửa
          </a>
        </li>
        <li>
          <a @click.prevent="openMoveCard(data)">
            <font-awesome-icon :icon="['fas', 'arrows-alt']" class="mr-1"/>
              Di chuyển
          </a>
        </li>
        <li>
          <a v-clipboard:copy="`${href}?cardId=${data.id}`">
            <font-awesome-icon :icon="['fas', 'share-alt']" class="mr-1"/>
              Copy link
          </a>
        </li>
        <li>
          <a @click.prevent="remove(data.id)">
            <font-awesome-icon :icon="['fas', 'trash']" class="mr-1"/>
              Xóa thẻ
          </a>
        </li>
      </template>
    </vue-context>  
    <!-- Board menu setting -->
    <div class="modal-sticky-right" :class="stickyMenu == false ? '' : 'active'">
      <div class="header">
        <div>Menu</div>
        <font-awesome-icon :icon="['fas', 'times']" @click="closeStickyMenu"/>
      </div>
      <div class="content">
        <el-collapse v-model="activeSettingNames">
          <el-collapse-item title="Thông tin" name="1">
            <div>
              <div class="form-group">
                <label class="control-label font-weight-bold">Tiêu đề
                  <font-awesome-icon :icon="['fas', 'edit']" class="ml-2" @click="showEdit('title')" v-if="!boardEdit.title"/>
                  <font-awesome-icon :icon="['fas', 'redo']" class="ml-2" @click="undoEdit('title')" v-if="boardEdit.title"/>
                </label>
                <div class="mb-20">
                  <span v-if="!boardEdit.title">{{ boardDetail.title ? boardDetail.title : "" }}</span>
                  <input
                    v-if="boardEdit.title"
                    type="text"
                    class="input-primary medium"
                    placeholder="Nhập tiêu đề"
                    v-model="boardDetail.title"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="control-label font-weight-bold">Mô tả
                  <font-awesome-icon :icon="['fas', 'edit']" class="ml-2" @click="showEdit('description')" v-if="!boardEdit.description"/>
                  <font-awesome-icon :icon="['fas', 'redo']" class="ml-2" @click="undoEdit('description')" v-if="boardEdit.description"/>
                </label>
                <div class="mb-20">
                  <span v-if="boardDetail.description"> {{ boardDetail.description }} </span>
                  <span v-if="!boardDetail.description && !boardEdit.description">Chưa có mô tả</span>
                  <textarea placeholder="Nhập mô tả" rows="4" class="w-100" v-if="boardEdit.description" v-model="boardDetail.description"></textarea>
                </div>
              </div>
              <div class="text-right" v-if="boardEdit.title || boardEdit.description">
                <button class="btn btn-primary btn-medium" @click="updateBoard">
                    Cập nhật
                </button>
              </div>
            </div>
          </el-collapse-item>
          <el-collapse-item title="Hình nền" name="2">
            <div class="row">
              <div class="col-md-6 mb-3" v-for="(item, index) in commonData.landscapeImages" :key="index">
                <a href="javascript:;" @click="updateLandscape(item)"><img :class="`img-fluid img-thumbnail landscape-images ${boardDetail && boardDetail.backgroundColor===item ? 'bg-selected-border' : '' }`" :src="require(`@/assets/landscapes/${item}`)" /></a>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
    </div>
    <!-- modal card details -->
    <el-dialog
      :visible.sync="modalCardDetail"
      class="transition-box-center"
      width="60%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div slot="title" class="dialog-custom-title">
        <div v-if="formUpdate.showCountDown">
          <vue-countdown-timer
            :start-time="formUpdate.countDownStart"
            :end-time="formUpdate.countDownEnd"
            :interval="1000"
            :end-text="'Hết hạn'"
            :day-txt="'ngày'"
            :hour-txt="'giờ'"
            :minutes-txt="'phút'"
            :seconds-txt="'giây'">
            <template slot="countdown" slot-scope="scope">
              <div class="countdown d-flex">
                <div v-if="scope.props.days > 0" class="mr-2">
                  {{scope.props.days}} {{scope.props.dayTxt}}
                </div>
                <div v-if="scope.props.hours > 0" class="mr-2">
                  {{scope.props.hours}} {{scope.props.hourTxt}}
                </div>
                <div v-if="scope.props.minutes > 0" class="mr-2">
                  {{scope.props.minutes}} {{scope.props.minutesTxt}}
                </div>
                <div>
                  {{scope.props.seconds}} {{scope.props.secondsTxt}}
                </div>
              </div>
            </template>
            <template slot="end-text" slot-scope="scope">
              <span class="countdown due">{{ scope.props.endText}}</span>
            </template>
          </vue-countdown-timer>
        </div>
        <div class="countdown" v-if="!formUpdate.showCountDown && formUpdate.dueDate">
          <el-tooltip class="item" effect="dark" content="Hạn hoàn thành" placement="top-start">
            <span>{{ formUpdate.dueDate }}</span>
          </el-tooltip>
          <font-awesome-icon :icon="['fas', 'bell']" class="ml-2"/>
        </div>
        <div>
          <div class="mr-2 d-inline">{{ formUpdate.title }}</div>
          <div class="d-inline tag" :style="{backgroundColor: commonData.cardStatus.find(o=>{ return o.code === formUpdate.status }).color }" v-if="formUpdate.status">
            {{ commonData.cardStatus.find(o=>{ return o.code === formUpdate.status }).name }}
          </div>
        </div>
        <el-tag type="info" class="mr-2 mt-2"  v-for="(label, index) in formUpdate.label" :key="index">{{label}}</el-tag>
        <div class="d-flex mt-2" >
          <div class="mr-2" v-for="user in formUpdate.userListArray" :key="user.id">
            <div v-if="formUpdate.userListArray">
              <el-tooltip class="item" effect="dark" :content="user.fullName" placement="top-start">
                <div class="avatar-circle board">
                  <div class="inside img-thumbnail" :style="{ backgroundImage: `url(${user && user.avatar ? user.avatar : ''})` }"></div>
                </div>
              </el-tooltip>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-body">
        <div class="row">
          <div class="col-md-8">
            <div class="form-group">
              <label class="control-label font-weight-bold">Tiêu đề</label>
              <div class="mb-20">
                <input
                  type="text"
                  class="input-primary medium"
                  placeholder="Nhập tiêu đề"
                  v-model="formUpdate.title"
                />
              </div>
            </div>
            <div class="form-group">
              <label class="control-label font-weight-bold">Mô tả</label>
              <div class="mb-20">
                <vue-editor v-model="formUpdate.description" placeholder="Nhập nội dung" name="content"></vue-editor>
              </div>
            </div>
          </div>
          <div class="col-md-4"><br>
            <el-collapse v-model="activeNames">
              <el-collapse-item title="Người phụ trách" name="1">
                <el-select
                  v-model="formUpdate.assign"
                  clearable
                  multiple
                  placeholder="Chọn người phụ trách"
                  class="w-100 p-2"
                  >
                  <el-option
                    v-for="user in boardDetail.userList"
                    :key="user.id"
                    :label="user.fullName"
                    :value="user.id"
                  >
                  </el-option>
                </el-select>
              </el-collapse-item>
              <el-collapse-item title="Hạn hoàn thành" name="2">
                <div class="p-2">
                  <el-date-picker
                    class="w-100"
                    v-model="formUpdate.dueDate"
                    type="datetime"
                    placeholder="Chọn ngày bắt đầu"
                    format="dd/MM/yyyy HH:mm"
                    value-format="dd/MM/yyyy HH:mm">
                  </el-date-picker>
                </div>
              </el-collapse-item>
              <el-collapse-item title="Label" name="3">
                  <el-select
                    v-model="formUpdate.label"
                    multiple
                    filterable
                    allow-create
                    default-first-option
                    placeholder="Chọn label">
                    <el-option
                      v-for="label in commonData.labelList"
                      :key="label.code"
                      :label="label.code"
                      :value="label.code">
                    </el-option>
                  </el-select>
              </el-collapse-item>
              <el-collapse-item title="Trạng thái" name="4">
                <div class="p-2">
                  <el-select
                    v-model="formUpdate.status"
                    placeholder="Chọn trạng thái">
                    <el-option
                      v-for="status in commonData.cardStatus"
                      :key="status.code"
                      :label="status.name"
                      :value="status.code">
                      <div class="d-flex align-items-center">
                        <div class="circle-dot" :style="{backgroundColor: status.color }"></div>
                        <div class="ml-2">{{ status.name }}</div>
                      </div>
                    </el-option>
                  </el-select>
                </div>
              </el-collapse-item>
              <el-collapse-item title="Liên kết mục tiêu" name="5">
                <div class="p-2">
                  <el-select
                    v-model="formUpdate.goalId"
                    filterable
                    :remote-method="remoteMethod"
                    reserve-keyword
                    placeholder="Chọn mục tiêu liên kết"
                    :loading="loading">
                    <el-option
                      v-for="goal in options"
                      :key="goal.id"
                      :label="goal.name"
                      :value="goal.id">
                    </el-option>
                  </el-select>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>   
        </div>
      </div>     
       <div slot="footer">
          <div class="text-right mt-2">
            <span slot="footer" class="dialog-footer">
                <button class="btn btn-primary btn-medium" @click="updateCard">
                  Cập nhật
                </button>
            </span>
          </div>
       </div>
    </el-dialog>
    <!-- Create new column -->
     <el-dialog
      title="Tạo cột mới"
      :visible.sync="modalCreateColumn"
      class="transition-box-center"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div>
        <div class="form-group">
          <label class="control-label font-weight-bold">Tên cột</label>
            <div class="mb-20">
              <input
                type="text"
                class="input-primary medium"
                placeholder="Nhập tên cột"
                v-model="formCardGroup.title"
              />
            </div>       
        </div>
        <div class="text-right mt-2">
          <span slot="footer" class="dialog-footer">
              <button class="btn btn-primary btn-medium" @click="createCardGroup">
                Tạo cột
            </button>
          </span>
        </div>
      </div>
    </el-dialog>
    <!-- move card manual -->
    <el-dialog
      title="Di chuyển"
      :visible.sync="modalMoveCardManual"
      class="transition-box-center"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <div>
        <div class="form-group">
          <label class="control-label font-weight-bold">Tên thẻ</label>
            <div class="mb-20">
              <div>{{formMoveManual.title}}</div>
            </div>       
        </div>
        <div class="form-group">
          <label class="control-label font-weight-bold">Di chuyển tới cột</label>
            <div class="mb-20">
              <el-select
                  v-model="formMoveManual.cardGroupId"
                  placeholder="Chọn cột muốn chuyển tới"
                  class="w-100"
                  >
                  <el-option
                    v-for="column in boardDetail.cardGroup"
                    :key="column.id"
                    :label="column.title"
                    :value="column.id"
                  >
                  </el-option>
                </el-select>
            </div>       
        </div>
        <div class="text-right mt-2">
          <span slot="footer" class="dialog-footer">
            <button class="btn btn-primary btn-medium" @click="moveManual">
              Đồng ý
            </button>
          </span>
        </div>
      </div>
    </el-dialog>
    <!-- update column -->
    <el-dialog
      title="Cập nhật cột"
      :visible.sync="modalEditCardGroup"
      class="transition-box-center"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false">
      <div>
        <div class="form-group">
          <label class="control-label font-weight-bold">Tiêu đề</label>
          <div class="mb-20">
            <input
              type="text"
              class="input-primary medium"
              placeholder="Nhập tiêu đề"
              v-model="formCardGroup.title"
            />
          </div>
          </div>
          <div class="form-group">
            <label class="control-label font-weight-bold">Chế độ</label>
            <el-select
              v-model="formCardGroup.status"
              placeholder="Chọn cột muốn chuyển tới"
              class="w-100"
            >
              <el-option
                v-for="status in commonData.cardGroupStatus"
                :key="status.code"
                :label="status.name"
                :value="status.code"
              >
              </el-option>
            </el-select>
          </div>
          <div class="text-right mt-2">
            <span slot="footer" class="dialog-footer">
              <button class="btn btn-primary btn-medium" @click="updateCardGroup">
                Cập nhật
              </button>
            </span>
          </div>
      </div>
      </el-dialog>
      <!-- Move card group manual -->
      <el-dialog
        title="Di chuyển"
        :visible.sync="modalMoveCardGroupManual"
        class="transition-box-center"
        width="30%"
        :close-on-click-modal="false"
        :close-on-press-escape="false">
        <div>
          <div class="form-group">
            <label class="control-label font-weight-bold">Tên cột</label>
              <div class="mb-20">
                <div>{{formCardGroup.title}}</div>
              </div>       
          </div>
          <div class="form-group">
            <label class="control-label font-weight-bold">Di chuyển tới cột</label>
              <div class="mb-20">
                <el-select
                    v-model="formCardGroup.ordinalNumber"
                    placeholder="Chọn cột muốn chuyển tới"
                    class="w-100"
                    >
                    <el-option
                      v-for="(column, index) in cardGroup"
                      :key="index"
                      :label="index"
                      :value="index"
                    >
                    </el-option>
                  </el-select>
              </div>       
          </div>
          <div class="text-right mt-2">
            <span slot="footer" class="dialog-footer">
              <button class="btn btn-primary btn-medium" @click="moveCardGroupManual">
                Đồng ý
              </button>
            </span>
          </div>
        </div>
      </el-dialog>
      <!-- Add new member -->
      <el-dialog
        title="Thêm thành viên"
        :visible.sync="modalAddNewMember"
        class="transition-box-center"
        width="30%"
        :close-on-click-modal="false"
        :close-on-press-escape="false">
        <div>
          <el-select
            v-model="participant"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="Chọn thành viên">
              <el-option
                v-for="user in userList"
                :key="user.id"
                :label="user.fullName"
                :value="user.id">
              </el-option>
          </el-select>
          <div class="text-right mt-2">
            <span slot="footer" class="dialog-footer">
              <button class="btn btn-primary btn-medium" @click="updateBoard">
                Cập nhật
              </button>
            </span>
          </div>
        </div>
      </el-dialog>
      <!-- Remove card -->
      <el-dialog
        title="Xóa thẻ"
        :visible.sync="modalDeleteCard"
        class="transition-box-center"
        width="30%"
        :close-on-click-modal="false"
        :close-on-press-escape="false">
        <div>
          Bạn có chắc muốn xóa thẻ này không ?
          <div class="text-right mt-2">
            <span slot="footer" class="dialog-footer">
              <button class="btn btn-primary btn-medium" @click="deleteCard">
                Đồng ý
              </button>
            </span>
          </div>
        </div>
      </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import store from "./_store";
import draggable from "vuedraggable";
import _ from "lodash";
import commonData from "../../utils/common-data";
import { VueEditor } from "vue2-editor";
import VueContext from 'vue-context';
import 'vue-context/src/sass/vue-context.scss';
import moment from 'moment';
import CircleMenu from 'vue-circle-menu'
export default {
  components: {
    VueEditor,
    draggable,
    VueContext,
    CircleMenu
  },
  data() {
    return {
      commonData,
      activeNames: ['1'],
      modalDeleteCard: false,   
      modalCardDetail: false,
      modalMoveCardManual: false,
      modalMoveCardGroupManual: false,
      modalEditCardGroup: false,
      modalAddNewMember: false,
      activeSettingNames: ['1'],
      href: null,
      participant: [],
      enabled: true,
      dragging: false,
      showInput: false,
      modalCreateColumn: false,
      stickyMenu: false,
      selectedId: null,
      cardIdNeedToDelete: "",
      description: "",
      loadingId: null,
      formCard: {
        title: "",
        ordinalNumber: 1,
        cardGroupId: "",
        isDelete: false,
      },
      formUpdate: {
        title: "",
      },
      formCardGroup: {
        title: "",
        isDelete: false,
        status: "unlock"
      },
      boardEdit: {
        title: false,
        description: false
      },
      showButtonUpdateBoard: false,
      formMoveManual: {
        title: "",
      },
      loading: false,
      options: [],
    };
  },
  computed: {
    ...mapState({
      cardGroup: state => state.$_boardDetail.cardGroup,
      searchRequest: state => state.$_boardDetail.searchRequest,
    }),
    ...mapGetters({
        userList: "$_boardDetail/getUserList",
        listCard: "$_boardDetail/getListCard",
        boardDetail: "$_boardDetail/getBoardDetail",
        companyGoalList: "$_boardDetail/getCompanyGoalList",
    }),
  },
  async created() {
    var _this = this;
    const STORE_KEY = "$_boardDetail";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      _this.$store.registerModule(STORE_KEY, store);
    }
    _this.href = window.location.href;
    await _this.$store.dispatch("$_boardDetail/getUserList");
    await _this.$store.dispatch("$_boardDetail/getBoardDetail", _this.$route.params.id);
    await _this.$store.dispatch("$_boardDetail/getAllGoalOfCompany");
    _this.options = _.cloneDeep(_this.companyGoalList);
    if(_this.$route.query.cardId){
      _this.href = _this.href.replace(`?cardId=${_this.$route.query.cardId}`,"");
      let cardInfo = await _this.$store.dispatch("$_boardDetail/getCardById", _this.$route.query.cardId);
      if(cardInfo && cardInfo.id){
        _this.openCardDetail(cardInfo);
      }
    }
  },
  mounted: function () {
    window.addEventListener('scroll', this.handleScroll);
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    remoteMethod(query) {
      console.log(query);
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
    handleSelect(item){
      var _this = this;
      _this.openCardDetail(item);
    },
    async advanceSearch(queryString, cb){
      var _this = this;
      let fromSearch = {
        boardId: _this.$route.params.id,
        description: _this.description
      };
      let response =  await _this.$store.dispatch("$_boardDetail/advanceSearch", fromSearch);
      response.data = _.map(response.data, o => {
        o.value = o.title;
        return o;
      });
      cb(response.data);
    },
    openAddNewMember(){
      var _this = this;
      _this.participant = _.cloneDeep(_this.boardDetail.participantOject);
      _this.modalAddNewMember = true;
    },
    openMoveCardGroupManual(cardGroup){
      var _this = this;
      _this.formCardGroup = _.cloneDeep(cardGroup);
      _this.modalMoveCardGroupManual = true;
    },
    openEditCardGroup(cardGroup){
      var _this = this;
      _this.formCardGroup = _.cloneDeep(cardGroup);
      _this.modalEditCardGroup = true;
    },
    async updateCardGroup(){
      var _this = this;
      await _this.$store.dispatch("$_boardDetail/updateCardGroup", _this.formCardGroup);
      await _this.$store.dispatch("$_boardDetail/getBoardDetail", _this.$route.params.id);
      await _this.sendSocket();
      _this.modalEditCardGroup = false;
      _this.formCardGroup = {
        title: "",
        isDelete: false,
        status: "unlock"
      }
    },
    async deleteCard(){
      var _this = this;
      await _this.$store.dispatch("$_boardDetail/deleteCard", _this.cardIdNeedToDelete);
      await _this.$store.dispatch("$_boardDetail/getBoardDetail", _this.$route.params.id);
      await _this.sendSocket();
      _this.cardIdNeedToDelete = "";
      _this.modalDeleteCard = false;
    },
    openMoveCard(card){
      var _this = this;
      _this.formMoveManual = _.cloneDeep(card);
      _this.modalMoveCardManual = true;
    },
    alertName(name) {
      alert(`You clicked on "${name}"!`);
    },
    remove(id) {
      var _this = this;
      _this.cardIdNeedToDelete = id;
      _this.modalDeleteCard = true;
    },
    showEdit(type){
      var _this = this;
      _this.boardEdit[type] = true;
    },
    undoEdit(type){
      var _this = this;
      _this.boardEdit[type] = false;
    },
    openCardDetail(card){
      var _this = this;
      _this.formUpdate = _.cloneDeep(card);
      if(_this.formUpdate && _this.formUpdate.assign){
        _this.formUpdate.assign = JSON.parse(_this.formUpdate.assign.replace(/'/g, '"'));
        _this.formUpdate.userListArray = [];
        for(let i = 0; i < _this.formUpdate.assign.length; i++){
          let user = _.find(_this.userList, o => {return o.id === _this.formUpdate.assign[i]});
          _this.formUpdate.userListArray.push(user);
        }
      }
       if(_this.formUpdate && _this.formUpdate.label){
        _this.formUpdate.label = JSON.parse(_this.formUpdate.label.replace(/'/g, '"'));
      }
      let currentDate = moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
      if(_this.formUpdate && _this.formUpdate.dueDate){
        _this.formUpdate.showCountDown =  true ;
        _this.formUpdate.countDownStart = moment(currentDate, 'DD/MM/YYYY HH:mm:ss').format("X");
        _this.formUpdate.countDownStart = parseInt(_this.formUpdate.countDownStart);
        _this.formUpdate.countDownEnd = moment(_this.formUpdate.dueDate, 'DD/MM/YYYY HH:mm:ss').format("X");
        _this.formUpdate.countDownEnd = parseInt(_this.formUpdate.countDownEnd);
      }
      _this.modalCardDetail = true;
    },
    openCreateColumn(){
      var _this = this;
      _this.modalCreateColumn = true;
    },
    openAddInput(index){
      var _this = this;
      _this.selectedId = _this.boardDetail.cardGroup[index].id;
      _this.showInput = true;
    },
    closeAddInput(){
      var _this = this;
      _this.selectedId = null;
      _this.showInput = false;
    },
    showStickyMenu(){
      var _this = this;
      _this.stickyMenu = true;
    },
    closeStickyMenu(){
      var _this = this;
      _this.stickyMenu = false;
    },
    async checkMove(e){
      var _this = this;
      if(e && e.draggedContext && e.relatedContext){
          e.draggedContext.element.ordinalNumber = e.relatedContext.element.ordinalNumber || 1;
          e.draggedContext.element.cardGroupId = e.relatedContext.element.cardGroupId;
          let cardNeedToMove = {
            cardId: e.draggedContext.element.id,
            cardGroupId: e.draggedContext.element.cardGroupId,
            moveTo: e.draggedContext.element.ordinalNumber
          }
          await _this.$store.dispatch("$_boardDetail/moveCard", cardNeedToMove);
          await _this.sendSocket();
      }
    },
    async moveManual(){
      var _this = this;
      let index = _this.cardGroup.indexOf(_this.formMoveManual.cardGroupId);
      let maxOrdinal = _this.listCard && _this.listCard.length && _this.listCard[index] && _this.listCard[index].length ? _this.listCard[index].length : 0;
      _this.formMoveManual.ordinalNumber = maxOrdinal+1;
      let cardNeedToMove = {
        cardId: _this.formMoveManual.id,
        cardGroupId: _this.formMoveManual.cardGroupId,
        moveTo: _this.formMoveManual.ordinalNumber
      }
      await _this.$store.dispatch("$_boardDetail/moveCard", cardNeedToMove);
      await _this.$store.dispatch("$_boardDetail/getBoardDetail", _this.$route.params.id);
      await _this.sendSocket();
      _this.modalMoveCardManual = false;
    },
    async moveCardGroupManual(){
      var _this = this;
      let cardGroupNeedToMove = {
        cardGroupId: _this.formCardGroup.id,
        moveTo: _this.formCardGroup.ordinalNumber
      }
      await _this.$store.dispatch("$_boardDetail/moveCardGroup", cardGroupNeedToMove);
      await _this.$store.dispatch("$_boardDetail/getBoardDetail", _this.$route.params.id);
      await _this.sendSocket();
      _this.modalMoveCardGroupManual = false;
    },
    async createCard(){
      var _this = this;
      _this.formCard.cardGroupId = _this.selectedId;
      await _this.$store.dispatch("$_boardDetail/createCard", _this.formCard);
      await _this.$store.dispatch("$_boardDetail/getBoardDetail", _this.$route.params.id);
      await _this.sendSocket();
      _this.formCard.title = "";
      _this.closeAddInput();
    },
    async updateCard(){
      var _this = this;
      if(_this.formUpdate && _this.formUpdate.assign && _this.formUpdate.assign.length){
        _this.formUpdate.assign = JSON.stringify(_this.formUpdate.assign);
        _this.formUpdate.assign = _this.formUpdate.assign.replace(/"/g,"'");
      }
      if(_this.formUpdate && _this.formUpdate.label && _this.formUpdate.label.length){
        _this.formUpdate.label = JSON.stringify(_this.formUpdate.label);
        _this.formUpdate.label = _this.formUpdate.label.replace(/"/g,"'");
      }
      await _this.$store.dispatch("$_boardDetail/updateCard", _this.formUpdate);
      await _this.$store.dispatch("$_boardDetail/getBoardDetail", _this.$route.params.id);
      await _this.sendSocket();
      _this.formUpdate.title = "";
      _this.modalCardDetail = false;
    },
    async createCardGroup(){
      var _this = this;
      _this.formCardGroup.boardId = _this.boardDetail.id;
      _this.formCardGroup.ordinalNumber = _this.boardDetail.cardGroup && _this.boardDetail.cardGroup.length ? _this.boardDetail.cardGroup.length+1 : 1;
      await _this.$store.dispatch("$_boardDetail/createCardGroup", _this.formCardGroup);
      await _this.$store.dispatch("$_boardDetail/getBoardDetail", _this.$route.params.id);
      await _this.sendSocket();
      _this.formCardGroup.title = "";
      _this.modalCreateColumn = false;
    },
    async updateBoard(){
      var _this = this;
      if(_this.participant && _this.participant.length){
        _this.boardDetail.participant =  JSON.stringify(_this.participant);
        _this.boardDetail.participant = _this.boardDetail.participant.replace(/"/g,"'");
        _this.participant = [];
      }
      await _this.$store.dispatch("$_boardDetail/updateBoard", _this.boardDetail);
      await _this.$store.dispatch("$_boardDetail/getBoardDetail", _this.$route.params.id);
      _this.modalAddNewMember = false;
    }, 
    async sendSocket(){
      var _this = this;
      await _this.$store.dispatch("$_loginPage/sendSocket", ({ userInput: localStorage.getItem("userId"), messageInput: null, functionInput: "$_boardDetail/getBoardDetail", paramsInput: _this.$route.params.id, typeInput: "moveCard" }));
    },
    async handleScroll(event, index) {
      var _this = this;
      _this.loadingId = index;
      if((event.target.clientHeight + event.target.scrollTop) >= event.target.scrollHeight) {
        _this.loading = true;
        _this.searchRequest.pageIndex += 1;
        _this.searchRequest.pageSize = _this.searchRequest.pageSize*_this.searchRequest.pageIndex;
        _this.searchRequest.pageIndex = 1;
        await _this.$store.dispatch("$_boardDetail/getBoardDetail", _this.$route.params.id);
        _this.loading = false;
      }
    },
    updateLandscape(images){
      var _this = this;
      _this.boardDetail.backgroundColor = images;
      _this.updateBoard();
    }
  },  
};
</script>
<style scoped>
.bg-selected-border{
  border: 3px solid red;
}
.invisible-card{
  visibility: hidden;
  height: 0px;
}
</style>