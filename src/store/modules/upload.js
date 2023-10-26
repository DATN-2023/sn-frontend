import {uploadApi} from "@/api/upload";

const state = {}
const mutations = {}
const getters = {}
const actions = {
    getPresignedUrl({}, query) {
        const {name, type} = query
        console.log('type:', type)
        return uploadApi.getPresignedUrl(name, type)
    },
    async uploadFile(data) {
        const {url, file, type} = data
        return uploadApi.uploadFile(url, file, type)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}