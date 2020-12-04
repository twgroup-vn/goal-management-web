import Vue from 'vue';
import commonData from '../../../utils/common-data';

const getData = async (pageIndex, pageSize, description) => {
    var query = { "PageIndex": pageIndex, "PageSize": pageSize, "Description": description};
    return Vue.prototype.$http.post(`/api/user/getAll`, query);
}

const getRelatedData = async () => {
  return Vue.prototype.$http.get(`/api/user/getRelatedData`);
}

const addEmployee = async (request) => {
  return Vue.prototype.$http.post(`/api/company/addUserToCompany`, request);
}

const updateEmployee = async (request) => {
  return Vue.prototype.$http.post(`/api/user/update`, request);
}

const updateAccessModulesFromHR = async (request) => {
  return Vue.prototype.$http.post(commonData.HR_SET_PERMISSION, request);
}

const authorizeHRLogin = async (request) => {
  return Vue.prototype.$http.get(`${commonData.HR_TOKEN_AUTHORIZE}/${request}`);
}

  
export default {
    getData,
    addEmployee,
    updateEmployee,
    getRelatedData,
    updateAccessModulesFromHR,
    authorizeHRLogin
}