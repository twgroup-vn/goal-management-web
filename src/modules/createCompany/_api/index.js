import Vue from 'vue';

const create = async (request) => {
  console.log(request)
  return Vue.prototype.$http.post(`http://dev-twedu.southeastasia.cloudapp.azure.com:5018/api/company/create`, request);
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
  create,
  uploadImage
}