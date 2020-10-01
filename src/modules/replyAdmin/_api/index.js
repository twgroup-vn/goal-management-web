import Vue from 'vue';

const getData = async (pageIndex, pageSize, description) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description};
    return Vue.prototype.$http.post(`http://localhost:5000/api/reply/getAll`, query);
}

const createReply = async (request) => {
  return Vue.prototype.$http.post(`http://localhost:5000/api/reply/create`, request);
}

const updateReply = async (request) => {
  return Vue.prototype.$http.post(`http://localhost:5000/api/reply/update`, request);
}
  
export default {
    getData,
    createReply,
    updateReply
}