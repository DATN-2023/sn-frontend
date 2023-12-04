import createAuthRefreshInterceptor from 'axios-auth-refresh'
import appConfig from '@/config/config'
import {FAKE_DEVICEID, TOKEN_KEY, VISITOR_ID} from "@/config/constants";
import authApi from "@/api/auth";

export default function ({$axios, store, app, $cookies}) {
    const refreshAuthLogic = async failedRequest => {
        const code = parseInt(failedRequest.response && failedRequest.response.status)
        switch (code) {
            case appConfig.httpCode.UNAUTHORIZED:
                const endpoint = window.location.pathname
                if (endpoint !== '/login') window.location.replace('/login')
                return Promise.resolve()
            case appConfig.httpCode.TOKEN_EXPIRED:
                try {
                    const token = store.dispatch('auth/refreshToken')
                    $axios.setHeader('x-access-token', token)
                } catch (e) {

                }
                return Promise.resolve()
        }
    }
    createAuthRefreshInterceptor($axios, refreshAuthLogic, {
        statusCodes: [appConfig.httpCode.TOKEN_EXPIRED, appConfig.httpCode.UNAUTHORIZED],
        retryInstance: $axios
    })
    $axios.interceptors.request.use((config) => {
        config.headers['x-access-token'] = $cookies.get(TOKEN_KEY)
        return config
    })
    // axios.interceptors.response.use(function (response) {
    //     return response;
    // }, function (error) {
    //     const code = parseInt(error.response && error.response.status)
    //     error.response = decryptData(error.response)
    //     switch (code) {
    //         case appConfig.httpCode.BAD_REQUEST:
    //             // redirect('/400')
    //             break
    //         case appConfig.httpCode.TOKEN_EXPIRED:
    //             break
    //         case appConfig.httpCode.UNAUTHORIZED:
    //             if (error.config && error.config.url === appConfig.api.auth.refreshToken) {
    //                 $cookies.remove(TOKEN_KEY)
    //                 store.dispatch('auth/removeUserInfo')
    //                 store.dispatch('auth/removeToken')
    //                 window.location.reload()
    //                 refreshAuthLogic(error).then()
    //             }
    //             break
    //         default:
    //             break
    //     }
    // });
}