import actions from '../_store/actions';
import getters from '../_store/getters';
import mutations from '../_store/mutations';

const state = {
 token: null,
 currentUser: null,
 companiesOfUser: [],
 companyId: null,
 companyDetails: null
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations,
};
