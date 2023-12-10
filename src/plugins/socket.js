import {reactive} from "vue";
import {io} from "socket.io-client";
import {TOKEN_KEY} from "@/config/constants";

export const state = reactive({
    connected: false,
    fooEvents: [],
    barEvents: []
});

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === "production" ? undefined : "http://localhost:8009";

export const socket = io(URL, {
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
