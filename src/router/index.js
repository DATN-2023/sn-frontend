import * as VueRouter from 'vue-router'
import {FAKE_DEVICEID, TOKEN_KEY, VISITOR_ID} from "@/config/constants";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import appConfig from "@/config/config";
import authApi from "@/api/auth";
import store from "@/store";

const routes = [
    {
      path: '/login',
      component: () => import("../pages/Login.vue")
    },
    {
        path: '/',
        component: () => import("../pages/Main.vue")
    },
    {
        path: '/test',
        component: () => import("@/features/HelloWorld.vue")
    },
    {
        path: '/feed/:title',
        component: () => import("@/pages/DetailFeed.vue")
    },
    {
        path: '/user/:id',
        component: () => import("@/pages/Personal.vue")
    },
    {
        path: '/group',
        component: () => import("@/pages/GroupList.vue")
    },
    {
        path: '/group/:id',
        component: () => import("@/pages/GroupDetail.vue")
    },
    {
        path: '/notification',
        component: () => import("@/pages/Notification.vue")
    }
]

const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach(async (to, from) => {
    const visitorId = window.$cookies.get(VISITOR_ID)
    if (!visitorId) {
        const fp = await FingerprintJS.load({})
        const result = await fp.get()
        const visitorId = result.visitorId
        window.$cookies.set(VISITOR_ID, visitorId)
    }
    const token = window.$cookies.get(TOKEN_KEY)
    if (to.path === '/login' && token)  router.push('/')
    else if (to.path !== '/login' && !token) router.push('/login')
})

export default router
