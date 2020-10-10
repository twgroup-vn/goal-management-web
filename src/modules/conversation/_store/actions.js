import api from '../_api/index';

const getListConversation = async (context) => {
  let response = await api.getListConversation(context.state.searchRequest.pageIndex, context.state.searchRequest.pageSize);
  context.commit('SET_LIST_CONVERSATION', response.data);
};

const getUserList = async (context, request) => {
  let response = await api.getUserList(request);
  context.commit('SET_USER_LIST', response.data);
};

export default {
  getListConversation,
  getUserList
}