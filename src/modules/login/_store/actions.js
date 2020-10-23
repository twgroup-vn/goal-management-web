import api from '../_api/index';
import Vue from 'vue';

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
  var connection = new signalR.HubConnectionBuilder().withUrl("https://dev-kpi-api.twgroup.vn/chatHub").build();
  connection.start().then(() => {
    connection.invoke("SendMessage", request.userInput, request.messageInput, request.functionInput, request.paramsInput, request.typeInput).catch(function (err) {
      return console.error(err.toString());
    });
  });
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
  sendSocket
}