import Vue from 'vue';

const getListConversation = async (pageIndex, pageSize) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize};
    return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/conversation/getListConversationOfUser`, query);
}

const getUserList = async () => {
  return Vue.prototype.$http.get(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/company/getRelatedUser`);
}

const getMessageOfConversation = async (pageIndex, pageSize, conversationId) => {
  var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Title": conversationId};
  return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/conversation/getMessageOfConversation`, query);
}

const sendMessage = async (request) => {
  return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/conversation/sendMessage`, request);
}

const createConversation = async (request) => {
  return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/conversation/create`, request);
}

const uploadImage = async (request) => {
  var formData = new FormData();
  formData.append('file', request);
  return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/company/uploadAvatar`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  });
}

const getStickerList = async () => {
  return Vue.prototype.$http.get(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/stickerGroup/getAll`);
}


export default {
  getListConversation,
  getMessageOfConversation,
  createConversation,
  getUserList,
  sendMessage,
  uploadImage,
  getStickerList
}