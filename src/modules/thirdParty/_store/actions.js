import api from '../_api/index';

const syncDataFromHR = async (context, request) => {
  let response = await api.syncDataFromHR(request);
  return response.data;
};

export default {
  syncDataFromHR
}