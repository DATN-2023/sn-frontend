import {createStore, createLogger} from 'vuex'
import auth from './modules/authen'
import feed from "@/store/modules/feed";
import upload from "@/store/modules/upload";
import user from '@/store/modules/user'

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        auth,
        feed,
        upload,
        user
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})