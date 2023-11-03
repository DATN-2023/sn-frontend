import * as Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import store from "@/store";
import router from "@/router";
import { initializeApp } from "firebase/app";
import './assets/css/index.css'
import initAxios from './api'
import axios from "axios";
import PrimeVue from 'primevue/config';
import 'virtual:windi.css'
import 'primevue/resources/themes/lara-light-teal/theme.css'
// import 'primevue/resources/themes/lara-dark-teal/theme.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import Menu from 'primevue/menu';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ConfirmPopup from 'primevue/confirmpopup';


const firebaseConfig = {
    apiKey: import.meta.env.VUE_APP_FIREBASE_API_KEY || 'AIzaSyBgXVtMkTVYqKDyPk2MnbR4ZXkQ44pYDJs',
    authDomain: import.meta.env.VUE_APP_FIREBASE_AUTH_DOMAIN || 'test-1a4cc.firebaseapp.com',
    databaseURL: import.meta.env.VUE_APP_FIREBASE_DATABASE_URL || 'https://test-1a4cc.firebaseio.com',
    projectId: import.meta.env.VUE_APP_FIREBASE_PROJECT_ID || 'test-1a4cc',
    storageBucket: import.meta.env.VUE_APP_FIREBASE_STORAGE_BUCKET || 'test-1a4cc.appspot.com',
    messagingSenderId: import.meta.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID || '772685687500',
    appId: import.meta.env.VUE_APP_FIREBASE_APP_ID || '1:772685687500:web:5ae7e6d49250335f543069',
    measurementId: import.meta.env.VUE_APP_FIREBASE_MEASUREMENT_ID || 'G-N6P4XVLF0L'
};

const firebase = initializeApp(firebaseConfig);
library.add(faSpinner)

const app = Vue.createApp(App)
initAxios({$axios: axios, store, app, $cookies: window.$cookies})
app.use(VueCookies, { expires: '7d'})
app.use(store)
app.use(router)
app.use(PrimeVue)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('Menu', Menu)
app.component('Button', Button)
app.component('Dialog', Dialog)
app.component('ConfirmPopup', ConfirmPopup)
app.mount('#app')
