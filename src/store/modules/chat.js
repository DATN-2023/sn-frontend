import {chatApi} from "@/api/chat";

const state = {}
const mutations = {}
const getters = {}
const actions = {

    async createChannel({}, data) {
        return chatApi.createChannel(data)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
