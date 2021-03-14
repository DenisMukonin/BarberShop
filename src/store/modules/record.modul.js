import axios from "../../axios/record";
import store from '../index'
import {error} from "@/utils/error";

export default {
    namespaced: true,
    state() {
        return {
            records: [],
            idClient: null,
            reviews: []
        }
    },
    getters: {
        records(state){
            return state.records
        },
        idClient(state){
            return state.idClient
        },
        reviews(state){
            return state.reviews
        }
    },
    mutations: {
        setRecords(state, records) {
            state.records = records
        },
        addRecords(state, records) {
            state.records.push(records)
        },
        setIdClient(state, id) {
            state.idClient = id
        },
        setReviews(state, reviews) {
            state.reviews = reviews
        },
        addReviews(state, reviews) {
            state.reviews.push(reviews)
        }
    },
    actions: {
        async create({commit, dispatch}, payload) {
            try {
                const idClient = store.state.info?.localIdClient || null
                if(idClient) {
                    const token = store.getters['login/token']
                    const { data } = await axios.post(`/clientsMP/${idClient}.json?auth=${token}`, payload)
                    commit('addRecords', {...payload, id: data.name})
                } else {
                    dispatch('setMessage', {
                        value: 'Для записи вам нужно зарегестрироваться',
                        type: 'danger'
                    }, {root: true})

                    throw new Error()
                }
            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
            }
        },
        async createNameAndPhone({dispatch}, payload) {
            try {
                const token = payload.idToken
                delete payload.idToken
                delete payload.password
                const { data } = await axios.post(`/clientsMPInfo.json?auth=${token}`, payload)

            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
            }
        },
        async createReview({commit, dispatch}, payload) {
            try {
                const token = store.getters['login/token']
                const { data } = await axios.post(`/clientsMPReviews.json?auth=${token}`, payload)

                commit('addReviews', {...payload, id: data.name})

                dispatch('setMessage', {
                    value: 'Отзыв отправлен!',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
            }
        },
        async loadReviews({ commit, dispatch, getters}) {
            try {
                const token = store.getters['login/token']
                const {data} = await axios.get(`/clientsMPReviews.json?auth=${token}`)

                if (data) {
                    const reviews = Object.keys(data).map(key => (
                        {...data[key], id: key})
                    )

                    commit('setReviews', reviews)
                }
            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
            }
        },
        async load({ commit, dispatch }) { // загрузить данные для таблицы
            try {
                const token = store.getters['login/token']
                const {data} = await axios.get(`/clientsMP.json?auth=${token}`)

                if (data) {
                    const records = Object.keys(data).map(id => ({...data[id]})) //{ ...Object.keys(data[id]}), id: id}    //.map(key => (Object.keys(key).))

                    let rec = {}
                    for (let i of records) {
                        rec = Object.assign(rec,i);
                    }
                    const recArr = Object.keys(rec).map(key => ({...rec[key], id: key}))

                    commit('setRecords', recArr)
                }

            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
            }
        },
        async loadOneClient({ commit, dispatch, getters }) {
            try {
                const token = store.getters['login/token']
                const {data} = await axios.get(`/clientsMP.json?auth=${token}`)
                if (data) {
                    commit('setIdClient', store.state.info.localIdClient)

                    const data2 = Object.keys(data[store.getters['record/idClient']])
                        .map(key => ({...data[store.getters['record/idClient']][key], id: key}) )

                    return data2
                }
                return []
            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
            }
        },
        async loadOne({ commit, dispatch, getters }, id) {
            try {
                const token = store.getters['login/token']
                const {data} = await axios.get(`/clientsMP.json?auth=${token}`)

                Object.keys(data).forEach(idClient => {
                    const one = Object.keys(data[idClient])

                    for (let i in one) {
                        if (one[i] === id) {
                            commit('setIdClient', idClient)
                        }
                    }
                })

                return {idClient: store.getters['record/idClient'], id: id, ...data[store.getters['record/idClient']][id] }
            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
            }
        },
        async remove({ dispatch}, payload) {
            try {
                const token = store.getters['login/token']
                const {data} = await axios.delete(`/clientsMP/${payload.idClient}/${payload.id}.json?auth=${token}`)

            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
            }

        },
        async update({ dispatch}, payload) {
            try {
                const record = {fio:payload.fio, phone:payload.phone, date:payload.date,time:payload.time, status:payload.status}
                const token = store.getters['login/token']
                const {data} = await axios.put(`/clientsMP/${payload.idClient}/${payload.id}.json?auth=${token}`, record)
            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
            }
        },

        async createDateBlock({commit, dispatch}, payload) {
            try {
                //не доработан. нет метода загрузки этих данных и чтения
                const token = store.getters['login/token']
                const { data } = await axios.post(`/clientsMPBlockDate.json?auth=${token}`, payload)
                // console.log('data', data)
                dispatch('setMessage', {
                    value: 'Даты заблокированы',
                    type: 'primary'
                }, {root: true})
            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.error.message),
                    type: 'danger'
                }, {root: true})
            }
        }



    }
}
