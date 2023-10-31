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
            // console.log(data)
            return await feed.createFeed(dataSubmit)
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
    },
    async createReaction({dispatch, commit}, id) {
        try {
            // console.log(data)
            return await feed.createReaction(id)
        } catch (e) {
            console.error('error createReaction')
            return {}
        }
    },
    async deleteReaction({dispatch, commit}, id) {
        try {
            // console.log(data)
            return await feed.deleteReaction(id)
        } catch (e) {
            console.error('error deleteReaction')
            return {}
        }
    },
    async deleteFeed({dispatch, commit}, id) {
        try {
            // console.log(data)
            return await feed.deleteFeed(id)
        } catch (e) {
            console.error('error deleteFeed')
            return {}
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