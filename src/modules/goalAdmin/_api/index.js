import Vue from 'vue';

const getData = async (pageIndex, pageSize, description, title) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description, "Title": title };
    return Vue.prototype.$http.post(`http://172.20.10.25:5000/api/goal/getAll`, query);
}

const createGoal = async (request) => {
  return Vue.prototype.$http.post(`http://172.20.10.25:5000/api/goal/create`, request);
}

const updateGoal = async (request) => {
  return Vue.prototype.$http.post(`http://172.20.10.25:5000/api/goal/update`, request);
}

const getUserList = async () => {
  return Vue.prototype.$http.get(`http://172.20.10.25:5000/api/company/getRelatedUser`);
}
  
export default {
    getData,
    createGoal,
    updateGoal,
    getUserList
}