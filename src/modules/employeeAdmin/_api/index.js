import Vue from 'vue';

const getData = async (pageIndex, pageSize, description) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description};
    return Vue.prototype.$http.post(`http://localhost:5000/api/user/getAll`, query);
}

const getRelatedData = async () => {
  return Vue.prototype.$http.get(`http://localhost:5000/api/user/getRelatedData`);
}

const addEmployee = async (request) => {
  return Vue.prototype.$http.post(`http://localhost:5000/api/company/addUserToCompany`, request);
}

const updateEmployee = async (request) => {
  return Vue.prototype.$http.post(`http://localhost:5000/api/user/update`, request);
}
  
export default {
    getData,
    addEmployee,
    updateEmployee,
    getRelatedData
}