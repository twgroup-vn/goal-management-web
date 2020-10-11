import Vue from 'vue';

const getListConversation = async (pageIndex, pageSize) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize};
    return Vue.prototype.$http.post(`http://localhost:5000/api/conversation/getListConversationOfUser`, query);
}

const getUserList = async () => {
  return Vue.prototype.$http.get(`http://localhost:5000/api/company/getRelatedUser`);
}

const getMessageOfConversation = async (pageIndex, pageSize, conversationId) => {
  var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Title": conversationId};
  return Vue.prototype.$http.post(`http://localhost:5000/api/conversation/getMessageOfConversation`, query);
}

const sendMessage = async (request) => {
  return Vue.prototype.$http.post(`http://localhost:5000/api/conversation/sendMessage`, request);
}

const createConversation = async (request) => {
  return Vue.prototype.$http.post(`http://localhost:5000/api/conversation/create`, request);
}

export default {
  getListConversation,
  getMessageOfConversation,
  createConversation,
  getUserList,
  sendMessage
}