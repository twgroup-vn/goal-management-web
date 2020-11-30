import store from '../store'
import commonData from '../utils/common-data';
export default async function noAuth(to, from, next) {
 if (localStorage.getItem('token') && localStorage.getItem("TWG_HR_token")) {
   await store.dispatch('$_loginPage/getCurrentUser');
   return next();
 }
 else{
   window.location.href = commonData.HR_DOMAIN;
 }
}
