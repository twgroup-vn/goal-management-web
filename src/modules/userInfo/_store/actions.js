import api from '../_api/index';

const editUser = async (context, request) => {
  let response = await api.editUser(request);
  return response;
};

const uploadImage = async (context, request) => {
  let response = await api.uploadImage(request);
  return response.data;
};


export default {
  editUser,
  uploadImage
}