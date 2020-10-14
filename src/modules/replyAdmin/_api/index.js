import Vue from 'vue';

const getData = async (pageIndex, pageSize, description) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description};
    return Vue.prototype.$http.post(`http://172.20.10.26:5000/api/reply/getAll`, query);
}

const createReply = async (request) => {
  return Vue.prototype.$http.post(`http://172.20.10.26:5000/api/reply/create`, request);
}

const updateReply = async (request) => {
  return Vue.prototype.$http.post(`http://172.20.10.26:5000/api/reply/update`, request);
}

const getUserList = async () => {
  return Vue.prototype.$http.get(`http://172.20.10.26:5000/api/company/getRelatedUser`);
}

const getGoalListOfCompany = async (pageIndex, pageSize, description, title) => {
  var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description, "Title": title };
  return Vue.prototype.$http.post(`http://172.20.10.26:5000/api/goal/getGoalOfCompany`, query);
}
  
export default {
    getData,
    createReply,
    updateReply,
    getUserList,
    getGoalListOfCompany
}