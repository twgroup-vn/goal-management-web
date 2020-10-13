<template>
  <div>
    <div class="main container-fluid">
      <div class="row">
        <div class="col-3">
          <h3>Công việc của Thuận</h3>
          <draggable class="list-group" :list="work1" group="people" @change="log">
            <div
              class="list-group-item"
              v-for="item in work1" :key="item.id">
              {{ item.name }} {{ item.GroupId }}
            </div>
          </draggable>
          <button class="btn btn-secondary mt-4" @click="addTask">Thêm</button>
        </div>

        <div class="col-3">
          <h3>Công việc của Nhựt</h3>
          <draggable class="list-group" :list="work2" group="people" @change="log">
            <div
              class="list-group-item"
              v-for="item in work2"
              :key="item.id"
            >
              {{ item.name }} {{ item.GroupId }}
            </div>
          </draggable>
          <button class="btn btn-secondary mt-4" @click="addTask">Thêm</button>
        </div>
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
      list: [
        { name: "Công việc của Thuận", id: 1, ordinal: 1 },
        { name: "Công việc của Nhựt", id: 2, ordinal: 2 },
      ],
      work1: [
        { name: 'Task 1', GroupId: 1, ordinal: 1},
        { name: 'Task 2', GroupId: 1, ordinal: 2},
        { name: 'Task 3', GroupId: 1, ordinal: 3},

      ],
      work2: [
        { name: 'Task 1', GroupId: 2, ordinal: 1},
        { name: 'Task 2', GroupId: 2, ordinal: 2},
        { name: 'Task 3', GroupId: 2, ordinal: 3},

      ],
      dragging: false
    };
  },
  computed: {
    ...mapState({
      // searchRequest: state => state.$_boardDetail.searchRequest,
    }),
    ...mapGetters({
        // data: "$_boardDetail/getData",
    }),
  },
  async created() {
    var _this = this;
    const STORE_KEY = "$_boardDetail";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      _this.$store.registerModule(STORE_KEY, store);
    }
    // await _this.$store.dispatch("$_boardDetail/getData");
  },
  methods: {
    addTask() {
      var _this = this;
      _this.work2.push({ name: ""});
    },
    log(e) {
      console.log(e.added);
      if(e.added && e.added.element && e.added.element.length){
        e.added.element.GroupId = e.added.newIndex;
      }
    },
  },
};
</script>
