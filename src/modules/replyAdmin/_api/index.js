import Vue from 'vue';

const getData = async (pageIndex, pageSize, description) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description};
    return Vue.prototype.$http.post(`/api/reply/getAll`, query);
}

const createReply = async (request) => {
  return Vue.prototype.$http.post(`/api/reply/create`, request);
}

const updateReply = async (request) => {
  return Vue.prototype.$http.post(`/api/reply/update`, request);
}

const getUserList = async () => {
  return Vue.prototype.$http.get(`/api/company/getRelatedUser`);
}

const getGoalListOfCompany = async (pageIndex, pageSize, description, title) => {
  var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description, "Title": title };
  return Vue.prototype.$http.post(`/api/goal/getGoalOfCompany`, query);
}
  
export default {
    getData,
    createReply,
    updateReply,
    getUserList,
    getGoalListOfCompany
}