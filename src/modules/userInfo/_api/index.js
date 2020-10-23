import Vue from 'vue';

const editUser = async (request) => {
    return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/user/update`, request);
}

const uploadImage = async (request) => {
    var formData = new FormData();
    formData.append('file', request);
    return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/company/uploadAvatar`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
}

export default {
    editUser,
    uploadImage
}