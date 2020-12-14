import Vue from 'vue';

const getUserList = async () => {
    return Vue.prototype.$http.get(`/api/company/getRelatedUser`);
}

const getAllGoalOfCompany = async () => {
    return Vue.prototype.$http.get(`/api/goal/getAllGoalOfCompany`);
}

const getGoalListOfUser = async (pageIndex, pageSize, description, title) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description, "Title": title };
    return Vue.prototype.$http.post(`/api/goal/getGoalOfUser`, query);
}

const uploadImage = async (request) => {
    var formData = new FormData();
    formData.append('file', request);
    return Vue.prototype.$http.post(`/api/company/uploadAvatar`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

const createRelation = async (request) => {
    return Vue.prototype.$http.post(`/api/goal/createRelation`, { "Description" : request });
}

const createGoal = async (request) => {
    return Vue.prototype.$http.post(`/api/goal/create`, request);
}
  
const updateGoal = async (request) => {
    return Vue.prototype.$http.post(`/api/goal/update`, request);
}

const createCheckIn = async (request) => {
    return Vue.prototype.$http.post(`/api/checkIn/create`, request);
  }
  
const updateCheckIn = async (request) => {
    return Vue.prototype.$http.post(`/api/checkIn/update`, request);
}

const createSubGoal = async (request) => {
    return Vue.prototype.$http.post(`/api/subGoal/create`, request);
}

const createMainResult = async (request) => {
    return Vue.prototype.$http.post(`/api/result/create`, request);
}

const updateMainResult = async (request) => {
    return Vue.prototype.$http.post(`/api/result/update`, request);
}

const deleteMainResult = async (request) => {
    return Vue.prototype.$http.delete(`/api/result/delete/${request}`);
}

const createCheckInMainResult = async (request) => {
    return Vue.prototype.$http.post(`/api/checkIn/create`, request);
}
  
const updateCheckInMainResult = async (request) => {
    return Vue.prototype.$http.post(`/api/checkIn/update`, request);
}

const getBoardId = async (request) => {
    return Vue.prototype.$http.get(`/api/cardGroup/getBoardId/${request}`);
}

const updateSubGoal = async (request) => {
    return Vue.prototype.$http.post(`/api/subGoal/update`, request);
}

const checkInSubGoal = async (request) => {
    return Vue.prototype.$http.post(`/api/checkIn/create`, request);
}

export default {
    getUserList,
    getBoardId,
    uploadImage,
    createGoal,
    updateGoal,
    createCheckIn,
    updateCheckIn,
    getGoalListOfUser,
    getAllGoalOfCompany,
    createRelation,
    createSubGoal,
    createMainResult,
    updateMainResult,
    deleteMainResult,
    createCheckInMainResult,
    updateCheckInMainResult,
    updateSubGoal,
    checkInSubGoal
}