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
            <draggable class="list-group" v-model="item.work" group="working" ghost-class="ghost" :move="checkMove">
              <div
                class="list-group-item"
                v-for="card in item" :key="card.id">
                {{ card.title }}
              </div>
            </draggable>
            <div class="list-add-item" v-if="showInput && item.id == selectedId">
              <input class="input-primary medium mb-3" placeholder="Enter title for this group" />
              <div class="d-flex">
                <button class="btn btn-secondary btn-small mr-3">Thêm</button>
                <font-awesome-icon :icon="['fas', 'times']" @click="closeAddInput(item)"/>
              </div>
            </div>
            <button class="btn btn-secondary btn-small" @click="openAddInput(item)" v-if="!showInput || item.id != selectedId">
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
// import _ from 'lodash';
import draggable from "vuedraggable";
export default {
  components: {
    draggable
  },
  data() {
    return {
      enabled: true,
      list:[
        {
          id: 1,
          title: "Starting",
          work: [
            { name: 'Task 1', GroupId: 1, ordinal: 1},
            { name: 'Task 2', GroupId: 1, ordinal: 2},
            { name: 'Task 3', GroupId: 1, ordinal: 3},
          ],
        },
        {
          id: 2,
          title: "Process",
          work: [
            { name: 'Task 4', GroupId: 2, ordinal: 1},
            { name: 'Task 5', GroupId: 2, ordinal: 2},
            { name: 'Task 6', GroupId: 2, ordinal: 3},
          ],
        },
        {
          id: 3,
          title: "Done",
          work: [
            { name: 'Task 7', GroupId: 3, ordinal: 1},
            { name: 'Task 8', GroupId: 3, ordinal: 2},
            { name: 'Task 9', GroupId: 3, ordinal: 3},
          ],
        }
      ],
      dragging: false,
      showInput: false,
      modalCreateTask: false,
      stickyMenu: false,
      selectedId: null
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
    openAddInput(item){
      var _this = this;
      _this.selectedId = item.id;
      _this.showInput = true;
    },
    closeAddInput(item){
      var _this = this;
      _this.selectedId = item.id;
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
    checkMove(e){
      if(e && e.draggedContext && e.relatedContext){
        e.draggedContext.element.GroupId = e.relatedContext.element.GroupId;
      }
    }
  },
};
</script>
