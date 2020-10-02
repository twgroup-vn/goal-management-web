import api from '../_api/index';

const getData = async (context) => {
  let response = await api.getData(context.state.searchRequest.pageIndex, context.state.searchRequest.pageSize, context.state.searchRequest.description);
  context.commit('SET_DATA', response.data);
};

const editReply = async (context, request) => {
    let response = request.id && request.id != "" ? await api.updateReply(request) : await api.createReply(request);
    return response.data;
};

const getUserList = async (context, request) => {
  let response = await api.getUserList(request);
  context.commit('SET_USER_LIST', response.data);
};

const getGoalListOfCompany = async (context) => {
  let response = await api.getGoalListOfCompany(context.state.searchRequest.pageIndex, context.state.searchRequest.pageSize, context.state.searchRequest.description, context.state.searchRequest.title);
  context.commit('SET_GOAL_LIST', response.data);
};

export default {
  getData,
  editReply,
  getUserList,
  getGoalListOfCompany
}