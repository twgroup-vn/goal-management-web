import Vue from 'vue';

const getData = async (pageIndex, pageSize, description) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description};
    return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/checkInQuestion/getAll`, query);
}

const createQuestion = async (request) => {
  return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/checkInQuestion/create`, request);
}

const updateQuestion = async (request) => {
  return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/checkInQuestion/update`, request);
}
  
export default {
    getData,
    createQuestion,
    updateQuestion
}