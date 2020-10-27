import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import router from './router'
import 'bootstrap/dist/css/bootstrap.css'
import './styles/global.scss'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import axios from 'axios'
import store from './store/index'
import i18n from './lang/i18n'
import VueCountdownTimer from 'vuejs-countdown-timer';
Vue.config.productionTip = false

library.add(fas)
library.add(far)
library.add(fab)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vuex)
Vue.use(VueRouter)
Vue.use(ElementUI, { locale })
import configPlugin from '../vue.config'
Vue.use(configPlugin)
Vue.use(VueCountdownTimer);

axios.defaults.baseURL = process.env.VUE_APP_API_ROOT;
Vue.prototype.$http = axios

const app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')


export default app