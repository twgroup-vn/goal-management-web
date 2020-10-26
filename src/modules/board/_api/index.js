import Vue from 'vue';

const getData = async (pageIndex, pageSize, description) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description};
    return Vue.prototype.$http.post(`/api/board/getAll`, query);
}

const createBoard = async (request) => {
    return Vue.prototype.$http.post(`/api/board/create`, request);
}
  
const updateBoard = async (request) => {
    return Vue.prototype.$http.post(`/api/board/update`, request);
}

const getUserList = async () => {
    return Vue.prototype.$http.get(`/api/company/getRelatedUser`);
}
  
export default {
    getData,
    createBoard,
    updateBoard,
    getUserList
}