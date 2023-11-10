import userApi from "@/api/user";

const state = {}
const mutations = {}
const getters = {}
const actions = {
    async getUserById({}, id) {
        try {
            return userApi.getUserById(id)
        } catch (e) {
            return {}
        }
    },
    async updateUser({}, dataSubmit) {
        try {
            const {id, body} = dataSubmit
            return userApi.updateUser(id, body)
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