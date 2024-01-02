import axios from "axios";
import config from "@/config/config";

const {urlConfig} = config
const {serverUrl} = urlConfig

const groupApi = {
    async createGroup(body) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/groups`,
                json: true,
                data: body,
                method: 'POST'
            }
            const {data} = await axios(options)
            return data
        } catch (e) {
            console.error('error createGroup')
            return {}
        }
    },
    async getGroups (q) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/groups`,
                json: true,
                params: q,
                method: 'GET'
            }
            const { data } = await axios(options)
            return data
        } catch (e) {
            console.error('error getGroups')
            return []
        }
    },
    async getJoiningGroups (q) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/groups/joining`,
                json: true,
                params: q,
                method: 'GET'
            }
            const { data } = await axios(options)
            return data
        } catch (e) {
            console.error('error getGroups')
            return []
        }
    },
    async getGroupById (id) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/groups/${id}`,
                json: true,
                method: 'GET'
            }
            const { data } = await axios(options)
            return data
        } catch (e) {
            console.error('error getGroupById')
            return {}
        }
    },
    async createUserGroup(body) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/userGroups`,
                json: true,
                data: body,
                method: 'POST'
            }
            const {data} = await axios(options)
            return data
        } catch (e) {
            console.error('error createUserGroup')
            return {}
        }
    },
    async deleteUserGroup(id) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/userGroups/${id}`,
                json: true,
                method: 'DELETE'
            }
            const {data} = await axios(options)
            return data
        } catch (e) {
            console.error('error deleteUserGroup')
            return {}
        }
    },
    async updateUserGroup(id, body) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/userGroups/${id}`,
                json: true,
                data: body,
                method: 'PUT'
            }
            const {data} = await axios(options)
            return data
        } catch (e) {
            console.error('error updateUserGroup')
            return false
        }
    },
    async getUserGroups (q) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/userGroups`,
                json: true,
                params: q,
                method: 'GET'
            }
            const { data } = await axios(options)
            return data
        } catch (e) {
            console.error('error getUserGroups')
            return []
        }
    },
    async approveUser(id, body) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/userGroups/${id}/approve`,
                json: true,
                data: body,
                method: 'PUT'
            }
            const {data} = await axios(options)
            return data
        } catch (e) {
            console.error('error approveUser')
            return {}
        }
    },
    async updateGroup(id, body) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/groups/${id}`,
                json: true,
                data: body,
                method: 'PUT'
            }
            const {data} = await axios(options)
            return data
        } catch (e) {
            console.error('error updateGroup')
            return false
        }
    },
}

export default groupApi
