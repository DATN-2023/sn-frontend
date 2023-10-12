import axios from "axios";
import config from "@/config/config";

const {urlConfig} = config
const authApi = {
    async enterGuest (body) {
        try {
            const options = {
                headers: {},
                url: `${urlConfig.authUrl}/enterGuest`,
                json: true,
                data: body,
                method: 'POST'
            }
            const { data } = await axios(options)
            return data
        } catch (e) {
            return {}
        }
    },
    async login (body) {
        try {
            const options = {
                headers: {},
                url: `${urlConfig.authUrl}/login`,
                json: true,
                data: body,
                method: 'POST'
            }
            const { data } = await axios(options)
            return data
        } catch (e) {
            console.error('error login')
            return {}
        }
    }
}
export default authApi