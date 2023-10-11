const config = {
    urlConfig: {
        authUrl: process.env.VUE_AUTH_URL || 'http://localhost:8003'
    },
    deviceTypes: {
        ANDROID: 1,
        IOS: 2,
        BROWSER: 3
    }
}
export default config