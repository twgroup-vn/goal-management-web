import Vue from 'vue';

const syncDataFromHR = async () => {
  return Vue.prototype.$http.get(`/api/user/syncStaffFromHR`);
}

export default {
  syncDataFromHR
}