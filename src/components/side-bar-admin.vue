<template>
  <div>
    <nav>
      <ul class="sidebar-nav">
        <li class="nav-brand" v-if="companyDetail && companyDetail.logo">
            <img :src="companyDetail.logo" width="100" height="50" />
        </li>
        <li class="nav-brand" v-else>Logo</li>
        <li class="nav-item" v-for="(route, index) in routes" :key="index">
          <router-link :to="route.path" exact-active-class="active">
            <div class="nav-link-wrapper" v-if="route.name =='dashboardAdmin'">
              <font-awesome-icon :icon="['fas', 'chart-line']" />
              <a class="nav-link">{{ $t("nav.dashBoardAdmin") }}</a>
            </div>
            <div class="nav-link-wrapper" v-if="route.name =='companyAdmin'">
              <font-awesome-icon :icon="['far', 'building']" />
              <a class="nav-link">{{ $t("nav.companyAdmin") }}</a>
            </div>
            <div class="nav-link-wrapper" v-if="route.name =='checkInQuestionAdmin'">
              <font-awesome-icon :icon="['far', 'question-circle']" />
              <a class="nav-link">{{ $t("nav.checkInQuestionAdmin") }}</a>
            </div>
            <div class="nav-link-wrapper" v-if="route.name =='cycleAdmin'">
              <font-awesome-icon :icon="['far', 'life-ring']" />
              <a class="nav-link">{{ $t("nav.cycleAdmin") }}</a>
            </div>
            <div class="nav-link-wrapper" v-if="route.name =='departmentAdmin'">
              <font-awesome-icon :icon="['fa', 'users']" />
              <a class="nav-link">{{ $t("nav.departmentAdmin") }}</a>
            </div>
            <div class="nav-link-wrapper" v-if="route.name =='positionAdmin'">
              <font-awesome-icon :icon="['far', 'building']" />
              <a class="nav-link">{{ $t("nav.positionAdmin") }}</a>
            </div>
            <div class="nav-link-wrapper" v-if="route.name =='criteriaAdmin'">
              <font-awesome-icon :icon="['far', 'star']" />
              <a class="nav-link">{{ $t("nav.criteriaAdmin") }}</a>
            </div>
            <div class="nav-link-wrapper" v-if="route.name =='employeeAdmin'">
              <font-awesome-icon :icon="['far', 'user']" />
              <a class="nav-link">{{ $t("nav.employeeAdmin") }}</a>
            </div>
            <div class="nav-link-wrapper" v-if="route.name =='replyAdmin'">
              <font-awesome-icon :icon="['far', 'comment-dots']" />
              <a class="nav-link">{{ $t("nav.replyAdmin") }}</a>
            </div>
            <div class="nav-link-wrapper" v-if="route.name =='goalAdmin'">
              <font-awesome-icon :icon="['fa', 'bullseye']" />
              <a class="nav-link">{{ $t("nav.goalAdmin") }}</a>
            </div>
          </router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { routes } from "../router/routes";
export default {
  components: {},
  directives: {},
  data() {
    return {
      routes,
    };
  },
  computed: {
    ...mapGetters({
      companyDetail: "$_loginPage/getCompanyDetail",
    }),
  },
  created() {},
  methods: {
    redirectTo: function (path) {
      if (path) {
        this.$router.push(path);
      } else {
        this.$router.go(-1);
      }
    },
  },
};
</script>

<style scoped>
</style>