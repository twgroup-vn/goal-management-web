import actions from '../_store/actions';
import getters from '../_store/getters';
import mutations from '../_store/mutations';

const state = {
  listConversation: null,
  conversationDetail: null,
  userInfoConversation: null,
  conversationId: null,
  userList: null,
  stickerList: null,
  total: 0,
  searchRequest: {
    pageIndex: 1,
    pageSize: 30,
  },
  conversationRequest: {
    pageIndex: 1,
    pageSize: 30,
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
