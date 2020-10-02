import actions from '../_store/actions';
import getters from '../_store/getters';
import mutations from '../_store/mutations';

const state = {
  data: null,
  userList: null,
  goalList: null,
  total: 0,
  headers: {
    userReply: true,
    evaluativeCriteria: true,
    userReceive: true,
    content: true,
    goal: true,
    createdAt: true,
    type: true,
    setting: true,
  },
  searchRequest: {
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
