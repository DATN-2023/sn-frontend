const config = {
    urlConfig: {
        authUrl: import.meta.env.VUE_AUTH_URL || 'http://localhost:8005',
        serverUrl: import.meta.env.VUE_SERVER_URL || 'http://localhost:8000',
        imageUrl: import.meta.env.VUE_IMAGE_URL || 'http://localhost:9000/social-network'
    },
    deviceTypes: {
        ANDROID: 1,
        IOS: 2,
        BROWSER: 3
    },
    httpCode: {
        SUCCESS: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        TOKEN_EXPIRED: 409,
        UNKNOWN_ERROR: 520,
        FORBIDDEN: 403,
        ADMIN_REQUIRE: 406,
        SIGNATURE_ERROR: 411,
        UNAUTHORIZED: 401,
        USER_BLOCK: 412,
        DEVICE_BLOCK: 413
    },
    feedType: {
        POST: 1,
        SHARE: 2
    }
}
export default config