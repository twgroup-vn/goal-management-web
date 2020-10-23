import Vue from 'vue';

const getUserList = async () => {
    return Vue.prototype.$http.get(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/company/getRelatedUser`);
}

const getGoalListOfCompany = async (pageIndex, pageSize, description, title) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description, "Title": title };
    return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/goal/getGoalOfCompany`, query);
}

const getAllGoalOfUser = async (request) => {
    return Vue.prototype.$http.get(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/goal/getAllGoalOfUser/${request}`);
}

const createReply = async (request) => {
    return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/reply/create`, request);
}

const getAllGoalOfCompany = async () => {
    return Vue.prototype.$http.get(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/goal/getAllGoalOfCompany`);
}
  
export default {
    getUserList,
    getGoalListOfCompany,
    getAllGoalOfUser,
    createReply,
    getAllGoalOfCompany
}