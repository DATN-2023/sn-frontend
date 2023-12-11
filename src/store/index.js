import {createStore, createLogger} from 'vuex'
import auth from './modules/authen'
import feed from "@/store/modules/feed";
import upload from "@/store/modules/upload";
import user from '@/store/modules/user'
import group from '@/store/modules/group'
import notification from "@/store/modules/notification";
import chat from "@/store/modules/chat";

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        auth,
        feed,
        upload,
        user,
        group,
        notification,
        chat
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})
