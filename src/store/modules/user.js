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
    },
    async updateFriend({}, dataSubmit) {
        try {
            const {id, body} = dataSubmit
            return userApi.updateFriend(id, body)
        } catch (e) {
            return {}
        }
    },
    async createFriend({}, dataSubmit) {
        try {
            return userApi.createFriend(dataSubmit)
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