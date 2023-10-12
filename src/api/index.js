import createAuthRefreshInterceptor from 'axios-auth-refresh'

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
                    deviceType: appConfig.deviceType.WEB,
                    deviceId: visitorId,
                    versionCode: '2'
                }
                data.signature = getSignature(data)
                return $axios.$post(appConfig.api.auth.enterGuest, data).then(res => {
                    if (process.client) {
                        $axios.setHeader('x-access-token', res.token)
                        $cookies.set(TOKEN_KEY, res.token)
                        store.dispatch('authen/checkGuest', true)
                    } else if (process.server) {
                        app.$axios.setHeader('x-access-token', res.token)
                        app.$cookies.set(TOKEN_KEY, res.token)
                        store.dispatch('authen/checkGuest', true)
                    }
                })
            case appConfig.httpCode.TOKEN_EXPIRED:
                try {
                    const res = await $axios.$post(appConfig.api.auth.refreshToken, {})
                    const token = res.token
                    store.dispatch(ACTION_SET_TOKEN, token)
                    $axios.setHeader('x-access-token', token)
                } catch (e) {

                }
                return Promise.resolve()
        }
    }
    $axios.onRequest(config => {
        let token
        if (process.client) {
            token = store.state.authen.token || $cookies.get(TOKEN_KEY)
        } else if (process.server) {
            token = app.$cookies.get(TOKEN_KEY)
        }
        if (token) {
            config.headers = {
                ...config.headers,
                'x-access-token': token
            }
        }

        if (config.data && (config.method.toUpperCase() === 'POST' || config.method.toUpperCase() === 'PUT' || config.method.toUpperCase() === 'DELETE')) {
            delete config.data.signature
            config.data.signature = getSignature(config.data)
        }
    })
    $axios.onError(error => {
        const code = parseInt(error.response && error.response.status)
        error.response = decryptData(error.response)
        switch (code) {
            case appConfig.httpCode.BAD_REQUEST:
                // redirect('/400')
                break
            case appConfig.httpCode.TOKEN_EXPIRED:
                break
            case appConfig.httpCode.UNAUTHORIZED:
                if (error.config && error.config.url === appConfig.api.auth.refreshToken) {
                    if (process.client) {
                        $cookies.remove(TOKEN_KEY)
                        store.dispatch('authen/removeUserInfo')
                        store.dispatch('authen/removeToken')
                        // if (!error.config.headers["x-access-token"] ||(error.config.headers.common &&!error.config.headers.common["x-access-token"]))
                        window.location.reload()
                    } else if (process.server) {
                        app.$cookies.remove(TOKEN_KEY)
                    }
                    refreshAuthLogic(error).then()
                }
                break
            default:
                break
        }
    })
    $axios.onResponse(response => {
        response = decryptData(response)
        return response
    })
    createAuthRefreshInterceptor($axios, refreshAuthLogic, {
        statusCodes: [appConfig.httpCode.TOKEN_EXPIRED, appConfig.httpCode.UNAUTHORIZED],
        retryInstance: $axios
    })
}