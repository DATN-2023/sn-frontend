import * as Vue from 'vue'
import * as VueRouter from 'vue-router'
import App from './App.vue'
import HelloWorld from "@/components/HelloWorld.vue";
import Test from "@/components/Test.vue";
// import helmet from "helmet";
// import './assets/main.css'

const Home = {template: '<router-view><div>test</div></router-view>'}
const About = {template: '<router-view><div>cdcd</div></router-view>'}

const routes = [
    {path: '/', name: 'Hello World', component: HelloWorld},
    {path: '/about', name: 'Test', component: Test},
]

const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
})

const app = Vue.createApp(App)
app.use(router)
app.mount('#app')
