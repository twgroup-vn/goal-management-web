import actions from '../_store/actions';
import getters from '../_store/getters';
import mutations from '../_store/mutations';

const state = {
  data: null,
  total: 0,
  userList: null,
  boardDetail: null,
  card: {},
  cardGroup: [],
  searchRequest: {
    description: '',
    pageIndex: 1,
    pageSize: 15,
  },
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
