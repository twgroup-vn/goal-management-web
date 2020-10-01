import Vue from 'vue';

const getUserList = async () => {
    return Vue.prototype.$http.get(`http://localhost:5000/api/company/getRelatedUser`);
}

const getGoalListOfCompany = async (pageIndex, pageSize, description, title) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description, "Title": title };
    return Vue.prototype.$http.post(`http://localhost:5000/api/goal/getGoalOfCompany`, query);
}
  
export default {
    getUserList,
    getGoalListOfCompany
}