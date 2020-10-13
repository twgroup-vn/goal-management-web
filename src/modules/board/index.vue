<template>
  <div>
    <div class="main container-fluid">
      <div class="row mb-4">
        <div class="col-12 board-title">
          <font-awesome-icon :icon="['fas', 'clock']" class="icon" />
          <div class="text">{{ $t("boardPage.titleRecentView") }}</div>
        </div>
        <div class="col-md-3">
          <!-- <router-link :to="`/boardDetail/${item.id}`"> -->
          <router-link :to="`/boardDetail`">
            <div class="card boardCard">
              <div class="card-body">
                <div class="text-inside">Test</div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="row mb-4">
        <div class="col-12 board-title">
          <font-awesome-icon :icon="['fas', 'user']" class="icon" />
          <div class="text">{{ $t("boardPage.titlePersonalBoard") }}</div>
        </div>
        <div class="col-md-3">
          <div class="card boardCreate" @click="createNewBoard">
            <div class="card-body">
              <div class="text-inside">Create new</div>
            </div>
          </div>
        </div>
        <div class="col-md-3">
          <!-- <router-link :to="`/boardDetail/${item.id}`"> -->
          <router-link :to="`/boardDetail`">
            <div class="card boardCard">
              <div class="card-body">
                <div class="text-inside">Test</div>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>

    <el-dialog title="Tạo mới công việc" :visible.sync="modalCreateBoard" class="transition-box-center" width="60%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="modal-body">       
        Tạo mới
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import store from "./_store";
// import _ from 'lodash';
export default {
  components: {},
  data() {
    return {
      modalCreateBoard: false
    };
  },
  computed: {
    ...mapState({
      // searchRequest: state => state.$_board.searchRequest,
    }),
    ...mapGetters({
        // data: "$_board/getData",
    }),
  },
  async created() {
    var _this = this;
    const STORE_KEY = "$_board";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      _this.$store.registerModule(STORE_KEY, store);
    }
    // await _this.$store.dispatch("$_board/getData");
  },
  methods: {
    redirectTo: function (path) {
        if (path) {
          this.$router.push(path)
        } else {
          this.$router.go(-1)
        }
    },
    createNewBoard(){
      var _this =  this;
      _this.modalCreateBoard = true;
    }
  },
};
</script>
