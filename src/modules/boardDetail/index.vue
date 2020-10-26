<template>
  <div>
    <div class="white-background">
      <div class="row justify-content-between align-items-center">
        <div class="col-md-6">
          <button class="btn btn-primary btn-medium" @click="openCreateTask">Tạo task</button>
        </div>
        <div class="col-md-6 text-right">
          <a href="javascript:;" @click="showStickyMenu">
            <font-awesome-icon :icon="['fas', 'ellipsis-h']" />
            <span class="ml-2">Show menu</span>
          </a>
        </div>
      </div>
    </div>
    <div class="main container-fluid">
      <div class="row">
        <div class="col-3" v-for="(item, index) in listCard" :key="item.id">
          <div class="wrapper-list">
            <div class="list-title">{{ boardDetail && boardDetail.cardGroup && boardDetail.cardGroup.length && boardDetail.cardGroup[index] ? boardDetail.cardGroup[index].title : "" }}</div>
            <draggable class="list-group" :value="item" group="working" ghost-class="ghost" :move="checkMove">
              <div
                class="list-group-item"
                v-for="card in item" :key="card.id" @click="openCardDetail(card)">
                {{ card.title }}
              </div>
            </draggable>
            <div class="list-add-item" v-if="showInput && boardDetail.cardGroup[index].id === selectedId">
              <input class="input-primary medium mb-3" placeholder="Enter title for this group" v-model="formCard.title" />
              <div class="d-flex">
                <button class="btn btn-secondary btn-small mr-3" @click="createCard">Thêm</button>
                <font-awesome-icon :icon="['fas', 'times']" @click="closeAddInput()"/>
              </div>
            </div>
            <button class="btn btn-secondary btn-small" @click="openAddInput(index)" v-if="!showInput || boardDetail.cardGroup[index].id != selectedId">
              <font-awesome-icon :icon="['fas', 'plus']" class="mr-2" />
              <span>Thêm công việc</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="modal-sticky-right" :class="stickyMenu == false ? '' : 'active'">
      <div class="header">
        <div>Menu</div>
        <font-awesome-icon :icon="['fas', 'times']" @click="closeStickyMenu"/>
      </div>
      <div class="content">
        
      </div>
    </div>
    <el-dialog
      title="Chi tiết"
      :visible.sync="modalCardDetail"
      class="transition-box-center"
      width="60%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div>
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
                <div v-if="formUpdate.userListArray" class="d-flex">
                  <div class="avatar-circle board" v-for="user in formUpdate.userListArray" :key="user.id">
                    <div class="inside img-thumbnail" :style="{ backgroundImage: `url(${user && user.avatar ? user.avatar : ''})` }"></div>
                  </div>
                </div>
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
                <div v-for="status in commonData.cardStatus" :key="status.code" class="p-2">
                  <div class="label-style" :style="{backgroundColor: status.color }">{{status.name}}</div>
                </div>
                <div class="p-2">
                  <el-select
                    v-model="formUpdate.status"
                    placeholder="Chọn trạng thái">
                    <el-option
                      v-for="status in commonData.cardStatus"
                      :key="status.code"
                      :label="status.name"
                      :value="status.code">
                    </el-option>
                  </el-select>
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>   
        </div>
        <div class="text-right mt-2">
          <span slot="footer" class="dialog-footer">
              <button class="btn btn-primary btn-medium" @click="updateCard">
                Cập nhật
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
export default {
  components: {
    VueEditor,
    draggable
  },
  data() {
    return {
      commonData,
      activeNames: ['1'],   
      modalCardDetail: false,
      enabled: true,
      dragging: false,
      showInput: false,
      modalCreateTask: false,
      stickyMenu: false,
      selectedId: null,
      formCard: {
        title: "",
        ordinalNumber: 1,
        cardGroupId: "",
        isDelete: false,
      },
      formUpdate: {
        title: "",
      },
    };
  },
  computed: {
    ...mapState({
      cardGroup: state => state.$_boardDetail.cardGroup,
    }),
    ...mapGetters({
        userList: "$_boardDetail/getUserList",
        listCard: "$_boardDetail/getListCard",
        boardDetail: "$_boardDetail/getBoardDetail",
    }),
  },
  async created() {
    var _this = this;
    const STORE_KEY = "$_boardDetail";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      _this.$store.registerModule(STORE_KEY, store);
    }
    await _this.$store.dispatch("$_boardDetail/getUserList");
    if (_this.$route.params.id) {
      await _this.$store.dispatch("$_boardDetail/getBoardDetail", _this.$route.params.id);
    }
  },
  methods: {
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
      _this.modalCardDetail = true;
    },
    openCreateTask(){
      var _this = this;
      _this.modalCreateTask = true;
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
          e.draggedContext.element.ordinalNumber = e.relatedContext.element.ordinalNumber;
          e.draggedContext.element.cardGroupId = e.relatedContext.element.cardGroupId;
          let cardNeedToMove = {
            cardId: e.draggedContext.element.id,
            cardGroupId: e.draggedContext.element.cardGroupId,
            moveTo: e.draggedContext.element.ordinalNumber
          }
          await _this.$store.dispatch("$_boardDetail/moveCard", cardNeedToMove);
          setTimeout( async () => {
            await _this.$store.dispatch("$_boardDetail/getBoardDetail", _this.$route.params.id);
            await _this.sendSocket();
          },1000);
      }
    },
    async createCard(){
      var _this = this;
      _this.formCard.cardGroupId = _this.selectedId;
      await _this.$store.dispatch("$_boardDetail/createCard", _this.formCard);
      await _this.$store.dispatch("$_boardDetail/getBoardDetail", _this.$route.params.id);
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
      _this.formUpdate.title = "";
      _this.modalCardDetail = false;
    },
    async sendSocket(){
      var _this = this;
      await _this.$store.dispatch("$_loginPage/sendSocket", ({ userInput: null, messageInput: null, functionInput: "$_boardDetail/getBoardDetail", paramsInput: _this.$route.params.id, typeInput: "moveCard" }));
    }
  },  
};
</script>
<style scoped>
.label-style{
  width: 100%;
  height: 30px;
  border-radius: 5px;
  background-color: black;
  color: white;
  text-align: center;
}
</style>