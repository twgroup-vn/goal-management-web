import api from '../_api/index';

const getData = async (context) => {
  let response = await api.getData(context.state.searchRequest.pageIndex, context.state.searchRequest.pageSize, context.state.searchRequest.description);
  context.commit('SET_DATA', response.data);
};

const editDepartment = async (context, request) => {
    let response = request.id && request.id != "" ? await api.updateDepartment(request) : await api.createDepartment(request);
    return response.data;
};

export default {
  getData,
  editDepartment
}