import api from '../_api/index';

const getUserList = async (context, request) => {
  let response = await api.getUserList(request);
  context.commit('SET_USER_LIST', response.data);
};

const createRelation = async (context, request) => {
  let response = await api.createRelation(request);
  return response.data;
};

const getAllGoalOfCompany = async (context, request) => {
  let response = await api.getAllGoalOfCompany(request);
  context.commit('SET_COMPANY_GOAL_LIST', response.data);
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

const editSubGoal = async (context, request) => {
  let response =  request.id && request.id != "" ? await api.updateSubGoal(request) : await api.createSubGoal(request);
  return response;
};

const createMainResult = async (context, request) => {
  let response = await api.createMainResult(request);
  return response;
};

const updateMainResult = async (context, request) => {
  let response = await api.updateMainResult(request);
  return response;
};

const deleteMainResult = async (context, request) => {
  let response = await api.deleteMainResult(request);
  return response;
};

const editCheckInMainResult = async (context, request) => {
  let response = request.id && request.id != "" ? await api.updateCheckInMainResult(request) : await api.createCheckInMainResult(request);
  return response.data;
};

const getBoardId = async (context, request) => {
  let response = await api.getBoardId(request);
  return response.data;
};

const checkInSubGoal = async (context, request) => {
  let response = await api.checkInSubGoal(request);
  return response;
};

const createMainResultSubGoal = async (context, request) => {
  let response = await api.createMainResultSubGoal(request);
  return response;
};

const checkInMainResultSubGoal = async (context, request) => {
  let response = await api.checkInMainResultSubGoal(request);
  return response;
};

export default {
  getUserList,
  getBoardId,
  uploadImage,
  getGoalListOfUser,
  getAllGoalOfCompany,
  editGoal,
  editCheckIn,
  createRelation,
  editSubGoal,
  createMainResult,
  updateMainResult,
  deleteMainResult,
  editCheckInMainResult,
  checkInSubGoal,
  createMainResultSubGoal,
  checkInMainResultSubGoal
}