import api from '../_api/index';

const getData = async (context) => {
  let response = await api.getData(context.state.searchRequest.pageIndex, context.state.searchRequest.pageSize, context.state.searchRequest.description);
  context.commit('SET_DATA', response.data);
};

const getRelatedData = async (context) => {
  let response = await api.getRelatedData();
  context.commit('SET_RELATED_DATA', response.data);
};

const editEmployee = async (context, request) => {
    let response = request.id && request.id != "" ? await api.updateEmployee(request) : await api.createEmployee(request);
    return response.data;
};

const addEmployee = async (context, request) => {
  let response = await api.addEmployee(request);
  return response.data;
};

export default {
  getData,
  editEmployee,
  getRelatedData,
  addEmployee
}