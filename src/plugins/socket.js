import {reactive} from "vue";
import {io} from "socket.io-client";
import {TOKEN_KEY} from "@/config/constants";
import config from "@/config/config";

const {urlConfig: {chatUrl}} = config

export const state = reactive({
    connected: false,
    fooEvents: [],
    barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
export const socket = io(chatUrl, {
    auth: {
        token: window.$cookies.get(TOKEN_KEY)
    }
});

socket.on("connect", () => {
    state.connected = true;
    console.log('connect socket success')
});

socket.on("disconnect", () => {
    state.connected = false;
});
