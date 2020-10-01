import actions from '../_store/actions';
import getters from '../_store/getters';
import mutations from '../_store/mutations';

const state = {
  userList: null,
  goalList: null,
  total: null,
  searchRequest: {
    title: '',
    description: '',
    pageIndex: 1,
    pageSize:10,
  },
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
