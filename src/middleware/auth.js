import Vue from 'vue';
import state from '../modules/login/_store/index';
import store from '../store'

export default async function auth(to, from, next) {
  const search = window.location.search;
  if(search.includes("refreshtoken")){
    let refreshToken = search.slice(14);
    localStorage.setItem("TWG_HR_token", refreshToken);
    let authorize = await store.dispatch('$_loginPage/authorizeHRLogin', refreshToken);
    Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${authorize}`;
    let getUserInfoFromHRPort = await store.dispatch('$_loginPage/getUserInfoFromHRPort', refreshToken);
    getUserInfoFromHRPort = getUserInfoFromHRPort && getUserInfoFromHRPort.value ? JSON.parse(getUserInfoFromHRPort.value) : null;
    await store.dispatch('$_loginPage/getToken', getUserInfoFromHRPort.MaNhanVien);
    Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    if(localStorage.getItem('companyId')){
      await store.dispatch('$_loginPage/getCompanyDetails', localStorage.getItem('companyId'));
      Vue.prototype.$http.defaults.headers.common['CompanyId'] = `${localStorage.getItem('companyId')}`;
    }
    return next();
  }
  if (!localStorage.getItem('token') && !state.state.token) {
    return next('/login');
  }
  else if (localStorage.getItem('token') && localStorage.getItem("TWG_HR_token")) {
    let success = await store.dispatch('$_loginPage/authorizeHRLogin', localStorage.getItem("TWG_HR_token"));
    if(success && success != ""){
      var currentTime = new Date().getTime();
      var expireTime = localStorage.getItem('expireTime');
      if (expireTime - currentTime < 1000) {
        await store.dispatch('$_loginPage/refreshToken');
      }
      else {
        await store.dispatch('$_loginPage/getCurrentUser');
      }
      Vue.prototype.$http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
      if(localStorage.getItem('companyId')){
        await store.dispatch('$_loginPage/getCompanyDetails', localStorage.getItem('companyId'));
        Vue.prototype.$http.defaults.headers.common['CompanyId'] = `${localStorage.getItem('companyId')}`;
        if (to.meta.ignoreCheckAccess) {
          return next();
        }
        else if (state.state.currentUser && to.meta.accessRight) {
          let positionObject = state.state.currentUser && state.state.currentUser.position ? JSON.parse(state.state.currentUser.position) : null;
          let positionOfCompany = positionObject.find( o => o.CompanyId === localStorage.getItem("companyId"));
          let isAdmin = positionOfCompany && positionOfCompany.IsAdmin ? positionOfCompany.IsAdmin : false;
          if (!isAdmin) {
            return next('/404')
          } else {
            return next();
          }
        }
        else {
          return next('/404');
        }
      }
      else
      {
        return next('/login');
      }
    }
    else{
      localStorage.clear();
      return next('/login');
    }
  }
}
