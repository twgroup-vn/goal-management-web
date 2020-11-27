import Vue from 'vue';
import commonData from "../../../utils/common-data";

const login = async (request) => {
    return Vue.prototype.$http.post(`/api/user/login`, request);
}

const getCompanyOfUser = async (request) => {
    return Vue.prototype.$http.get(`/api/user/getCompanyOfUser/${request}`);
}

const getNotAuthorazation = async (request) => {
    return Vue.prototype.$http.get(`/api/user/getNotAuthorazation/${request}`);
}

const decodeToken = async (request) => {
    return Vue.prototype.$http.post(`/api/user/getTokenClaims`, { "Title": request });
}

const refreshToken = async (request) => {
    return Vue.prototype.$http.post(`/api/user/refreshToken`, request);
}

const getCompanyDetails = async () => {
    return Vue.prototype.$http.get(`/api/company/get`);
}


const authorizeHRLogin = async (request) => {
    return Vue.prototype.$http.get(`${commonData.HR_TOKEN_AUTHORIZE}/${request}`);
}

const logOutHR = async () => {
    return Vue.prototype.$http.get(commonData.HR_LOGOUT);
}

const getUserInfoFromHRPort = async (request) => {
    return Vue.prototype.$http.get(`${commonData.HR_GET_USER_LOGIN}/${request}/NhanVien`);
}

const getToken = async (request) => {
    return Vue.prototype.$http.get(`/api/user/getToken/${request}`);
}

export default {
    login,
    logOutHR,
    getToken,
    getCompanyOfUser,
    getNotAuthorazation,
    decodeToken,
    refreshToken,
    getCompanyDetails,
    authorizeHRLogin,
    getUserInfoFromHRPort
}