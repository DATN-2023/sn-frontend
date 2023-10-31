import axios from "axios";
import config from "@/config/config";

const {urlConfig: {serverUrl}} = config
const authApi = {
    async createFeed (body) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/feeds`,
                json: true,
                data: body,
                method: 'POST'
            }
            const { data } = await axios(options)
            return data
        } catch (e) {
            console.error('error createFeed')
            return {}
        }
    },
    async updateFeed (id, body) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/feeds/${id}`,
                json: true,
                data: body,
                method: 'PUT'
            }
            const { data } = await axios(options)
            return data
        } catch (e) {
            console.error('error updateFeed')
            return {}
        }
    },
    async deleteFeed (id) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/feeds/${id}`,
                json: true,
                method: 'DELETE'
            }
            const { data } = await axios(options)
            return data
        } catch (e) {
            console.error('error deleteFeed')
            return {}
        }
    },
    async getFeeds (q) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/feeds`,
                json: true,
                params: q,
                method: 'GET'
            }
            const { data } = await axios(options)
            return data
        } catch (e) {
            console.error('error getFeeds')
            return []
        }
    },
    async getFeedById (id) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/feeds/${id}`,
                json: true,
                method: 'GET'
            }
            const { data } = await axios(options)
            return data
        } catch (e) {
            console.error('error getFeeds')
            return {}
        }
    },
    async createReaction (body) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/reactions`,
                json: true,
                data: body,
                method: 'POST'
            }
            const { data } = await axios(options)
            return data
        } catch (e) {
            console.error('error createFeed')
            return {}
        }
    },
    async deleteReaction (id) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/reactions/feeds/${id}`,
                json: true,
                method: 'DELETE'
            }
            const { data } = await axios(options)
            return data
        } catch (e) {
            console.error('error createFeed')
            return {}
        }
    },
}
export default authApi