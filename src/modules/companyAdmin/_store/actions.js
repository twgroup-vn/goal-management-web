import api from '../_api/index';

const editCompany = async (context, request) => {
  let response = await api.editCompany(request);
  return response;
};

const uploadImage = async (context, request) => {
  let response = await api.uploadImage(request);
  return response.data;
};


export default {
    editCompany,
    uploadImage
}