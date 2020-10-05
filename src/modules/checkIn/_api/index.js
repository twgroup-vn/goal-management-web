import Vue from 'vue';

const getUserList = async () => {
    return Vue.prototype.$http.get(`http://172.20.10.25:5000/api/company/getRelatedUser`);
}

const getGoalListOfUser = async (pageIndex, pageSize, description, title) => {
    console.log(process.env.API_URL);
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description, "Title": title };
    return Vue.prototype.$http.post(`http://172.20.10.25:5000/api/goal/getGoalOfUser`, query);
}

const uploadImage = async (request) => {
    var formData = new FormData();
    formData.append('file', request);
    return Vue.prototype.$http.post(`http://172.20.10.25:5000/api/company/uploadAvatar`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

const createGoal = async (request) => {
    return Vue.prototype.$http.post(`http://172.20.10.25:5000/api/goal/create`, request);
  }
  
const updateGoal = async (request) => {
    return Vue.prototype.$http.post(`http://172.20.10.25:5000/api/goal/update`, request);
}

const createCheckIn = async (request) => {
    return Vue.prototype.$http.post(`http://172.20.10.25:5000/api/checkIn/create`, request);
  }
  
const updateCheckIn = async (request) => {
    return Vue.prototype.$http.post(`http://172.20.10.25:5000/api/checkIn/update`, request);
}
  
export default {
    getUserList,
    uploadImage,
    createGoal,
    updateGoal,
    createCheckIn,
    updateCheckIn,
    getGoalListOfUser
}