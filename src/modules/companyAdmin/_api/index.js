import Vue from 'vue';

const editCompany = async (request) => {
    return Vue.prototype.$http.post(`http://localhost:5000/api/company/update`, request);
}

const uploadImage = async (request) => {
    var formData = new FormData();
    formData.append('file', request);
    return Vue.prototype.$http.post(`http://localhost:5000/api/company/uploadAvatar`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export default {
    editCompany,
    uploadImage
}