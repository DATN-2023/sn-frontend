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
}

export default userApi