import * as Vue from 'vue'
import * as VueRouter from 'vue-router'
// import App from './App.vue'
import HelloWorld from "@/components/HelloWorld.vue";
import Test from "@/components/Test.vue";
// import helmet from "helmet";
// import './assets/main.css'

const Home = {template: '<div>test</div>'}
const About = {template: '<div>about</div>'}

const routes = [
    {path: '/', component: Home},
    {path: '/about', component: About},
]

const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHashHistory(),
    routes, // short for `routes: routes`
})

const app = Vue.createApp({})
app.use(router)

app.mount('#app')
