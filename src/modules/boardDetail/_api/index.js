import Vue from 'vue';


const getUserList = async () => {
    return Vue.prototype.$http.get(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/company/getRelatedUser`);
}

const getBoardDetail = async (request) => {
    return Vue.prototype.$http.get(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/board/getById/${request}`);
}


const getListCard = async (pageIndex, pageSize, list) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Title": JSON.stringify(list) };
    return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/card/getListCardByArray`, query);
}

const createCard = async (request) => {
    return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/card/create`, request);
}

const updateCard = async (request) => {
    return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/card/update`, request);
}

const moveCard = async (request) => {
    return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/card/moveCard`, request);
}
  
export default {
    getUserList,
    getBoardDetail,
    getListCard,
    createCard,
    updateCard,
    moveCard
}