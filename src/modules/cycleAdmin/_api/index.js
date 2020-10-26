import Vue from 'vue';

const getData = async (pageIndex, pageSize, description) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description};
    return Vue.prototype.$http.post(`/api/cycle/getAll`, query);
}

const createCycle = async (request) => {
  return Vue.prototype.$http.post(`/api/cycle/create`, request);
}

const updateCycle = async (request) => {
  return Vue.prototype.$http.post(`/api/cycle/update`, request);
}
  
export default {
    getData,
    createCycle,
    updateCycle
}