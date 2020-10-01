import api from '../_api/index';

const create = async (context, request) => {
  console.log(request);
  let response = await api.create(request);
  return response;
};

const uploadImage = async (context, request) => {
  let response = await api.uploadImage(request);
  return response.data;
};


export default {
  create,
  uploadImage
}