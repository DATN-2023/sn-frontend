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
            return feed.getFeedById(id)
        } catch (e) {
            console.error('error getFeedById')
            return {}
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
    async createComment({dispatch, commit}, dataSubmit) {
        try {
            return feed.createComment(dataSubmit)
        } catch (e) {
            console.error('error createComment')
            return {}
        }
    },
    async deleteComment({dispatch, commit}, id) {
        try {
            return await feed.deleteComment(id)
        } catch (e) {
            console.error('error deleteComment')
            return {}
        }
    },
    async getComments({dispatch, commit}, q) {
        try {
            console.log(q)
            return await feed.getComments(q)
        } catch (e) {
            console.error('error getComments')
            return []
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
