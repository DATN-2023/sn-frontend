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
            const data = await authApi.login(dataSubmit)
            if(data) {
                dispatch('setToken', data.token)
                dispatch('setUserInfo', data.user)
            }
        } catch (err) {
            console.error(err)
        }
    },
    async logout({router, dispatch, commit, getters}) {
        await authApi.logout()
        dispatch('removeUserInfo')
        dispatch('removeToken')
        await dispatch('enterGuest')
    },
    async refreshToken({dispatch}) {
        console.log('testtt refresh')
        const res = await authApi.refreshToken()
        console.log('refreshToken', res)
        dispatch('setToken', res.token)
        return res.token
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
    },
    SET_USERINFO(state, payload) {
        state.userInfo = payload
    },
    REMOVE_USERINFO(state) {
        state.userInfo = {}
    },
    SET_TOKEN(state, payload) {
        state.token = payload
        window.$cookies.set(TOKEN_KEY, payload)
    },
    REMOVE_TOKEN(state) {
        state.token = null
        this.$cookies.remove(TOKEN_KEY)
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
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}