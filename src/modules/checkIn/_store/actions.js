import api from '../_api/index';

const getUserList = async (context, request) => {
  let response = await api.getUserList(request);
  context.commit('SET_USER_LIST', response.data);
};


const getGoalListOfUser = async (context) => {
  let response = await api.getGoalListOfUser(context.state.searchRequest.pageIndex, context.state.searchRequest.pageSize, context.state.searchRequest.description, context.state.searchRequest.title);
  context.commit('SET_GOAL_LIST', response.data);
};

const uploadImage = async (context, request) => {
  let response = await api.uploadImage(request);
  return response.data;
};

const editGoal = async (context, request) => {
  let response = request.id && request.id != "" ? await api.updateGoal(request) : await api.createGoal(request);
  return response.data;
};

const editCheckIn = async (context, request) => {
  let response = request.id && request.id != "" ? await api.updateCheckIn(request) : await api.createCheckIn(request);
  return response.data;
};

export default {
  getUserList,
  uploadImage,
  getGoalListOfUser,
  editGoal,
  editCheckIn
}