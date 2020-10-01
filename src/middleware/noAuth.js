import store from '../store'

export default async function noAuth(to, from, next) {
 if (localStorage.getItem('token')) {
    await store.dispatch('$_loginPage/getCurrentUser');
 }
 return next();
}
