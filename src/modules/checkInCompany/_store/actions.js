import api from '../_api/index';

const getUserList = async (context, request) => {
  let response = await api.getUserList(request);
  context.commit('SET_USER_LIST', response.data);
};

const getGoalListOfCompany = async (context) => {
  let response = await api.getGoalListOfCompany(context.state.searchRequest.pageIndex, context.state.searchRequest.pageSize, context.state.searchRequest.description, context.state.searchRequest.title);
  context.commit('SET_GOAL_LIST', response.data);
};

const getAllGoalOfUser = async (context, request) => {
  let response = await api.getAllGoalOfUser(request);
  context.commit('SET_GOAL_USER', response.data);
};

const handleChangeCycleIdOfGoalUser = async (context, request) => {
  context.commit('SET_GOAL_USER_AFTER_CHANGE_CYCLE', request);
};

const createReply = async (context, request) => {
  let response = await api.createReply(request);
  return response;
};

const getAllGoalOfCompany = async (context, request) => {
  let response = await api.getAllGoalOfCompany(request);
  context.commit('SET_COMPANY_GOAL_LIST', response.data);
}

const getBoardId = async (context, request) => {
  let response = await api.getBoardId(request);
  return response.data;
};

const editSubGoal = async (context, request) => {
  let response =  request.id && request.id != "" ? await api.updateSubGoal(request) : await api.createSubGoal(request);
  return response;
};

const checkInHigher = async (context, request) => {
  let response = await api.checkInHigher(request);
  return response;
};

export default {
  getUserList,
  getBoardId,
  getGoalListOfCompany,
  getAllGoalOfUser,
  handleChangeCycleIdOfGoalUser,
  createReply,
  getAllGoalOfCompany,
  editSubGoal,
  checkInHigher
}