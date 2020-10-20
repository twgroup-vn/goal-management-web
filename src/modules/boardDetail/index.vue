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
                v-for="card in item" :key="card.id">
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
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import store from "./_store";
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  data() {
    return {
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
    async sendSocket(){
      var _this = this;
      await _this.$store.dispatch("$_loginPage/sendSocket", ({ userInput: null, messageInput: null, functionInput: "$_boardDetail/getBoardDetail", paramsInput: _this.$route.params.id, typeInput: "moveCard" }));
    }
  },  
};
</script>
