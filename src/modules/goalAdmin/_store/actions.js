import api from '../_api/index';

const getData = async (context) => {
  let response = await api.getData(context.state.searchRequest.pageIndex, context.state.searchRequest.pageSize, context.state.searchRequest.description, context.state.searchRequest.title);
  context.commit('SET_DATA', response.data);
};

const editGoal = async (context, request) => {
    let response = request.id && request.id != "" ? await api.updateGoal(request) : await api.createGoal(request);
    return response.data;
};


const getUserList = async (context, request) => {
  let response = await api.getUserList(request);
  context.commit('SET_USER_LIST', response.data);
};

export default {
  getData,
  editGoal,
  getUserList
}