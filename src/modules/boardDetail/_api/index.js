import Vue from 'vue';


const getUserList = async () => {
    return Vue.prototype.$http.get(`http://localhost:5000/api/company/getRelatedUser`);
}

// const getData = async (pageIndex, pageSize, description) => {
//     var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description};
//     return Vue.prototype.$http.post(`http://localhost:5000/api/cycle/getAll`, query);
// }
  
export default {
    getUserList,
}