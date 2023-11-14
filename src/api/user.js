import axios from "axios";
import config from "@/config/config";

const {urlConfig} = config
const userApi = {
    async getUserById (id) {
        try {
            const options = {
                headers: {},
                url: `${urlConfig.serverUrl}/users/${id}`,
                json: true,
                method: 'GET'
            }
            const { data } = await axios(options)
            return data
        } catch (e) {
            console.error('error getUserById')
            return {}
        }
    },
    async updateUser (id, body) {
        try {
            const options = {
                headers: {},
                url: `${urlConfig.serverUrl}/users/${id}`,
                json: true,
                method: 'PUT',
                data: body
            }
            const { data } = await axios(options)
            return data
        } catch (e) {
            console.error('error updateUser')
            return {}
        }
    },
    async createFriend (body) {
        try {
            const options = {
                headers: {},
                url: `${urlConfig.serverUrl}/friends`,
                json: true,
                method: 'POST',
                data: body
            }
            const { data } = await axios(options)
            return data
        } catch (e) {
            console.error('error createFriend')
            return {}
        }
    },
    async updateFriend (id, body) {
        try {
            const options = {
                headers: {},
                url: `${urlConfig.serverUrl}/friends/${id}`,
                json: true,
                method: 'PUT',
                data: body
            }
            const { data } = await axios(options)
            return data
        } catch (e) {
            console.error('error updateFriend')
            return {}
        }
    },
}

export default userApi