import Vue from 'vue';

const getData = async (pageIndex, pageSize, description) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description};
    return Vue.prototype.$http.post(`http://172.20.10.26:5000/api/position/getAll`, query);
}

const getDepartmentList = async () => {
  return Vue.prototype.$http.get(`http://172.20.10.26:5000/api/department/getDepartmentList`);
}

const createPostion = async (request) => {
  return Vue.prototype.$http.post(`http://172.20.10.26:5000/api/position/create`, request);
}

const updatePosition = async (request) => {
  return Vue.prototype.$http.post(`http://172.20.10.26:5000/api/position/update`, request);
}
  
export default {
    getData,
    createPostion,
    updatePosition,
    getDepartmentList
}