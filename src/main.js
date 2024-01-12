import * as Vue from 'vue'
import App from './App.vue'
import VueCookies from 'vue-cookies'
import store from "@/store";
import router from "@/router";
import {initializeApp} from "firebase/app";
import './assets/css/index.css'
import initAxios from './api'
import axios from "axios";
import PrimeVue from 'primevue/config';
import 'virtual:windi.css'
import 'primevue/resources/themes/lara-light-teal/theme.css'
import Calendar from 'primevue/calendar'
import ToastService from 'primevue/toastservice';

import notificationApi from "@/api/notification";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faSpinner, faEllipsis, faCheck, faBell, faCircle, faEllipsisVertical, faCakeCandles, faHouse} from '@fortawesome/free-solid-svg-icons'

import Menu from 'primevue/menu';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import ConfirmPopup from 'primevue/confirmpopup';
import Carousel from 'primevue/carousel';
import {getMessaging, getToken} from "firebase/messaging";
import config from '@/config/config'

const {firebaseConfig} = config

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp)

const handleFcmToken = (currentToken) => {
    if (currentToken) {
        window.$cookies.remove('fcmToken')
        window.$cookies.set('fcmToken', currentToken)
        notificationApi.addFcmToken({fcmToken: currentToken}).then()
    } else {
        console.log('get fcmToken error')
    }
}
navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function (registration) {
        console.log('firebase-message-sw :ServiceWorker registration successful with scope: ', registration.scope);
        getToken(messaging, {vapidKey: 'BMHJQv_6zAjuYolmHdAAIX0z6W8IGvjjIUr7xD9xnQDsu8cBckHAP97JmYMO4khnnYYOWJaqgAJ8-WimgEYQo1A'})
            .then((currentToken) => handleFcmToken(currentToken))
            .catch((e) => {
                console.log('An error occurred while retrieving token. ', e);
            })
    }, function (err) {
        console.log('firebase-message-sw: ServiceWorker registration failed: ', err);
    })

library.add(faSpinner)
library.add(faEllipsis)
library.add(faCheck)
library.add(faBell)
library.add(faCircle)
library.add(faEllipsisVertical)
library.add(faCakeCandles)
library.add(faHouse)

const app = Vue.createApp(App)
app.config.globalProperties.$messaging = messaging
initAxios({$axios: axios, store, app, $cookies: window.$cookies})
app.use(VueCookies, {expires: '7d'})
app.use(store)
app.use(router)
app.use(PrimeVue)
app.use(ToastService)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('Menu', Menu)
app.component('Button', Button)
app.component('Dialog', Dialog)
app.component('Calendar', Calendar)
app.component('ConfirmPopup', ConfirmPopup)
app.component('Carousel', Carousel)
app.mount('#app')
