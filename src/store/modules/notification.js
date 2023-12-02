import notificationApi from '@/api/notification'

const state = {
    totalUnread: 0
}
const mutations = {
    setTotalUnread (state, total) {
        state.totalUnread = total || 0
    }
}
const getters = {
    getTotalUnread (state) {
        return state.totalUnread
    }
}
const actions = {
    async getNotifications({commit, state}, q) {
        const res = notificationApi.getNotifications(q)
        commit('setTotalUnread', res?.totalUnread)
        return res
    },
    updateNotification({}, id) {
        return notificationApi.updateNotification(id)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
