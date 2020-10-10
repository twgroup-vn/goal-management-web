import actions from '../_store/actions';
import getters from '../_store/getters';
import mutations from '../_store/mutations';

const state = {
  listConversation: null,
  userList: null,
  total: 0,
  searchRequest: {
    pageIndex: 1,
    pageSize: 20,
  },
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
