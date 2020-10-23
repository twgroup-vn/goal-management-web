import Vue from 'vue';

const getData = async (pageIndex, pageSize, description, title) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description, "Title": title };
    return Vue.prototype.$http.post(`https://dev-kpi-api.twgroup.vn/api/goal/getAll`, query);
}

const createGoal = async (request) => {
  return Vue.prototype.$http.post(`https://dev-kpi-api.twgroup.vn/api/goal/create`, request);
}

const updateGoal = async (request) => {
  return Vue.prototype.$http.post(`https://dev-kpi-api.twgroup.vn/api/goal/update`, request);
}

const getUserList = async () => {
  return Vue.prototype.$http.get(`https://dev-kpi-api.twgroup.vn/api/company/getRelatedUser`);
}
  
export default {
    getData,
    createGoal,
    updateGoal,
    getUserList
}