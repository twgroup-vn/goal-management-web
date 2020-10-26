import Vue from 'vue';

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

export default {
    login,
    getCompanyOfUser,
    getNotAuthorazation,
    decodeToken,
    refreshToken,
    getCompanyDetails
}