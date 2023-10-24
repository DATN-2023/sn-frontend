import {createStore, createLogger} from 'vuex'
import auth from './modules/authen'
import feed from "@/store/modules/feed";

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        auth,
        feed
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})