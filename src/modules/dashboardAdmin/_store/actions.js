import api from '../_api/index';

const getData = async (context) => {
  let response = await api.getData(context.state.search, context.state.page, context.state.limit, context.state.sortBy, context.state.sortDirection);
  context.commit('SET_DATA', response);
};

const getDataNoPaging = async (context) => {
  let response = await api.getDataNoPaging(context.state.search);
  context.commit('SET_DATA_NO_PAGING', response);
};

const setSearch = async (context, request) => {
  context.commit('SET_SEARCH', request);
};

const setOrderDirection = async (context, request) => {
  context.commit('SET_ORDER_DIRECTION', request)
};

const setOrderBy = async (context, request) => {
  context.commit('SET_ORDERBY', request);
};

const deleteData = async (context, request) => {
  let response = await api.deleteData(request);
  context.commit('DELETE_DATA', response);
};

export default {
  getData,
  getDataNoPaging,
  setSearch,
  setOrderDirection,
  setOrderBy,
  deleteData
}