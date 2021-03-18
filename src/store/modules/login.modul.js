import axios from "../../axios/record";
import {error} from "@/utils/error";
import store from '../index'

const TOKEN_KEY = 'jwt-token'
const INFO_KEY = 'jwt-info-client'

export default {
    namespaced: true,
    state() {
        return{
            token: localStorage.getItem(TOKEN_KEY)
        }
    },
    getters: {
        token(state){
            return state.token
        },
        isAuthenticated(_, getters) {
            return !!getters.token
        }
    },
    mutations: {
        setToken(state, token) {
            state.token = token
            localStorage.setItem(TOKEN_KEY, token)
        },
        logout(state){
            state.token = null
            localStorage.removeItem(TOKEN_KEY)
            localStorage.removeItem(INFO_KEY)
            store.dispatch('setMessage', {
                value: 'Вы вышли из системы',
                type: 'warning'
            }, {root: true})
        }
    },
    actions: {
        async loadInfo({ commit, dispatch, getters}, payload) {
            try {
                const {data} = await axios.get(`/clientsMPInfo.json?auth=${payload.idToken}`)
                let data2 = null
                Object.keys(data).forEach( key => {
                    if (data[key].localId === payload.localId) {
                        data2 = data[key]
                    }
                })

                return data2
            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },
        async login({ commit, dispatch}, payload) {
            try {
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.VUE_APP_FB_KEY}`
                const {data} = await axios.post(url, {...payload, returnSecureToken: true})
                commit('setToken', data.idToken)
                const info = await dispatch('loadInfo', {idToken: data.idToken, localId: data.localId})
                dispatch('setInfoClient', {
                    fioClient: info.fio,
                    phoneClient: info.phone,
                    emailClient: data.email,
                    expiresIn: data.expiresIn,
                    localIdClient: data.localId
                }, {root: true})
                commit('clearMessage', null, {root: true})
                dispatch('setMessage', {
                    value: 'Вы вошли',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        },
        async register({ commit, dispatch}, payload) {
            try {
                const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.VUE_APP_FB_KEY}`
                const {data} = await axios.post(url, {...payload, returnSecureToken: true})
                commit('setToken', data.idToken)
                dispatch('setInfoClient', {
                    fioClient: payload.fio,
                    phoneClient: payload.phone,
                    emailClient: data.email,
                    expiresIn: data.expiresIn,
                    localIdClient: data.localId
                }, {root: true})
                dispatch('record/createNameAndPhone', {...payload, localId: data.localId, idToken:data.idToken}, {root: true})
                commit('clearMessage', null, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
                throw new Error()
            }
        }
    }
}
