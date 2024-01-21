const config = {
    urlConfig: {
        authUrl: import.meta.env.VITE_AUTH_URL || 'http://localhost:8005',
        serverUrl: import.meta.env.VITE_SERVER_URL || 'http://localhost:8000',
        imageUrl: import.meta.env.VITE_IMAGE_URL || 'http://minio:9000/social-network',
        chatUrl: import.meta.env.VITE_CHAT_URL || 'http://localhost:8009',
        thumborUrl: import.meta.env.VITE_THUMBOR_URL || 'http://localhost:8888',
        videoUrl: import.meta.env.VITE_VIDEO_URL || 'http://localhost:9000/social-network',
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
    },
    reactionTargetType: {
        FEED: 1,
        COMMENT: 2
    },
    reactionType: {
        LIKE: 1,
        LOVE: 2,
        LAUGH: 3,
        WOW: 4,
        SAD: 5,
        ANGRY: 6
    },
    friendRequestConfig: {
        PENDING: 1,
        ACCEPT: 2,
        UNFRIEND: 3
    },
    joinStatusGroupConfig: {
        MEMBER: 1,
        PENDING: 2
    },
    firebaseConfig: {
        apiKey: import.meta.env.VUE_APP_FIREBASE_API_KEY || 'AIzaSyBgXVtMkTVYqKDyPk2MnbR4ZXkQ44pYDJs',
        authDomain: import.meta.env.VUE_APP_FIREBASE_AUTH_DOMAIN || 'test-1a4cc.firebaseapp.com',
        databaseURL: import.meta.env.VUE_APP_FIREBASE_DATABASE_URL || 'https://test-1a4cc.firebaseio.com',
        projectId: import.meta.env.VUE_APP_FIREBASE_PROJECT_ID || 'test-1a4cc',
        storageBucket: import.meta.env.VUE_APP_FIREBASE_STORAGE_BUCKET || 'test-1a4cc.appspot.com',
        messagingSenderId: import.meta.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID || '772685687500',
        appId: import.meta.env.VUE_APP_FIREBASE_APP_ID || '1:772685687500:web:5ae7e6d49250335f543069',
        measurementId: import.meta.env.VUE_APP_FIREBASE_MEASUREMENT_ID || 'G-N6P4XVLF0L'
    },
    typeConfig: {
        COMMENT: 1,
        REACTFEED: 2,
        POST: 3,
        SHARE: 4,
        FOLLOW: 5,
        UNREACT: 6,
        UNFOLLOW: 7,
        REACTCOMMENT: 8
    }
}
export default config
