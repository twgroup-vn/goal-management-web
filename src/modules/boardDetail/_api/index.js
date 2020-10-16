import Vue from 'vue';


const getUserList = async () => {
    return Vue.prototype.$http.get(`http://localhost:5000/api/company/getRelatedUser`);
}

const getBoardDetail = async (request) => {
    return Vue.prototype.$http.get(`http://localhost:5000/api/board/getById/${request}`);
}


const getListCard = async (pageIndex, pageSize, list) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Title": JSON.stringify(list) };
    return Vue.prototype.$http.post(`http://localhost:5000/api/card/getListCardByArray`, query);
}
  
export default {
    getUserList,
    getBoardDetail,
    getListCard
}