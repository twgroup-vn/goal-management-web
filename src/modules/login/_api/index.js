import Vue from 'vue';

const login = async (request) => {
    return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/user/login`, request);
}

const getCompanyOfUser = async (request) => {
    return Vue.prototype.$http.get(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/user/getCompanyOfUser/${request}`);
}

const getNotAuthorazation = async (request) => {
    return Vue.prototype.$http.get(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/user/getNotAuthorazation/${request}`);
}

const decodeToken = async (request) => {
    return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/user/getTokenClaims`, { "Title": request });
}

const refreshToken = async (request) => {
    return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/user/refreshToken`, request);
}

const getCompanyDetails = async () => {
    return Vue.prototype.$http.get(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/company/get`);
}

export default {
    login,
    getCompanyOfUser,
    getNotAuthorazation,
    decodeToken,
    refreshToken,
    getCompanyDetails
}