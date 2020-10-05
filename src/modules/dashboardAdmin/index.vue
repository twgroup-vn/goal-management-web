<template>
  <div>
    <div class="row justify-content-between align-items-center mb-3">
      <div class="col-md-6">
        <div class="row align-items-center">
          <div class="col-md-8">
            <input class="input-primary" placeholder="Tìm kiếm"/>  
          </div>
          <div class="col-md-4">
            <button class="btn btn-primary">Tìm kiếm</button>
          </div>
        </div>
      </div>
      <div class="col-md-6 text-right">
        <button class="btn btn-primary">Thêm mới</button>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-12">
        <table class="table table-hover">
          <thead class="thead-light">
            <tr>
              <th scope="col">Tên chu kỳ</th>
              <th scope="col">Ngày bắt đầu</th>
              <th scope="col">Ngày kết thúc</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tháng 9 - Tháng 10</td>
              <td>18/09/2020</td>
              <td>18/10/2020</td>
              <td>
                <div class="d-flex justify-content-end">
                  <font-awesome-icon :icon="['fas', 'edit']" class="mr-3"/>
                  <font-awesome-icon :icon="['fas', 'trash']" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <el-pagination class="text-right" background layout="prev, pager, next" :total="100"></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import store from "./_store";
export default {
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapState({
      state: (state) => state.$_dashboardAdmin,
    }),
    ...mapGetters({
      data: "$_dashboardAdmin/getData",
    }),
  },
  async created() {
    var _this = this;
     const STORE_KEY = "$_dashboardAdmin";
      if (!(STORE_KEY in this.$store._modules.root._children)) {
        _this.$store.registerModule(STORE_KEY, store);
      }
    try {
      await _this.$store.dispatch("$_dashboardAdmin/getData");
    } catch (error) {
      console.log(error);
    }
  },
  methods: {},
};
</script>


<style scoped>
</style>