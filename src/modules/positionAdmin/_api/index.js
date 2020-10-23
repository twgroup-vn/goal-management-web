import Vue from 'vue';

const getData = async (pageIndex, pageSize, description) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description};
    return Vue.prototype.$http.post(`https://dev-kpi-api.twgroup.vn/api/position/getAll`, query);
}

const getDepartmentList = async () => {
  return Vue.prototype.$http.get(`https://dev-kpi-api.twgroup.vn/api/department/getDepartmentList`);
}

const createPostion = async (request) => {
  return Vue.prototype.$http.post(`https://dev-kpi-api.twgroup.vn/api/position/create`, request);
}

const updatePosition = async (request) => {
  return Vue.prototype.$http.post(`https://dev-kpi-api.twgroup.vn/api/position/update`, request);
}
  
export default {
    getData,
    createPostion,
    updatePosition,
    getDepartmentList
}