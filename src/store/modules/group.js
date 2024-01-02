import group from "@/api/group";

const state = {}
const mutations = {}
const getters = {}
const actions = {
    async createGroup({dispatch, commit}, dataSubmit) {
        try {
            return group.createGroup(dataSubmit)
        } catch (e) {
            console.error('error')
            return false
        }
    },
    async getGroups({dispatch, commit}, query) {
        try {
            return group.getGroups(query)
        } catch (e) {
            console.error('error')
            return {}
        }
    },
    async getJoiningGroups({dispatch, commit}, query) {
        try {
            return group.getJoiningGroups(query)
        } catch (e) {
            console.error('error')
            return {}
        }
    },
    async getGroupById({dispatch, commit}, id) {
        try {
            return group.getGroupById(id)
        } catch (e) {
            console.error('error')
            return {}
        }
    },
    async createUserGroup({dispatch, commit}, dataSubmit) {
        try {
            return group.createUserGroup(dataSubmit)
        } catch (e) {
            console.error('error')
            return false
        }
    },
    async updateUserGroup({dispatch, commit}, {id, body}) {
        try {
            return group.updateUserGroup(id, body)
        } catch (e) {
            console.error('error')
            return false
        }
    },
    async deleteUserGroup({dispatch, commit}, id) {
        try {
            return group.deleteUserGroup(id)
        } catch (e) {
            console.error('error')
            return false
        }
    },
    async getUserGroups({dispatch, commit}, query) {
        try {
            return group.getUserGroups(query)
        } catch (e) {
            console.error('error')
            return {}
        }
    },
    async approveUser({dispatch, commit}, {id, body}) {
        try {
            return group.approveUser(id, body)
        } catch (e) {
            console.error('error')
            return false
        }
    },
    async updateGroup({dispatch, commit}, {id, body}) {
        try {
            return group.updateGroup(id, body)
        } catch (e) {
            console.error('error')
            return false
        }
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
