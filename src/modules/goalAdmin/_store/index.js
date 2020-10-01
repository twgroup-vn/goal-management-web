import actions from '../_store/actions';
import getters from '../_store/getters';
import mutations from '../_store/mutations';

const state = {
  data: null,
  total: 0,
  userList: null,
  headers: {
    goal: true,
    staffInCharge: true,
    result: true,
    progressPercent: true,
    confidenceLevel: true,
    lastCheckInDate: true,
    // nextCheckInDate: true,
    status: true,
    setting: true,
  },
  searchRequest: {
    title: '',
    description: '',
    pageIndex: 1,
    pageSize: 10,
  },
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
