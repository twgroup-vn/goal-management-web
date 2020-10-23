import Vue from 'vue';

const getData = async (pageIndex, pageSize, description) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description};
    return Vue.prototype.$http.post(`https://dev-kpi-api.twgroup.vn/api/user/getAll`, query);
}

const getRelatedData = async () => {
  return Vue.prototype.$http.get(`https://dev-kpi-api.twgroup.vn/api/user/getRelatedData`);
}

const addEmployee = async (request) => {
  return Vue.prototype.$http.post(`https://dev-kpi-api.twgroup.vn/api/company/addUserToCompany`, request);
}

const updateEmployee = async (request) => {
  return Vue.prototype.$http.post(`https://dev-kpi-api.twgroup.vn/api/user/update`, request);
}
  
export default {
    getData,
    addEmployee,
    updateEmployee,
    getRelatedData
}