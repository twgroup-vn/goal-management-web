import Vue from 'vue';

const getData = async (pageIndex, pageSize, description) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description};
    return Vue.prototype.$http.post(`http://localhost:5000/api/department/getAll`, query);
}

const createDepartment = async (request) => {
  return Vue.prototype.$http.post(`http://localhost:5000/api/department/create`, request);
}

const updateDepartment = async (request) => {
  return Vue.prototype.$http.post(`http://localhost:5000/api/department/update`, request);
}
  
export default {
    getData,
    createDepartment,
    updateDepartment
}