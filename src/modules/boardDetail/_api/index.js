import Vue from 'vue';


const getUserList = async () => {
    return Vue.prototype.$http.get(`/api/company/getRelatedUser`);
}

const getBoardDetail = async (request) => {
    return Vue.prototype.$http.get(`/api/board/getById/${request}`);
}


const getListCard = async (pageIndex, pageSize, list) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Title": JSON.stringify(list) };
    return Vue.prototype.$http.post(`/api/card/getListCardByArray`, query);
}

const createCard = async (request) => {
    return Vue.prototype.$http.post(`/api/card/create`, request);
}

const updateCard = async (request) => {
    return Vue.prototype.$http.post(`/api/card/update`, request);
}

const moveCard = async (request) => {
    return Vue.prototype.$http.post(`/api/card/moveCard`, request);
}
  
export default {
    getUserList,
    getBoardDetail,
    getListCard,
    createCard,
    updateCard,
    moveCard
}