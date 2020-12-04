import api from '../_api/index';
import Vue from 'vue';

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

const updateAccessModulesFromHR = async (context, request) => {
  let token = localStorage.getItem("token");
  let refreshToken = localStorage.getItem("TWG_HR_token");
  let authorize = await context.dispatch("authorizeHRLogin", refreshToken);
  Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${authorize}`;
  Vue.prototype.$http.defaults.headers['Content-Type'] = `application/json`;
  let response = await api.updateAccessModulesFromHR(request);
  Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return response.data; 
};

const authorizeHRLogin = async (context, request) => {
  let response = await api.authorizeHRLogin(request);
  return response.data;
};

export default {
  getData,
  editEmployee,
  getRelatedData,
  addEmployee,
  updateAccessModulesFromHR,
  authorizeHRLogin
}