import Vue from 'vue';

const getUserList = async () => {
    return Vue.prototype.$http.get(`/api/company/getRelatedUser`);
}

const getGoalListOfCompany = async (pageIndex, pageSize, description, title) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description, "Title": title };
    return Vue.prototype.$http.post(`/api/goal/getGoalOfCompany`, query);
}

const getAllGoalOfUser = async (request) => {
    return Vue.prototype.$http.get(`/api/goal/getAllGoalOfUser/${request}`);
}

const createReply = async (request) => {
    return Vue.prototype.$http.post(`/api/reply/create`, request);
}

const getAllGoalOfCompany = async () => {
    return Vue.prototype.$http.get(`/api/goal/getAllGoalOfCompany`);
}
  
export default {
    getUserList,
    getGoalListOfCompany,
    getAllGoalOfUser,
    createReply,
    getAllGoalOfCompany
}