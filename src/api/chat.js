import axios from "axios";
import config from "@/config/config";

const {urlConfig: {serverUrl}} = config
export const chatApi = {
    async createChannel(body) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/channels`,
                json: true,
                data: body,
                method: 'POST'
            }
            const {data} = await axios(options)
            return data
        } catch (e) {
            console.error('error createChannel')
            return false
        }
    },
}
