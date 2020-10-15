<template>
  <div>
    <nav>
      <ul class="sidebar-nav">
        <li class="nav-item" v-for="(route, index) in routes" :key="index">
          <router-link :to="route.path" exact-active-class="active">
            <!-- <div class="nav-link-wrapper" v-if="route.name =='dashboardAdmin'">
              <font-awesome-icon :icon="['fas', 'chart-line']" />
              <a class="nav-link">{{ $t("nav.dashBoardAdmin") }}</a>
            </div> -->
            <div class="nav-link-wrapper" v-if="route.name =='companyAdmin'">
              <div class="icon">
                <font-awesome-icon :icon="['far', 'building']" />
              </div>
              <a class="nav-link">{{ $t("nav.companyAdmin") }}</a>
            </div>
            <div class="nav-link-wrapper" v-if="route.name =='checkInQuestionAdmin'">
              <div class="icon">
                <font-awesome-icon :icon="['far', 'question-circle']" />
              </div>
              <a class="nav-link">{{ $t("nav.checkInQuestionAdmin") }}</a>
            </div>
            <div class="nav-link-wrapper" v-if="route.name =='cycleAdmin'">
              <div class="icon">
                <font-awesome-icon :icon="['far', 'life-ring']" />
              </div> 
              <a class="nav-link">{{ $t("nav.cycleAdmin") }}</a>
            </div>
            <div class="nav-link-wrapper" v-if="route.name =='departmentAdmin'">
              <div class="icon">
                <font-awesome-icon :icon="['fa', 'users']" />
              </div>
              <a class="nav-link">{{ $t("nav.departmentAdmin") }}</a>
            </div>
            <div class="nav-link-wrapper" v-if="route.name =='positionAdmin'">
              <div class="icon">
                <font-awesome-icon :icon="['far', 'building']" />
              </div>
              <a class="nav-link">{{ $t("nav.positionAdmin") }}</a>
            </div>
            <div class="nav-link-wrapper" v-if="route.name =='criteriaAdmin'">
              <div class="icon">
                <font-awesome-icon :icon="['far', 'star']" />
              </div>
              <a class="nav-link">{{ $t("nav.criteriaAdmin") }}</a>
            </div>
            <div class="nav-link-wrapper" v-if="route.name =='employeeAdmin'">
              <div class="icon">
                <font-awesome-icon :icon="['far', 'user']" />
              </div>
              <a class="nav-link">{{ $t("nav.employeeAdmin") }}</a>
            </div>
            <div class="nav-link-wrapper" v-if="route.name =='replyAdmin'">
              <div class="icon">
                <font-awesome-icon :icon="['far', 'comment-dots']" />
              </div>
              <a class="nav-link">{{ $t("nav.replyAdmin") }}</a>
            </div>
            <div class="nav-link-wrapper" v-if="route.name =='goalAdmin'">
              <div class="icon">
                <font-awesome-icon :icon="['fa', 'bullseye']" />
              </div>
              <a class="nav-link">{{ $t("nav.goalAdmin") }}</a>
            </div>
          </router-link>
        </li>
         <li class="nav-brand" v-if="companyDetail && companyDetail.logo">
            <div class="bg-logo-company" :style="{ backgroundImage: `url(${companyDetail && companyDetail.logo ? companyDetail.logo : ''})` }"></div>
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