import Vue from 'vue';

const getData = async (pageIndex, pageSize, description) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description};
    return Vue.prototype.$http.post(`http://172.20.10.26:5000/api/evaluativeCriteria/getAll`, query);
}

const createCriteria = async (request) => {
  return Vue.prototype.$http.post(`http://172.20.10.26:5000/api/evaluativeCriteria/create`, request);
}

const updateCriteria = async (request) => {
  return Vue.prototype.$http.post(`http://172.20.10.26:5000/api/evaluativeCriteria/update`, request);
}
  
export default {
    getData,
    createCriteria,
    updateCriteria
}