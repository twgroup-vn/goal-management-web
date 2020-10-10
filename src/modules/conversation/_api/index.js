import Vue from 'vue';

const getListConversation = async (pageIndex, pageSize) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize};
    return Vue.prototype.$http.post(`http://172.20.10.25:5000/api/conversation/getListConversationOfUser`, query);
}

const getUserList = async () => {
  return Vue.prototype.$http.get(`http://172.20.10.25:5000/api/company/getRelatedUser`);
}

export default {
  getListConversation,
  getUserList
}