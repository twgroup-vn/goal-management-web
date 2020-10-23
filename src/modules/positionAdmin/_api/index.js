import Vue from 'vue';

const getData = async (pageIndex, pageSize, description) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description};
    return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/position/getAll`, query);
}

const getDepartmentList = async () => {
  return Vue.prototype.$http.get(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/department/getDepartmentList`);
}

const createPostion = async (request) => {
  return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/position/create`, request);
}

const updatePosition = async (request) => {
  return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/position/update`, request);
}
  
export default {
    getData,
    createPostion,
    updatePosition,
    getDepartmentList
}