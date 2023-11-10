import userApi from "@/api/user";

const state = {}
const mutations = {}
const getters = {}
const actions = {
    async getUserById ({}, id) {
        try {
            return userApi.getUserById(id)
        } catch (e) {
            return {}
        }
    }
}
export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}