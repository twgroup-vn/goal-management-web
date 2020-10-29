import Vue from 'vue';


const getUserList = async () => {
    return Vue.prototype.$http.get(`/api/company/getRelatedUser`);
}

const getBoardDetail = async (request) => {
    return Vue.prototype.$http.get(`/api/board/getById/${request}`);
}

const getCardById = async (request) => {
    return Vue.prototype.$http.get(`/api/card/getById/${request}`);
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

const moveCardGroup = async (request) => {
    return Vue.prototype.$http.post(`/api/cardGroup/moveCardGroup`, request);
}

const createCardGroup = async (request) => {
    return Vue.prototype.$http.post(`/api/cardGroup/create`, request);
}

const updateCardGroup = async (request) => {
    return Vue.prototype.$http.post(`/api/cardGroup/update`, request);
}

const updateBoard = async (request) => {
    return Vue.prototype.$http.post(`/api/board/update`, request);
}
  
const deleteCard = async (request) => {
    return Vue.prototype.$http.get(`/api/card/delete/${request}`);
}

const advanceSearch = async (request) => {
    return Vue.prototype.$http.get(`/api/card/advanceSearch?boardId=${request.boardId}&description=${request.description}`);
}

export default {
    getUserList,
    getBoardDetail,
    getListCard,
    createCard,
    updateCard,
    moveCard,
    createCardGroup,
    updateBoard,
    updateCardGroup,
    moveCardGroup,
    getCardById,
    deleteCard,
    advanceSearch
}