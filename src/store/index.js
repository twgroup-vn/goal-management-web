import Vue from 'vue'
import Vuex from 'vuex'
import app from '../main'
import loginModule from '../modules/login/_store';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    
  },
  modules: {
    $_loginPage: loginModule,
  },
  actions: {
    setLang({commit}, messages) {
      commit('SET_LANG', messages)
    },
  },
  mutations: {
    SET_LANG (state, messages) {
      app.$i18n.locale = messages
    }
  },
})