import { createStore } from 'vuex'
import login from './modules/login.modul'
import record from "./modules/record.modul";
const INFO_KEY = 'jwt-info-client'

export default createStore({
  state() {
    return {
      message: null,
      info: JSON.parse(localStorage.getItem(INFO_KEY)),
      infoClient: false
    }
  },

  mutations: {
    setMessage(state, message) {
      state.message = message
    },
    clearMessage(state) {
      state.message = null
    },
    setInfoClient(state, info) {
      state.info = info
      localStorage.setItem(INFO_KEY, JSON.stringify(info))
    },
    clearInfoClient(state) {
      state.info = null
      localStorage.removeItem(INFO_KEY)
    },
    openInfoClient(state) {
      state.infoClient = true
    },
    closeInfoClient(state) {
      state.infoClient = false
    }
  },
  actions: {
    setMessage({commit}, message) {
      commit('setMessage', message)
      setTimeout(() => {
        commit('clearMessage')
      },  3000)
    },
    setInfoClient({commit}, info) {
      commit('setInfoClient', info)

      setTimeout(() => {
        commit('clearInfoClient')
        commit('login/logout', {root: true})
      }, info.expiresIn * 1000 )
    }

  },
  modules: {
    login, record
  }
})
