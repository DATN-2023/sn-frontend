import axios from "axios";
import config from "@/config/config";

const {urlConfig: {serverUrl}} = config
export const uploadApi = {
    async getPresignedUrl(name) {
        try {
            const options = {
                headers: {},
                url: `${serverUrl}/presignedUrl`,
                json: true,
                params: {name},
                method: 'GET'
            }
            const {data} = await axios(options)
            return data
        } catch (e) {
            console.error('error getPresignedUrl')
            return {}
        }
    },
    async uploadFile(url, file, type) {
        try {
            // const arrBuf = await file.arrayBuffer()
            // const blob = new Blob([new Uint8Array(arrBuf)], {type})
            const options = {
                headers: {},
                url: `${url}`,
                data: file,
                method: 'PUT'
            }
            const {data} = await axios(options)
            return data
        } catch (e) {
            console.error(e)
            return ''
        }
    }
}