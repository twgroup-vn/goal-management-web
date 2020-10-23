import Vue from 'vue';

const getData = async (pageIndex, pageSize, description) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description};
    return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/board/getAll`, query);
}

const createBoard = async (request) => {
    return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/board/create`, request);
}
  
const updateBoard = async (request) => {
    return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/board/update`, request);
}

const getUserList = async () => {
    return Vue.prototype.$http.get(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/company/getRelatedUser`);
}
  
export default {
    getData,
    createBoard,
    updateBoard,
    getUserList
}