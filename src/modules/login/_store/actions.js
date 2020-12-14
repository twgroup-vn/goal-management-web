import api from '../_api/index';
import Vue from 'vue';
import commonData from '../../../utils/common-data';

const login = async (context, request) => {
  let response = await api.login(request);
  context.commit('SET_TOKEN', response.data);
};

const getCompanyOfUser = async (context, request) => {
  let response = await api.getCompanyOfUser(request);
  context.commit('SET_COMPANIES_OF_USER', response.data);
};

const chooseCompany = async (context, request) => {
  context.commit('SET_COMPANY', request);
};

const getCompanyDetails = async (context, request) => {
  Vue.prototype.$http.defaults.headers.common['CompanyId'] = request;
  let response = await api.getCompanyDetails();
  context.commit('SET_COMPANY_DETAILS', response.data);
};

const logout = async (context) => {
  localStorage.clear();
  context.commit('LOG_OUT');
  window.open(commonData.HR_LOGOUT, "_self");
};

const getCurrentUser = async (context) => {
  var decodeToken = await context.dispatch("decodeToken", localStorage.getItem('token'));
  var user = await context.dispatch("getNotAuthorazation", decodeToken.userId);
  context.commit('SET_TOKEN', { token: localStorage.getItem('token'), user: user });
};

const refreshToken = async (context) => {
  var decodeToken = await context.dispatch("decodeToken", localStorage.getItem('token'));
  var user = await context.dispatch("getNotAuthorazation", decodeToken.userId);
  let response = await api.refreshToken(user.data);
  context.commit('SET_TOKEN', response.data);
}

const getNotAuthorazation = async (context, request) => {
  let response = await api.getNotAuthorazation(request);
  return response.data;
};

const decodeToken = async (context, request) => {
  let response = await api.decodeToken(request);
  return response.data;
};

const sendSocket = (context, request) => {
  const signalR = require("@aspnet/signalr");
  var connection = new signalR.HubConnectionBuilder().withUrl(`${process.env.VUE_APP_API_ROOT}/chatHub`).build();
  connection.start().then(() => {
    connection.invoke("SendMessage", request.userInput, request.messageInput, request.functionInput, request.paramsInput, request.typeInput).catch(function (err) {
      return console.error(err.toString());
    });
  });
};

const authorizeHRLogin = async (context, request) => {
  let response = await api.authorizeHRLogin(request);
  return response.data;
};

const getUserInfoFromHRPort = async (context, request) => {
  let response = await api.getUserInfoFromHRPort(request);
  return response.data;
};

const getToken = async (context, request) => {
  let response = await api.getToken(request);
  localStorage.setItem("companyId", commonData.COMPANY_KPI);
  context.commit('SET_TOKEN', response.data);
};

export default {
  login,
  getCompanyOfUser,
  chooseCompany,
  logout,
  decodeToken,
  refreshToken,
  getCurrentUser,
  getNotAuthorazation,
  getCompanyDetails,
  authorizeHRLogin,
  getUserInfoFromHRPort,
  sendSocket,
  getToken
}