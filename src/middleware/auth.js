import Vue from 'vue';
import state from '../modules/login/_store/index'
import store from '../store'

export default async function auth(to, from, next) {
  if (!localStorage.getItem('token') && !state.state.token) {
    return next('/login');
  }
  else if (localStorage.getItem('token')) {
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
      return next();
    }
    else
    {
      return next('/login');
    }
  }
}
