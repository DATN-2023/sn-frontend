import axios from "axios";
import config from "@/config/config";

const {urlConfig: {serverUrl}} = config

const notificationApi = {
    async addFcmToken(body) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/fcmtokens`,
                json: true,
                data: body,
                method: 'POST'
            }
            const {data} = await axios(options)
            return data
        } catch (e) {
            console.log(e)
            console.error('error addFcmToken')
            return {status: e?.response?.status}
        }
    },
    async deleteFcmtoken(body) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/fcmtokens`,
                json: true,
                data: body,
                method: 'DELETE'
            }
            const {data} = await axios(options)
            return data
        } catch (e) {
            console.error('error deleteFcmtoken')
            return false
        }
    },
    async getNotifications(q) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/notifications`,
                json: true,
                params: q,
                method: 'GET'
            }
            const {data} = await axios(options)
            return data
        } catch (e) {
            console.error('error getNotifications')
            return []
        }
    },
    async updateNotification(id, body = {}) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/notifications/${id}`,
                json: true,
                data: body,
                method: 'PUT'
            }
            const {data} = await axios(options)
            return data
        } catch (e) {
            console.error('error addFcmToken')
            return {}
        }
    },
}

export default notificationApi
