import api from '../_api/index';

const getData = async (context) => {
  let response = await api.getData(context.state.searchRequest.pageIndex, context.state.searchRequest.pageSize, context.state.searchRequest.description);
  context.commit('SET_DATA', response.data);
};

const getDepartmentList = async (context) => {
  let response = await api.getDepartmentList();
  context.commit('SET_DEPARTMENT_LIST', response.data);
};

const editPosition = async (context, request) => {
    let response = request.id && request.id != "" ? await api.updatePosition(request) : await api.createPostion(request);
    return response.data;
};

export default {
  getData,
  getDepartmentList,
  editPosition
}