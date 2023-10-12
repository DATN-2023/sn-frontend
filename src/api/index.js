import createAuthRefreshInterceptor from 'axios-auth-refresh'
import appConfig from '@/config/config'
import {FAKE_DEVICEID, TOKEN_KEY, VISITOR_ID} from "@/config/constants";
import authApi from "@/api/auth";

export default function ({$axios, store, app, $cookies}) {
    const refreshAuthLogic = async failedRequest => {
        const code = parseInt(failedRequest.response && failedRequest.response.status)
        switch (code) {
            case appConfig.httpCode.UNAUTHORIZED:
                let visitorId = Math.random().toString(36)
                if (process.client) {
                    visitorId = $cookies.get(VISITOR_ID)
                } else {
                    visitorId = app.$cookies.get(VISITOR_ID)
                }
                if (!visitorId) {
                    visitorId = Math.random().toString(36)
                }
                if (!process.client) {
                    app.$cookies.set(FAKE_DEVICEID, "1")
                }

                const data = {
                    deviceType: appConfig.deviceTypes.WEB,
                    deviceId: visitorId,
                    versionCode: '2'
                }
                const {data: res} = await authApi.enterGuest(data)
                app.$axios.setHeader('x-access-token', res.token)
                app.$cookies.set(TOKEN_KEY, res.token)
                store.dispatch('auth/checkGuest', true)
                return Promise.resolve()
            case appConfig.httpCode.TOKEN_EXPIRED:
                // try {
                //     const res = await $axios.$post(appConfig.api.auth.refreshToken, {})
                //     const token = res.token
                //     store.auth.dispatch(ACTION_SET_TOKEN, token)
                //     $axios.setHeader('x-access-token', token)
                // } catch (e) {
                //
                // }
                // return Promise.resolve()
        }
    }
    createAuthRefreshInterceptor($axios, refreshAuthLogic, {
        statusCodes: [appConfig.httpCode.TOKEN_EXPIRED, appConfig.httpCode.UNAUTHORIZED],
        retryInstance: $axios
    })
    // $axios.interceptors.request.use(refreshAuthLogic)
}