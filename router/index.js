import * as VueRouter from 'vue-router'
import {FAKE_DEVICEID, TOKEN_KEY, VISITOR_ID} from "@/config/constants";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import appConfig from "@/config/config";
import authApi from "@/api/auth";
import store from "@/store";

const routes = [
    {
      path: '/login',
      component: () => import("../src/components/Login/Login.vue")
    }
]

const router = VueRouter.createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: VueRouter.createWebHistory(),
    routes, // short for `routes: routes`
})

router.beforeEach(async (to, from) => {
    if (!store.getters['auth/token'] || store.getters['auth/isGuest']) {
        const visitorId = window.$cookies.get(VISITOR_ID)
        if (!visitorId) {
            const fp = await FingerprintJS.load({})
            const result = await fp.get()
            const visitorId = result.visitorId
            window.$cookies.set(VISITOR_ID, visitorId)
            store.dispatch('auth/checkGuest', true)
        } else {
            const isFakeId = !!window.$cookies.get(FAKE_DEVICEID)
            if (isFakeId) {
                const data = {
                    deviceType: appConfig.deviceTypes.WEB,
                    deviceId: visitorId,
                    versionCode: '1'
                }
                const {data: res} = await authApi.enterGuest(data)
                console.log(res)
                this.$cookies.set(TOKEN_KEY, res.token)
                store.dispatch('auth/checkGuest', true)
                window.$cookies.remove(FAKE_DEVICEID)
            }
        }
    }
})

export default router
