import platform from "platform";
import config from "@/config/config";
import authApi from "@/api/auth";
import {GUEST_KEY, TOKEN_KEY, USER_KEY, VISITOR_ID} from "@/config/constants";

const state = () => ({
    intervalPing: null,
    token: null,
    isGuest: true,
    userInfo: null,
    isLoggedIn: false,
    visitorId: null,
    visibleTransitionGuest: false,
    transitionGuestData: {
        leads: [],
        favorites: [],
        sellCars: []
    }
})

const getters = {
    token(state) {
        return state.token
    },
    isGuest(state) {
        return state.isGuest
    },
    userInfo(state) {
        return state.userInfo
    },
    isLoggedIn(state) {
        return state.isLoggedIn
    },
    visibleTransitionGuest(state) {
        return state.visibleTransitionGuest
    },
    transitionGuestData(state) {
        return state.transitionGuestData
    },
    intervalPing(state) {
        return state.intervalPing
    },
}

const actions = {
    setVistorId({commit}, data) {
        commit('SET_VISISTOR_ID', data)
    },
    setUserInfo({commit}, data) {
        commit('SET_USERINFO', data)
    },
    removeUserInfo({commit}) {
        commit('REMOVE_USERINFO')
    },
    setToken({commit}, token) {
        commit('SET_TOKEN', token)
    },
    checkGuest({commit}, payload) {
        commit('CHECK_GUEST', payload)
    },
    removeToken({commit}) {
        commit('REMOVE_TOKEN')
    },
    changeLoginStatus({commit}, status) {
        commit('CHANGE_LOGIN_STATUS', status)
    },
    toggleTransitionGuestModal({commit}, payload) {
        commit('TOGGLE_TRANSITION_GUEST_MODAL', payload)
    },
    async enterGuest({commit, dispatch}) {
        try {
            const vistorId = await dispatch('getVisitorId')
            const data = {
                deviceName: platform.description,
                deviceType: config.deviceTypes.WEB,
                deviceId: vistorId,
                versionCode: '1'
            }
            const {token} = await authApi.enterGuest(data)
            if (token) {
                commit('CHECK_GUEST', true)
                commit('SET_TOKEN', token)
            }
            return Promise.resolve({token})
        } catch (err) {
            return Promise.resolve(err)
        }
    },
    getVisitorId({dispatch}) {
        try {
            if (process.client) {
                const visitorId = this.$cookies.get(VISITOR_ID)
                if (visitorId)
                    return visitorId
                return Math.random().toString(36)
            }
            const visitorId = this.app.$cookies.get(VISITOR_ID)
            if (visitorId) {
                return visitorId
            }
            return Math.random().toString(36)
        } catch (err) {
            return Math.random().toString(36)
        }
    },
    async login({ dispatch }, dataSubmit) {
        try {
            console.log('test above')
            const {data} = await authApi.login(dataSubmit)
            console.log('test')
            if(data) {
                dispatch('setToken', data.token)
                dispatch('setUserInfo', data.user)
            }
        } catch (err) {
            console.error(err)
        }
    }
}

const mutations = {
    TOGGLE_TRANSITION_GUEST_MODAL(state, payload) {
        state.visibleTransitionGuest = !state.visibleTransitionGuest
        if (state.visibleTransitionGuest && payload) {
            state.transitionGuestData = payload
        } else {
            state.transitionGuestData = {
                leads: [],
                favorites: [],
                sellCars: []
            }
        }
    },
    SET_VISISTOR_ID(state, payload) {
        state.visitorId = payload
        if (process.client) {
            localStorage.setItem(VISITOR_ID, JSON.stringify(payload))
        }
    },
    SET_USERINFO(state, payload) {
        state.userInfo = payload
        if (process.client) {
            localStorage.setItem(USER_KEY, JSON.stringify(payload))
        }
    },
    REMOVE_USERINFO(state) {
        state.userInfo = {}
        if (process.client) {
            localStorage.removeItem(USER_KEY)
        }
    },
    SET_TOKEN(state, payload) {
        state.token = payload
        this.$cookies.set(TOKEN_KEY, payload)
        if (process.client) {
            localStorage.setItem(TOKEN_KEY, payload)
        }
    },
    REMOVE_TOKEN(state) {
        state.token = null
        this.$cookies.remove(TOKEN_KEY)
        if (process.client) {
            localStorage.removeItem(TOKEN_KEY)
        }
    },
    CHECK_GUEST(state, payload) {
        state.isGuest = payload
        this.$cookies.set(GUEST_KEY, payload)
    },
    CHANGE_LOGIN_STATUS(state, status) {
        state.isLoggedIn = status
    },
    SET_INTERVAL_PING(state, payload) {
        state.intervalPing = payload
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}