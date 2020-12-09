import Vue from 'vue';

const getListConversation = async (pageIndex, pageSize) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize};
    return Vue.prototype.$http.post(`/api/conversation/getListConversationOfUser`, query);
}

const getUserList = async () => {
  return Vue.prototype.$http.get(`/api/company/getRelatedUser`);
}

const getMessageOfConversation = async (pageIndex, pageSize, conversationId) => {
  var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Title": conversationId};
  return Vue.prototype.$http.post(`/api/conversation/getMessageOfConversation`, query);
}

const sendMessage = async (request) => {
  return Vue.prototype.$http.post(`/api/conversation/sendMessage`, request);
}

const createConversation = async (request) => {
  return Vue.prototype.$http.post(`/api/conversation/create`, request);
}

const uploadImage = async (request) => {
  var formData = new FormData();
  formData.append('file', request);
  return Vue.prototype.$http.post(`/api/company/uploadAvatar`, formData, {
      headers: {
          'Content-Type': 'multipart/form-data'
      }
  });
}

const getStickerList = async () => {
  return Vue.prototype.$http.get(`/api/stickerGroup/getAll`);
}

const readNewMessage = async (request) => {
  return Vue.prototype.$http.get(`/api/conversation/readNewMessage/${request}`);
};


export default {
  getListConversation,
  getMessageOfConversation,
  createConversation,
  getUserList,
  sendMessage,
  uploadImage,
  getStickerList,
  readNewMessage
}