import Vue from 'vue';

const getUserList = async () => {
    return Vue.prototype.$http.get(`http://172.20.10.26:5000/api/company/getRelatedUser`);
}

const getAllGoalOfCompany = async () => {
    return Vue.prototype.$http.get(`http://172.20.10.26:5000/api/goal/getAllGoalOfCompany`);
}

const getGoalListOfUser = async (pageIndex, pageSize, description, title) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description, "Title": title };
    return Vue.prototype.$http.post(`http://172.20.10.26:5000/api/goal/getGoalOfUser`, query);
}

const uploadImage = async (request) => {
    var formData = new FormData();
    formData.append('file', request);
    return Vue.prototype.$http.post(`http://172.20.10.26:5000/api/company/uploadAvatar`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

const createRelation = async (request) => {
    return Vue.prototype.$http.post(`http://172.20.10.26:5000/api/goal/createRelation`, { "Description" : request });
}

const createGoal = async (request) => {
    return Vue.prototype.$http.post(`http://172.20.10.26:5000/api/goal/create`, request);
}
  
const updateGoal = async (request) => {
    return Vue.prototype.$http.post(`http://172.20.10.26:5000/api/goal/update`, request);
}

const createCheckIn = async (request) => {
    return Vue.prototype.$http.post(`http://172.20.10.26:5000/api/checkIn/create`, request);
  }
  
const updateCheckIn = async (request) => {
    return Vue.prototype.$http.post(`http://172.20.10.26:5000/api/checkIn/update`, request);
}
  
export default {
    getUserList,
    uploadImage,
    createGoal,
    updateGoal,
    createCheckIn,
    updateCheckIn,
    getGoalListOfUser,
    getAllGoalOfCompany,
    createRelation
}