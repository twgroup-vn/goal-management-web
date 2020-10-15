import api from '../_api/index';

const getData = async (context) => {
  let response = await api.getData(context.state.searchRequest.pageIndex, context.state.searchRequest.pageSize, context.state.searchRequest.description);
  context.commit('SET_DATA', response.data);
};

const editBoard = async (context, request) => {
    let response = request.id && request.id != "" ? await api.updateBoard(request) : await api.createBoard(request);
    return response.data;
};

const getUserList = async (context, request) => {
    let response = await api.getUserList(request);
    context.commit('SET_USER_LIST', response.data);
};

export default {
  getData,
  editBoard,
  getUserList
}