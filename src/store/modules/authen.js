import platform from "platform";
import config from "@/config/config";
import api from "@/api";

const {authApi} = api

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
    test: () => {
        console.log('test')
    }
}

const actions = {
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
}

const mutations = {
    CHECK_GUEST(state, payload) {
        state.isGuest = payload
        this.$cookies.set(GUEST_KEY, payload)
    },
    SET_TOKEN(state, payload) {
        state.token = payload
        this.$cookies.set(TOKEN_KEY, payload)
        if (process.client) {
            localStorage.setItem(TOKEN_KEY, payload)
        }
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}