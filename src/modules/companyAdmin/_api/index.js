import Vue from 'vue';

const editCompany = async (request) => {
    return Vue.prototype.$http.post(`/api/company/update`, request);
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

export default {
    editCompany,
    uploadImage
}