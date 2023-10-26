import feed from "@/api/feed";

const state = {
    feeds: []
}

const mutations = {
    setFeeds(feeds) {
        state.feeds = feeds
    }
}

const getters = {
    getFeeds() {
        return state.feeds
    }
}

const actions = {
    async createFeed({dispatch, commit}, dataSubmit) {
        try {
            const data = await feed.createFeed(dataSubmit)
            console.log(data)
            return data
        } catch (e) {
            console.error('error')
            return {}
        }
    },
    async getFeed({dispatch, commit}, query) {
        try {
            return feed.getFeeds(query)
        } catch (e) {
            console.error('error')
            return []
        }
    },
    async getFeedById({dispatch, commit}, id) {
        try {
            return await feed.getFeedById(id)
        } catch (e) {
            console.error('error')
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