import api from '../_api/index';

const getListConversation = async (context) => {
  let response = await api.getListConversation(context.state.searchRequest.pageIndex, context.state.searchRequest.pageSize);
  context.commit('SET_LIST_CONVERSATION', response.data);
};

const getConversationDetail = async (context, request) => {
  localStorage.setItem("conversationId", request);
  let response = await api.getMessageOfConversation(context.state.conversationRequest.pageIndex, context.state.conversationRequest.pageSize, request);
  context.commit('SET_CONVERSATION_DETAIL', response.data);
  context.commit('SET_CONVERSATION_FOCUS', request);
};

const setUserInfoConversation = async (context, request) => {
  context.commit('SET_USER_INFO_CONVERSATION', request);
};


const getUserList = async (context, request) => {
  let response = await api.getUserList(request);
  context.commit('SET_USER_LIST', response.data);
};

const sendMessage = async (context, request) => {
  let response = await api.sendMessage(request);
  return response.data;
};

const createConversation = async (context, request) => {
  let response = await api.createConversation(request);
  return response.data;
};

const uploadImage = async (context, request) => {
  let response = await api.uploadImage(request);
  return response.data;
};

const getStickerList = async (context, request) => {
  let response = await api.getStickerList(request);
  context.commit('SET_STICKER_LIST', response.data);
};

export default {
  getListConversation,
  getConversationDetail,
  getUserList,
  createConversation,
  sendMessage,
  setUserInfoConversation,
  uploadImage,
  getStickerList
}