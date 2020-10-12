import Vue from 'vue';

const getUserList = async () => {
    return Vue.prototype.$http.get(`http://172.20.10.25:5000/api/company/getRelatedUser`);
}

const getGoalListOfCompany = async (pageIndex, pageSize, description, title) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description, "Title": title };
    return Vue.prototype.$http.post(`http://172.20.10.25:5000/api/goal/getGoalOfCompany`, query);
}

const getAllGoalOfUser = async (request) => {
    return Vue.prototype.$http.get(`http://172.20.10.25:5000/api/goal/getAllGoalOfUser/${request}`);
}

const createReply = async (request) => {
    return Vue.prototype.$http.post(`http://172.20.10.25:5000/api/reply/create`, request);
}

const getAllGoalOfCompany = async () => {
    return Vue.prototype.$http.get(`http://172.20.10.25:5000/api/goal/getAllGoalOfCompany`);
}
  
export default {
    getUserList,
    getGoalListOfCompany,
    getAllGoalOfUser,
    createReply,
    getAllGoalOfCompany
}