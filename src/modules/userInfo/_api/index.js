import Vue from 'vue';

const editUser = async (request) => {
    return Vue.prototype.$http.post(`http://172.20.10.25:5000/api/user/update`, request);
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

export default {
    editUser,
    uploadImage
}